import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Eye, ArrowLeft, ArrowUpDown, Filter, ExternalLink, ShieldCheck, Check, Bookmark, BookOpen } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MetaTags from '../components/MetaTags';
import { PRODUCTS, getProductsByCategory } from '../data/products';
import { useSavedLenses } from '../hooks/useSavedLenses';
import MedicalDisclaimer from '../components/MedicalDisclaimer';
import TrustSection from '../components/TrustSection';
import ScrollToTop from '../components/ScrollToTop';
import { trackAffiliateClick, trackFilterUsed, trackProductClicked } from '../utils/tracking';

import { getAffiliateSearchUrl, getAffiliateCtaLabel, AFFILIATE_LINK_REL } from '../utils/affiliate';

const AMAZON_TAG = 'optical.de-21';
const AMAZON_SUBID = 'optical.de-21';

const getAmazonLink = (queryOrAsin, asin) => getAffiliateSearchUrl(queryOrAsin, asin);

const CATEGORY_CONFIG = {
  'tageslinsen-vergleich': {
    categoryKey: 'tag',
    title: 'Tageslinsen im transparenten Vergleich | optical.de',
    subtitle: 'Tägliche Hygiene ohne Pflegemittelaufwand. Vergleichen Sie Dk/t-Werte, Wassergehalt und die tatsächlichen Kosten pro Tag.',
    h1: 'Tageslinsen Vergleich: Technische Daten & Preis pro Tag',
    descriptionText: 'Tageslinsen werden nach einmaligem Tragen entsorgt. Dadurch entfällt der tägliche Reinigungsaufwand vollständig. Wichtige technische Kriterien sind die Sauerstofftransmissibilität (Dk/t) sowie das Material (klassisches Hydrogel vs. modernes Silikon-Hydrogel oder Wassergradient).',
    criteria: [
      {
        title: 'Einmalnutzung ohne täglichen Pflegeaufwand',
        description: 'Tageslinsen werden nach einmaligem Tragen entsorgt. Dadurch entfallen die tägliche Reinigung, Desinfektion, Aufbewahrungsbehälter und Pflegemittel vollständig.'
      },
      {
        title: 'Flexibilität & Trageanlässe',
        description: 'Besonders geeignet für Gelegenheitsträger, Sport, Reisen oder als Ergänzung zur Brille, da angebrochene Packungen nicht altern wie Pflegemittel.'
      },
      {
        title: 'Moderne Silikon-Hydrogele vs. Hydrogele',
        description: 'Moderne Silikon-Hydrogele (z. B. Stenfilcon A) verbinden hohe Sauerstoffwerte mit niedrigem Modulus (Weichheit) und gutem Benetzungsverhalten.'
      }
    ],
    featuredProducts: [
      {
        id: 'myday-daily',
        name: 'CooperVision MyDay Daily Disposable',
        path: '/produkt/myday-daily',
        manufacturer: 'CooperVision',
        highlight: 'Stenfilcon A (Silikon-Hydrogel) · Dk/t 100 · 54 % Wasser · Smart Silicone™ mit niedrigem Modulus (0,4 MPa)'
      },
      {
        id: 'dailies-total-1',
        name: 'Alcon Dailies Total 1',
        path: '/produkt/dailies-total-1',
        manufacturer: 'Alcon',
        highlight: 'Delefilcon A · Dk/t 156 · Wassergradienten-Technologie (>80 % Wasser an der äußersten Oberfläche)'
      }
    ],
    guides: [
      {
        title: 'Ratgeber: Kontaktlinsen anpassen',
        href: '/ratgeber/kontaktlinsen-anpassen',
        description: 'Warum Basiskurve (BC) und Durchmesser (DIA) vor dem Kauf vom Fachmann vermessen werden müssen.'
      },
      {
        title: 'Ratgeber: Tages- vs. Monatslinsen Kosten',
        href: '/ratgeber/tageslinsen-vs-monatslinsen-kosten',
        description: 'Detaillierter Kostenvergleich beider Tragekonzepte inklusive Pflegemittel und Jahreskalkulation.'
      }
    ]
  },
  'monatslinsen-vergleich': {
    categoryKey: 'monat',
    title: 'Monatslinsen im transparenten Vergleich | optical.de',
    subtitle: 'Wirtschaftliche Option bei täglichem Tragen. Vergleichen Sie Linsen mit hoher Sauerstofftransmissibilität und kalkulieren Sie Ihre monatlichen Gesamtkosten.',
    h1: 'Monatslinsen Vergleich: Sauerstofffluss & Kostenkalkulation',
    descriptionText: 'Monatslinsen bieten bei regelmäßiger Nutzung häufig einen niedrigen rechnerischen Preis pro Tragetag (oft ab ca. 0,22 €/Tag bei beidseitigem Tragen). Entscheidend für die Augengesundheit bei langen Tragezeiten sind hochwertige Silikon-Hydrogel-Materialien mit adäquatem Dk/t-Wert.',
    criteria: [
      {
        title: 'Materialklasse & Sauerstoffversorgung',
        description: 'Silikon-Hydrogele (z. B. Comfilcon A, Lotrafilcon B) erreichen hohe Sauerstoffwerte (Dk/t 130–160). Klassische Hydrogele (z. B. Omafilcon B) bieten eine Alternative bei Silikon-Unverträglichkeit.'
      },
      {
        title: 'Pflege- & Hygieneaufwand',
        description: 'Erfordert eine konsequente tägliche Reinigung. All-in-One-Lösungen eignen sich für unkomplizierte Handhabung; konservierungsmittelfreie Peroxidsysteme für empfindliche Augen.'
      },
      {
        title: 'Wirtschaftlichkeit & Tragehäufigkeit',
        description: 'Die tatsächliche Wirtschaftlichkeit hängt von individueller Nutzungshäufigkeit, Packungspreisen und Pflegemittelkosten ab. Bei regelmäßigem oder täglichem Tragen bieten Monatslinsen rechnerisch häufig einen geringeren Preis pro Tragetag.'
      }
    ],
    featuredProducts: [
      {
        id: 'biofinity',
        name: 'CooperVision Biofinity',
        path: '/biofinity',
        manufacturer: 'CooperVision',
        highlight: 'Comfilcon A · Dk/t 160 · 48 % Wasser · Natürlich benetzende Aquaform® Technology ohne Oberflächenbeschichtung'
      },
      {
        id: 'airoptix-hydraglyde',
        name: 'Air Optix Plus HydraGlyde',
        path: '/produkt/airoptix-hydraglyde',
        manufacturer: 'Alcon',
        highlight: 'Lotrafilcon B · Dk/t 138 · 33 % Wasser · SmartShield® gegen Lipidablagerungen & HydraGlyde® Moisture Matrix'
      },
      {
        id: 'proclear-sphere',
        name: 'CooperVision Proclear Sphere',
        path: '/produkt/proclear-sphere',
        manufacturer: 'CooperVision',
        highlight: 'Omafilcon B (Hydrogel) · Dk/t 42 · 62 % Wasser · Biokompatible PC Technology™ mit Phosphorylcholin'
      }
    ],
    guides: [
      {
        title: 'Ratgeber: Kontaktlinsen anpassen',
        href: '/ratgeber/kontaktlinsen-anpassen',
        description: 'Bedeutung der optometrischen Anpassung von Basiskurve (BC), Durchmesser (DIA) und Hornhautradien.'
      },
      {
        title: 'Ratgeber: Tages- vs. Monatslinsen Kosten',
        href: '/ratgeber/tageslinsen-vs-monatslinsen-kosten',
        description: 'Vollständiger Kostenvergleich inklusive Pflegemittel und Jahresverbrauch.'
      },
      {
        title: 'Ratgeber: Pflegemittel-Vergleich',
        href: '/ratgeber/kontaktlinsen-pflegemittel-vergleich',
        description: 'All-in-One- vs. Peroxidlösungen für Silikon-Hydrogel- und klassische Hydrogel-Linsen.'
      }
    ]
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
        <div className="max-w-3xl mb-8 min-w-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 tracking-tight break-words">
            {config.h1}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            {config.subtitle}
          </p>
        </div>

        {/* Medical Disclaimer */}
        <MedicalDisclaimer className="mb-8" />

        {/* Info Box & Fachliche Kriterien */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs mb-8 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4">
          <div>
            <h2 className="font-extrabold text-base text-slate-900 mb-1">Fachliche Einordnung &amp; Kriterien</h2>
            <p>{config.descriptionText}</p>
          </div>

          {/* Kriterien-Grid, falls definiert */}
          {config.criteria && config.criteria.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              {config.criteria.map((crit, cIdx) => (
                <div key={cIdx} className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 flex flex-col justify-between">
                  <div className="font-bold text-xs text-slate-900 mb-1">{crit.title}</div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{crit.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Ausgewählte Produkte im Vergleich (neutral ohne Superlative) */}
          {config.featuredProducts && config.featuredProducts.length > 0 && (
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                Ausgewählte Produkte im Vergleich
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {config.featuredProducts.map((fp, fpIdx) => (
                  <Link
                    key={fpIdx}
                    to={fp.path}
                    className="p-3.5 bg-slate-50 hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-300 rounded-xl transition group block"
                  >
                    <div className="text-[10px] font-bold text-slate-500 uppercase">{fp.manufacturer}</div>
                    <div className="font-bold text-xs text-slate-900 group-hover:text-emerald-700 transition flex items-center justify-between mt-0.5">
                      <span>{fp.name}</span>
                      <span className="text-emerald-600 group-hover:translate-x-0.5 transition-transform">→</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1.5 leading-snug">{fp.highlight}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Themenrelevante Ratgeber */}
          {config.guides && config.guides.length > 0 && (
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                <span>Themenrelevante Ratgeber</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {config.guides.map((g, gIdx) => (
                  <Link
                    key={gIdx}
                    to={g.href}
                    className="p-3 bg-slate-50 hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-300 rounded-xl transition group block"
                  >
                    <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition flex items-center justify-between">
                      <span>{g.title}</span>
                      <span className="text-emerald-600 group-hover:translate-x-0.5 transition-transform">→</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 leading-snug">{g.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

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
              aria-label="Kategorie-Sortierung"
              className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 shadow-2xs focus:ring-2 focus:ring-emerald-500 w-full sm:w-auto max-w-full"
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
                      to={`/${p.id === 'biofinity' ? 'biofinity' : `produkt/${p.id}`}`} 
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
                      <span className="text-[11px] text-slate-600 font-medium">Beispielpreis auf Amazon.de:</span>
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

                  <div className="grid grid-cols-2 gap-2 card-action-grid">
                    <Link
                      to={`/${p.id === 'biofinity' ? 'biofinity' : `produkt/${p.id}`}`}
                      className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] py-2.5 px-2 rounded-xl text-center transition"
                    >
                      Datenblatt
                    </Link>
                    <a
                      href={getAmazonLink(p.amazon_query, p.asin)}
                      target="_blank"
                      rel={AFFILIATE_LINK_REL}
                      onClick={() => trackAffiliateClick(p.product_name, 'amazon', 'category_page')}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] py-2.5 px-2 rounded-xl flex items-center justify-center gap-1 shadow-2xs transition"
                    >
                      <span>{getAffiliateCtaLabel(p)}</span>
                      <ExternalLink className="w-3 h-3 text-emerald-400" />
                    </a>
                  </div>

                  <div className="text-center mt-2 text-[11px] text-slate-600 font-medium leading-tight">
                    * Werbelink / Partnerlink (Amazon.de) · Beispielpreis Stand 09/2026 · Tagesaktueller Preis auf Amazon.de einsehbar · Preise können abweichen
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
