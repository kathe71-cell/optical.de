import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, ArrowLeft, ExternalLink, ShieldCheck, Check, ArrowRightLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MetaTags from '../components/MetaTags';
import { getProductById } from '../data/products';
import MedicalDisclaimer from '../components/MedicalDisclaimer';
import TrustSection from '../components/TrustSection';
import ScrollToTop from '../components/ScrollToTop';
import { trackAffiliateClick } from '../utils/tracking';

const AMAZON_TAG = 'optical.de-21';
const AMAZON_SUBID = 'optical.de-21';

const getAmazonLink = (queryOrAsin, asin) => {
  if (asin) {
    return `https://www.amazon.de/dp/${asin}?tag=${AMAZON_TAG}`;
  }
  return `https://www.amazon.de/s?k=${encodeURIComponent(queryOrAsin)}&tag=${AMAZON_TAG}`;
};

export default function ProductComparisonPage() {
  const pA = getProductById('biofinity');
  const pB = getProductById('airoptix-hydraglyde');

  const comparisonRows = [
    { label: 'Hersteller', valA: pA.manufacturer, valB: pB.manufacturer },
    { label: 'Linsentyp & Rhythmus', valA: pA.lens_type, valB: pB.lens_type },
    { label: 'Linsenmaterial', valA: pA.material, valB: pB.material },
    { label: 'Sauerstofftransmissibilität (Dk/t)', valA: `${pA.dk_t} Dk/t`, valB: `${pB.dk_t} Dk/t`, highlight: pA.dk_t > pB.dk_t ? 'A' : 'B' },
    { label: 'Wassergehalt', valA: pA.water_content, valB: pB.water_content, highlight: parseInt(pA.water_content) > parseInt(pB.water_content) ? 'A' : 'B' },
    { label: 'Basiskurve (BC)', valA: pA.base_curve, valB: pB.base_curve },
    { label: 'Durchmesser (DIA)', valA: pA.diameter, valB: pB.diameter },
    { label: 'Packungsgröße', valA: pA.pack_size, valB: pB.pack_size },
    { label: 'Orientierungspreis / UVP', valA: `ca. ${pA.price.toFixed(2)} € *`, valB: `ca. ${pB.price.toFixed(2)} € *` },
    { label: 'Preis pro Einzellinse', valA: pA.price_per_lens, valB: pB.price_per_lens },
    { label: 'Kosten pro Tragetag (2 Linsen)', valA: pA.cost_per_day, valB: pB.cost_per_day },
    { label: 'Kosten pro Monat (2 Linsen)', valA: pA.cost_per_month, valB: pB.cost_per_month },
    { label: 'Zugeordnete Handelsmarken', valA: 'Apollo iWear Oxygen, Fielmann ActiMed', valB: 'Fielmann Atmo' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col justify-between">
      <MetaTags 
        title="Biofinity vs. Air Optix Plus HydraGlyde im Vergleich | optical.de"
        description="Direkter 1:1 Parametervergleich zwischen CooperVision Biofinity und Alcon Air Optix Plus HydraGlyde: Dk/t, Wassergehalt, Material und Preise."
        canonical="https://www.optical.de/biofinity-vs-air-optix"
      />
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-grow">
        
        {/* Breadcrumb Navigation */}
        <div className="text-xs text-slate-500 flex items-center gap-2 mb-6">
          <Link to="/" className="hover:text-emerald-700">Startseite</Link>
          <span>/</span>
          <Link to="/monatslinsen-vergleich" className="hover:text-emerald-700">Monatslinsen</Link>
          <span>/</span>
          <span className="font-semibold text-slate-900">Biofinity vs. Air Optix Plus HydraGlyde</span>
        </div>

        {/* Title Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
            <ArrowRightLeft className="w-3.5 h-3.5 text-emerald-600" />
            Objektiver 1:1 Produktvergleich
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Biofinity vs. Air Optix Plus HydraGlyde
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            Direkter Vergleich zweier marktführender Monatslinsen aus Silikon-Hydrogel. Gegenüberstellung von Material, Sauerstoffdurchlässigkeit und Preisen.
          </p>
        </div>

        {/* Medical Disclaimer */}
        <MedicalDisclaimer className="mb-8" />

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs mb-12">
          <div className="grid grid-cols-12 bg-slate-900 text-white p-4 sm:p-6 font-bold text-sm sm:text-base items-center">
            <div className="col-span-4 text-slate-300 font-semibold text-xs sm:text-sm">Parameter</div>
            <div className="col-span-4 text-emerald-400">CooperVision Biofinity</div>
            <div className="col-span-4 text-sky-400">Air Optix HydraGlyde</div>
          </div>

          <div className="divide-y divide-slate-100 text-xs sm:text-sm">
            {comparisonRows.map((row, idx) => (
              <div key={idx} className="grid grid-cols-12 p-4 hover:bg-slate-50 transition items-center">
                <div className="col-span-4 font-semibold text-slate-600 pr-2">{row.label}</div>
                <div className={`col-span-4 pr-2 ${row.highlight === 'A' ? 'font-black text-emerald-800' : 'text-slate-800'}`}>
                  {row.valA}
                </div>
                <div className={`col-span-4 ${row.highlight === 'B' ? 'font-black text-emerald-800' : 'text-slate-800'}`}>
                  {row.valB}
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="grid grid-cols-12 p-4 sm:p-6 bg-slate-50 border-t border-slate-200 gap-3">
            <div className="col-span-4 hidden sm:block"></div>
            <div className="col-span-6 sm:col-span-4">
              <a
                href={getAmazonLink(pA.amazon_query, pA.asin)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackAffiliateClick(pA.product_name, 'amazon', 'comparison_page')}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition"
              >
                <span>Biofinity suchen *</span>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              </a>
            </div>
            <div className="col-span-6 sm:col-span-4">
              <a
                href={getAmazonLink(pB.amazon_query, pB.asin)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackAffiliateClick(pB.product_name, 'amazon', 'comparison_page')}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition"
              >
                <span>Air Optix suchen *</span>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              </a>
            </div>
            <div className="col-span-12 text-center text-[9px] text-slate-400 pt-1 leading-tight">
              * Werbelink / Partnerlink (Amazon.de) · Tatsächlicher Händlerpreis auf Amazon.de einsehbar
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
