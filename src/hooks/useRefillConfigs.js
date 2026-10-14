import { useState, useEffect } from 'react';

const REFILL_STORAGE_KEY = 'optical_refill_configs';
const REFILL_STORAGE_EVENT = 'optical_refill_changed';

let memoryRefillFallback = {};

function readRefillStorage() {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return memoryRefillFallback;
  }
  try {
    const stored = localStorage.getItem(REFILL_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed === 'object') {
        memoryRefillFallback = parsed;
        return parsed;
      }
    }
    return memoryRefillFallback;
  } catch {
    return memoryRefillFallback;
  }
}

function writeRefillStorage(next) {
  memoryRefillFallback = next;
  if (typeof window === 'undefined') return;
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(REFILL_STORAGE_KEY, JSON.stringify(next));
    }
  } catch {
    // Stiller In-Memory-Fallback
  }
  try {
    window.dispatchEvent(new Event(REFILL_STORAGE_EVENT));
  } catch {
    // Ignoriere Event-Fehler
  }
}

/**
 * Hook zur Verwaltung der Nachkauf-Konfigurationen je Produkt
 * Speichert Nutzereinstellungen 100% lokal im Browser.
 */
export function useRefillConfigs() {
  const [configs, setConfigs] = useState(() => readRefillStorage());

  useEffect(() => {
    const handleStorageChange = () => {
      setConfigs(readRefillStorage());
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
      writeRefillStorage(next);
      return next;
    });
  };

  const removeConfig = (productId) => {
    setConfigs((prev) => {
      const next = { ...prev };
      delete next[productId];
      writeRefillStorage(next);
      return next;
    });
  };

  /**
   * Prüft, ob ein Nachkauftermin oder Vorratsende ansteht oder erreicht ist
   */
  const getDueRefill = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayTime = new Date(today).getTime();

    for (const [productId, conf] of Object.entries(configs)) {
      if (!conf) continue;

      // 1. Berechnung der echten Restvorratstage (bis Vorrat erschöpft ist)
      let stockDaysRemaining = null;
      if (conf.expiryDate) {
        const expiryTime = new Date(conf.expiryDate).getTime();
        stockDaysRemaining = Math.max(0, Math.ceil((expiryTime - todayTime) / (1000 * 60 * 60 * 24)));
      } else if (typeof conf.minDays === 'number') {
        stockDaysRemaining = conf.minDays;
      }

      // 2. Prüfung des Nachkauf-Erinnerungsdatums (refillDate = Vorrat minus Vorlaufzeit)
      if (conf.refillDate) {
        const refillTime = new Date(conf.refillDate).getTime();
        const daysUntilRefill = Math.ceil((refillTime - todayTime) / (1000 * 60 * 60 * 24));

        // Fall A: Erinnerungsdatum ist heute oder bereits überschritten
        if (conf.refillDate <= today) {
          const isStockDepleted = stockDaysRemaining !== null && stockDaysRemaining <= 0;
          return {
            productId,
            ...conf,
            daysRemaining: stockDaysRemaining !== null ? stockDaysRemaining : 0,
            stockDaysRemaining,
            daysUntilRefill,
            isOverdue: isStockDepleted,
            isReminderDue: true
          };
        }

        // Fall B: Erinnerungsdatum steht in Kürze an (innerhalb der nächsten 7 Tage)
        if (daysUntilRefill <= 7 && daysUntilRefill >= 0) {
          return {
            productId,
            ...conf,
            daysRemaining: stockDaysRemaining !== null ? stockDaysRemaining : daysUntilRefill,
            stockDaysRemaining,
            daysUntilRefill,
            isUpcoming: true
          };
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
