import React from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { Eye, ArrowLeft, ExternalLink, ShieldCheck, Check, ArrowRightLeft, AlertTriangle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MetaTags from '../components/MetaTags';
import { getProductById } from '../data/products';
import MedicalDisclaimer from '../components/MedicalDisclaimer';
import TrustSection from '../components/TrustSection';
import ScrollToTop from '../components/ScrollToTop';
import { trackAffiliateClick } from '../utils/tracking';

import { getAffiliateSearchUrl, getAffiliateCtaLabel, AFFILIATE_LINK_REL } from '../utils/affiliate';

const AMAZON_TAG = 'optical.de-21';

const getAmazonLink = (queryOrAsin, asin) => getAffiliateSearchUrl(queryOrAsin, asin);

export default function ProductComparisonPage() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const ids = searchParams.get('ids');
  const isDedicatedCompareRoute = location.pathname === '/biofinity-vs-air-optix';

  // Kanonische URL Ermittlung:
  // F17: Dynamische Produktvergleiche verwenden grundsätzlich https://www.optical.de/vergleich
  // als einheitliche Canonical-URL. Query-Parameter steuern die Linsen, ohne beliebige Kombinationen zu indexieren.
  const canonicalUrl = isDedicatedCompareRoute
    ? 'https://www.optical.de/biofinity-vs-air-optix'
    : 'https://www.optical.de/vergleich';

  // F18: Validiere Produkt-IDs
  let idList = [];
  if (isDedicatedCompareRoute) {
    idList = ['biofinity', 'airoptix-hydraglyde'];
  } else if (ids) {
    idList = ids.split(',').filter(Boolean).slice(0, 4);
  } else {
    // Auf /vergleich ohne IDs: Standard 2 Linsen
    idList = ['biofinity', 'airoptix-hydraglyde'];
  }

  // Ermittle welche IDs existieren und welche unbekannt sind
  const unknownIds = idList.filter(id => !getProductById(id));
  const rawSelected = idList.map(id => getProductById(id)).filter(Boolean);

  // Filtere Produkte: Nur Kontaktlinsen dürfen in der Linsen-Vergleichsmatrix dargestellt werden
  const incompatibleProducts = rawSelected.filter(p => p.category !== 'kontaktlinsen');
  
  // Prüfe auf Duplikate: Identische Produkt-IDs
  const uniqueLensesMap = new Map();
  rawSelected.filter(p => p.category === 'kontaktlinsen').forEach(p => {
    if (!uniqueLensesMap.has(p.id)) {
      uniqueLensesMap.set(p.id, p);
    }
  });
  const validLenses = Array.from(uniqueLensesMap.values());
  const hasDuplicates = idList.length > 1 && validLenses.length < (rawSelected.length - incompatibleProducts.length);

  // Fehler-/Leerzustand: wenn dynamische Parameter übergeben wurden, aber weniger als 2 unterschiedliche gültige Linsen resultieren
  const hasInvalidComparisonState = !isDedicatedCompareRoute && ids && (validLenses.length < 2 || unknownIds.length > 0 || hasDuplicates);

  const lenses = validLenses;
  const isDynamic = !!ids;

  const comparisonAttributes = [
    { label: 'Hersteller', getVal: (p) => p.manufacturer },
    { label: 'Linsentyp & Rhythmus', getVal: (p) => `${p.lens_type} (${p.replacement_schedule || '–'})` },
    { label: 'Linsenmaterial', getVal: (p) => p.material || '–' },
    { label: 'Materialklasse', getVal: (p) => p.material_class || '–' },
    { label: 'Sauerstofftransmissibilität (Dk/t)', getVal: (p) => p.dk_t ? `${p.dk_t} Dk/t` : '–' },
    { label: 'Wassergehalt', getVal: (p) => p.water_content || '–' },
    { label: 'Basiskurve (BC)', getVal: (p) => p.base_curve || '–' },
    { label: 'Durchmesser (DIA)', getVal: (p) => p.diameter || '–' },
    { label: 'Lieferbereich (SPH)', getVal: (p) => p.sphere_range || '–' },
    { label: 'Standardpackung', getVal: (p) => p.pack_size || '–' },
    { label: 'Orientierungspreis (Online)', getVal: (p) => p.price ? `ca. ${p.price.toFixed(2)} € *` : '–' },
    { label: 'Preis pro Einzellinse', getVal: (p) => p.price_per_lens || '–' },
    { label: 'Kosten pro Tragetag (2 Linsen)', getVal: (p) => p.cost_per_day || '–' },
    { label: 'Kosten pro Monat (2 Linsen)', getVal: (p) => p.cost_per_month || '–' },
    { label: 'Verifikations-Status', getVal: (p) => p.data_status === 'VERIFIED' ? 'Verifiziert nach Herstellerdatenblatt' : 'Teilweise erfasst' },
  ];

  const titleText = lenses.length >= 2 
    ? lenses.map(l => l.product_name).join(' vs. ') 
    : 'Kontaktlinsen Direktvergleich';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col justify-between">
      <MetaTags 
        title={`${titleText} | optical.de`}
        description={lenses.length >= 2 ? `Objektiver Parametervergleich von ${titleText}: Dk/t, Wassergehalt, Material und Preise ohne subjektives Scoring.` : 'Vergleiche Spezifikationen, Preise und Materialien von Kontaktlinsen direkt miteinander.'}
        canonical={canonicalUrl}
      />
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-grow">
        
        {/* Breadcrumb Navigation */}
        <div className="text-xs text-slate-500 flex items-center gap-2 mb-6">
          <Link to="/" className="hover:text-emerald-700">Startseite</Link>
          <span>/</span>
          <Link to="/vergleichskatalog" className="hover:text-emerald-700">Katalog</Link>
          <span>/</span>
          <span className="font-semibold text-slate-900 truncate max-w-xs">{titleText}</span>
        </div>

        {/* F18: Fehler- oder Leerzustand bei ungültigen Produktparametern */}
        {hasInvalidComparisonState ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs text-center max-w-2xl mx-auto my-8 space-y-5">
            <div className="w-14 h-14 bg-amber-100 border border-amber-300 rounded-2xl flex items-center justify-center mx-auto text-amber-900 shadow-2xs">
              <AlertTriangle className="w-7 h-7 text-amber-800" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Kein gültiger Produktvergleich möglich
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Für einen objektiven Spezifikationsvergleich müssen mindestens zwei unterschiedliche, im Katalog erfasste Kontaktlinsen ausgewählt werden.
            </p>
            {unknownIds.length > 0 && (
              <div className="text-xs bg-slate-100 rounded-xl p-3 text-slate-700 text-left">
                <strong>Unbekannte Produkt-ID(s):</strong> {unknownIds.join(', ')}
              </div>
            )}
            {hasDuplicates && (
              <div className="text-xs bg-slate-100 rounded-xl p-3 text-slate-700 text-left">
                <strong>Hinweis:</strong> Es wurden identische Produkte ausgewählt. Ein Vergleich erfordert mindestens zwei verschiedene Kontaktlinsen.
              </div>
            )}
            {incompatibleProducts.length > 0 && (
              <div className="text-xs bg-amber-50 rounded-xl p-3 text-amber-900 text-left border border-amber-200">
                <strong>Kategorie-Hinweis:</strong> Pflegemittel und Augentropfen ({incompatibleProducts.map(p => p.product_name).join(', ')}) besitzen keine geometrischen Linsendaten und können nicht in der Kontaktlinsen-Matrix verglichen werden.
              </div>
            )}
            {validLenses.length === 1 && (
              <div className="text-left bg-slate-50 border border-slate-200 rounded-2xl p-4 my-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Gültig erfasste Einzellinse (kein Vergleich möglich):</span>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="font-extrabold text-slate-900 text-sm block">{validLenses[0].product_name}</span>
                    <span className="text-xs text-slate-500">{validLenses[0].manufacturer} • {validLenses[0].lens_type}</span>
                  </div>
                  <Link 
                    to={validLenses[0].id === 'biofinity' ? '/biofinity' : `/produkt/${validLenses[0].id}`}
                    className="text-xs font-bold text-emerald-800 hover:text-emerald-950 underline shrink-0"
                  >
                    Zur Produktdetailseite →
                  </Link>
                </div>
              </div>
            )}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link 
                to="/vergleichskatalog" 
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition shadow-xs flex items-center justify-center gap-2"
              >
                <span>Zurück zum Katalog &amp; Linsen auswählen</span>
                <ArrowRightLeft className="w-4 h-4 text-emerald-400" />
              </Link>
              <Link 
                to="/biofinity-vs-air-optix" 
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition border border-slate-200"
              >
                Standardvergleich ansehen
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Title Header */}
            <div className="max-w-3xl mb-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
                <ArrowRightLeft className="w-3.5 h-3.5 text-emerald-600" />
                Objektiver Multi-Linsen-Vergleich ({lenses.length} Linsen)
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                {titleText}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                Rein sachlicher Parametervergleich ohne subjektive Besser-/Schlechter-Bewertung. Alle Spezifikationen beruhen auf verifizierten Herstellerdeklarationen.
                {isDynamic && <Link to="/vergleichskatalog" className="ml-2 text-emerald-600 hover:underline text-xs">← Weitere Linsen auswählen</Link>}
              </p>
            </div>

            {/* Inkompatibilitäts-Hinweis bei Versuch, Nicht-Linsen zu vergleichen */}
            {incompatibleProducts.length > 0 && (
              <div className="mb-6 p-4 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-900 flex items-start gap-3">
                <span className="font-bold text-amber-800 text-sm">ℹ</span>
                <div>
                  <span className="font-bold block mb-0.5">Kategorie-Hinweis:</span>
                  Folgende ausgewählte Produkte ({incompatibleProducts.map(p => p.product_name).join(', ')}) sind Pflegemittel oder Augentropfen und besitzen keine geometrischen Linsen-Spezifikationen. Sie wurden aus der Kontaktlinsen-Matrix ausgeschlossen, um fachlich irreführende Vergleiche zu verhindern.
                </div>
              </div>
            )}

            {/* Medical Disclaimer */}
            <MedicalDisclaimer className="mb-8" />

            {/* Comparison Table */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto shadow-xs mb-12">
              <div className="min-w-[640px]">
                {/* Table Header */}
                <div className="grid grid-cols-12 bg-slate-900 text-white p-4 sm:p-5 font-bold text-xs sm:text-sm items-center">
                  <div className="col-span-4 text-slate-300 font-semibold uppercase tracking-wider text-[11px]">
                    Spezifikation
                  </div>
                  <div className={`col-span-8 grid grid-cols-${lenses.length} gap-2`}>
                    {lenses.map((lens, i) => (
                      <div key={lens.id} className="text-left font-bold truncate">
                        <span className={i === 0 ? 'text-emerald-400' : i === 1 ? 'text-sky-400' : i === 2 ? 'text-amber-400' : 'text-purple-400'}>
                          {lens.product_name}
                        </span>
                        <span className="block text-[10px] text-slate-400 font-normal">
                          {lens.manufacturer}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Table Rows - Rein sachlich ohne Besser/Schlechter-Hervorhebung */}
                <div className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {comparisonAttributes.map((attr, idx) => (
                    <div key={idx} className="grid grid-cols-12 p-4 hover:bg-slate-50 transition items-center">
                      <div className="col-span-4 font-semibold text-slate-700 pr-3">
                        {attr.label}
                      </div>
                      <div className={`col-span-8 grid grid-cols-${lenses.length} gap-2`}>
                        {lenses.map((lens) => (
                          <div key={lens.id} className="text-slate-800 font-medium text-xs sm:text-sm">
                            {attr.getVal(lens)}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="grid grid-cols-12 p-4 sm:p-5 bg-slate-50 border-t border-slate-200 gap-3 items-center">
                  <div className="col-span-4 text-[11px] text-slate-500 font-medium hidden sm:block">
                    Online-Angebote bei Partnern:
                  </div>
                  <div className={`col-span-12 sm:col-span-8 grid grid-cols-${lenses.length} gap-2`}>
                    {lenses.map((lens) => (
                      <div key={lens.id}>
                        <a
                          href={getAmazonLink(lens.amazon_query, lens.asin)}
                          target="_blank"
                          rel={AFFILIATE_LINK_REL}
                          onClick={() => trackAffiliateClick(lens.product_name, 'partner', 'multi_comparison')}
                          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] py-2.5 px-2 rounded-xl flex items-center justify-center gap-1 shadow-xs transition"
                        >
                          <span className="truncate">{getAffiliateCtaLabel(lens)}</span>
                          <ExternalLink className="w-3 h-3 text-emerald-400 shrink-0" />
                        </a>
                      </div>
                    ))}
                  </div>
                  <div className="col-span-12 text-center text-[11px] text-slate-600 font-medium pt-1 leading-tight">
                    * Werbelink / Partnerlink (Amazon.de) · Orientierungspreis Stand 09/2026 · Tagesaktueller Preis auf Amazon.de einsehbar · Preise können abweichen
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Vertrauensbereich */}
        <TrustSection />

      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
