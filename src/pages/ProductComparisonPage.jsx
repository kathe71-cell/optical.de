import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Eye, ArrowLeft, ExternalLink, ShieldCheck, Check, ArrowRightLeft } from 'lucide-react';
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
  const ids = searchParams.get('ids');
  const idList = ids ? ids.split(',').filter(Boolean) : ['biofinity', 'airoptix-hydraglyde'];
  
  // Unterstützt 2 bis 4 Linsen im objektiven Vergleich
  const selectedLenses = idList
    .slice(0, 4)
    .map(id => getProductById(id))
    .filter(Boolean);

  // Fallback falls ungültige IDs
  const lenses = selectedLenses.length >= 2 
    ? selectedLenses 
    : [getProductById('biofinity'), getProductById('airoptix-hydraglyde')].filter(Boolean);

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

  const colWidthClass = lenses.length === 2 
    ? 'col-span-4' 
    : lenses.length === 3 
    ? 'col-span-2 sm:col-span-2 md:col-span-2' 
    : 'col-span-2';

  const titleText = lenses.map(l => l.product_name).join(' vs. ');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col justify-between">
      <MetaTags 
        title={`${titleText} im Vergleich | optical.de`}
        description={`Objektiver Parametervergleich von ${titleText}: Dk/t, Wassergehalt, Material und Preise ohne subjektives Scoring.`}
        canonical="https://www.optical.de/biofinity-vs-air-optix"
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
                Tagesaktuelle Online-Angebote:
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
              <div className="col-span-12 text-center text-[9px] text-slate-400 pt-1 leading-tight">
                * Werbelink / Partnerlink (Amazon.de) · Orientierungspreis Stand 09/2026 · Tagesaktueller Preis auf Amazon.de einsehbar · Preise können abweichen
              </div>
            </div>
          </div>
        </div>

        {/* Vertrauensbereich */}
        <TrustSection />

      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
