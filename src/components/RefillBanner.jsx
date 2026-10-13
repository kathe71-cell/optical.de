import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowRight, X } from 'lucide-react';
import { useRefillConfigs } from '../hooks/useRefillConfigs';

/**
 * Dezent sichtbarer Hinweis auf der Startseite / im Header,
 * wenn für gespeicherte Linsen ein Nachkauf ansteht.
 */
export default function RefillBanner() {
  const { getDueRefill } = useRefillConfigs();
  const [dismissed, setDismissed] = useState(false);

  const dueRefill = getDueRefill();

  if (!dueRefill || dismissed) return null;

  return (
    <aside aria-label="Nachkauf-Erinnerung" className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-xs px-4 py-2.5 shadow-sm relative z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-200 flex-shrink-0 animate-pulse" />
          <span>
            {dueRefill.isOverdue ? (
              <strong>Zeit für deinen nächsten Linsenkauf?</strong>
            ) : (
              <span>Erinnerung: Dein Vorrat an <strong>{dueRefill.productName}</strong> reicht noch ca. {dueRefill.daysRemaining} Tage.</span>
            )}
          </span>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <Link
            to="/meine-linsen"
            className="inline-flex items-center gap-1 font-extrabold underline hover:text-emerald-100 transition"
          >
            <span>Jetzt Vorrat &amp; Angebote prüfen</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={() => setDismissed(true)}
            className="text-white/80 hover:text-white p-1 rounded transition"
            aria-label="Hinweis schließen"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
