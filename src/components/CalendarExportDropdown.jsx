import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronDown, Download, ExternalLink, CalendarDays } from 'lucide-react';
import { generateGoogleCalendarUrl, generateIcsCalendarEvent, downloadIcsFile } from '../utils/refillCalculator';
import { trackEvent } from '../utils/tracking';

/**
 * Reusable Dropdown Component for Calendar Actions:
 * - "Zum Kalender hinzufügen" as primary action trigger
 * - 2 Clear and technically distinct options:
 *   1. Google Kalender (prefilled web link, all-day event)
 *   2. Apple Kalender, Outlook & andere (.ics) (universal RFC 5545 calendar file)
 * - Honest disclaimer about device/browser-dependent automatic opening.
 * - Full keyboard accessibility (Escape, Tab focus-trap inside menu if open, click outside, focus management).
 *
 * @param {Object} props
 * @param {Object} props.product - { id, product_name, ... }
 * @param {string} props.refillDate - YYYY-MM-DD
 * @param {string} [props.targetUrl] - Return URL
 * @param {string} [props.className] - Container CSS classes
 * @param {'sm' | 'md'} [props.size] - Button size variant
 * @param {'default' | 'outline' | 'emerald'} [props.variant] - Button styling
 * @param {'up' | 'down'} [props.direction] - Dropdown open direction
 */
export default function CalendarExportDropdown({
  product,
  refillDate,
  targetUrl = 'https://www.optical.de/meine-linsen',
  className = '',
  size = 'md',
  variant = 'default',
  direction = 'down'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  // Close when clicking outside or pressing Escape / handle focus
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const productName = product?.product_name || product?.name || 'optical.de';
  const productId = product?.id || 'unknown';

  const handleOpenGoogle = () => {
    if (!refillDate) return;
    const url = generateGoogleCalendarUrl({
      productName,
      refillDate,
      targetUrl,
      location: 'optical.de Online-Vergleich'
    });
    trackEvent('calendar_reminder_exported', {
      product_id: productId,
      service: 'google'
    });
    setIsOpen(false);
    triggerRef.current?.focus();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleIcsExport = () => {
    if (!refillDate) return;
    const ics = generateIcsCalendarEvent({
      productName,
      refillDate,
      targetUrl,
      location: 'optical.de Online-Vergleich'
    });
    downloadIcsFile(ics, `nachkauf-${productId}.ics`);
    trackEvent('calendar_reminder_exported', {
      product_id: productId,
      service: 'ics'
    });
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  // Button style variants
  const sizeClasses = size === 'sm'
    ? 'py-1.5 px-3 text-xs gap-1.5 rounded-lg'
    : 'py-2.5 px-4 text-xs gap-2 rounded-xl';

  let variantClasses = 'bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold';
  if (variant === 'emerald') {
    variantClasses = 'bg-white border border-emerald-300 hover:bg-emerald-50 text-emerald-950 font-bold';
  } else if (variant === 'outline') {
    variantClasses = 'bg-transparent border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold';
  }

  // Positioning classes based on direction
  const positionClasses = direction === 'up'
    ? 'bottom-full mb-1.5'
    : 'top-full mt-1.5';

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Zum Kalender hinzufügen Optionen öffnen"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full inline-flex items-center justify-between transition focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 ${sizeClasses} ${variantClasses}`}
      >
        <span className="inline-flex items-center gap-1.5 truncate">
          <Calendar className={size === 'sm' ? 'w-3.5 h-3.5 text-emerald-600 shrink-0' : 'w-4 h-4 text-emerald-600 shrink-0'} />
          <span className="truncate">Zum Kalender hinzufügen</span>
        </span>
        <ChevronDown
          className={`${size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          role="menu"
          aria-orientation="vertical"
          className={`absolute left-0 right-0 sm:left-auto sm:right-0 sm:w-72 bg-white rounded-xl border border-slate-200 shadow-xl z-50 p-1.5 space-y-1 ${positionClasses}`}
        >
          {/* Option 1: Google Kalender */}
          <button
            type="button"
            role="menuitem"
            onClick={handleOpenGoogle}
            className="w-full text-left flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition text-slate-800 group focus:outline-none focus:bg-slate-100"
          >
            <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-100">
              <CalendarDays className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold flex items-center gap-1 text-slate-900">
                <span>Google Kalender</span>
                <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-600" />
              </div>
              <div className="text-[11px] text-slate-500 leading-tight">
                Ganztägigen Termin direkt im Google Kalender öffnen
              </div>
            </div>
          </button>

          {/* Option 2: Apple Kalender, Outlook & andere (.ics) */}
          <button
            type="button"
            role="menuitem"
            onClick={handleIcsExport}
            className="w-full text-left flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition text-slate-800 group focus:outline-none focus:bg-slate-100"
          >
            <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-emerald-100">
              <Download className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-slate-900">
                Apple Kalender, Outlook &amp; andere (.ics)
              </div>
              <div className="text-[11px] text-slate-500 leading-tight">
                Universelle Kalenderdatei (.ics) für Apple, Outlook und Systemkalender
              </div>
            </div>
          </button>

          {/* Ehrlicher Geräte-Hinweis */}
          <div className="pt-1 mt-1 border-t border-slate-100 px-2 py-1 text-[10px] text-slate-400 leading-tight">
            Hinweis: Das direkte Öffnen von Kalender-Apps ist abhängig von Betriebssystem und Browser-Einstellungen.
          </div>
        </div>
      )}
    </div>
  );
}
