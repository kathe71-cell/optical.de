import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  Eye, 
  ArrowLeft, 
  ShieldCheck, 
  Check, 
  ExternalLink, 
  Bookmark, 
  Calendar, 
  Database, 
  Layers, 
  Sparkles,
  Info
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MetaTags from '../components/MetaTags';
import MedicalDisclaimer from '../components/MedicalDisclaimer';
import TrustSection from '../components/TrustSection';
import ScrollToTop from '../components/ScrollToTop';
import { getProductById, PRODUCTS } from '../data/products';
import { EIGENMARKEN_DATABASE } from '../data/eigenmarken';
import { useSavedLenses } from '../hooks/useSavedLenses';
import { trackAffiliateClick, trackProductView } from '../utils/tracking';
import { getProductAffiliateUrl } from '../utils/affiliate';

export default function ProductDetailPage({ productIdOverride }) {
  const { productId: routeId } = useParams();
  const productId = productIdOverride || routeId || 'biofinity';

  const product = getProductById(productId) || PRODUCTS[0];
  const { isSaved, toggleSave } = useSavedLenses();
  const saved = isSaved(product.id);

  // Finde zugeordnete Handelsmarken für dieses Produkt
  const relatedEigenmarken = EIGENMARKEN_DATABASE.filter(item => item.matched_brand_product_id === product.id);

  useEffect(() => {
    trackProductView(product.id, product.product_name);
  }, [product.id, product.product_name]);

  const canonicalUrl = `https://www.optical.de/${product.id === 'biofinity' ? 'biofinity' : `produkt/${product.id}`}`;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col justify-between">
      <MetaTags 
        title={`${product.product_name} – Spezifikationen & Preisvergleich | optical.de`}
        description={`${product.product_name} von ${product.manufacturer}: Verifizierte Spezifikationen (Dk/t ${product.dk_t || '-'}, ${product.material}), Packungsgröße ${product.pack_size} und Angebote zum Nachkauf.`}
        canonical={canonicalUrl}
        ogType="product"
      />
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-grow">
        
        {/* Breadcrumb Navigation */}
        <div className="text-xs text-slate-500 flex items-center gap-2 mb-6">
          <Link to="/" className="hover:text-emerald-700">Startseite</Link>
          <span>/</span>
          <Link to="/vergleichskatalog" className="hover:text-emerald-700">Katalog</Link>
          <span>/</span>
          <span className="font-semibold text-slate-900">{product.product_name}</span>
        </div>

        {/* Title & Schnell-Aktion Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              {product.data_status === 'VERIFIED' ? 'Verifizierte Hersteller-Spezifikationen' : 'Strukturierte Produktdaten'} · {product.manufacturer}
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              {product.product_name}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Herstellerangaben zu Material, Sauerstoffdurchlässigkeit, Geometrie und zugeordneten Optiker-Eigenmarken.
            </p>
          </div>

          {/* Linse merken Button */}
          <button
            onClick={() => toggleSave(product.id)}
            className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold border transition shadow-xs ${
              saved 
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800' 
                : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50 hover:border-slate-400'
            }`}
            aria-label={`${product.product_name} ${saved ? 'aus Merkliste entfernen' : 'merken'}`}
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-emerald-600 text-emerald-600' : 'text-slate-400'}`} />
            <span>{saved ? 'Linse gemerkt' : 'Linse merken'}</span>
          </button>
        </div>

        {/* Medical Disclaimer */}
        <MedicalDisclaimer className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Main Datasheet (8 Spalten) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Technische Matrix */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <h2 className="text-lg font-black text-slate-900 mb-4">
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
                  <span className="col-span-7 font-semibold text-slate-800">{product.manufacturer}</span>
                </div>
                <div className="grid grid-cols-12 px-4 py-3">
                  <span className="col-span-5 text-slate-500 font-medium">Linsentyp / Rhythmus</span>
                  <span className="col-span-7 font-semibold text-slate-800">{product.lens_type} ({product.replacement_schedule})</span>
                </div>
                <div className="grid grid-cols-12 px-4 py-3">
                  <span className="col-span-5 text-slate-500 font-medium">Material (USAN)</span>
                  <span className="col-span-7 font-semibold text-slate-800">{product.material}</span>
                </div>
                {product.dk_t && (
                  <div className="grid grid-cols-12 px-4 py-3">
                    <span className="col-span-5 text-slate-500 font-medium">Sauerstofffluss (Dk/t)</span>
                    <strong className="col-span-7 text-emerald-700">{product.dk_t} Dk/t</strong>
                  </div>
                )}
                {product.water_content && (
                  <div className="grid grid-cols-12 px-4 py-3">
                    <span className="col-span-5 text-slate-500 font-medium">Wassergehalt</span>
                    <span className="col-span-7 font-semibold text-slate-800">{product.water_content}</span>
                  </div>
                )}
                {product.base_curve && (
                  <div className="grid grid-cols-12 px-4 py-3">
                    <span className="col-span-5 text-slate-500 font-medium">Basiskurve (BC)</span>
                    <span className="col-span-7 font-semibold text-slate-800">{product.base_curve}</span>
                  </div>
                )}
                {product.diameter && (
                  <div className="grid grid-cols-12 px-4 py-3">
                    <span className="col-span-5 text-slate-500 font-medium">Durchmesser (DIA)</span>
                    <span className="col-span-7 font-semibold text-slate-800">{product.diameter}</span>
                  </div>
                )}
                {product.sphere_range && (
                  <div className="grid grid-cols-12 px-4 py-3">
                    <span className="col-span-5 text-slate-500 font-medium">Stärkenbereich (Sphäre)</span>
                    <span className="col-span-7 font-semibold text-slate-800">{product.sphere_range}</span>
                  </div>
                )}
              </div>

              {/* Nachprüfbare Datenquelle */}
              <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block">Verifizierte Datenquelle:</span>
                  <span>{product.source} ({product.source_type})</span>
                </div>
                {product.source_url && (
                  <a
                    href={product.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1"
                  >
                    <span>Herstellerseite</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>

            {/* Zugeordnete Eigenmarken / Handelsmarken */}
            {relatedEigenmarken.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-base font-black text-slate-900">
                    Bekannte Optiker-Handelsmarken zu {product.product_name}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  Die folgenden Eigenmarken großer Optikerketten weisen eine nachgewiesene Übereinstimmung in Material ({product.material}) und Geometrie auf:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {relatedEigenmarken.map((em) => (
                    <Link
                      key={em.id}
                      to={`/${em.slug}`}
                      className="p-3.5 bg-slate-50 hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-300 rounded-xl transition group"
                    >
                      <div className="text-[10px] font-bold text-slate-400 uppercase">{em.optician_chain}</div>
                      <div className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition">
                        {em.optician_private_label} →
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">
                        Einstufung: {em.confidence_label || 'Hohe Übereinstimmung'}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Sidebar / Kauf- & Nachkauf-Box (4 Spalten) */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Verfügbarkeit &amp; Nachkauf
              </span>
              <h3 className="text-xl font-black text-slate-950 mt-1">
                {product.product_name}
              </h3>
              
              <div className="mt-5 pt-4 border-t border-slate-100 space-y-2.5 text-xs">
                <div className="flex justify-between items-center text-slate-600">
                  <span>Standardpackung:</span>
                  <span className="font-semibold text-slate-800">{product.pack_size}</span>
                </div>
                
                <div className="flex justify-between items-baseline text-slate-900">
                  <span className="text-xs text-slate-600 font-medium">Beispielpreis auf Amazon.de:</span>
                  <span className="text-emerald-700 font-black text-xl">ca. {product.price.toFixed(2)} € *</span>
                </div>

                <div className="text-[10px] text-slate-500">
                  Tagesaktueller Händlerpreis auf Amazon.de einsehbar
                </div>

                <div className="flex justify-between items-center text-slate-600 pt-2 border-t border-slate-100">
                  <span>Preis pro Einzellinse:</span>
                  <span className="font-semibold text-slate-800">{product.price_per_lens || '–'}</span>
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

              {/* Kauf-Button */}
              <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
                <a
                  href={getProductAffiliateUrl(product)}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  onClick={() => trackAffiliateClick(product.product_name, 'amazon', 'product_detail_sidebar')}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all group"
                >
                  <span>Produkt bei Amazon ansehen *</span>
                  <ExternalLink className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
                </a>

                <button
                  type="button"
                  onClick={() => toggleSave(product.id)}
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5 ${
                    saved 
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800' 
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-emerald-600 text-emerald-600' : ''}`} />
                  <span>{saved ? 'In „Meine Linsen“ gemerkt' : 'Für späteren Nachkauf merken'}</span>
                </button>

                {saved && (
                  <Link
                    to="/meine-linsen"
                    className="block text-center text-[11px] text-emerald-700 hover:text-emerald-800 font-semibold underline py-0.5"
                  >
                    Im Nachkauf-Planer Vorrat &amp; Kalender-Erinnerung einstellen →
                  </Link>
                )}

                <div className="text-center space-y-0.5 pt-1">
                  <span className="text-[10px] text-slate-500 block font-medium">
                    Amazon-Partnerlink (Amazon.de) · Beispielpreis Stand 09/2026 · Tagesaktueller Preis auf Amazon.de einsehbar · Preise können abweichen
                  </span>
                  <span className="text-[9px] text-slate-400 block font-medium">
                    * Werbelink / Partnerlink
                  </span>
                </div>
              </div>
            </div>

            {/* Dk/t Fachhinweis */}
            <div className="bg-slate-100 rounded-2xl p-5 border border-slate-200 text-xs text-slate-600 space-y-2 leading-relaxed">
              <h4 className="font-bold text-slate-900">Fachliche Erläuterung zu Dk/t:</h4>
              <p>
                Der Dk/t-Wert beschreibt die Sauerstofftransmissibilität einer Kontaktlinse bei definierter Mittendicke (-3.00 dpt). Er ist eine wichtige technische Kenngröße, sollte jedoch nicht als alleiniges Wechselkriterium herangezogen werden.
              </p>
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
