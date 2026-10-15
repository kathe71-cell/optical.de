import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Bell, Check, Clock, ChevronDown, ChevronUp, Download, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { calculateRefillSchedule } from '../utils/refillCalculator';
import CalendarExportDropdown from './CalendarExportDropdown';
import { trackEvent } from '../utils/tracking';

export default function RefillAssistantModal({ product, initialConfig, onClose, onSave }) {
  const isDaily = product.lens_type?.toLowerCase().includes('tag');
  const defaultPackCount = product.pack_count || (isDaily ? 30 : 6);

  const [separateEyes, setSeparateEyes] = useState(initialConfig?.separateEyes || false);
  const [daysPerWeek, setDaysPerWeek] = useState(initialConfig?.daysPerWeek || 7);
  const [startDate, setStartDate] = useState(initialConfig?.startDate || new Date().toISOString().split('T')[0]);
  const [leadDays, setLeadDays] = useState(initialConfig?.leadDays || 14);

  // Gemeinsamer Vorrat
  const [sharedSupply, setSharedSupply] = useState(initialConfig?.sharedSupply || { packs: 1, packCount: defaultPackCount, individualLenses: 0 });

  // Getrennte Augen
  const [rightEye, setRightEye] = useState(initialConfig?.rightEye || { packs: 1, packCount: defaultPackCount, individualLenses: 0 });
  const [leftEye, setLeftEye] = useState(initialConfig?.leftEye || { packs: 1, packCount: defaultPackCount, individualLenses: 0 });

  const [manualRefillDate, setManualRefillDate] = useState(initialConfig?.customRefillDate || '');

  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);
  const previousFocusRef = useRef(null);

  // Escape-Taste, Fokus-Trap & Fokus-Rückgabe für Barrierefreiheit (WCAG 2.2)
  useEffect(() => {
    previousFocusRef.current = document.activeElement;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Initialer Fokus auf den ersten interaktiven Button / Close-Button
    const rafId = requestAnimationFrame(() => {
      closeBtnRef.current?.focus();
    });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('keydown', handleKeyDown);
      // Fokus an das auslösende Element zurückgeben
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus();
      }
    };
  }, [onClose]);

  // Live-Berechnung
  const schedule = calculateRefillSchedule({
    lensType: product.lens_type,
    daysPerWeek,
    startDate,
    leadDays,
    separateEyes,
    sharedSupply,
    rightEye,
    leftEye
  });

  const effectiveRefillDate = manualRefillDate || schedule.refillDate;

  const handleSave = () => {
    const configToSave = {
      productId: product.id,
      productName: product.product_name,
      lensType: product.lens_type,
      separateEyes,
      daysPerWeek,
      startDate,
      leadDays,
      sharedSupply,
      rightEye,
      leftEye,
      minDays: schedule.minDays,
      expiryDate: schedule.expiryDate,
      refillDate: effectiveRefillDate,
      customRefillDate: manualRefillDate,
      savedAt: new Date().toISOString()
    };

    onSave(configToSave);
    trackEvent('refill_assistant_configured', {
      product_id: product.id,
      lens_type: product.lens_type,
      min_days: schedule.minDays
    });
    onClose();
  };


  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="refill-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div ref={modalRef} className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold block">Nachkauf-Assistent</span>
              <h2 id="refill-modal-title" className="text-lg font-black text-white">{product.product_name}</h2>
            </div>
          </div>
          <button 
            ref={closeBtnRef}
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg transition"
            aria-label="Nachkauf-Assistent schließen"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-xs text-slate-700">
          
          {/* 1. Modus: Gleiche oder unterschiedliche Augen */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <label className="font-bold text-slate-900 block mb-2">Werte beider Augen:</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSeparateEyes(false)}
                className={`p-3 rounded-xl border text-center font-bold transition ${
                  !separateEyes 
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs' 
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                Gleiche Werte
                <span className="block text-[10px] font-normal opacity-80 mt-0.5">Gemeinsame Packung</span>
              </button>
              <button
                type="button"
                onClick={() => setSeparateEyes(true)}
                className={`p-3 rounded-xl border text-center font-bold transition ${
                  separateEyes 
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs' 
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                Unterschiedliche Werte
                <span className="block text-[10px] font-normal opacity-80 mt-0.5">Rechts &amp; Links getrennt</span>
              </button>
            </div>
          </div>

          {/* 2. Vorratsbestand */}
          {!separateEyes ? (
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
              <span className="font-bold text-slate-900 block">Vorhandener Vorrat:</span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="refill-shared-packs" className="text-[11px] text-slate-500 block mb-1">Volle Packungen:</label>
                  <input
                    id="refill-shared-packs"
                    type="number"
                    min="1"
                    max="50"
                    value={sharedSupply.packs}
                    onChange={(e) => setSharedSupply({ ...sharedSupply, packs: Number(e.target.value) || 0 })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 font-bold text-sm text-slate-900"
                  />
                </div>
                <div>
                  <label htmlFor="refill-shared-pack-count" className="text-[11px] text-slate-500 block mb-1">Linsen pro Packung:</label>
                  <input
                    id="refill-shared-pack-count"
                    type="number"
                    min="1"
                    max="180"
                    value={sharedSupply.packCount}
                    onChange={(e) => setSharedSupply({ ...sharedSupply, packCount: Number(e.target.value) || 0 })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 font-bold text-sm text-slate-900"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Rechtes Auge */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 block">Rechtes Auge (OD):</span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="refill-right-packs" className="text-[11px] text-slate-500 block mb-1">Packungen:</label>
                    <input
                      id="refill-right-packs"
                      type="number"
                      min="1"
                      max="50"
                      value={rightEye.packs}
                      onChange={(e) => setRightEye({ ...rightEye, packs: Number(e.target.value) || 0 })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 font-bold text-sm text-slate-900"
                    />
                  </div>
                  <div>
                    <label htmlFor="refill-right-pack-count" className="text-[11px] text-slate-500 block mb-1">Linsen/Packung:</label>
                    <input
                      id="refill-right-pack-count"
                      type="number"
                      min="1"
                      max="180"
                      value={rightEye.packCount}
                      onChange={(e) => setRightEye({ ...rightEye, packCount: Number(e.target.value) || 0 })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 font-bold text-sm text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Linkes Auge */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 block">Linkes Auge (OS):</span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="refill-left-packs" className="text-[11px] text-slate-500 block mb-1">Packungen:</label>
                    <input
                      id="refill-left-packs"
                      type="number"
                      min="1"
                      max="50"
                      value={leftEye.packs}
                      onChange={(e) => setLeftEye({ ...leftEye, packs: Number(e.target.value) || 0 })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 font-bold text-sm text-slate-900"
                    />
                  </div>
                  <div>
                    <label htmlFor="refill-left-pack-count" className="text-[11px] text-slate-500 block mb-1">Linsen/Packung:</label>
                    <input
                      id="refill-left-pack-count"
                      type="number"
                      min="1"
                      max="180"
                      value={leftEye.packCount}
                      onChange={(e) => setLeftEye({ ...leftEye, packCount: Number(e.target.value) || 0 })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 font-bold text-sm text-slate-900"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. Nutzungstage (nur bei Tageslinsen relevant) */}
          {isDaily && (
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="refill-days-per-week" className="font-bold text-slate-900">Tragetage pro Woche:</label>
                <span className="font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-xs">
                  {daysPerWeek} Tage / Woche
                </span>
              </div>
              <input
                id="refill-days-per-week"
                type="range"
                min="1"
                max="7"
                value={daysPerWeek}
                onChange={(e) => setDaysPerWeek(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <span className="text-[10px] text-slate-500 block mt-1">
                Tageslinsen werden nur an tatsächlichen Tragetagen verbraucht.
              </span>
            </div>
          )}

          {/* 4. Startdatum & Vorlauf */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <label htmlFor="refill-start-date" className="font-bold text-slate-900 block mb-1">Startdatum:</label>
              <input
                id="refill-start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 font-semibold text-xs text-slate-900"
              />
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <label htmlFor="refill-lead-days" className="font-bold text-slate-900 block mb-1">Erinnerungsvorlauf:</label>
              <select
                id="refill-lead-days"
                aria-label="Erinnerungsvorlauf auswählen"
                value={leadDays}
                onChange={(e) => setLeadDays(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 font-semibold text-xs text-slate-900"
              >
                <option value={7}>7 Tage vorher</option>
                <option value={14}>14 Tage vorher (Empfohlen)</option>
                <option value={21}>21 Tage vorher</option>
                <option value={30}>30 Tage vorher</option>
              </select>
            </div>
          </div>

          {/* 5. Berechnetes Ergebnis */}
          <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-sm">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>Voraussichtliche Reichweite: ca. {schedule.minDays} Tage</span>
            </div>
            <div className="text-xs text-emerald-800 space-y-1">
              <div>Vorrat erschöpft am: <strong>{new Date(schedule.expiryDate).toLocaleDateString('de-DE')}</strong></div>
              <div>Empfohlener Nachkauf ab: <strong className="text-slate-900 underline">{new Date(effectiveRefillDate).toLocaleDateString('de-DE')}</strong></div>
            </div>
            <span className="text-[10px] text-emerald-700 block pt-1">
              * Modellrechnung basierend auf {isDaily ? `${daysPerWeek} Tragetagen/Woche` : '30-tägigem Austauschzyklus'}. Keine Verlängerung empfohlener Tragezeiten.
            </span>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <CalendarExportDropdown
            product={product}
            refillDate={effectiveRefillDate}
            direction="up"
            className="w-full sm:w-auto"
          />

          <div className="w-full sm:w-auto flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-bold text-xs transition"
            >
              Abbrechen
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="w-1/2 sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-xs transition"
            >
              <Check className="w-4 h-4" />
              <span>Plan aktivieren</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
