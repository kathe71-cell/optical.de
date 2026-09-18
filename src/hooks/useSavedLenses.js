import { useState, useEffect } from 'react';
import { trackBookmarkToggle } from '../utils/tracking';

const STORAGE_KEY = 'optical_saved_lenses';
const STORAGE_EVENT = 'optical_saved_lenses_changed';

export function useSavedLenses() {
  const [savedIds, setSavedIds] = useState(() => {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        setSavedIds(stored ? JSON.parse(stored) : []);
      } catch {
        setSavedIds([]);
      }
    };

    window.addEventListener(STORAGE_EVENT, handleStorageChange);
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener(STORAGE_EVENT, handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const isSaved = (productId) => {
    return savedIds.includes(productId);
  };

  const toggleSave = (productId) => {
    setSavedIds((prev) => {
      let next;
      const willBeSaved = !prev.includes(productId);
      if (willBeSaved) {
        next = [...prev, productId];
      } else {
        next = prev.filter((id) => id !== productId);
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        window.dispatchEvent(new Event(STORAGE_EVENT));
      } catch (e) {
        console.error('Could not save to localStorage', e);
      }
      trackBookmarkToggle(productId, willBeSaved);
      return next;
    });
  };

  const removeSaved = (productId) => {
    setSavedIds((prev) => {
      const next = prev.filter((id) => id !== productId);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        window.dispatchEvent(new Event(STORAGE_EVENT));
      } catch (e) {
        console.error('Could not remove from localStorage', e);
      }
      trackBookmarkToggle(productId, false);
      return next;
    });
  };

  const clearAllSaved = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new Event(STORAGE_EVENT));
    } catch (e) {
      console.error('Could not clear localStorage', e);
    }
    setSavedIds([]);
  };

  return {
    savedIds,
    savedCount: savedIds.length,
    isSaved,
    toggleSave,
    removeSaved,
    clearAllSaved
  };
}
