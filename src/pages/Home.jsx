import React, { useState } from 'react';
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
  ArrowUpRight
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MetaTags from '../components/MetaTags';
import MedicalDisclaimer from '../components/MedicalDisclaimer';
import TrustSection from '../components/TrustSection';
import ScrollToTop from '../components/ScrollToTop';
import { PRODUCTS } from '../data/products';
import { EIGENMARKEN_DATABASE } from '../data/eigenmarken';
import { useSavedLenses } from '../hooks/useSavedLenses';
import { trackSearchUsed, trackProductClicked, trackAffiliateClick } from '../utils/tracking';

const AMAZON_TAG = 'optical.de-21';
const AMAZON_SUBID = 'optical.de-21';

const getAmazonLink = (queryOrAsin, asin) => {
  if (asin) {
    return `https://www.amazon.de/dp/${asin}?tag=${AMAZON_TAG}`;
  }
  return `https://www.amazon.de/s?k=${encodeURIComponent(queryOrAsin)}&tag=${AMAZON_TAG}`;
};

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
  const navigate = useNavigate();
  const { savedIds, isSaved, toggleSave } = useSavedLenses();

  // Gefilterte Vorschläge während des Tippens
  const searchSuggestions = searchQuery.trim().length > 0
    ? [
        ...PRODUCTS.filter(p => p.product_name.toLowerCase().includes(searchQuery.toLowerCase()) || p.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 4).map(p => ({
          label: p.product_name,
          sub: `${p.manufacturer} · ${p.lens_type}`,
          path: `/${p.id === 'biofinity' ? 'biofinity' : p.id}`
        })),
        ...EIGENMARKEN_DATABASE.filter(e => e.optician_private_label.toLowerCase().includes(searchQuery.toLowerCase()) || e.optician_chain.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3).map(e => ({
          label: e.optician_private_label,
          sub: `${e.optician_chain} · Entspricht ${e.original_brand_name}`,
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
        description="Finde deine gewohnten Kontaktlinsen, prüfe verfügbare Angebote und merke sie dir für deinen nächsten Kauf. Unabhängig, werbefrei & ohne erfundene Siegel."
        canonical="https://www.optical.de/"
      />
      <Header />

      <main className="w-full flex-grow space-y-12 sm:space-y-16">
        
        {/* HERO SECTION: NACHKAUF-FOKUS */}
        <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100/80 border-b border-slate-200 py-12 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-5">
              <Eye className="w-3.5 h-3.5 text-emerald-600" />
              <span>Unabhängige Nachkauf-Plattform</span>
            </div>

            {/* H1 & Subtitle (Exakt nach Vorgabe) */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-950 tracking-tight leading-tight mb-4">
              Deine Kontaktlinsen.<br />
              <span className="text-emerald-600">Einfach wiederfinden.</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              Finde deine gewohnten Kontaktlinsen, prüfe verfügbare Angebote und merke sie dir für deinen nächsten Kauf.
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


        {/* SCHNELLZUGRIFF: MEINE GEMERKTEN LINSEN (falls vorhanden) */}
        {savedIds.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-1">
                  <Bookmark className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                  <span>Deine gemerkten Linsen ({savedIds.length})</span>
                </div>
                <h2 className="text-xl font-extrabold text-slate-950">
                  Bereit für die nächste Nachbestellung
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Du hast {savedIds.length} {savedIds.length === 1 ? 'Kontaktlinse' : 'Kontaktlinsen'} auf deinem Merkzettel hinterlegt.
                </p>
              </div>

              <Link
                to="/meine-linsen"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-xs transition flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>Merkzettel öffnen</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>
        )}


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


        {/* KOMPAKTE PRODUKTAUSWAHL (Häufig nachgekaufte Linsen) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5 mb-8">
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                BELIEBTE LINSEN
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mt-1">
                Häufig nachgekaufte Kontaktlinsen
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Kompakte Auswahl geprüfter Markenlinsen mit transparenten Datenblättern.
              </p>
            </div>

            <Link
              to="/vergleichskatalog"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 transition"
            >
              <span>Alle Linsen im Katalog anzeigen</span>
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
              className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none"
            >
              <option value="popular">Standard</option>
              <option value="price_asc">Preis aufsteigend</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((p) => {
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
                        to={`/${p.id === 'biofinity' ? 'biofinity' : p.id}`} 
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

                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        to={`/${p.id === 'biofinity' ? 'biofinity' : p.id}`}
                        className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] py-2.5 px-2 rounded-xl text-center transition"
                      >
                        Datenblatt
                      </Link>
                      <a
                        href={getAmazonLink(p.amazon_query, p.asin)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackAffiliateClick(p.product_name, 'amazon', 'home_featured')}
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
              );
            })}
          </div>
        </section>


        {/* DECODER TEASER SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Optiker-Eigenmarken</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                Trägst du eine Eigenmarke von Apollo, Fielmann oder Mister Spex?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Viele Handelsmarken großer Optikerketten stammen von bekannten Linsenherstellern (wie CooperVision oder Alcon). Unser Decoder gleicht Material, Wassergehalt und Geometrie objektiv ab.
              </p>
              <div className="flex flex-wrap gap-2 pt-2 text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">Apollo iWear Oxygen</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">Fielmann ActiMed</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">Mister Spex True Day</span>
              </div>
            </div>

            <div className="flex-shrink-0 w-full lg:w-auto">
              <Link
                to="/eigenmarken-decoder"
                className="w-full lg:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm px-7 py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg transition"
              >
                <span>Eigenmarke jetzt prüfen</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>


        {/* KOSTENRECHNER TEASER SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-800 text-xs font-bold uppercase tracking-wider">
                <Calculator className="w-3.5 h-3.5 text-sky-600" />
                <span>Transparenz-Rechner</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950">
                Was kosten deine Kontaktlinsen wirklich pro Tag?
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Berechne deine tatsächlichen Ausgaben pro Monat und Jahr für Tages- oder Monatslinsen – inklusive Pflegemittel und angepasst an deine Tragetage pro Woche.
              </p>
            </div>

            <Link
              to="/preisrechner"
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-xs transition flex items-center gap-2 whitespace-nowrap"
            >
              <span>Zum Kostenrechner</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </Link>
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
