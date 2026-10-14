import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bookmark, 
  Trash2, 
  ArrowRight, 
  ExternalLink, 
  ShieldCheck, 
  Layers, 
  Calendar, 
  Clock, 
  Bell, 
  Download, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MetaTags from '../components/MetaTags';
import MedicalDisclaimer from '../components/MedicalDisclaimer';
import ScrollToTop from '../components/ScrollToTop';
import RefillAssistantModal from '../components/RefillAssistantModal';
import { useSavedLenses } from '../hooks/useSavedLenses';
import { useRefillConfigs } from '../hooks/useRefillConfigs';
import { PRODUCTS, getProductById } from '../data/products';
import { getProductAffiliateUrl, getAffiliateCtaLabel, AFFILIATE_LINK_REL } from '../utils/affiliate';
import { generateIcsCalendarEvent, downloadIcsFile } from '../utils/refillCalculator';
import { trackAffiliateClick, trackEvent } from '../utils/tracking';

export default function SavedLensesPage() {
  const { savedIds, removeSaved, clearAllSaved } = useSavedLenses();
  const { configs, getConfig, saveConfig, removeConfig } = useRefillConfigs();

  const [activeModalProduct, setActiveModalProduct] = useState(null);

  const savedProducts = savedIds
    .map((id) => getProductById(id))
    .filter(Boolean);

  const handleExportIcsDirect = (product, config) => {
    if (!config || !config.refillDate) return;
    const ics = generateIcsCalendarEvent({
      productName: product.product_name,
      refillDate: config.refillDate,
      targetUrl: 'https://www.optical.de/meine-linsen'
    });
    downloadIcsFile(ics, `nachkauf-${product.id}.ics`);
    trackEvent('calendar_reminder_exported', { product_id: product.id });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col justify-between">
      <MetaTags 
        title="Meine Linsen & Nachkauf-Planer | optical.de"
        description="Ihre lokal gemerkten Kontaktlinsen mit individuellem Vorratsrechner, Kalenderexport und Erinnerung für den rechtzeitigen Nachkauf."
        canonical="https://www.optical.de/meine-linsen"
      />
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-grow">
        
        {/* Breadcrumb Navigation */}
        <div className="text-xs text-slate-500 flex items-center gap-2 mb-6">
          <Link to="/" className="hover:text-emerald-700">Startseite</Link>
          <span>/</span>
          <span className="font-semibold text-slate-900">Meine Linsen &amp; Nachkauf-Planer</span>
        </div>

        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Bookmark className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
              Lokal gemerkt · Nachkauf-Assistent
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Meine Linsen &amp; Nachkauf-Planer
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Verwalten Sie Ihre gewohnten Kontaktlinsen, berechnen Sie die Reichweite Ihres Vorrats und exportieren Sie rechtzeitige Erinnerungstermine direkt in Ihren Kalender.
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

        {/* Transparenz-Banner */}
        <div className="bg-slate-100 border border-slate-200 rounded-xl p-4 mb-8 text-xs text-slate-600 flex items-start gap-3">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-900 block mb-0.5">100 % lokale Speicherung ohne Registrierung</span>
            Ihre Merkliste und Nachkaufpläne werden ausschließlich in Ihrem Browser (`localStorage`) gespeichert. Es werden keine sensiblen Dioptrienwerte oder individuellen Daten an externe Server übertragen.
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
              Suchen Sie Ihre gewohnten Kontaktlinsen im Vergleichskatalog oder über die Suchfunktion und klicken Sie auf <strong>„Linse merken“</strong>, um den Nachkauf-Planer zu aktivieren.
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
              {savedProducts.map((p) => {
                const config = getConfig(p.id);
                const hasPlan = Boolean(config && config.refillDate);

                return (
                  <div
                    key={p.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-bold text-slate-500 uppercase">{p.manufacturer}</span>
                        <button
                          onClick={() => {
                            removeSaved(p.id);
                            removeConfig(p.id);
                          }}
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

                      {/* NACHKAUF-ASSISTENT STATUS CARD */}
                      <div className="mt-4 pt-3 border-t border-slate-100">
                        {hasPlan ? (
                          <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-3.5 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-800">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                Nachkauf-Plan aktiv
                              </span>
                              <button
                                type="button"
                                onClick={() => setActiveModalProduct(p)}
                                className="text-[10px] text-emerald-700 underline font-bold hover:text-emerald-900"
                              >
                                Bearbeiten
                              </button>
                            </div>

                            <div className="text-xs space-y-0.5 text-slate-700">
                              <div className="flex justify-between">
                                <span className="text-slate-500">Reichweite:</span>
                                <strong className="font-bold">ca. {config.minDays} Tage</strong>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-500">Nachkauf ab:</span>
                                <strong className="font-extrabold text-slate-900">
                                  {new Date(config.refillDate).toLocaleDateString('de-DE')}
                                </strong>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleExportIcsDirect(p, config)}
                              className="w-full mt-2 inline-flex items-center justify-center gap-1.5 py-1.5 px-2 bg-white border border-emerald-300 hover:bg-emerald-100/50 rounded-lg text-[11px] font-bold text-emerald-900 transition"
                            >
                              <Download className="w-3.5 h-3.5 text-emerald-700" />
                              <span>Kalendereintrag (.ics)</span>
                            </button>
                          </div>
                        ) : (
                          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center space-y-2">
                            <span className="text-xs text-slate-600 block">
                              Vorrat planen &amp; rechtzeitig erinnert werden?
                            </span>
                            <button
                              type="button"
                              onClick={() => setActiveModalProduct(p)}
                              className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition shadow-xs"
                            >
                              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Nachkauf-Assistent aktivieren</span>
                            </button>
                          </div>
                        )}
                      </div>

                    </div>

                    {/* Preisteil & Nachkauf-Button */}
                    <div className="mt-5 pt-4 border-t border-slate-100">
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 mb-3 space-y-1 text-xs">
                        <div className="flex items-baseline justify-between">
                          <span className="text-[11px] text-slate-600 font-medium">Orientierungspreis:</span>
                          <span className="text-base font-extrabold text-slate-900">ca. {p.price.toFixed(2)} € *</span>
                        </div>
                        <div className="text-[10px] text-slate-500">
                          Tagesaktueller Preis beim Partner einsehbar
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
                          href={getProductAffiliateUrl(p)}
                          target="_blank"
                          rel={AFFILIATE_LINK_REL}
                          onClick={() => trackAffiliateClick(p.product_name, 'amazon', 'saved_lenses_page')}
                          className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-[11px] py-2.5 px-2 rounded-xl text-center transition flex items-center justify-center gap-1 shadow-2xs"
                        >
                          <span>{getAffiliateCtaLabel(p)}</span>
                          <ExternalLink className="w-3 h-3 flex-shrink-0" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <MedicalDisclaimer className="mt-12" />

      </main>

      <Footer />
      <ScrollToTop />

      {/* Refill Assistant Modal */}
      {activeModalProduct && (
        <RefillAssistantModal
          product={activeModalProduct}
          initialConfig={getConfig(activeModalProduct.id)}
          onClose={() => setActiveModalProduct(null)}
          onSave={(newConf) => saveConfig(activeModalProduct.id, newConf)}
        />
      )}
    </div>
  );
}
