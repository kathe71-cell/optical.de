import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Check, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronUp,
  Database,
  RotateCcw,
  Scale
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { EIGENMARKEN_DATABASE, searchEigenmarken, calculateOpticianCosts } from '../data/eigenmarken';
import { getProductById } from '../data/products';
import { trackDecoderStarted, trackDecoderCompleted, trackAffiliateClick } from '../utils/tracking';

const AMAZON_TAG = 'optical.de-21';
const AMAZON_SUBID = 'optical.de-21';

const getAmazonLink = (queryOrAsin, asin) => {
  if (asin) {
    return `https://www.amazon.de/dp/${asin}?tag=${AMAZON_TAG}`;
  }
  return `https://www.amazon.de/s?k=${encodeURIComponent(queryOrAsin)}&tag=${AMAZON_TAG}`;
};

export default function EigenmarkenDecoder({ standalone = false }) {
  const [inputQuery, setInputQuery] = useState('');
  const [activeEntry, setActiveEntry] = useState(EIGENMARKEN_DATABASE[0]); // Initial: Apollo iWear Oxygen
  const [hasSearched, setHasSearched] = useState(false);
  const [showSourceDetails, setShowSourceDetails] = useState(false);
  const [customPriceInput, setCustomPriceInput] = useState('');

  // Reset custom price input to empty when active entry changes so no price is assumed
  useEffect(() => {
    setCustomPriceInput('');
  }, [activeEntry?.id]);

  // Schnellauswahl für typische Optiker-Linsen
  const quickPicks = [
    { label: 'Apollo iWear Oxygen', slug: 'apollo-iwear-oxygen' },
    { label: 'Fielmann ActiMed', slug: 'fielmann-actimed' },
    { label: 'Fielmann Atmo', slug: 'fielmann-atmo' },
    { label: 'Mister Spex True Day', slug: 'mister-spex-true-day' },
    { label: 'Specsavers Opteyes', slug: 'specsavers-easyvision-opteyes' }
  ];

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputQuery(val);
    setHasSearched(true);
    trackDecoderStarted(val);

    if (val.trim().length >= 2) {
      const results = searchEigenmarken(val);
      if (results.length > 0) {
        setActiveEntry(results[0]);
        trackDecoderCompleted(results[0].optician_private_label, results[0].matched_brand_product_id, results[0].classification);
      } else {
        setActiveEntry(null);
      }
    } else if (val.trim().length === 0) {
      setActiveEntry(EIGENMARKEN_DATABASE[0]);
      setHasSearched(false);
    }
  };

  const handleSelectSlug = (slug) => {
    const entry = EIGENMARKEN_DATABASE.find((item) => item.slug === slug);
    if (entry) {
      setActiveEntry(entry);
      setInputQuery(entry.optician_private_label);
      setHasSearched(true);
      trackDecoderCompleted(entry.optician_private_label, entry.matched_brand_product_id, entry.classification);
    }
  };

  const matchedProduct = activeEntry ? getProductById(activeEntry.matched_brand_product_id) : null;

  // Wirtschaftliche Ersparnisberechnung: rein nutzerbasiert auf Basis des eingegebenen Filialpreises
  const currentOpticianCosts = activeEntry 
    ? calculateOpticianCosts(activeEntry, customPriceInput)
    : null;
  const opticianPrice = currentOpticianCosts?.price || null;
  const brandPrice = matchedProduct?.price || null;
  const samePackCount = activeEntry && matchedProduct && activeEntry.optician_pack_count === matchedProduct.pack_count;
  const savingsEuro = (opticianPrice && brandPrice && samePackCount) ? (opticianPrice - brandPrice).toFixed(2) : null;
  const savingsPercent = (opticianPrice && brandPrice && samePackCount) ? Math.round(((opticianPrice - brandPrice) / opticianPrice) * 100) : null;

  return (
    <div id="decoder" className={`bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden ${standalone ? 'p-6 sm:p-8' : 'p-6 sm:p-8'}`}>
      
      {/* Header Bereich des Decoders */}
      <div className="max-w-3xl mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          Zentrales Recherche-Tool: Eigenmarken-Decoder
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Welche Marken-Referenz passt zu Ihrer Optiker-Linse?
        </h2>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          Geben Sie den Namen Ihrer Handelsmarke (z. B. von Apollo Optik, Fielmann oder Mister Spex) ein. Unser System vergleicht die hinterlegten technischen Produktdaten transparent mit dem wahrscheinlich übereinstimmenden Markenprodukt.
        </p>
      </div>

      {/* Eingabefeld mit Live-Erkennung */}
      <div className="relative max-w-2xl mb-4">
        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
          <input
            type="text"
            value={inputQuery}
            onChange={handleInputChange}
            placeholder="Handelsmarke eingeben (z. B. 'Apollo iWear Oxygen' oder 'Fielmann ActiMed')..."
            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all shadow-2xs"
          />
        </div>
      </div>

      {/* Schnellauswahl Chips */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <span className="text-xs text-slate-500 font-medium mr-1">Häufig gesucht:</span>
        {quickPicks.map((pick) => (
          <button
            key={pick.slug}
            type="button"
            onClick={() => handleSelectSlug(pick.slug)}
            className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
              activeEntry?.slug === pick.slug
                ? 'bg-slate-900 text-white border-slate-900 font-bold shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200 font-medium'
            }`}
          >
            {pick.label}
          </button>
        ))}
      </div>

      {/* ERGEBNIS-ANZEIGE */}
      {activeEntry && matchedProduct ? (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-7 transition-all">
          
          {/* Top Banner: Status & Transparenz */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-200 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">Erkannte Handelsmarke:</span>
                <span className="bg-slate-200 text-slate-800 text-xs font-bold px-2 py-0.5 rounded">{activeEntry.optician_chain}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                {activeEntry.optician_private_label}
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-md border ${
                activeEntry.confidence_level === 'VERIFIED_IDENTICAL'
                  ? 'bg-emerald-100 text-emerald-950 border-emerald-300'
                  : activeEntry.confidence_level === 'HIGH_CONFIDENCE_MATCH'
                  ? 'bg-sky-100 text-sky-950 border-sky-300'
                  : activeEntry.confidence_level === 'RELATED_MATERIAL_FAMILY'
                  ? 'bg-amber-100 text-amber-950 border-amber-300'
                  : 'bg-slate-100 text-slate-800 border-slate-300'
              }`}>
                <ShieldCheck className="w-3.5 h-3.5 text-current" />
                Konfidenz: {activeEntry.confidence_label || activeEntry.classification_label}
              </span>
            </div>
          </div>

          {/* 1. HERLEITUNG & BEGRÜNDUNG DER ZUORDNUNG */}
          <div className="my-5 p-4 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed shadow-2xs">
            <div className="flex items-start gap-2.5">
              <Info className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-2 w-full">
                <p className="font-bold text-slate-900 text-sm">
                  {activeEntry.technical_statement}
                </p>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs">
                  <div className="font-semibold text-slate-900 mb-1">Herleitung auf Basis technischer Merkmale:</div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-slate-600">
                    {activeEntry.matched_parameters.map((p, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                        <span><strong>{p.parameter}:</strong> {p.brand_value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-slate-600 text-[11px] pt-1">
                  <strong>Fachliche Bewertung:</strong> {activeEntry.reasoning || activeEntry.derivation_evaluation}
                </p>

                {/* Verbindlicher Sicherheits- und Anpassungshinweis */}
                <div className="p-2.5 bg-amber-50/80 border border-amber-200 rounded-lg text-amber-950 text-[11px] font-medium flex items-center gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>Auch bei technischer Übereinstimmung empfiehlt optical.de keinen eigenmächtigen Wechsel ohne fachliche Anpassung.</span>
                </div>

                {/* Toggle zur detaillierten Quelleneinsicht */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setShowSourceDetails(!showSourceDetails)}
                    className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 transition"
                  >
                    <Database className="w-3.5 h-3.5" />
                    <span>{showSourceDetails ? 'Datenquellen ausblenden' : 'Verifizierte Primärquellen anzeigen'}</span>
                    {showSourceDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                  <span className="text-[10px] text-slate-400">Keine Schätzung · rein dokumentenbasierte Erfassung</span>
                </div>

                {showSourceDetails && (
                  <div className="mt-2 p-2.5 bg-slate-100 rounded-lg text-[11px] text-slate-700 space-y-1 border border-slate-200">
                    <div><strong>Quelle 1:</strong> {activeEntry.source_1 || activeEntry.source_name}</div>
                    <div><strong>Quelle 2:</strong> {activeEntry.source_2 || activeEntry.source_type}</div>
                    <div><strong>Erfassungsmethode:</strong> {activeEntry.mapping_source}</div>
                    <div><strong>Letzte Verifikation:</strong> {activeEntry.last_verified}</div>
                    {activeEntry.notes && <div><strong>Zusatzhinweis:</strong> {activeEntry.notes}</div>}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 2. PARAMETER-MATRIX & PREIS-GEGENÜBERSTELLUNG */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6">
            
            {/* Linke Seite: Parameter-Tabelle (7 Spalten) */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
              <div className="bg-slate-100/80 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
                <span className="font-bold text-xs text-slate-800 uppercase tracking-wide">Parameter-Vergleich</span>
                <span className="text-[10px] text-slate-500 font-medium">Dokumentenbasierte Erfassung</span>
              </div>
              <div className="divide-y divide-slate-100 text-xs">
                {activeEntry.matched_parameters.map((p, idx) => (
                  <div key={idx} className="grid grid-cols-12 px-4 py-2.5 items-center hover:bg-slate-50/50">
                    <span className="col-span-4 font-semibold text-slate-700">{p.parameter}</span>
                    <span className="col-span-4 text-slate-600 text-center">{p.private_label_value}</span>
                    <span className="col-span-4 text-slate-900 font-bold text-right flex items-center justify-end gap-1.5">
                      <span>{p.brand_value}</span>
                      {p.match && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rechte Seite: Vollständige und transparente Preis-Gegenüberstellung (5 Spalten) */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Zugeordnetes Markenprodukt
                </div>
                <h4 className="font-extrabold text-lg text-slate-900 leading-tight">
                  {matchedProduct.product_name}
                </h4>
                <div className="text-xs text-slate-500 mt-0.5">
                  Hersteller: <strong className="text-slate-700">{matchedProduct.manufacturer}</strong>
                </div>

                {/* Transparenter Vergleichsbasis-Hinweis */}
                <div className="mt-3 p-2 bg-slate-50 rounded-lg text-[10px] text-slate-600 border border-slate-200">
                  <strong>Vergleichsbasis:</strong> Jeweils {activeEntry.optician_pack_size} bei beidseitigem Tragen (2 Linsen / Monat bzw. Tag).
                </div>

                {/* Detaillierte Preisberechnung beider Seiten */}
                <div className="mt-3 pt-3 border-t border-slate-100 space-y-2.5 text-xs">
                  
                  {/* Handelsmarke: Interaktives Berechnungsfeld (Option 1: Standardmäßig leer) */}
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-bold text-slate-800 text-xs truncate">{activeEntry.optician_private_label}:</span>
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
                      <label htmlFor="decoder-filialpreis" className="text-[11px] text-slate-700 font-semibold cursor-pointer">
                        Ihr bezahlter Filialpreis:
                      </label>
                      <div className="flex items-center gap-1 shrink-0">
                        <input
                          id="decoder-filialpreis"
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
                        Berechnungsgrundlage: {customPriceInput} € laut Ihrer Angabe ({activeEntry.optician_pack_size}).
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
                          <span>Preis pro Einzellinse:</span>
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
                    <div className="font-bold text-slate-900 flex justify-between items-baseline">
                      <span className="text-xs">Beispielpreis auf Amazon.de:</span>
                      <span className="text-emerald-700 font-extrabold text-sm">ca. {matchedProduct.price.toFixed(2)} € *</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      Tagesaktueller Händlerpreis auf Amazon.de einsehbar.
                    </div>
                    <div className="text-[11px] text-slate-600 flex justify-between mt-1">
                      <span>Preis pro Einzellinse:</span>
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
                    <div className="mt-3 p-2.5 bg-emerald-100/70 border border-emerald-300 rounded-lg text-center">
                      <span className="text-xs text-emerald-950 font-extrabold block">
                        Rechnerische Differenz: ca. {savingsPercent} % ({savingsEuro} € Ersparnis)
                      </span>
                      <span className="text-[10px] text-emerald-800 block mt-0.5">
                        * Individuelle Modellrechnung auf Basis Ihrer Preisangabe für {activeEntry.optician_pack_size}.
                      </span>
                    </div>
                  ) : (
                    <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded-lg text-center text-[10px] text-amber-900">
                      Preisvergleich nur eingeschränkt möglich (abweichende Packungsgrößen). Vergleich über Preis pro Einzellinse beachten.
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
              </div>

              {/* Call To Action zu Amazon mit transparenter Kennzeichnung */}
              <div className="mt-5 pt-3 border-t border-slate-100">
                <a
                  href={getAmazonLink(matchedProduct.amazon_query, matchedProduct.asin)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAffiliateClick(matchedProduct.product_name, 'amazon', 'eigenmarken_decoder')}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all group"
                >
                  <span>Angebote bei Amazon suchen *</span>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <div className="text-center mt-2 space-y-0.5">
                  <div className="text-[10px] text-slate-500 font-medium">
                    Amazon-Partnerlink (Amazon.de) · Beispielpreis Stand 09/2026 · Tagesaktueller Preis auf Amazon.de einsehbar · Preise können abweichen
                  </div>
                  <div className="text-[9px] text-slate-400">
                    * Werbelink / Partnerlink
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Untere Verlinkung zur vollwertigen SEO-Landingpage */}
          <div className="mt-4 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <span>
              Ausführliche Recherche &amp; Hintergründe zu dieser Handelsmarke:
            </span>
            <Link 
              to={`/${activeEntry.slug}`}
              className="font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 transition"
            >
              <span>Vollständiges Handelsmarken-Dossier öffnen →</span>
            </Link>
          </div>

        </div>
      ) : hasSearched && inputQuery.trim().length > 0 ? (
        /* FALLBACK BEI UNBEKANNTER LINSE */
        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 text-center">
          <AlertTriangle className="w-8 h-8 text-amber-600 mx-auto mb-2" />
          <h4 className="font-extrabold text-base text-amber-950">Zuordnung nicht eindeutig</h4>
          <p className="text-xs text-amber-900 max-w-xl mx-auto mt-1 leading-relaxed">
            Für die Suchanfrage <strong>„{inputQuery}“</strong> liegen in unserer Datenbank derzeit keine öffentlich belegbaren oder nachprüfbaren Spezifikationen vor.
          </p>
          <p className="text-[11px] text-amber-800 max-w-xl mx-auto mt-2">
            optical.de veröffentlicht keine spekulativen oder erfundenen Herstellerzuordnungen. Bitte prüfen Sie die Basiskurve (BC), den Durchmesser (DIA) und den Materialnamen auf Ihrer Blister-Verpackung oder lassen Sie sich von Ihrem anpassenden Augenarzt oder Optiker beraten.
          </p>
        </div>
      ) : null}

    </div>
  );
}
