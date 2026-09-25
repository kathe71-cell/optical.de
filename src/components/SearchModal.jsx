import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, ArrowRight, Eye, Sparkles, Layers, Calculator, ShieldCheck, Tag } from 'lucide-react';

const OPTICAL_SEARCH_INDEX = [
  // Eigenmarken (Private Labels)
  {
    id: 'em-apollo-oxygen',
    title: 'Apollo iWear Oxygen (Monatslinse)',
    subtitle: 'Handelsmarke von Apollo Optik · Baugleich mit CooperVision Biofinity (Comfilcon A, Dk/t 160)',
    url: '/apollo-iwear-oxygen',
    type: 'eigenmarke',
    badge: 'Apollo Optik'
  },
  {
    id: 'em-fielmann-actimed',
    title: 'Fielmann ActiMed Monatslinse',
    subtitle: 'Handelsmarke von Fielmann · Baugleich mit CooperVision Biomedics 55 Evolution (Ocufilcon D)',
    url: '/fielmann-actimed',
    type: 'eigenmarke',
    badge: 'Fielmann'
  },
  {
    id: 'em-fielmann-atmo',
    title: 'Fielmann Atmo Monatslinse',
    subtitle: 'Handelsmarke von Fielmann · Baugleich mit CooperVision Biofinity (Comfilcon A, Dk/t 160)',
    url: '/fielmann-atmo',
    type: 'eigenmarke',
    badge: 'Fielmann'
  },
  {
    id: 'em-misterspex-trueday',
    title: 'Mister Spex True Day (Tageslinse)',
    subtitle: 'Handelsmarke von Mister Spex · Baugleich mit CooperVision Live Daily (Somofilcon A)',
    url: '/mister-spex-true-day',
    type: 'eigenmarke',
    badge: 'Mister Spex'
  },
  {
    id: 'em-specsavers-opteyes',
    title: 'Specsavers Easyvision Opteyes',
    subtitle: 'Handelsmarke von Specsavers / Pearle · Baugleich mit CooperVision Biofinity',
    url: '/specsavers-easyvision-opteyes',
    type: 'eigenmarke',
    badge: 'Specsavers'
  },
  {
    id: 'em-apollo-harmony',
    title: 'Apollo iWear Harmony (Tageslinse)',
    subtitle: 'Handelsmarke von Apollo Optik · Baugleich mit CooperVision MyDay (Stenfilcon A)',
    url: '/apollo-iwear-harmony',
    type: 'eigenmarke',
    badge: 'Apollo Optik'
  },

  // Produkte & Marken
  {
    id: 'prod-biofinity',
    title: 'CooperVision Biofinity (6er Pack)',
    subtitle: 'Silikon-Hydrogel Monatslinse (Dk/t 160, Comfilcon A) · Original-Referenz für Optiker-Eigenmarken',
    url: '/biofinity',
    type: 'produkt',
    badge: 'CooperVision'
  },
  {
    id: 'comp-biofinity-airoptix',
    title: 'Biofinity vs. Air Optix Plus HydraGlyde',
    subtitle: 'Direkter 1:1 Parametervergleich: Dk/t, Wassergehalt, Sauerstoffdurchlässigkeit & Preise',
    url: '/biofinity-vs-air-optix',
    type: 'vergleich',
    badge: 'Direktvergleich'
  },

  // Kategorien
  {
    id: 'cat-tageslinsen',
    title: 'Tageslinsen im Vergleich',
    subtitle: 'Maximale Hygiene & Komfort ohne Pflegemittel (Alcon Dailies Total 1, Acuvue, Biotrue)',
    url: '/tageslinsen-vergleich',
    type: 'kategorie',
    badge: 'Tageslinsen'
  },
  {
    id: 'cat-monatslinsen',
    title: 'Monatslinsen im Vergleich',
    subtitle: 'Günstigster Preis pro Tragetag (Biofinity, Air Optix, Avaira, Ultra)',
    url: '/monatslinsen-vergleich',
    type: 'kategorie',
    badge: 'Monatslinsen'
  },
  {
    id: 'cat-torisch',
    title: 'Torische Kontaktlinsen (Hornhautverkrümmung / Astigmatismus)',
    subtitle: 'Zylinder- & Achsen-Passform führender Marken im Vergleich',
    url: '/torische-kontaktlinsen',
    type: 'kategorie',
    badge: 'Astigmatismus'
  },
  {
    id: 'cat-multifokal',
    title: 'Multifokale Kontaktlinsen (Gleitsicht / Presbyopie)',
    subtitle: 'Stufenloses Sehen in Nah-, Zwischen- und Fernbereich',
    url: '/multifokale-kontaktlinsen',
    type: 'kategorie',
    badge: 'Gleitsicht'
  },
  {
    id: 'cat-preisvergleich',
    title: 'Kontaktlinsen Gesamt-Preisvergleich',
    subtitle: 'Marktübersicht aller verifizierten Kontaktlinsen nach Herstellern & Packungsgrößen',
    url: '/kontaktlinsen-preisvergleich',
    type: 'kategorie',
    badge: 'Preisvergleich'
  },

  // Tools & Ratgeber
  {
    id: 'tool-decoder',
    title: 'Optiker-Eigenmarken-Decoder',
    subtitle: 'Ermitteln Sie die Original-Markenlinse hinter Fielmann, Apollo, Mister Spex & Co.',
    url: '/eigenmarken-decoder',
    type: 'ratgeber',
    badge: 'Decoder Tool'
  },
  {
    id: 'tool-rechner',
    title: 'Kontaktlinsen-Kostenrechner',
    subtitle: 'Tatsächliche Tragekosten pro Tag, Monat und Jahr berechnen',
    url: '/preisrechner',
    type: 'ratgeber',
    badge: 'Rechner Tool'
  },
  {
    id: 'tool-katalog',
    title: 'Kontaktlinsen Parameter-Katalog',
    subtitle: 'Vollständiger Filter nach Dk/t, Wassergehalt, Basiskurve & Material',
    url: '/vergleichskatalog',
    type: 'ratgeber',
    badge: 'Katalog'
  }
];

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else window.dispatchEvent(new CustomEvent('toggle-optical-search'));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();
  const results = q === ''
    ? OPTICAL_SEARCH_INDEX.slice(0, 6)
    : OPTICAL_SEARCH_INDEX.filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q)
      );

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 pt-12 sm:pt-20"
      onClick={onClose}
    >
      <div 
        className="bg-white border border-slate-200 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Produkt, Eigenmarke oder Optiker suchen... (z. B. Biofinity, Apollo iWear, Air Optix, torisch, Tageslinsen)"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-sm sm:text-base font-medium focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-600 p-1">
              <X className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={onClose}
            className="text-xs font-bold text-slate-500 hover:text-slate-900 px-2 py-1 bg-slate-200/60 hover:bg-slate-200 rounded-lg"
          >
            ESC
          </button>
        </div>

        <div className="overflow-y-auto p-3 space-y-1 divide-y divide-slate-100">
          {q === '' && (
            <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Beliebte Eigenmarken, Produkte &amp; Filter
            </div>
          )}

          {results.length > 0 ? (
            results.map((res) => (
              <Link
                key={res.id}
                to={res.url}
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-emerald-50/60 transition-colors group"
              >
                <div className="space-y-0.5 max-w-[85%]">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm group-hover:text-emerald-900 transition-colors">
                      {res.title}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 group-hover:bg-emerald-100 text-slate-600 group-hover:text-emerald-800">
                      {res.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-1">
                    {res.subtitle}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 transition-colors shrink-0" />
              </Link>
            ))
          ) : (
            <div className="p-8 text-center text-slate-500 space-y-2">
              <Search className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-sm font-medium">Keine Linsen oder Marken für „{query}“ gefunden.</p>
              <p className="text-xs text-slate-400">Versuchen Sie es mit Biofinity, Apollo, Fielmann, ActiMed, torisch oder Monatslinsen.</p>
            </div>
          )}
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between font-mono">
          <span>Tipp: <kbd className="bg-white border border-slate-300 px-1 rounded text-[10px]">Strg</kbd> + <kbd className="bg-white border border-slate-300 px-1 rounded text-[10px]">K</kbd></span>
          <span>optical.de – Unabhängige Recherche</span>
        </div>
      </div>
    </div>
  );
}
