import React, { createContext, useContext, useState, useEffect } from 'react';

const SEHKOMFORT_KEY = 'optical_sehkomfort_active';

// In-Memory-Fallback für Umgebungen mit blockiertem oder fehlerhaftem localStorage
let memoryStorageFallback = false;

function readStorage() {
  if (typeof window === 'undefined') return false;
  try {
    const item = window.localStorage.getItem(SEHKOMFORT_KEY);
    if (item !== null) {
      return item === 'true';
    }
  } catch {
    return memoryStorageFallback;
  }
  return false;
}

function writeStorage(val) {
  memoryStorageFallback = val;
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(SEHKOMFORT_KEY, val ? 'true' : 'false');
  } catch {
    // Stiller In-Memory-Fallback bei blockiertem localStorage
  }
}

function updateRootClass(active) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (active) {
    root.classList.add('sehkomfort-active');
  } else {
    root.classList.remove('sehkomfort-active');
  }
}

const SehkomfortContext = createContext({
  sehkomfort: false,
  toggleSehkomfort: () => {},
  setSehkomfort: () => {}
});

export function SehkomfortProvider({ children }) {
  const [sehkomfort, setSehkomfortState] = useState(() => {
    const initial = readStorage();
    updateRootClass(initial);
    return initial;
  });

  useEffect(() => {
    updateRootClass(sehkomfort);

    // Cross-Tab-Synchronisation via nativem 'storage' Event
    const handleStorage = (e) => {
      if (e.key === SEHKOMFORT_KEY) {
        const nextVal = e.newValue === 'true';
        setSehkomfortState(nextVal);
        updateRootClass(nextVal);
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, [sehkomfort]);

  const toggleSehkomfort = () => {
    setSehkomfortState((prev) => {
      const next = !prev;
      writeStorage(next);
      updateRootClass(next);
      return next;
    });
  };

  const setSehkomfort = (val) => {
    const next = !!val;
    setSehkomfortState(next);
    writeStorage(next);
    updateRootClass(next);
  };

  return (
    <SehkomfortContext.Provider value={{ sehkomfort, toggleSehkomfort, setSehkomfort }}>
      {children}
    </SehkomfortContext.Provider>
  );
}

export function useSehkomfort() {
  return useContext(SehkomfortContext);
}
