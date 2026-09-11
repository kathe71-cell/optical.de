import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Eye, ArrowLeft, ArrowUpDown, Filter, ExternalLink, ShieldCheck, Check } from 'lucide-react';
import { PRODUCTS, getProductsByCategory } from '../data/products';
import MedicalDisclaimer from '../components/MedicalDisclaimer';
import TrustSection from '../components/TrustSection';
import ScrollToTop from '../components/ScrollToTop';
import AdvisorChatbot from '../components/AdvisorChatbot';
import { trackAffiliateClick, trackFilterUsed } from '../utils/tracking';

const AMAZON_TAG = 'esstri-21';
const AMAZON_SUBID = 'optical.de-21';

const getAmazonLink = (query) => {
  return `https://www.amazon.de/s?k=${encodeURIComponent(query)}&tag=${AMAZON_TAG}&ascsubtag=${AMAZON_SUBID}`;
};

const CATEGORY_CONFIG = {
  'tageslinsen-vergleich': {
    categoryKey: 'tag',
    title: 'Tageslinsen im transparenten Vergleich 2026',
    subtitle: 'Tägliche Hygiene ohne Pflegemittelaufwand. Vergleichen Sie Dk/t-Werte, Wassergehalt und die tatsächlichen Kosten pro Tag.',
    h1: 'Tageslinsen Vergleich: Technische Daten & Preis pro Tag',
    descriptionText: 'Tageslinsen werden nach einmaligem Tragen entsorgt. Dadurch entfällt der tägliche Reinigungsaufwand vollständig. Wichtige technische Kriterien sind die Sauerstofftransmissibilität (Dk/t) sowie das Material (klassisches Hydrogel vs. modernes Silikon-Hydrogel oder Wassergradient).'
  },
  'monatslinsen-vergleich': {
    categoryKey: 'monat',
    title: 'Monatslinsen im transparenten Vergleich 2026',
    subtitle: 'Der günstigste Weg bei täglichem Tragen. Finden Sie Linsen mit hoher Sauerstofftransmissibilität und kalkulieren Sie Ihre monatlichen Gesamtkosten.',
    h1: 'Monatslinsen Vergleich: Sauerstofffluss & Kostenkalkulation',
    descriptionText: 'Monatslinsen bieten bei regelmäßiger Nutzung den wirtschaftlich günstigsten Preis pro Tragetag (oft ab ca. 0,33 €/Tag). Entscheidend für die Augengesundheit bei langen Tragezeiten sind hochwertige Silikon-Hydrogel-Materialien mit hohem Dk/t-Wert.'
  },
  'torische-kontaktlinsen': {
    categoryKey: 'toric',
    title: 'Torische Kontaktlinsen bei Hornhautverkrümmung (Astigmatismus)',
    subtitle: 'Spezielle Linsengeometrien mit Zylinder (CYL) und Achse (AXIS). Vergleichen Sie Stabilisierungsmethoden und Preise.',
    h1: 'Torische Kontaktlinsen Vergleich: Stabilität & Sauerstoffversorgung',
    descriptionText: 'Torische Kontaktlinsen korrigieren eine Hornhautverkrümmung (Astigmatismus). Durch spezielle Gewichtungs- und Stabilisierungszonen richten sich diese Linsen bei jedem Lidschlag exakt an der Hornhaut aus.'
  },
  'multifokale-kontaktlinsen': {
    categoryKey: 'multifocal',
    title: 'Multifokale Kontaktlinsen (Gleitsicht) im Vergleich',
    subtitle: 'Scharfes Sehen in Nähe, Zwischenbereich und Ferne bei Alterssichtigkeit (Presbyopie). Technische Parameter im Überblick.',
    h1: 'Multifokale Kontaktlinsen Vergleich: Addition & Sehzonen',
    descriptionText: 'Multifokale Kontaktlinsen kombinieren mehrere konzentrische Sehzonen, um die nachlassende Akkommodationsfähigkeit des Auges im Nahbereich (Presbyopie) auszugleichen.'
  },
  'kontaktlinsen-preisvergleich': {
    categoryKey: 'all',
    title: 'Kontaktlinsen Preisvergleich: Kosten pro Tag transparent berechnen',
    subtitle: 'Alle Linsentypen, Hersteller und Packungsgrößen auf einen Blick. Unabhängige Datenmatrix ohne Werbesiegel.',
    h1: 'Der neutrale Kontaktlinsen-Preis- und Datenvergleich',
    descriptionText: 'Vergleichen Sie alle marktgängigen Kontaktlinsen unabhängig von Markennamen oder Herstellerversprechungen. Berechnen Sie die realen Kosten pro Linse und pro Tragetag.'
  }
};

export default function CategoryLanding({ categorySlugOverride }) {
  const { categorySlug: routeSlug } = useParams();
  const slug = categorySlugOverride || routeSlug || 'kontaktlinsen-preisvergleich';
  const config = CATEGORY_CONFIG[slug] || CATEGORY_CONFIG['kontaktlinsen-preisvergleich'];

  const [sortBy, setSortBy] = useState('price_asc'); // 'price_asc', 'dkt_desc', 'water_desc'

  const rawProducts = getProductsByCategory(config.categoryKey);

  // Sortierung nach rein objektiven Kriterien
  const sortedProducts = [...rawProducts].sort((a, b) => {
    if (sortBy === 'price_asc') {
      return a.price - b.price;
    }
    if (sortBy === 'dkt_desc') {
      return (b.dk_t || 0) - (a.dk_t || 0);
    }
    if (sortBy === 'water_desc') {
      const wA = parseInt(a.water_content) || 0;
      const wB = parseInt(b.water_content) || 0;
      return wB - wA;
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      
      {/* Navigation Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-sm">
              <Eye className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <span className="font-black text-2xl tracking-tight text-slate-900">optical<span className="text-emerald-600">.de</span></span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold text-slate-500 border-l border-slate-200 pl-2">Kategorie-Vergleich</span>
            </div>
          </Link>

          <Link to="/" className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 transition">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Zurück zur Übersicht</span>
          </Link>
        </div>
      </header>

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200/80 py-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-slate-500 flex items-center gap-2">
          <Link to="/" className="hover:text-emerald-700">Startseite</Link>
          <span>/</span>
          <span className="font-semibold text-slate-900">{config.h1}</span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Header */}
        <div className="max-w-3xl mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {config.h1}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            {config.subtitle}
          </p>
        </div>

        {/* Medical Disclaimer */}
        <MedicalDisclaimer className="mb-8" />

        {/* Info Box */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs mb-8 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
          <h2 className="font-extrabold text-base text-slate-900">Fachliche Einordnung &amp; Kriterien</h2>
          <p>{config.descriptionText}</p>
          <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
            <strong>Hinweis zur Dk/t-Kennzahl:</strong> Der Dk/t-Wert beschreibt die Sauerstofftransmissibilität einer Kontaktlinse. Er ist eine technische Kenngröße und sollte nicht isoliert zur Auswahl einer Kontaktlinse verwendet werden.
          </div>
        </div>

        {/* Filter & Sort Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 mb-6 gap-3">
          <div className="text-xs font-bold text-slate-700">
            {sortedProducts.length} verifizierte Produkte im Datensatz
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Objektiv sortieren nach:</span>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                trackFilterUsed('sort_by', e.target.value);
              }}
              className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 font-semibold text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="price_asc">Niedrigster Packungspreis</option>
              <option value="dkt_desc">Höchster Dk/t-Wert</option>
              <option value="water_desc">Höchster Wassergehalt</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {sortedProducts.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[11px] font-bold text-slate-500 uppercase">{p.manufacturer}</span>
                  <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">
                    {p.lens_type}
                  </span>
                </div>
                <h3 className="text-lg font-black text-slate-900 leading-snug">
                  {p.product_name}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Packungsgröße: {p.pack_size}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-1 mt-2.5">
                  {p.objective_badges.map((b, idx) => (
                    <span key={idx} className="bg-emerald-50 text-emerald-950 border border-emerald-200 text-[10px] font-semibold px-2 py-0.5 rounded">
                      {b}
                    </span>
                  ))}
                </div>

                {/* Spezifikations-Liste */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Material:</span>
                    <strong className="text-slate-900">{p.material}</strong>
                  </div>
                  {p.dk_t && (
                    <div className="flex justify-between">
                      <span>Sauerstofffluss (Dk/t):</span>
                      <strong className="text-slate-900">{p.dk_t} Dk/t</strong>
                    </div>
                  )}
                  {p.water_content && (
                    <div className="flex justify-between">
                      <span>Wassergehalt:</span>
                      <strong className="text-slate-900">{p.water_content}</strong>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Geometrie (BC / DIA):</span>
                    <strong className="text-slate-900">{p.base_curve} / {p.diameter}</strong>
                  </div>
                </div>
              </div>

              {/* Preisteil & CTA */}
              <div className="mt-5 pt-3 border-t border-slate-100">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 mb-3 space-y-1 text-xs">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[11px] text-slate-500">Online-Vergleichspreis:</span>
                    <span className="text-base font-extrabold text-slate-900">ab {p.price.toFixed(2)} € *</span>
                  </div>
                  <div className="text-[9px] text-slate-400 italic">
                    Packungsgröße: {p.pack_size}. Händlerbedingungen beachten.
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-600 pt-1 border-t border-slate-200/60">
                    <span>Preis pro Einzellinse:</span>
                    <span className="font-semibold text-slate-800">{p.price_per_lens || '–'}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-600">
                    <span>Kosten pro Tragetag (2 Linsen):</span>
                    <span className="font-semibold text-emerald-700">{p.cost_per_day || '–'}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-600">
                    <span>Kosten pro Monat (2 Linsen):</span>
                    <span className="font-semibold text-slate-800">{p.cost_per_month || '–'}</span>
                  </div>
                </div>

                <a
                  href={getAmazonLink(p.amazon_query)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAffiliateClick(p.product_name, 'amazon', 'category_page')}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition"
                >
                  <span>Angebote bei Amazon *</span>
                  <ExternalLink className="w-3 h-3 text-emerald-400" />
                </a>
                <div className="text-center mt-2 space-y-0.5">
                  <span className="text-[10px] text-slate-500 block font-medium">
                    Amazon-Partnerlink · Preis kann sich ändern
                  </span>
                  <span className="text-[9px] text-slate-400 block font-medium">
                    * Werbelink / Partnerlink
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Vertrauensbereich */}
        <TrustSection />

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-10 border-t border-slate-800 text-xs mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 text-slate-400">
          <p>© {new Date().getFullYear()} optical.de Media. Unabhängiges Recherche- und Vergleichsportal.</p>
          <div className="flex justify-center gap-4 text-slate-300 font-semibold">
            <Link to="/impressum" className="hover:text-white">Impressum</Link>
            <span>·</span>
            <Link to="/datenschutz" className="hover:text-white">Datenschutz</Link>
            <span>·</span>
            <Link to="/" className="hover:text-white">Startseite</Link>
          </div>
        </div>
      </footer>

      <ScrollToTop />
      <AdvisorChatbot />

    </div>
  );
}
