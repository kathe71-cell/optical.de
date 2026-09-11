import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Eye, ArrowLeft, ShieldCheck, Check, ExternalLink, Database, RotateCcw, Scale } from 'lucide-react';
import { getEigenmarkeBySlug, EIGENMARKEN_DATABASE, calculateOpticianCosts } from '../data/eigenmarken';
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
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold text-slate-500 border-l border-slate-200 pl-2">Eigenmarken-Decoder</span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link to="/" className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 transition">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Zurück zur Übersicht</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200/80 py-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-slate-500 flex items-center gap-2">
          <Link to="/" className="hover:text-emerald-700">Startseite</Link>
          <span>/</span>
          <Link to="/eigenmarken-decoder" className="hover:text-emerald-700">Eigenmarken-Decoder</Link>
          <span>/</span>
          <span className="font-semibold text-slate-900">{entry.optician_private_label}</span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Page Title & Meta Badge */}
        <div className="max-w-3xl mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Optiker-Handelsmarke · {entry.optician_chain}
            </span>
            <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-950 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-300">
              Einstufung: {entry.classification_label}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {entry.optician_private_label}: Technische Spezifikationen &amp; Marken-Referenz
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            Transparenter Abgleich der technischen Produktparameter. Auf Basis der vorliegenden Spezifikationen erfahren Sie, welchem Markenprodukt diese Handelsmarke entspricht.
          </p>
        </div>

        {/* Medical Disclaimer Alert */}
        <MedicalDisclaimer className="mb-8" />

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Main Matrix (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Statement Box */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <h2 className="text-lg font-extrabold text-slate-900 mb-2">
                Herleitung &amp; Parameter-Übereinstimmung
              </h2>
              <p className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed">
                {entry.technical_statement}
              </p>
              <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                <div><strong>Fachliche Bewertung:</strong> {entry.derivation_evaluation}</div>
                <div><strong>Detailhinweis:</strong> {entry.notes}</div>
              </div>

              <div className="mt-6 border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 flex justify-between text-xs font-bold text-slate-800">
                  <span>Parameter</span>
                  <span>Handelsmarke vs. Markenprodukt ({matchedProduct.product_name})</span>
                </div>
                <div className="divide-y divide-slate-100 text-xs">
                  {entry.matched_parameters.map((p, idx) => (
                    <div key={idx} className="grid grid-cols-12 px-4 py-3 items-center hover:bg-slate-50">
                      <span className="col-span-5 font-semibold text-slate-700">{p.parameter}</span>
                      <span className="col-span-3 text-slate-600 text-center">{p.private_label_value}</span>
                      <span className="col-span-4 text-slate-900 font-bold text-right flex items-center justify-end gap-1.5">
                        <span>{p.brand_value}</span>
                        {p.match && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Hintergrund-Information */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <h3 className="text-base font-bold text-slate-900">
                Warum vertreiben Optikerketten Handelsmarken?
              </h3>
              <p>
                Große Filialketten wie {entry.optician_chain} besitzen in aller Regel keine eigenen Fabriken für Kontaktlinsen. Sie beziehen Produkte bei Weltmarktführern (CooperVision, Alcon, Bausch + Lomb) und lassen diese unter eigenem Markennamen verpacken.
              </p>
              <p>
                Die physikalischen Kennwerte wie Material ({matchedProduct.material}), Basiskurve ({matchedProduct.base_curve}) und Sauerstofftransmissibilität ({matchedProduct.dk_t} Dk/t) stimmen mit dem entsprechenden Markenprodukt überein.
              </p>
            </div>

          </div>

          {/* Sidebar CTA & Price Card (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Zugeordnetes Markenprodukt</span>
              <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                {matchedProduct.product_name}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Hersteller: <strong className="text-slate-700">{matchedProduct.manufacturer}</strong>
              </p>

              {/* Price Details */}
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-2.5 text-xs">
                
                {/* Handelsmarke: Interaktives Berechnungsfeld (Option 1: Standardmäßig leer) */}
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-bold text-slate-800 text-xs truncate">{entry.optician_private_label}:</span>
                    {currentOpticianCosts && (
                      <button
                        type="button"
                        onClick={() => setCustomPriceInput('')}
                        className="text-[10px] font-semibold text-slate-500 hover:text-slate-700 flex items-center gap-1 shrink-0"
                        title="Eingabe zurücksetzen"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Zurücksetzen</span>
                      </button>
                    )}
                  </div>

                  {/* Interaktives Preisfeld für den Nutzer */}
                  <div className="mt-1 mb-2 bg-white p-2.5 rounded-md border border-slate-300 flex items-center justify-between gap-2 shadow-2xs">
                    <label htmlFor="landing-filialpreis" className="text-[11px] text-slate-700 font-semibold cursor-pointer">
                      Ihr bezahlter Filialpreis:
                    </label>
                    <div className="flex items-center gap-1 shrink-0">
                      <input
                        id="landing-filialpreis"
                        type="number"
                        step="0.10"
                        min="1"
                        max="200"
                        placeholder="z. B. 35,00"
                        value={customPriceInput}
                        onChange={(e) => setCustomPriceInput(e.target.value)}
                        className="w-24 px-2 py-1 text-right font-extrabold text-slate-900 bg-slate-50 border border-slate-300 rounded text-xs placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      <span className="font-bold text-slate-700 text-xs">€</span>
                    </div>
                  </div>

                  {currentOpticianCosts ? (
                    <div className="text-[10px] text-slate-500 italic mt-1">
                      Berechnungsgrundlage: {customPriceInput} € laut Ihrer Angabe ({entry.optician_pack_size}).
                    </div>
                  ) : (
                    <div className="text-[10px] text-slate-400 mt-1">
                      Preise in Filialen variieren regional. Tragen Sie Ihren Rechnungsbetrag ein.
                    </div>
                  )}

                  {/* Details nur anzeigen, wenn Preis eingegeben */}
                  {currentOpticianCosts && (
                    <div className="mt-2 pt-2 border-t border-slate-200/60 space-y-1">
                      <div className="text-[11px] text-slate-500 flex justify-between">
                        <span>Preis pro Linse:</span>
                        <span className="font-semibold text-slate-700">{currentOpticianCosts.price_per_lens}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 flex justify-between">
                        <span>Kosten pro Tragetag (2 Linsen):</span>
                        <span className="font-semibold text-slate-700">{currentOpticianCosts.cost_per_day}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Marken-Original */}
                <div className="bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-200">
                  <div className="font-bold text-slate-900 flex justify-between">
                    <span>Online-Vergleichspreis:</span>
                    <span className="text-emerald-700 font-extrabold text-base">ab {matchedProduct.price.toFixed(2)} € *</span>
                  </div>
                  <div className="text-[10px] text-slate-500 italic mt-0.5">
                    Packungsgröße: {matchedProduct.pack_size}. Händlerbedingungen beachten.
                  </div>
                  <div className="text-[11px] text-slate-600 flex justify-between mt-1">
                    <span>Preis pro Linse:</span>
                    <span className="font-semibold text-slate-900">{matchedProduct.price_per_lens}</span>
                  </div>
                  <div className="text-[11px] text-slate-600 flex justify-between">
                    <span>Kosten pro Tragetag (2 Linsen):</span>
                    <span className="font-semibold text-slate-900">{matchedProduct.cost_per_day}</span>
                  </div>
                </div>

              </div>

              {/* Rechnerische Ersparnis (Nur aktiv, wenn der Nutzer einen Preis eingegeben hat) */}
              {currentOpticianCosts ? (
                samePackCount && savingsPercent ? (
                  <div className="mt-4 p-2.5 bg-emerald-100/80 border border-emerald-300 rounded-xl text-center">
                    <span className="text-xs text-emerald-950 font-extrabold block">
                      Rechnerische Differenz: ca. {savingsPercent} % ({savingsEuro} € Ersparnis)
                    </span>
                    <span className="text-[10px] text-emerald-800 block mt-0.5">
                      * Individuelle Modellrechnung auf Basis Ihrer Preisangabe für {entry.optician_pack_size}.
                    </span>
                  </div>
                ) : (
                  <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded-lg text-center text-[10px] text-amber-900">
                    Preisvergleich nur eingeschränkt möglich (abweichende Packungsgrößen).
                  </div>
                )
              ) : (
                <div className="mt-3 p-2.5 bg-slate-100 border border-dashed border-slate-300 rounded-lg text-center text-[11px] text-slate-600">
                  Tragen Sie oben Ihren bezahlten Filialpreis ein, um Ihre <strong>persönliche Ersparnis</strong> gegenüber dem Online-Markenprodukt zu berechnen.
                </div>
              )}

              {/* Rechtlicher UWG-Hinweis zu Preisvergleichen */}
              <div className="mt-3 p-2.5 bg-slate-100/90 rounded-lg border border-slate-200 text-[10px] text-slate-500 leading-snug">
                <div className="flex items-center gap-1 font-semibold text-slate-700 mb-0.5">
                  <Scale className="w-3 h-3 text-slate-500" />
                  <span>Rechtlicher Hinweis zu Preisvergleichen:</span>
                </div>
                optical.de trifft keine pauschalen Preisfeststellungen für stationäre Filialen. Preise können regional, filialabhängig oder aktionsbedingt variieren. Die Differenzberechnung ist eine unverbindliche, individuelle Modellrechnung, die ausschließlich auf dem vom Nutzer selbst eingegebenen Preis und den tagesaktuellen Online-Preisen der Referenzprodukte basiert.
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <a
                  href={getAmazonLink(matchedProduct.amazon_query)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAffiliateClick(matchedProduct.product_name, 'amazon', 'private_label_landing')}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all group"
                >
                  <span>Preise bei Amazon prüfen *</span>
                  <ExternalLink className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <div className="text-center mt-2 space-y-0.5">
                  <div className="text-[10px] text-slate-500 font-medium">
                    Amazon-Partnerlink · Preis kann sich ändern
                  </div>
                  <div className="text-[9px] text-slate-400 font-medium">
                    * Werbelink / Partnerlink
                  </div>
                </div>
              </div>

            </div>

            {/* Verification Metadata Box */}
            <div className="bg-slate-100 rounded-2xl p-5 border border-slate-200 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <Database className="w-4 h-4 text-emerald-600" />
                <span>Dokumentation &amp; Quelle</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                <strong>Quellentyp:</strong> {entry.source_type}
              </p>
              <p className="text-[11px] leading-relaxed">
                <strong>Nachweis:</strong> {entry.source_name} ({entry.mapping_source})
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
