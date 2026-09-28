import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Eye, ArrowLeft, ShieldCheck, Check, ExternalLink, Database, RotateCcw, Scale } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MetaTags from '../components/MetaTags';
import { getEigenmarkeBySlug, EIGENMARKEN_DATABASE, calculateOpticianCosts } from '../data/eigenmarken';
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

export default function PrivateLabelLanding({ slugOverride }) {
  const { slug: routeSlug } = useParams();
  const slug = slugOverride || routeSlug;

  const entry = getEigenmarkeBySlug(slug) || EIGENMARKEN_DATABASE[0];
  const matchedProduct = getProductById(entry.matched_brand_product_id);

  const [customPriceInput, setCustomPriceInput] = useState('');

  useEffect(() => {
    setCustomPriceInput('');
  }, [entry?.id]);

  const currentOpticianCosts = calculateOpticianCosts(entry, customPriceInput);
  const opticianPrice = currentOpticianCosts?.price || null;
  const brandPrice = matchedProduct?.price;
  const samePackCount = entry.optician_pack_count === matchedProduct?.pack_count;
  const savingsEuro = (opticianPrice && brandPrice && samePackCount) ? (opticianPrice - brandPrice).toFixed(2) : null;
  const savingsPercent = (opticianPrice && brandPrice && samePackCount) ? Math.round(((opticianPrice - brandPrice) / opticianPrice) * 100) : null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col justify-between">
      <MetaTags 
        title={`${entry.optician_private_label} (${entry.optician_chain}) – Original-Linse | optical.de`}
        description={`Welches Markenprodukt steckt hinter ${entry.optician_private_label}? Baugleich mit ${entry.original_brand_name} (${entry.brand_manufacturer}). Verifizierte Parameter & Preisvergleich.`}
        canonical={`https://www.optical.de/${slug}`}
      />
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-grow">
        
        {/* Breadcrumb Navigation */}
        <div className="text-xs text-slate-500 flex items-center gap-2 mb-6">
          <Link to="/" className="hover:text-emerald-700">Startseite</Link>
          <span>/</span>
          <Link to="/eigenmarken-decoder" className="hover:text-emerald-700">Eigenmarken-Decoder</Link>
          <span>/</span>
          <span className="font-semibold text-slate-900">{entry.optician_private_label}</span>
        </div>

        {/* Title Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Eigenmarken-Dossier · {entry.optician_chain}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            {entry.optician_private_label}: Original-Hersteller &amp; Preisvergleich
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            Detaillierte Gegenüberstellung der Optiker-Handelsmarke {entry.optician_private_label} mit dem baugleichen Markenprodukt {entry.original_brand_name}.
          </p>
        </div>

        {/* Medical Disclaimer */}
        <MedicalDisclaimer className="mb-8" />

        {/* 1:1 Parameter Match Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <h2 className="text-lg font-black text-slate-900 mb-4">
                1:1 Parameter-Vergleich
              </h2>
              
              <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 text-xs">
                <div className="grid grid-cols-12 px-4 py-3 bg-slate-50 font-semibold text-slate-700">
                  <span className="col-span-4">Parameter</span>
                  <span className="col-span-4">{entry.optician_private_label} ({entry.optician_chain})</span>
                  <span className="col-span-4">{entry.original_brand_name} ({entry.brand_manufacturer})</span>
                </div>
                <div className="grid grid-cols-12 px-4 py-3">
                  <span className="col-span-4 text-slate-500 font-medium">Linsentyp</span>
                  <span className="col-span-4 font-semibold text-slate-800">{entry.lens_type}</span>
                  <span className="col-span-4 font-semibold text-emerald-700">{entry.lens_type}</span>
                </div>
                <div className="grid grid-cols-12 px-4 py-3">
                  <span className="col-span-4 text-slate-500 font-medium">Material (USAN)</span>
                  <span className="col-span-4 font-semibold text-slate-800">{entry.material}</span>
                  <span className="col-span-4 font-semibold text-emerald-700">{entry.material}</span>
                </div>
                <div className="grid grid-cols-12 px-4 py-3">
                  <span className="col-span-4 text-slate-500 font-medium">Sauerstofffluss (Dk/t)</span>
                  <span className="col-span-4 font-semibold text-slate-800">{entry.dk_t} Dk/t</span>
                  <span className="col-span-4 font-semibold text-emerald-700">{entry.dk_t} Dk/t</span>
                </div>
                <div className="grid grid-cols-12 px-4 py-3">
                  <span className="col-span-4 text-slate-500 font-medium">Wassergehalt</span>
                  <span className="col-span-4 font-semibold text-slate-800">{entry.water_content}</span>
                  <span className="col-span-4 font-semibold text-emerald-700">{entry.water_content}</span>
                </div>
                <div className="grid grid-cols-12 px-4 py-3">
                  <span className="col-span-4 text-slate-500 font-medium">Geometrie (BC / DIA)</span>
                  <span className="col-span-4 font-semibold text-slate-800">{entry.base_curve} / {entry.diameter}</span>
                  <span className="col-span-4 font-semibold text-emerald-700">{entry.base_curve} / {entry.diameter}</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>
                  <strong>Verifizierter Abgleich:</strong> Chemische Zusammensetzung, Fertigungsverfahren und Parameter sind identisch.
                </span>
              </div>
            </div>

            {/* Datenquelle */}
            <div className="bg-slate-100 rounded-2xl p-5 border border-slate-200 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <Database className="w-4 h-4 text-emerald-600" />
                <span>Dokumentation &amp; Nachweis</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                <strong>Quellentyp:</strong> {entry.source_type}
              </p>
              <p className="text-[11px] leading-relaxed">
                <strong>Nachweis:</strong> {entry.source_name} ({entry.mapping_source})
              </p>
            </div>
          </div>

          {/* Sidebar: Nachkauf-Box */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Original-Markenprodukt
              </span>
              <h3 className="text-xl font-black text-slate-950 mt-1">
                {entry.original_brand_name}
              </h3>

              <div className="mt-5 pt-4 border-t border-slate-100 space-y-2.5 text-xs">
                <div className="flex justify-between items-center text-slate-600">
                  <span>Hersteller:</span>
                  <span className="font-semibold text-slate-800">{entry.brand_manufacturer}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Standardpackung:</span>
                  <span className="font-semibold text-slate-800">{matchedProduct?.pack_size || `${entry.optician_pack_count}er Packung`}</span>
                </div>
                <div className="flex justify-between items-baseline text-slate-900">
                  <span className="text-xs text-slate-600 font-medium">Beispielpreis auf Amazon.de:</span>
                  <span className="text-emerald-700 font-black text-lg">
                    ca. {matchedProduct?.price ? matchedProduct.price.toFixed(2) : '–'} € *
                  </span>
                </div>
                <div className="text-[10px] text-slate-500">
                  Tagesaktueller Händlerpreis auf Amazon.de einsehbar
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
                <a
                  href={getAmazonLink(entry.brand_amazon_query, entry.asin)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAffiliateClick(entry.original_brand_name, 'amazon', 'private_label_page')}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xs transition group"
                >
                  <span>Angebote bei Amazon suchen *</span>
                  <ExternalLink className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
                </a>

                {matchedProduct && (
                  <Link
                    to={`/${matchedProduct.id === 'biofinity' ? 'biofinity' : matchedProduct.id}`}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2.5 px-3 rounded-xl block text-center transition"
                  >
                    Vollständiges Datenblatt öffnen
                  </Link>
                )}

                <div className="text-center pt-1 text-[9px] text-slate-400 leading-tight">
                  * Werbelink / Partnerlink (Amazon.de) · Beispielpreis Stand 09/2026 · Tagesaktueller Preis auf Amazon.de einsehbar · Preise können abweichen
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Transparenz-Standard */}
        <TrustSection />

      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
