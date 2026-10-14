import { useState, useEffect } from 'react';
import { trackBookmarkToggle } from '../utils/tracking';

const STORAGE_KEY = 'optical_saved_lenses';
const STORAGE_EVENT = 'optical_saved_lenses_changed';

// Modulweiter In-Memory-Fallback bei blockiertem localStorage (z.B. Safari Private Mode)
let memorySavedFallback = [];

function readStorage() {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return memorySavedFallback;
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        memorySavedFallback = parsed;
        return parsed;
      }
    }
    return memorySavedFallback;
  } catch {
    return memorySavedFallback;
  }
}

function writeStorage(next) {
  memorySavedFallback = next;
  if (typeof window === 'undefined') return;
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }
  } catch {
    // Stiller In-Memory-Fallback bei blockiertem/vollem localStorage
  }
  try {
    window.dispatchEvent(new Event(STORAGE_EVENT));
  } catch {
    // Ignoriere Event-Fehler in isolierten Umgebungen
  }
}

export function useSavedLenses() {
  const [savedIds, setSavedIds] = useState(() => readStorage());

  useEffect(() => {
    const handleStorageChange = () => {
      setSavedIds(readStorage());
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
      writeStorage(next);
      trackBookmarkToggle(productId, willBeSaved);
      return next;
    });
  };

  const removeSaved = (productId) => {
    setSavedIds((prev) => {
      const next = prev.filter((id) => id !== productId);
      writeStorage(next);
      trackBookmarkToggle(productId, false);
      return next;
    });
  };

  const clearAllSaved = () => {
    writeStorage([]);
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
