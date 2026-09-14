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
          <strong>Medizinischer Hinweis:</strong> optical.de hilft Ihnen, genau die Linse und das Markenoriginal zu finden, die Sie bereits verwenden. Keine medizinische Beratung oder Empfehlung zum Produktwechsel. Kontaktlinsen bedürfen einer fachgerechten Anpassung durch Augenarzt oder Augenoptiker.
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
          Die Informationen auf optical.de dienen dem sachlichen Produkt- und Preisvergleich für Kontaktlinsen, die Ihnen bereits von einer augenoptischen oder augenärztlichen Fachkraft angepasst wurden. Sie stellen <strong>keine medizinische Beratung oder Heilaussage</strong> dar.
        </p>
        <p className="leading-relaxed text-amber-900 font-medium pt-0.5">
          optical.de empfiehlt keinen eigenmächtigen Wechsel auf andere Linsenmodelle und behauptet nicht, dass abweichende Produkte einander ohne fachmännische Neuanpassung ersetzen können. Bei Schmerzen, Augenrötungen oder Sehstörungen entfernen Sie die Kontaktlinsen unverzüglich und suchen Sie eine augenärztliche Praxis auf.
        </p>
      </div>
    </div>
  );
}
