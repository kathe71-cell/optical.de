import React from 'react';
import { AlertCircle } from 'lucide-react';

/**
 * Standardisierter medizinischer Hinweis für alle Produkt-, Vergleichs- und Beratungsansichten.
 */
export default function MedicalDisclaimer({ compact = false, className = '' }) {
  if (compact) {
    return (
      <div className={`bg-amber-50/80 border border-amber-200/80 rounded-lg px-3 py-2 text-[11px] text-amber-950 flex items-start gap-2 ${className}`}>
        <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="leading-snug">
          <strong>Medizinischer Hinweis:</strong> Die Angaben auf optical.de dienen dem technischen Produktvergleich und ersetzen keine individuelle Anpassung oder Untersuchung durch Augenarzt oder Augenoptiker.
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-950 flex items-start gap-3 shadow-xs ${className}`}>
      <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0 text-amber-700">
        <AlertCircle className="w-4 h-4" />
      </div>
      <div className="space-y-1">
        <h4 className="font-bold text-amber-950 text-xs uppercase tracking-wide">Wichtiger Verbraucher- &amp; Gesundheitshinweis</h4>
        <p className="leading-relaxed text-amber-900">
          Die Informationen auf optical.de dienen dem sachlichen Produkt- und Preisvergleich. Sie stellen <strong>keine medizinische Beratung oder Heilaussage</strong> dar und ersetzen keinesfalls eine fachgerechte Erstanpassung, Sehschärfenprüfung oder Spaltlampenuntersuchung durch einen Augenarzt oder eine augenoptische Fachkraft.
        </p>
        <p className="leading-relaxed text-amber-900 font-medium pt-0.5">
          Bei Schmerzen, Augenrötungen, Fremdkörpergefühl, Tränenfluss oder akuten Sehstörungen nehmen Sie die Kontaktlinsen unverzüglich heraus und suchen Sie eine augenärztliche Praxis auf.
        </p>
      </div>
    </div>
  );
}
