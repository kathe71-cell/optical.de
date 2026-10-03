import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, ArrowRight, Eye, Sparkles, Layers, Calculator, ShieldCheck, Tag } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { EIGENMARKEN_DATABASE } from '../data/eigenmarken';

// Levenshtein-Distanz für Tippfehler-Toleranz
function levenshtein(a, b) {
  const an = a ? a.length : 0;
  const bn = b ? b.length : 0;
  if (an === 0) return bn;
  if (bn === 0) return an;
  const matrix = Array.from({ length: bn + 1 }, (_, i) => [i]);
  for (let j = 0; j <= an; j++) matrix[0][j] = j;
  for (let i = 1; i <= bn; i++) {
    for (let j = 1; j <= an; j++) {
      if (b[i - 1] === a[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  return matrix[bn][an];
}

// Dynamischer Suchindex aufgebaut aus echten Daten
const STATIC_TOOLS_AND_CATS = [
  {
    id: 'tool-decoder',
    title: 'Optiker-Eigenmarken-Decoder',
    subtitle: 'Ermitteln Sie die Original-Markenlinse hinter Fielmann, Apollo, Mister Spex & Co.',
    url: '/eigenmarken-decoder',
    group: 'Tools & Rechner',
    badge: 'Decoder Tool',
    keywords: ['decoder', 'recherche', 'optiker', 'handelsmarke']
  },
  {
    id: 'tool-rechner',
    title: 'Kontaktlinsen-Kostenrechner',
    subtitle: 'Tatsächliche Tragekosten pro Tag, Monat und Jahr berechnen',
    url: '/preisrechner',
    group: 'Tools & Rechner',
    badge: 'Kostenrechner',
    keywords: ['rechner', 'kosten', 'ersparnis', 'preis', 'budget']
  },
  {
    id: 'tool-katalog',
    title: 'Kontaktlinsen-Gesamtkatalog',
    subtitle: 'Vollständige Matrix nach Dk/t, Wassergehalt, Basiskurve & Material',
    url: '/vergleichskatalog',
    group: 'Tools & Rechner',
    badge: 'Katalog',
    keywords: ['katalog', 'übersicht', 'filter', 'alle linsen']
  },
  {
    id: 'cat-tageslinsen',
    title: 'Tageslinsen im Vergleich',
    subtitle: 'Maximale Hygiene & Komfort ohne Pflegemittel (Alcon Dailies, Acuvue, Biotrue)',
    url: '/tageslinsen-vergleich',
    group: 'Kategorien',
    badge: 'Tageslinsen',
    keywords: ['tageslinsen', 'daily', '1-day', 'einweg']
  },
  {
    id: 'cat-monatslinsen',
    title: 'Monatslinsen im Vergleich',
    subtitle: 'Günstigster Preis pro Tragetag (Biofinity, Air Optix, Ultra)',
    url: '/monatslinsen-vergleich',
    group: 'Kategorien',
    badge: 'Monatslinsen',
    keywords: ['monatslinsen', 'monthly', 'silikon hydrogel', 'dauerhaft']
  },
  {
    id: 'cat-torisch',
    title: 'Torische Kontaktlinsen (Astigmatismus)',
    subtitle: 'Hornhautverkrümmung: Zylinder- & Achsen-Passform führender Marken',
    url: '/torische-kontaktlinsen',
    group: 'Kategorien',
    badge: 'Astigmatismus',
    keywords: ['torisch', 'toric', 'astigmatismus', 'hornhautverkrümmung', 'zylinder']
  },
  {
    id: 'cat-multifokal',
    title: 'Multifokale Kontaktlinsen (Gleitsicht)',
    subtitle: 'Stufenloses Sehen in Nah-, Zwischen- und Fernbereich bei Presbyopie',
    url: '/multifokale-kontaktlinsen',
    group: 'Kategorien',
    badge: 'Gleitsicht',
    keywords: ['multifokal', 'multifocal', 'gleitsicht', 'presbyopie', 'alterssichtigkeit']
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

  const rawQ = query.trim().toLowerCase();
  const searchTokens = rawQ.split(/\s+/).filter(Boolean);

  let searchResults = [];

  if (rawQ === '') {
    // Standard-Empfehlungen
    searchResults = [
      ...STATIC_TOOLS_AND_CATS.slice(0, 3),
      ...EIGENMARKEN_DATABASE.slice(0, 2).map(em => ({
        id: `em-${em.id}`,
        title: em.optician_private_label,
        subtitle: `${em.optician_chain} · Abgleich mit ${em.matched_brand_product_id} (${em.material || ''})`,
        url: `/${em.slug}`,
        group: 'Eigenmarken',
        badge: em.optician_chain
      })),
      {
        id: 'prod-biofinity',
        title: 'CooperVision Biofinity',
        subtitle: 'Monatslinse · Comfilcon A, Dk/t 160 · Referenz für Optiker-Handelsmarken',
        url: '/biofinity',
        group: 'Original-Produkte',
        badge: 'CooperVision'
      }
    ];
  } else {
    // 1. Suche über Eigenmarken
    const matchedEigenmarken = EIGENMARKEN_DATABASE.filter(em => {
      const text = `${em.optician_private_label} ${em.optician_chain} ${em.material || ''} ${em.slug}`.toLowerCase();
      const exactMatch = searchTokens.every(tok => text.includes(tok));
      if (exactMatch) return true;
      // Tippfehler-Toleranz: wenn ein Token ab 4 Zeichen Levenshtein <= 1 zum Label hat
      return searchTokens.some(tok => {
        if (tok.length < 4) return false;
        return em.optician_private_label.toLowerCase().split(/\s+/).some(w => levenshtein(tok, w) <= 1);
      });
    }).map(em => ({
      id: `em-${em.id}`,
      title: em.optician_private_label,
      subtitle: `${em.optician_chain} · Technische Übereinstimmung mit ${em.matched_brand_product_id} (${em.material || ''})`,
      url: `/${em.slug}`,
      group: 'Eigenmarken',
      badge: em.optician_chain
    }));

    // 2. Suche über Produkte
    const matchedProducts = PRODUCTS.filter(p => {
      const aliasesStr = Array.isArray(p.aliases) ? p.aliases.join(' ') : '';
      const text = `${p.product_name} ${p.manufacturer} ${p.material || ''} ${p.lens_type || ''} ${aliasesStr}`.toLowerCase();
      const exactMatch = searchTokens.every(tok => text.includes(tok));
      if (exactMatch) return true;
      return searchTokens.some(tok => {
        if (tok.length < 4) return false;
        return p.product_name.toLowerCase().split(/\s+/).some(w => levenshtein(tok, w) <= 1);
      });
    }).map(p => ({
      id: `prod-${p.id}`,
      title: p.product_name,
      subtitle: `${p.lens_type} · ${p.material || ''} ${p.dk_t ? `· Dk/t ${p.dk_t}` : ''} · ${p.pack_size}`,
      url: p.id === 'biofinity' ? '/biofinity' : `/produkt/${p.id}`,
      group: 'Original-Produkte',
      badge: p.manufacturer
    }));

    // 3. Suche über statische Tools & Kategorien
    const matchedTools = STATIC_TOOLS_AND_CATS.filter(item => {
      const text = `${item.title} ${item.subtitle} ${(item.keywords || []).join(' ')}`.toLowerCase();
      return searchTokens.every(tok => text.includes(tok));
    });

    searchResults = [...matchedEigenmarken, ...matchedProducts, ...matchedTools];
  }

  // Gruppierung nach Themenbereichen
  const groupedResults = searchResults.reduce((acc, item) => {
    const grp = item.group || 'Sonstige';
    if (!acc[grp]) acc[grp] = [];
    acc[grp].push(item);
    return acc;
  }, {});

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 pt-12 sm:pt-20"
      onClick={onClose}
    >
      <div 
        className="bg-white border border-slate-200 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
      >
        {/* Eingabezeile */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Produkt, Eigenmarke, Material oder Optiker suchen (z. B. Biofinity, ActiMed, torisch)..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-sm sm:text-base font-medium focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-600 p-1" title="Löschen">
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

        {/* Ergebnisliste nach Gruppen */}
        <div className="overflow-y-auto p-3 space-y-4">
          {Object.keys(groupedResults).length > 0 ? (
            Object.entries(groupedResults).map(([groupTitle, items]) => (
              <div key={groupTitle} className="space-y-1">
                <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                  <span>{groupTitle}</span>
                  <span className="text-[10px] font-mono text-slate-400">{items.length} Treffer</span>
                </div>
                <div className="divide-y divide-slate-100">
                  {items.map((res) => (
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
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-slate-500 space-y-2">
              <Search className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-sm font-medium">Keine Treffer für „{query}“ gefunden.</p>
              <p className="text-xs text-slate-400">
                Tipp: Suche nach Herstellern (CooperVision, Alcon), Optikern (Apollo, Fielmann) oder Material (Comfilcon, Hydrogel).
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between font-mono">
          <span>Tipp: <kbd className="bg-white border border-slate-300 px-1 rounded text-[10px]">Strg</kbd> + <kbd className="bg-white border border-slate-300 px-1 rounded text-[10px]">K</kbd></span>
          <span>Tippfehler-tolerant · optical.de Suche</span>
        </div>
      </div>
    </div>
  );
}
