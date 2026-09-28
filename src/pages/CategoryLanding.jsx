import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Eye, ArrowLeft, ArrowUpDown, Filter, ExternalLink, ShieldCheck, Check, Bookmark } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MetaTags from '../components/MetaTags';
import { PRODUCTS, getProductsByCategory } from '../data/products';
import { useSavedLenses } from '../hooks/useSavedLenses';
import MedicalDisclaimer from '../components/MedicalDisclaimer';
import TrustSection from '../components/TrustSection';
import ScrollToTop from '../components/ScrollToTop';
import { trackAffiliateClick, trackFilterUsed, trackProductClicked } from '../utils/tracking';

const AMAZON_TAG = 'optical.de-21';
const AMAZON_SUBID = 'optical.de-21';

const getAmazonLink = (queryOrAsin, asin) => {
  if (asin) {
    return `https://www.amazon.de/dp/${asin}?tag=${AMAZON_TAG}`;
  }
  return `https://www.amazon.de/s?k=${encodeURIComponent(queryOrAsin)}&tag=${AMAZON_TAG}`;
};

const CATEGORY_CONFIG = {
  'tageslinsen-vergleich': {
    categoryKey: 'tag',
    title: 'Tageslinsen im transparenten Vergleich 2026 | optical.de',
    subtitle: 'Tägliche Hygiene ohne Pflegemittelaufwand. Vergleichen Sie Dk/t-Werte, Wassergehalt und die tatsächlichen Kosten pro Tag.',
    h1: 'Tageslinsen Vergleich: Technische Daten & Preis pro Tag',
    descriptionText: 'Tageslinsen werden nach einmaligem Tragen entsorgt. Dadurch entfällt der tägliche Reinigungsaufwand vollständig. Wichtige technische Kriterien sind die Sauerstofftransmissibilität (Dk/t) sowie das Material (klassisches Hydrogel vs. modernes Silikon-Hydrogel oder Wassergradient).'
  },
  'monatslinsen-vergleich': {
    categoryKey: 'monat',
    title: 'Monatslinsen im transparenten Vergleich 2026 | optical.de',
    subtitle: 'Der günstigste Weg bei täglichem Tragen. Finden Sie Linsen mit hoher Sauerstofftransmissibilität und kalkulieren Sie Ihre monatlichen Gesamtkosten.',
    h1: 'Monatslinsen Vergleich: Sauerstofffluss & Kostenkalkulation',
    descriptionText: 'Monatslinsen bieten bei regelmäßiger Nutzung den wirtschaftlich günstigsten Preis pro Tragetag (oft ab ca. 0,33 €/Tag). Entscheidend für die Augengesundheit bei langen Tragezeiten sind hochwertige Silikon-Hydrogel-Materialien mit hohem Dk/t-Wert.'
  },
  'torische-kontaktlinsen': {
    categoryKey: 'toric',
    title: 'Torische Kontaktlinsen bei Hornhautverkrümmung | optical.de',
    subtitle: 'Spezielle Linsengeometrien mit Zylinder (CYL) und Achse (AXIS). Vergleichen Sie Stabilisierungsmethoden und Preise.',
    h1: 'Torische Kontaktlinsen Vergleich: Stabilität & Sauerstoffversorgung',
    descriptionText: 'Torische Kontaktlinsen korrigieren eine Hornhautverkrümmung (Astigmatismus). Durch spezielle Gewichtungs- und Stabilisierungszonen richten sich diese Linsen bei jedem Lidschlag exakt an der Hornhaut aus.'
  },
  'multifokale-kontaktlinsen': {
    categoryKey: 'multifocal',
    title: 'Multifokale Kontaktlinsen (Gleitsicht) im Vergleich | optical.de',
    subtitle: 'Scharfes Sehen in Nähe, Zwischenbereich und Ferne bei Alterssichtigkeit (Presbyopie). Technische Parameter im Überblick.',
    h1: 'Multifokale Kontaktlinsen Vergleich: Addition & Sehzonen',
    descriptionText: 'Multifokale Kontaktlinsen kombinieren mehrere konzentrische Sehzonen, um die nachlassende Akkommodationsfähigkeit des Auges im Nahbereich (Presbyopie) auszugleichen.'
  },
  'kontaktlinsen-preisvergleich': {
    categoryKey: 'all',
    title: 'Kontaktlinsen Preisvergleich: Kosten pro Tag berechnen | optical.de',
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
  const { isSaved, toggleSave } = useSavedLenses();

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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col justify-between">
      <MetaTags 
        title={config.title}
        description={config.subtitle}
        canonical={`https://www.optical.de/${slug}`}
      />
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-grow">
        
        {/* Breadcrumb Navigation */}
        <div className="text-xs text-slate-500 flex items-center gap-2 mb-6">
          <Link to="/" className="hover:text-emerald-700">Startseite</Link>
          <span>/</span>
          <span className="font-semibold text-slate-900">{config.h1}</span>
        </div>

        {/* Header */}
        <div className="max-w-3xl mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
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

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-semibold">Sortierung:</span>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                trackFilterUsed('sort_by', e.target.value);
              }}
              className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 shadow-2xs focus:ring-2 focus:ring-emerald-500"
            >
              <option value="price_asc">Günstigster Preis</option>
              <option value="dkt_desc">Höchste Sauerstoffdurchlässigkeit (Dk/t)</option>
              <option value="water_desc">Höchster Wassergehalt</option>
            </select>
          </div>
        </div>

        {/* Produkt Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {sortedProducts.map((p) => {
            const saved = isSaved(p.id);

            return (
              <div 
                key={p.id} 
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase">{p.manufacturer}</span>
                    <div className="flex items-center gap-2">
                      <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">
                        {p.lens_type}
                      </span>
                      <button
                        onClick={() => toggleSave(p.id)}
                        className={`p-1.5 rounded-lg border transition ${
                          saved 
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-700' 
                            : 'bg-white border-slate-200 text-slate-400 hover:text-emerald-700'
                        }`}
                        title={saved ? 'Aus Merkliste entfernen' : 'Linse merken'}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-emerald-600' : ''}`} />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 leading-snug">
                    <Link 
                      to={`/${p.id === 'biofinity' ? 'biofinity' : p.id}`} 
                      onClick={() => trackProductClicked(p.id, p.product_name)}
                      className="hover:text-emerald-700 transition"
                    >
                      {p.product_name}
                    </Link>
                  </h3>

                  <div className="mt-2 text-xs text-slate-500 flex items-center justify-between">
                    <span>Packungsgröße:</span>
                    <strong className="text-slate-800 font-semibold">{p.pack_size}</strong>
                  </div>

                  {/* Objektive Badges */}
                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {p.objective_badges?.map((b, bIdx) => (
                      <span key={bIdx} className="bg-emerald-50 text-emerald-950 border border-emerald-200 text-[10px] font-semibold px-2 py-0.5 rounded">
                        {b}
                      </span>
                    ))}
                  </div>

                  {/* Spezifikations-Liste */}
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>Linsenmaterial:</span>
                      <strong className="text-slate-900 font-semibold">{p.material}</strong>
                    </div>
                    {p.dk_t && (
                      <div className="flex justify-between">
                        <span>Sauerstofffluss (Dk/t):</span>
                        <strong className="text-slate-900 font-semibold">{p.dk_t} Dk/t</strong>
                      </div>
                    )}
                    {p.water_content && (
                      <div className="flex justify-between">
                        <span>Wassergehalt:</span>
                        <strong className="text-slate-900 font-semibold">{p.water_content}</strong>
                      </div>
                    )}
                    {p.base_curve && (
                      <div className="flex justify-between">
                        <span>Geometrie (BC / DIA):</span>
                        <strong className="text-slate-900 font-semibold">{p.base_curve} / {p.diameter}</strong>
                      </div>
                    )}
                  </div>
                </div>

                {/* Preisteil & CTA */}
                <div className="mt-5 pt-3 border-t border-slate-100">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 mb-3 space-y-1 text-xs">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[11px] text-slate-600 font-medium">Orientierungspreis / UVP:</span>
                      <span className="text-base font-extrabold text-slate-900">ca. {p.price.toFixed(2)} € *</span>
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Tagesaktueller Händlerpreis auf Amazon.de einsehbar
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-600 pt-1 border-t border-slate-200/60">
                      <span>Preis pro Einzellinse:</span>
                      <span className="font-semibold text-slate-800">{p.price_per_lens || '–'}</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-600">
                      <span>Kosten pro Tragetag (2 Linsen):</span>
                      <span className="font-semibold text-emerald-700">{p.cost_per_day || '–'}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to={`/${p.id === 'biofinity' ? 'biofinity' : p.id}`}
                      className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] py-2.5 px-2 rounded-xl text-center transition"
                    >
                      Datenblatt
                    </Link>
                    <a
                      href={getAmazonLink(p.amazon_query, p.asin)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackAffiliateClick(p.product_name, 'amazon', 'category_page')}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] py-2.5 px-2 rounded-xl flex items-center justify-center gap-1 shadow-2xs transition"
                    >
                      <span>Angebote bei Amazon *</span>
                      <ExternalLink className="w-3 h-3 text-emerald-400" />
                    </a>
                  </div>

                  <div className="text-center mt-2 text-[9px] text-slate-400 leading-tight">
                    * Werbelink / Partnerlink (Amazon.de) · Tatsächlicher Händlerpreis auf Amazon.de einsehbar
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Vertrauensbereich */}
        <TrustSection />

      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
