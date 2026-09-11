import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, ArrowLeft, ExternalLink, ShieldCheck, Check, ArrowRightLeft } from 'lucide-react';
import { getProductById } from '../data/products';
import MedicalDisclaimer from '../components/MedicalDisclaimer';
import TrustSection from '../components/TrustSection';
import ScrollToTop from '../components/ScrollToTop';
import AdvisorChatbot from '../components/AdvisorChatbot';
import { trackAffiliateClick } from '../utils/tracking';

const AMAZON_TAG = 'esstri-21';
const AMAZON_SUBID = 'optical.de-21';

const getAmazonLink = (query) => {
  return `https://www.amazon.de/s?k=${encodeURIComponent(query)}&tag=${AMAZON_TAG}&ascsubtag=${AMAZON_SUBID}`;
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
    { label: 'Online-Vergleichspreis', valA: `ab ${pA.price.toFixed(2)} € *`, valB: `ab ${pB.price.toFixed(2)} € *` },
    { label: 'Preis pro Einzellinse', valA: pA.price_per_lens, valB: pB.price_per_lens },
    { label: 'Kosten pro Tragetag (2 Linsen)', valA: pA.cost_per_day, valB: pB.cost_per_day },
    { label: 'Kosten pro Monat (2 Linsen)', valA: pA.cost_per_month, valB: pB.cost_per_month },
    { label: 'Zugeordnete Handelsmarken', valA: 'Apollo iWear Oxygen, Fielmann ActiMed (hohe Übereinstimmung)', valB: 'Fielmann Atmo (hohe Übereinstimmung)' }
  ];

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
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold text-slate-500 border-l border-slate-200 pl-2">Produktvergleich</span>
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
          <Link to="/monatslinsen-vergleich" className="hover:text-emerald-700">Monatslinsen</Link>
          <span>/</span>
          <span className="font-semibold text-slate-900">Biofinity vs. Air Optix Plus HydraGlyde</span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Title */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider mb-3">
            <ArrowRightLeft className="w-3.5 h-3.5 text-emerald-600" />
            Technischer Direktvergleich 1:1
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            CooperVision Biofinity vs. Alcon Air Optix Plus HydraGlyde
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            Zwei der meistgetragenen Silikon-Hydrogel-Monatslinsen im objektiven Parameter- und Preisvergleich.
          </p>
        </div>

        {/* Medical Disclaimer */}
        <MedicalDisclaimer className="mb-8" />

        {/* Side by Side Comparison Table */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs mb-10">
          
          <div className="grid grid-cols-12 bg-slate-100/90 border-b border-slate-200 p-4 font-bold text-xs sm:text-sm text-slate-800">
            <div className="col-span-4">Eigenschaft</div>
            <div className="col-span-4 text-center text-slate-900 font-extrabold">{pA.product_name}</div>
            <div className="col-span-4 text-center text-slate-900 font-extrabold">{pB.product_name}</div>
          </div>

          <div className="divide-y divide-slate-100 text-xs sm:text-sm">
            {comparisonRows.map((row, idx) => (
              <div key={idx} className="grid grid-cols-12 p-4 items-center hover:bg-slate-50/70">
                <div className="col-span-4 font-semibold text-slate-600">{row.label}</div>
                <div className={`col-span-4 text-center ${row.highlight === 'A' ? 'font-bold text-emerald-800 bg-emerald-50/60 py-1 rounded' : 'text-slate-800'}`}>
                  {row.valA}
                </div>
                <div className={`col-span-4 text-center ${row.highlight === 'B' ? 'font-bold text-emerald-800 bg-emerald-50/60 py-1 rounded' : 'text-slate-800'}`}>
                  {row.valB}
                </div>
              </div>
            ))}
          </div>

          {/* CTAs Row */}
          <div className="grid grid-cols-12 p-4 bg-slate-50 border-t border-slate-200 gap-4">
            <div className="col-span-4 text-xs text-slate-500 flex items-center font-medium">
              Aktuelle Händlerpreise:
            </div>
            <div className="col-span-4">
              <a
                href={getAmazonLink(pA.amazon_query)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackAffiliateClick(pA.product_name, 'amazon', 'comparison_page')}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-2xs transition"
              >
                <span>Biofinity prüfen *</span>
                <ExternalLink className="w-3 h-3 text-emerald-400" />
              </a>
            </div>
            <div className="col-span-4">
              <a
                href={getAmazonLink(pB.amazon_query)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackAffiliateClick(pB.product_name, 'amazon', 'comparison_page')}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-2xs transition"
              >
                <span>Air Optix prüfen *</span>
                <ExternalLink className="w-3 h-3 text-emerald-400" />
              </a>
            </div>
          </div>

        </div>

        {/* Sachliche Fazit-Box */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs mb-10 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
          <h2 className="font-extrabold text-base text-slate-900">Objektive Gegenüberstellung der Produkteigenschaften</h2>
          <p>
            <strong>CooperVision Biofinity</strong> verwendet das Material Comfilcon A mit natürlicher Benetzung ohne künstliche Beschichtungen und weist einen höheren Dk/t-Wert (160) sowie einen höheren Wassergehalt (48 %) auf. Preislich liegt die Linse im Referenzbereich meist etwas günstiger.
          </p>
          <p>
            <strong>Alcon Air Optix Plus HydraGlyde</strong> basiert auf Lotrafilcon B und setzt auf die patentierte SmartShield®-Oberflächentechnologie gegen Lipidablagerungen sowie die HydraGlyde®-Feuchtigkeitsmatrix.
          </p>
          <p className="text-xs text-slate-500 pt-2 border-t border-slate-100">
            Welches Material individuell besser mit dem körpereigenen Tränenfilm harmoniert, kann nur bei einer Spaltlampen-Untersuchung durch einen Augenarzt oder Augenoptiker beurteilt werden.
          </p>
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
