import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Eye, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink, 
  Bookmark, 
  Sparkles, 
  Layers, 
  Calculator, 
  ShieldCheck, 
  HelpCircle,
  Clock,
  ArrowUpRight,
  Trash2
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MetaTags from '../components/MetaTags';
import MedicalDisclaimer from '../components/MedicalDisclaimer';
import TrustSection from '../components/TrustSection';
import ScrollToTop from '../components/ScrollToTop';
import { PRODUCTS, getProductById } from '../data/products';
import { EIGENMARKEN_DATABASE } from '../data/eigenmarken';
import { useSavedLenses } from '../hooks/useSavedLenses';
import { useRefillConfigs } from '../hooks/useRefillConfigs';
import { trackSearchUsed, trackProductClicked, trackAffiliateClick } from '../utils/tracking';

import { getAffiliateSearchUrl, getProductAffiliateUrl, getAffiliateCtaLabel, AFFILIATE_LINK_REL } from '../utils/affiliate';

const AMAZON_TAG = 'optical.de-21';
const AMAZON_SUBID = 'optical.de-21';

const getAmazonLink = (queryOrAsin, asin) => getAffiliateSearchUrl(queryOrAsin, asin);

// Beliebte Schnellzugriffe für Autocomplete / Vorschläge
const POPULAR_SEARCHES = [
  { label: 'Biofinity', type: 'Linse', path: '/vergleichskatalog?q=Biofinity' },
  { label: 'Dailies Total 1', type: 'Linse', path: '/vergleichskatalog?q=Dailies+Total+1' },
  { label: 'Air Optix', type: 'Linse', path: '/vergleichskatalog?q=Air+Optix' },
  { label: 'Acuvue Oasys', type: 'Linse', path: '/vergleichskatalog?q=Acuvue+Oasys' },
  { label: 'iWear Oxygen', type: 'Eigenmarke', path: '/apollo-iwear-oxygen' },
  { label: 'Fielmann ActiMed', type: 'Eigenmarke', path: '/fielmann-actimed' },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [homeCategory, setHomeCategory] = useState('all');
  const [homeSort, setHomeSort] = useState('popular');
  const [isClient, setIsClient] = useState(false);
  const navigate = useNavigate();
  const { savedIds, isSaved, toggleSave, removeSaved } = useSavedLenses();
  const { getConfig } = useRefillConfigs();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const savedProducts = (isClient ? savedIds : [])
    .map((id) => getProductById(id))
    .filter(Boolean);

  // Gefilterte Vorschläge während des Tippens
  const searchSuggestions = searchQuery.trim().length > 0
    ? [
        ...PRODUCTS.filter(p => p.product_name.toLowerCase().includes(searchQuery.toLowerCase()) || p.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 4).map(p => ({
          label: p.product_name,
          sub: `${p.manufacturer} · ${p.lens_type}`,
          path: `/${p.id === 'biofinity' ? 'biofinity' : `produkt/${p.id}`}`
        })),
        ...EIGENMARKEN_DATABASE.filter(e => e.optician_private_label.toLowerCase().includes(searchQuery.toLowerCase()) || e.optician_chain.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3).map(e => ({
          label: e.optician_private_label,
          sub: `${e.optician_chain} · Technischer Abgleich: ${e.original_brand_name}`,
          path: `/${e.slug}`
        }))
      ]
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim().length > 0) {
      trackSearchUsed(searchQuery);
      navigate(`/vergleichskatalog?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Gefilterte & sortierte Produkte für Startseite
  const featuredProducts = PRODUCTS.filter(p => {
    if (homeCategory === 'tag') return p.lens_type.toLowerCase().includes('tageslinse') && !p.lens_type.toLowerCase().includes('torisch');
    if (homeCategory === 'monat') return p.lens_type.toLowerCase().includes('monatslinse') && !p.lens_type.toLowerCase().includes('torisch');
    if (homeCategory === 'toric') return p.lens_type.toLowerCase().includes('torisch');
    if (homeCategory === 'pflege') return p.lens_type.toLowerCase().includes('pflegemittel') || p.lens_type.toLowerCase().includes('augentropfen');
    if (homeCategory === 'zubehoer') return p.lens_type.toLowerCase().includes('zubeh') || p.lens_type.toLowerCase().includes('augentropfen');
    return !p.lens_type.toLowerCase().includes('pflegemittel') && !p.lens_type.toLowerCase().includes('augentropfen') && !p.lens_type.toLowerCase().includes('zubeh');
  }).sort((a, b) => {
    if (homeSort === 'price_asc') return a.price - b.price;
    if (homeSort === 'price_day') {
      const aDay = parseFloat((a.cost_per_day || '99').replace(',','.'));
      const bDay = parseFloat((b.cost_per_day || '99').replace(',','.'));
      return aDay - bDay;
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col justify-between">
      <MetaTags 
        title="optical.de – Deine Kontaktlinsen. Einfach wiederfinden."
        description="Finde deine gewohnten Kontaktlinsen, vergleiche Produktinformationen und plane deinen nächsten Nachkauf."
        canonical="https://www.optical.de/"
      />
      <Header />

      <main className="w-full flex-grow space-y-12 sm:space-y-16">
        
        {/* HERO SECTION: NACHKAUF-FOKUS */}
        <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100/80 border-b border-slate-200 py-12 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            
            {/* Trust Badge / Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-5">
              <Eye className="w-3.5 h-3.5 text-emerald-600" />
              <span>KONTAKTLINSEN FINDEN &amp; NACHKAUF PLANEN</span>
            </div>

            {/* H1 & Subtitle (Exakt nach Vorgabe) */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-950 tracking-tight leading-tight mb-4">
              Deine Kontaktlinsen.<br />
              <span className="text-emerald-600">Einfach wiederfinden.</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              Finde deine gewohnten Kontaktlinsen, vergleiche Produktinformationen und plane deinen nächsten Nachkauf.
            </p>

            {/* ZENTRALE SUCHLEISTE MIT AUTOCOMPLETE */}
            <div className="relative max-w-2xl mx-auto mb-6 text-left">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-4 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setTimeout(() => setIsFocused(false), 250)}
                  placeholder="Zum Beispiel Biofinity, Dailies Total 1 oder iWear..."
                  className="w-full pl-12 pr-28 py-3.5 sm:py-4 bg-white border-2 border-slate-300 hover:border-slate-400 focus:border-emerald-600 rounded-2xl text-sm sm:text-base font-semibold text-slate-900 placeholder:text-slate-400 shadow-md focus:outline-none transition"
                  aria-label="Kontaktlinsen oder Eigenmarke suchen"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bottom-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm px-4 sm:px-5 rounded-xl transition shadow-xs flex items-center gap-1.5"
                >
                  <span>Suchen</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                </button>
              </form>

              {/* Autocomplete-Vorschlagsliste */}
              {isFocused && searchSuggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden z-50 divide-y divide-slate-100 animate-in fade-in duration-100">
                  <div className="p-2 bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3">
                    Suchvorschläge
                  </div>
                  {searchSuggestions.map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.path}
                      className="block px-4 py-3 hover:bg-emerald-50/50 transition"
                    >
                      <div className="font-bold text-xs sm:text-sm text-slate-900">{item.label}</div>
                      <div className="text-[11px] text-slate-500">{item.sub}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Beliebte Schnellsuch-Begriffe */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-500 mb-8">
              <span className="font-medium mr-1">Oft gesucht:</span>
              {POPULAR_SEARCHES.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.path}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-emerald-300 hover:text-emerald-700 font-semibold transition"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* DIE BEIDEN PRIMÄREN AKTIONEN */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <Link
                to="/vergleichskatalog"
                className="w-full sm:w-auto flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
              >
                <Layers className="w-4 h-4 text-emerald-200" />
                <span>Kontaktlinsen finden</span>
              </Link>
              <Link
                to="/eigenmarken-decoder"
                className="w-full sm:w-auto flex-1 bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 hover:border-slate-400 font-bold text-sm px-6 py-3.5 rounded-xl shadow-xs transition flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Optiker-Eigenmarke prüfen</span>
              </Link>
            </div>

          </div>
        </section>


        {/* ==================================================================
            EASY-REORDER-EINSTIEG: DEINE GEMERKTEN KONTAKTLINSEN
            - Erscheint leicht erreichbar für wiederkehrende Nutzer
            - Zeigt vorhandene Merkliste-Einträge mit Namen, Hersteller, Bild/Visual,
              großer Schaltfläche "Produkt ansehen" und direktem Nachkaufangebot
            - Bei leerer Merkliste: Verständliche Erklärung & gut sichtbarer Einstieg
            - Strikt MDR-konform: Sicherheitshinweis vor dem Kauf (Dioptrien, BC, DIA)
            ================================================================== */}
        <section aria-labelledby="saved-lenses-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {savedProducts.length > 0 ? (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
                    <Bookmark className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                    <span>Einfacher Nachkauf · Lokal gemerkt</span>
                  </div>
                  <h2 id="saved-lenses-heading" className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                    Deine gemerkten Kontaktlinsen
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                    Deine gewohnten Kontaktlinsen für den schnellen Wiederkauf. Prüfe deine Parameter und wechsle direkt zum geprüften Händlerangebot.
                  </p>
                </div>

                <Link
                  to="/meine-linsen"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 underline self-start sm:self-end py-1"
                >
                  <span>Alle {savedProducts.length} {savedProducts.length === 1 ? 'Linse' : 'Linsen'} verwalten</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Zentraler Medizinprodukt-Sicherheitshinweis vor dem Nachkauf */}
              <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-4 text-xs text-amber-950 flex items-start gap-3 shadow-2xs">
                <ShieldCheck className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong className="block font-extrabold text-amber-950 text-xs sm:text-sm">
                    Medizinprodukt-Prüfung vor dem Nachkauf
                  </strong>
                  <p className="text-amber-900/90 leading-relaxed text-xs">
                    Kontaktlinsen sind individuelle Medizinprodukte. Bitte gleiche vor dem Wechsel zum Händler sämtliche für deine Kontaktlinsen relevanten Parameter (wie Dioptrien/Stärke, Basiskurve, Durchmesser sowie bei Bedarf Zylinder, Achse oder Addition) sorgfältig mit deiner aktuellen augenärztlichen Verordnung oder der vorhandenen Originalpackung ab. Nicht jedes Produkt benötigt alle Parameter. optical.de ist ein unabhängiges Portal und trifft keine automatische Varianten- oder Stärkenauswahl.
                  </p>
                </div>
              </div>

              {/* Grid der gemerkten Produkte */}
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
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                            {p.manufacturer}
                          </span>
                          <button
                            onClick={() => removeSaved(p.id)}
                            className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition"
                            title={`${p.product_name} aus gemerkten Linsen entfernen`}
                            aria-label={`${p.product_name} aus gemerkten Linsen entfernen`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Produktbild / Eindeutiges Linsen-Visual */}
                        <div className="flex items-center gap-4 mb-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                          {p.image_url ? (
                            <img
                              src={p.image_url}
                              alt={p.product_name}
                              className="w-16 h-16 object-contain rounded-lg bg-white border border-slate-200 p-1 flex-shrink-0"
                            />
                          ) : (
                            <div className="w-14 h-14 rounded-xl bg-white border border-slate-200 flex flex-col items-center justify-center text-emerald-600 flex-shrink-0 shadow-2xs">
                              <Eye className="w-6 h-6 stroke-[1.75]" />
                              <span className="text-[9px] font-bold text-slate-600 uppercase mt-0.5 tracking-tighter">
                                {p.lens_type.includes('Tages') ? '1-Day' : p.lens_type.includes('Monat') ? '30-Day' : 'Linse'}
                              </span>
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                              <Link
                                to={`/${p.id === 'biofinity' ? 'biofinity' : `produkt/${p.id}`}`}
                                className="hover:text-emerald-700 transition"
                              >
                                {p.product_name}
                              </Link>
                            </h3>
                            <div className="text-xs text-slate-500 mt-0.5">
                              {p.lens_type} · {p.pack_size}
                            </div>
                          </div>
                        </div>

                        {/* Nachkauf-Plan Hinweis (falls aktiv) */}
                        {hasPlan && (
                          <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-2.5 mb-3 text-[11px] text-emerald-950 flex items-center justify-between">
                            <span className="flex items-center gap-1 font-bold">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              Nachkauf ab: {new Date(config.refillDate).toLocaleDateString('de-DE')}
                            </span>
                            <Link to="/meine-linsen" className="underline font-bold text-emerald-800 hover:text-emerald-950">
                              Plan
                            </Link>
                          </div>
                        )}
                      </div>

                      {/* Aktionsschaltflächen (card-action-grid) */}
                      <div className="pt-2 border-t border-slate-100">
                        <div className="grid grid-cols-2 gap-2 card-action-grid">
                          <Link
                            to={`/${p.id === 'biofinity' ? 'biofinity' : `produkt/${p.id}`}`}
                            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-extrabold text-xs py-3 px-2 rounded-xl text-center transition flex items-center justify-center"
                          >
                            Produkt ansehen
                          </Link>

                          <a
                            href={getProductAffiliateUrl(p)}
                            target="_blank"
                            rel={AFFILIATE_LINK_REL}
                            onClick={() => trackAffiliateClick(p.product_name, 'amazon', 'home_easy_reorder')}
                            className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs py-3 px-2 rounded-xl text-center transition flex items-center justify-center gap-1 shadow-2xs"
                          >
                            <span>{getAffiliateCtaLabel(p)}</span>
                            <ExternalLink className="w-3 h-3 flex-shrink-0" />
                          </a>
                        </div>
                        <div className="text-[10px] text-slate-500 text-center mt-2">
                          * Werbelink / Partnerlink (Amazon.de)
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Leere Merkliste – kompakter, barrierearmer Hinweis */
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 text-slate-700 mt-0.5">
                  <Bookmark className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h2 id="saved-lenses-heading" className="text-base sm:text-lg font-black text-slate-950 tracking-tight">
                    Deine gemerkten Kontaktlinsen
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Hier findest du deine gewohnten Kontaktlinsen für den schnellen Wiederkauf wieder. Klicke im <Link to="/vergleichskatalog" className="font-bold text-emerald-800 hover:text-emerald-950 underline">Katalog</Link> oder beim <Link to="/eigenmarken-decoder" className="font-bold text-emerald-800 hover:text-emerald-950 underline">Eigenmarken-Check</Link> auf <strong>„Linse merken“</strong>, um deine Kontaktlinse hier griffbereit abzulegen.
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>


        {/* SO FUNKTIONIERT OPTICAL.DE (Transparent & MDR-konform) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              So funktioniert optical.de
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Deine Plattform für den einfachen Nachkauf bereits angepasster Kontaktlinsen. Faktenbasiert, neutral und ohne künstliche Werbeversprechen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center font-bold text-base mb-4">
                1
              </div>
              <h3 className="font-extrabold text-base text-slate-900 mb-2">
                Gewohnte Linse finden
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Suche nach deinem Linsennamen (z. B. Biofinity) oder deiner Optiker-Handelsmarke (z. B. iWear Oxygen). Wir zeigen dir die hinterlegten technischen Produktspezifikationen und kennzeichnen transparent den jeweiligen Verifizierungsstatus.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-base mb-4">
                2
              </div>
              <h3 className="font-extrabold text-base text-slate-900 mb-2">
                Angebote prüfen
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Vergleiche transparente Online-Angebote mit Stückpreisen und Kosten pro Tragetag. Keine fiktiven Händler – nur verifizierte Marktplätze wie Amazon.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold text-base mb-4">
                3
              </div>
              <h3 className="font-extrabold text-base text-slate-900 mb-2">
                Linsen merken &amp; nachkaufen
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Speichere deine Linse lokal in deinem Browser. Beim nächsten Nachkauf hast du deine Parameter und Links sofort mit einem Klick griffbereit.
              </p>
            </div>
          </div>
        </section>


        {/* PRODUKTAUSWAHL (Marken- und Produktübersicht) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5 mb-8">
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                PRODUKTÜBERSICHT
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mt-1">
                Gängige Kontaktlinsen im Überblick
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Auswahl gängiger Markenlinsen mit verifizierten technischen Datenblättern.
              </p>
            </div>

            <Link
              to="/vergleichskatalog"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 transition"
            >
              <span>Alle {PRODUCTS.length} Produkte im Katalog anzeigen</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Kategorie-Filter & Sortierung */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex flex-wrap gap-1.5">
              {[
                { key: 'all', label: 'Alle' },
                { key: 'tag', label: 'Tageslinsen' },
                { key: 'monat', label: 'Monatslinsen' },
                { key: 'toric', label: 'Torisch' },
                { key: 'pflege', label: 'Pflege' },
                { key: 'zubehoer', label: 'Zubehör' },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setHomeCategory(tab.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    homeCategory === tab.key
                      ? 'bg-slate-950 text-white'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <select
              value={homeSort}
              onChange={e => setHomeSort(e.target.value)}
              aria-label="Ausgewählte Produkte sortieren nach"
              className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none"
            >
              <option value="popular">Standard</option>
              <option value="price_asc">Preis aufsteigend</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.slice(0, 6).map((p) => {
              const saved = isSaved(p.id);

              return (
                <div 
                  key={p.id} 
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-bold text-slate-500 uppercase">{p.manufacturer}</span>
                      <div className="flex items-center gap-2">
                        <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">
                          {p.lens_type}
                        </span>
                        <button
                          onClick={() => toggleSave(p.id)}
                          className={`p-1.5 rounded-lg border transition ${
                            saved 
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-700' 
                              : 'bg-white border-slate-200 text-slate-400 hover:text-emerald-700 hover:border-emerald-200'
                          }`}
                          title={saved ? 'Aus Merkliste entfernen' : 'Linse merken'}
                          aria-label={`${p.product_name} merken`}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-emerald-600' : ''}`} />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-lg font-black text-slate-900 leading-snug">
                      <Link 
                        to={`/${p.id === 'biofinity' ? 'biofinity' : `produkt/${p.id}`}`} 
                        onClick={() => trackProductClicked(p.id, p.product_name)}
                        className="hover:text-emerald-700 transition"
                      >
                        {p.product_name}
                      </Link>
                    </h3>

                    <div className="mt-2 text-xs text-slate-500 flex items-center justify-between">
                      <span>Standardpackung:</span>
                      <strong className="text-slate-800 font-semibold">{p.pack_size}</strong>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-2.5">
                      {p.objective_badges?.slice(0, 3).map((b, bIdx) => (
                        <span key={bIdx} className="bg-slate-100 text-slate-800 text-[10px] font-medium px-2 py-0.5 rounded">
                          {b}
                        </span>
                      ))}
                    </div>

                    {/* Spezifikationen */}
                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-1 text-xs text-slate-600">
                      <div className="flex justify-between">
                        <span>Material:</span>
                        <strong className="text-slate-900 font-semibold">{p.material}</strong>
                      </div>
                      {p.dk_t && (
                        <div className="flex justify-between">
                          <span>Sauerstoff (Dk/t):</span>
                          <strong className="text-slate-900 font-semibold">{p.dk_t} Dk/t</strong>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100">
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 mb-3 text-xs space-y-1">
                      <div className="flex items-baseline justify-between">
                        <span className="text-[11px] text-slate-600 font-medium">Beispielpreis auf Amazon.de:</span>
                        <span className="text-base font-extrabold text-slate-900">ca. {p.price.toFixed(2)} € *</span>
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Tagesaktueller Händlerpreis auf Amazon.de einsehbar
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-600 pt-1 border-t border-slate-200/60 mt-1">
                        <span>Kosten pro Tragetag (2 Linsen):</span>
                        <span className="font-semibold text-emerald-700">{p.cost_per_day || '–'}</span>
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
                        href={getAmazonLink(p.amazon_query, p.asin)}
                        target="_blank"
                        rel={AFFILIATE_LINK_REL}
                        onClick={() => trackAffiliateClick(p.product_name, 'amazon', 'home_featured')}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] py-2.5 px-2 rounded-xl flex items-center justify-center gap-1 shadow-2xs transition"
                      >
                        <span>{getAffiliateCtaLabel(p)}</span>
                        <ExternalLink className="w-3 h-3 text-emerald-400" />
                      </a>
                    </div>

                    <div className="text-center mt-2 text-[11px] text-slate-600 font-medium leading-tight">
                      * Werbelink / Partnerlink (Amazon.de) · Beispielpreis Stand 09/2026 · Tagesaktueller Preis auf Amazon.de einsehbar · Preise können abweichen
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/vergleichskatalog"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition shadow-xs"
            >
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Alle {PRODUCTS.length} Produkte im Gesamtkatalog ansehen</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>
        </section>


        {/* SEKUNDÄRE WERKZEUGE: DECODER & PREISRECHNER */}
        <section aria-labelledby="tools-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-slate-200 pb-4 mb-6">
            <h2 id="tools-heading" className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
              Hilfreiche Werkzeuge für deinen Kontaktlinsenkauf
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Objektive Rechner und Zuordnungen für maximale Transparenz vor der Bestellung.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tool 1: Eigenmarken-Decoder */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between hover:border-slate-300 transition">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Optiker-Eigenmarken</span>
                </div>
                <h3 className="text-lg font-black text-slate-950 leading-snug mb-2">
                  Eigenmarke von Apollo, Fielmann oder Mister Spex?
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Viele Handelsmarken großer Optikerketten stammen von bekannten Markenherstellern (wie CooperVision oder Alcon). Unser Decoder gleicht Material, Wassergehalt und Geometrie objektiv ab.
                </p>
              </div>
              <div>
                <Link
                  to="/eigenmarken-decoder"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>Eigenmarke jetzt prüfen</span>
                  <ArrowRight className="w-4 h-4 text-emerald-200" />
                </Link>
              </div>
            </div>

            {/* Tool 2: Kostenrechner */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between hover:border-slate-300 transition">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
                  <Calculator className="w-3.5 h-3.5 text-sky-600" />
                  <span>Transparenz-Rechner</span>
                </div>
                <h3 className="text-lg font-black text-slate-950 leading-snug mb-2">
                  Was kosten deine Kontaktlinsen wirklich pro Tag?
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Berechne deine tatsächlichen Ausgaben pro Monat und Jahr für Tages- oder Monatslinsen – inklusive Pflegemittel und angepasst an deine Tragetage pro Woche.
                </p>
              </div>
              <div>
                <Link
                  to="/preisrechner"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>Zum Kostenrechner</span>
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                </Link>
              </div>
            </div>
          </div>
        </section>


        {/* MEDIZINISCHER PFLICHT-HINWEIS */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MedicalDisclaimer />
        </div>

        {/* TRANSPARENZ-STANDARD */}
        <TrustSection />

      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
