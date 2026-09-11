import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Eye, ArrowLeft, ShieldCheck, Check, ExternalLink, Calendar, Database, Layers } from 'lucide-react';
import { getProductById, PRODUCTS } from '../data/products';
import { EIGENMARKEN_DATABASE } from '../data/eigenmarken';
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

export default function ProductDetailPage({ productIdOverride }) {
  const { productId: routeId } = useParams();
  const productId = productIdOverride || routeId || 'biofinity';

  const product = getProductById(productId) || PRODUCTS[0];

  // Finde zugeordnete Handelsmarken für dieses Produkt
  const relatedEigenmarken = EIGENMARKEN_DATABASE.filter(item => item.matched_brand_product_id === product.id);

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
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold text-slate-500 border-l border-slate-200 pl-2">Produktdatenblatt</span>
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
          <Link to="/monatslinsen-vergleich" className="hover:text-emerald-700">{product.lens_type}</Link>
          <span>/</span>
          <span className="font-semibold text-slate-900">{product.product_name}</span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Title Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Verifiziertes Produktdatenblatt · {product.manufacturer}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {product.product_name}: Technische Spezifikationen &amp; Preisvergleich
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            Detaillierte Übersicht zu Material, Sauerstofftransmissibilität (Dk/t), Parametern und verifizierten Optiker-Handelsmarken.
          </p>
        </div>

        {/* Medical Disclaimer */}
        <MedicalDisclaimer className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Main Datasheet (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <h2 className="text-lg font-extrabold text-slate-900 mb-4">
                Technische Spezifikations-Matrix
              </h2>
              
              <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 text-xs">
                <div className="grid grid-cols-12 px-4 py-3 bg-slate-50 font-semibold text-slate-700">
                  <span className="col-span-5">Parameter</span>
                  <span className="col-span-7">Hersteller-Deklaration</span>
                </div>
                <div className="grid grid-cols-12 px-4 py-3">
                  <span className="col-span-5 text-slate-500 font-medium">Produktname</span>
                  <strong className="col-span-7 text-slate-900">{product.product_name}</strong>
                </div>
                <div className="grid grid-cols-12 px-4 py-3">
                  <span className="col-span-5 text-slate-500 font-medium">Hersteller</span>
                  <span className="col-span-7 text-slate-900">{product.manufacturer}</span>
                </div>
                <div className="grid grid-cols-12 px-4 py-3">
                  <span className="col-span-5 text-slate-500 font-medium">Linsentyp &amp; Tragerhythmus</span>
                  <span className="col-span-7 text-slate-900">{product.lens_type} ({product.replacement_schedule})</span>
                </div>
                <div className="grid grid-cols-12 px-4 py-3">
                  <span className="col-span-5 text-slate-500 font-medium">Material (USAN)</span>
                  <strong className="col-span-7 text-slate-900">{product.material}</strong>
                </div>
                <div className="grid grid-cols-12 px-4 py-3">
                  <span className="col-span-5 text-slate-500 font-medium">Sauerstofftransmissibilität (Dk/t)</span>
                  <strong className="col-span-7 text-slate-900">{product.dk_t} Dk/t</strong>
                </div>
                <div className="grid grid-cols-12 px-4 py-3">
                  <span className="col-span-5 text-slate-500 font-medium">Wassergehalt</span>
                  <span className="col-span-7 text-slate-900">{product.water_content}</span>
                </div>
                <div className="grid grid-cols-12 px-4 py-3">
                  <span className="col-span-5 text-slate-500 font-medium">Basiskurve (BC) / Durchmesser (DIA)</span>
                  <span className="col-span-7 text-slate-900">{product.base_curve} / {product.diameter}</span>
                </div>
                <div className="grid grid-cols-12 px-4 py-3">
                  <span className="col-span-5 text-slate-500 font-medium">Lieferbereich Dioptrien</span>
                  <span className="col-span-7 text-slate-900">{product.sphere_range}</span>
                </div>
                <div className="grid grid-cols-12 px-4 py-3">
                  <span className="col-span-5 text-slate-500 font-medium">Standard-Packungsgröße</span>
                  <span className="col-span-7 text-slate-900">{product.pack_size}</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-slate-50 rounded-xl text-xs text-slate-500 flex items-start gap-2">
                <Database className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Quelle:</strong> {product.source}.
                </span>
              </div>
            </div>

            {/* Zugeordnete Optiker-Handelsmarken */}
            {relatedEigenmarken.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                <h3 className="text-base font-extrabold text-slate-900 mb-2">
                  Bekannte Optiker-Handelsmarken mit übereinstimmenden Spezifikationen
                </h3>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  Nach den öffentlich zugänglichen Produktdaten stimmen die folgenden Optiker-Handelsmarken in Material, Geometrie und Dk/t mit {product.product_name} überein:
                </p>

                <div className="space-y-3">
                  {relatedEigenmarken.map(em => (
                    <div key={em.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                      <div>
                        <div className="font-bold text-sm text-slate-900">{em.optician_private_label}</div>
                        <div className="text-xs text-slate-500">Optikerkette: {em.optician_chain}</div>
                      </div>
                      <Link 
                        to={`/${em.slug}`}
                        className="text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-white border border-slate-300 px-3 py-1.5 rounded-lg shadow-2xs"
                      >
                        Abgleich ansehen →
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Kauf- &amp; Preisübersicht</span>
              <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                {product.product_name}
              </h3>
              
              <div className="mt-5 pt-4 border-t border-slate-100 space-y-2.5 text-xs">
                <div className="flex justify-between items-center text-slate-600">
                  <span>Packungsgröße:</span>
                  <span className="font-semibold text-slate-800">{product.pack_size}</span>
                </div>
                <div className="flex justify-between items-center text-slate-900 font-bold">
                  <span>Online-Vergleichspreis:</span>
                  <span className="text-emerald-700 font-extrabold text-lg">ab {product.price.toFixed(2)} € *</span>
                </div>
                <div className="text-[10px] text-slate-400 italic">
                  Packungsgröße/Händler beachten.
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Preis pro Einzellinse:</span>
                  <span className="font-semibold">{product.price_per_lens || '–'}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Kosten pro Tragetag (2 Linsen):</span>
                  <span className="font-semibold text-emerald-700">{product.cost_per_day || '–'}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Kosten pro Monat (2 Linsen):</span>
                  <span className="font-semibold text-slate-800">{product.cost_per_month || '–'}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <a
                  href={getAmazonLink(product.amazon_query)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAffiliateClick(product.product_name, 'amazon', 'product_detail_page')}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all group"
                >
                  <span>Preise bei Amazon prüfen *</span>
                  <ExternalLink className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
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

            {/* Dk/t Erklärung */}
            <div className="bg-slate-100 rounded-2xl p-5 border border-slate-200 text-xs text-slate-600 space-y-2 leading-relaxed">
              <h4 className="font-bold text-slate-900">Fachliche Erläuterung zu Dk/t:</h4>
              <p>
                Der Dk/t-Wert beschreibt die Sauerstofftransmissibilität einer Kontaktlinse. Er ist eine technische Kenngröße und sollte nicht isoliert zur Auswahl einer Kontaktlinse verwendet werden.
              </p>
            </div>

          </div>

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
