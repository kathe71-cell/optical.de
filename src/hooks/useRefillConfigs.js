import { useState, useEffect } from 'react';

const REFILL_STORAGE_KEY = 'optical_refill_configs';
const REFILL_STORAGE_EVENT = 'optical_refill_changed';

/**
 * Hook zur Verwaltung der Nachkauf-Konfigurationen je Produkt
 * Speichert Nutzereinstellungen 100% lokal im Browser.
 */
export function useRefillConfigs() {
  const [configs, setConfigs] = useState(() => {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') return {};
    try {
      const stored = localStorage.getItem(REFILL_STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const stored = localStorage.getItem(REFILL_STORAGE_KEY);
        setConfigs(stored ? JSON.parse(stored) : {});
      } catch {
        setConfigs({});
      }
    };

    window.addEventListener(REFILL_STORAGE_EVENT, handleStorageChange);
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener(REFILL_STORAGE_EVENT, handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const getConfig = (productId) => configs[productId] || null;

  const saveConfig = (productId, newConfig) => {
    setConfigs((prev) => {
      const next = { ...prev, [productId]: newConfig };
      try {
        localStorage.setItem(REFILL_STORAGE_KEY, JSON.stringify(next));
        window.dispatchEvent(new Event(REFILL_STORAGE_EVENT));
      } catch (e) {
        console.error('Could not save refill config', e);
      }
      return next;
    });
  };

  const removeConfig = (productId) => {
    setConfigs((prev) => {
      const next = { ...prev };
      delete next[productId];
      try {
        localStorage.setItem(REFILL_STORAGE_KEY, JSON.stringify(next));
        window.dispatchEvent(new Event(REFILL_STORAGE_EVENT));
      } catch (e) {
        console.error('Could not remove refill config', e);
      }
      return next;
    });
  };

  /**
   * Prüft, ob irgendein Nachkauftermin in Kürze ansteht (innerhalb der nächsten 14 Tage)
   */
  const getDueRefill = () => {
    const today = new Date().toISOString().split('T')[0];
    for (const [productId, conf] of Object.entries(configs)) {
      if (conf && conf.refillDate && conf.refillDate <= today) {
        return { productId, ...conf, isOverdue: true };
      }
      if (conf && conf.refillDate) {
        const diffDays = Math.ceil((new Date(conf.refillDate) - new Date(today)) / (1000 * 60 * 60 * 24));
        if (diffDays <= 7 && diffDays >= 0) {
          return { productId, ...conf, daysRemaining: diffDays, isUpcoming: true };
        }
      }
    }
    return null;
  };

  return {
    configs,
    getConfig,
    saveConfig,
    removeConfig,
    getDueRefill
  };
}
