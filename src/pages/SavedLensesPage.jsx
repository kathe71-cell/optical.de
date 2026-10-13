import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Trash2, ArrowRight, ExternalLink, ShieldCheck, Eye, Layers, Search } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MetaTags from '../components/MetaTags';
import MedicalDisclaimer from '../components/MedicalDisclaimer';
import ScrollToTop from '../components/ScrollToTop';
import { useSavedLenses } from '../hooks/useSavedLenses';
import { PRODUCTS, getProductById } from '../data/products';
import { trackAffiliateClick } from '../utils/tracking';

const AMAZON_TAG = 'optical.de-21';
const AMAZON_SUBID = 'optical.de-21';

const getAmazonLink = (queryOrAsin, asin) => {
  if (asin) {
    return `https://www.amazon.de/dp/${asin}?tag=${AMAZON_TAG}`;
  }
  return `https://www.amazon.de/s?k=${encodeURIComponent(queryOrAsin)}&tag=${AMAZON_TAG}`;
};

export default function SavedLensesPage() {
  const { savedIds, removeSaved, clearAllSaved } = useSavedLenses();

  const savedProducts = savedIds
    .map((id) => getProductById(id))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col justify-between">
      <MetaTags 
        title="Meine gemerkten Kontaktlinsen | optical.de"
        description="Ihre lokal gespeicherten Kontaktlinsen für den schnellen und unkomplizierten Nachkauf. Ohne Login, direkt im Browser gespeichert."
        canonical="https://www.optical.de/meine-linsen"
      />
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-grow">
        
        {/* Breadcrumb Navigation */}
        <div className="text-xs text-slate-500 flex items-center gap-2 mb-6">
          <Link to="/" className="hover:text-emerald-700">Startseite</Link>
          <span>/</span>
          <span className="font-semibold text-slate-900">Meine Linsen</span>
        </div>

        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Bookmark className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
              Lokal gemerkt
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Meine gemerkten Linsen
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl leading-relaxed">
              Hier finden Sie Ihre gewohnten Kontaktlinsen mit Packungsgrößen, Parametern und direkten Links zur Nachbestellung.
            </p>
          </div>

          {savedProducts.length > 0 && (
            <button
              onClick={clearAllSaved}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-rose-600 transition px-3 py-2 rounded-lg border border-slate-200 hover:border-rose-300 bg-white"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Alle entfernen</span>
            </button>
          )}
        </div>

        {/* Hinweis zur lokalen Speicherung (Transparenz & Datenschutz) */}
        <div className="bg-slate-100 border border-slate-200 rounded-xl p-4 mb-8 text-xs text-slate-600 flex items-start gap-3">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-900 block mb-0.5">100 % lokaler Schutz ohne Registrierung</span>
            Ihre Merkliste wird ausschließlich in Ihrem Browser (`localStorage`) gesichert. Wir legen kein Nutzerkonto an und übertragen keine persönlichen Linsendaten an Dritte.
          </div>
        </div>

        {/* Leerzustand */}
        {savedProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center max-w-xl mx-auto shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <Bookmark className="w-7 h-7" />
            </div>
            <h2 className="text-lg font-extrabold text-slate-900 mb-2">
              Noch keine Kontaktlinsen gemerkt
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6">
              Suchen Sie Ihre gewohnten Kontaktlinsen im Vergleichskatalog oder über die Suchfunktion und klicken Sie auf <strong>„Linse merken“</strong>, um sie hier dauerhaft griffbereit zu haben.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/vergleichskatalog"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-xs transition"
              >
                <Layers className="w-4 h-4" />
                <span>Kontaktlinsen finden</span>
              </Link>
              <Link
                to="/eigenmarken-decoder"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-5 py-3 rounded-xl transition"
              >
                <span>Eigenmarke prüfen</span>
              </Link>
            </div>
          </div>
        ) : (
          /* Liste der gemerkten Produkte */
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-bold text-slate-500 uppercase">{p.manufacturer}</span>
                      <button
                        onClick={() => removeSaved(p.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded transition"
                        title="Aus Merkliste entfernen"
                        aria-label={`${p.product_name} aus Merkliste entfernen`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <h2 className="text-lg font-black text-slate-900 leading-snug">
                      <Link to={`/${p.id === 'biofinity' ? 'biofinity' : `produkt/${p.id}`}`} className="hover:text-emerald-700 transition">
                        {p.product_name}
                      </Link>
                    </h2>

                    <div className="mt-2 text-xs text-slate-500 flex items-center justify-between">
                      <span>Typ / Rhythmus:</span>
                      <span className="font-semibold text-slate-800">{p.lens_type}</span>
                    </div>

                    <div className="mt-1 text-xs text-slate-500 flex items-center justify-between">
                      <span>Standardpackung:</span>
                      <strong className="text-slate-800 font-semibold">{p.pack_size}</strong>
                    </div>

                    {/* Parameter */}
                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                      <div className="flex justify-between">
                        <span>Material:</span>
                        <strong className="text-slate-900 font-semibold">{p.material}</strong>
                      </div>
                      {p.dk_t && (
                        <div className="flex justify-between">
                          <span>Sauerstofffluss (Dk/t):</span>
                          <strong className="text-slate-900 font-semibold">{p.dk_t} Dk/t</strong>
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

                  {/* Preisteil & Nachkauf-Button */}
                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 mb-3 space-y-1 text-xs">
                      <div className="flex items-baseline justify-between">
                        <span className="text-[11px] text-slate-600 font-medium">Beispielpreis auf Amazon.de:</span>
                        <span className="text-base font-extrabold text-slate-900">ca. {p.price.toFixed(2)} € *</span>
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Tagesaktueller Händlerpreis auf Amazon.de einsehbar
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-600 pt-1 border-t border-slate-200/60">
                        <span>Kosten pro Tragetag (2 Linsen):</span>
                        <span className="font-semibold text-emerald-700">{p.cost_per_day || '–'}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        to={`/${p.id === 'biofinity' ? 'biofinity' : `produkt/${p.id}`}`}
                        className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] py-2.5 px-2 rounded-xl text-center transition"
                      >
                        Datenblatt
                      </Link>
                      <a
                        href={getAmazonLink(p.amazon_query, p.asin)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackAffiliateClick(p.product_name, 'amazon', 'saved_lenses_page')}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] py-2.5 px-2 rounded-xl flex items-center justify-center gap-1 shadow-2xs transition"
                      >
                        <span>Angebote bei Amazon *</span>
                        <ExternalLink className="w-3 h-3 text-emerald-400" />
                      </a>
                    </div>

                    <div className="text-center mt-2 text-[9px] text-slate-400 leading-tight">
                      * Werbelink / Partnerlink (Amazon.de) · Beispielpreis Stand 09/2026 · Tagesaktueller Preis auf Amazon.de einsehbar · Preise können abweichen
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <MedicalDisclaimer />
            </div>
          </div>
        )}

      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
