import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink, 
  Filter, 
  HelpCircle, 
  Sparkles, 
  Layers, 
  ArrowRightLeft,
  Calculator,
  Compass,
  FileCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS, getProductsByCategory } from '../data/products';
import { EIGENMARKEN_DATABASE } from '../data/eigenmarken';
import EigenmarkenDecoder from '../components/EigenmarkenDecoder';
import MedicalDisclaimer from '../components/MedicalDisclaimer';
import TrustSection from '../components/TrustSection';
import ScrollToTop from '../components/ScrollToTop';
import AdvisorChatbot from '../components/AdvisorChatbot';
import { trackProductComparisonStarted, trackProductClicked, trackAffiliateClick, trackPriceCalculatorUsed, trackSearchUsed, trackFilterUsed } from '../utils/tracking';

const AMAZON_TAG = 'esstri-21';
const AMAZON_SUBID = 'optical.de-21';

const getAmazonLink = (query) => {
  return `https://www.amazon.de/s?k=${encodeURIComponent(query)}&tag=${AMAZON_TAG}&ascsubtag=${AMAZON_SUBID}`;
};

export default function Home({ activeSection }) {
  // Filter & Suche
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeBrand, setActiveBrand] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Rechner State
  const [sph, setSph] = useState('-2.50');
  const [bc, setBc] = useState('8.6');
  const [dia, setDia] = useState('14.2');
  const [lensType, setLensType] = useState('Monatslinsen');
  const [daysPerWeek, setDaysPerWeek] = useState(7);

  // Gefilterte Produkte
  const filteredProducts = PRODUCTS.filter((item) => {
    // Kategorie
    if (activeCategory === 'monat' && !(item.lens_type.includes('Monatslinse') && !item.lens_type.includes('Torisch') && !item.lens_type.includes('Multifokal'))) return false;
    if (activeCategory === 'tag' && !(item.lens_type.includes('Tageslinse') && !item.lens_type.includes('Torisch'))) return false;
    if (activeCategory === 'toric' && !item.lens_type.includes('Torisch')) return false;
    if (activeCategory === 'multifocal' && !item.lens_type.includes('Multifokal')) return false;
    if (activeCategory === 'pflege' && !(item.lens_type.includes('Pflegemittel') || item.lens_type.includes('Augentropfen'))) return false;

    // Hersteller / Marke
    if (activeBrand !== 'all') {
      if (activeBrand === 'coopervision' && item.manufacturer !== 'CooperVision') return false;
      if (activeBrand === 'alcon' && item.manufacturer !== 'Alcon') return false;
      if (activeBrand === 'bausch' && item.manufacturer !== 'Bausch + Lomb') return false;
      if (activeBrand === 'johnson' && item.manufacturer !== 'Johnson & Johnson') return false;
    }

    // Suchtext
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      const matchName = item.product_name.toLowerCase().includes(q);
      const matchBrand = item.manufacturer.toLowerCase().includes(q);
      const matchMat = item.material ? item.material.toLowerCase().includes(q) : false;
      return matchName || matchBrand || matchMat;
    }

    return true;
  });

  // Smooth scroll helper
  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll to target section when route changes (e.g. /vergleichskatalog, /eigenmarken-decoder)
  useEffect(() => {
    if (activeSection) {
      const el = document.getElementById(activeSection);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      }
    } else if (window.location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeSection]);

  // Legacy hash cleanup fallback (e.g. bookmarks or external links)
  useEffect(() => {
    if (window.location.hash) {
      const sectionId = window.location.hash.replace('#', '');
      const el = document.getElementById(sectionId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      
      {/* NAVIGATION HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-sm">
              <Eye className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <span className="font-black text-2xl tracking-tight text-slate-900">optical<span className="text-emerald-600">.de</span></span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold text-slate-500 border-l border-slate-200 pl-2">Kontaktlinsen-Recherche &amp; Vergleich</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
            <Link
              to="/vergleichskatalog"
              onClick={() => scrollToSection('vergleich')}
              className="hover:text-emerald-700 transition font-medium text-slate-600"
            >
              Vergleichskatalog
            </Link>
            <Link
              to="/preisrechner"
              onClick={() => scrollToSection('rechner')}
              className="hover:text-emerald-700 transition font-medium text-slate-600"
            >
              Preisrechner
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Link
              to="/eigenmarken-decoder"
              onClick={() => scrollToSection('decoder')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow-sm transition flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
              <span>Eigenmarke prüfen</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>


      {/* HERO SECTION (Priorität 13: Kein Amazon-Katalog-Eindruck, Fokus auf die 3 Einstiege) */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-white via-slate-50 to-slate-100/70 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-950 tracking-tight leading-tight mb-4">
            Kontaktlinsen vergleichen.<br />
            <span className="text-emerald-600">Eigenmarken entschlüsseln.</span><br />
            Preise verstehen.
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Finden Sie heraus, welches Markenprodukt hinter Ihrer Optiker-Handelsmarke steckt, vergleichen Sie technische Spezifikationen und berechnen Sie Ihre tatsächlichen Kosten pro Tag.
          </p>

          {/* DIE DREI ZENTRALEN DIREKT-EINSTIEGE */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-6 text-left">
            
            {/* Einstieg 1: Meine Linse entschlüsseln */}
            <Link
              to="/eigenmarken-decoder"
              onClick={() => scrollToSection('decoder')}
              className="bg-white hover:bg-emerald-50/40 p-5 rounded-2xl border-2 border-emerald-500 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between text-left"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-3">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="font-extrabold text-slate-950 text-base group-hover:text-emerald-700 transition-colors">
                  Eigenmarke prüfen
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Apollo iWear, Fielmann ActiMed &amp; Co. aufdecken und Originale finden.
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-700 mt-4 flex items-center gap-1">
                <span>Zum Decoder</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            {/* Einstieg 2: Kontaktlinsen vergleichen */}
            <Link
              to="/vergleichskatalog"
              onClick={() => {
                trackProductComparisonStarted('hero_entry');
                scrollToSection('vergleich');
              }}
              className="bg-white hover:bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between text-left"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold mb-3">
                  <Layers className="w-5 h-5 text-slate-600" />
                </div>
                <h3 className="font-extrabold text-slate-950 text-base group-hover:text-slate-900 transition-colors">
                  Kontaktlinsen vergleichen
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Dk/t, Wassergehalt, Silikon-Hydrogel und Preise in der Datenmatrix.
                </p>
              </div>
              <span className="text-xs font-bold text-slate-700 mt-4 flex items-center gap-1">
                <span>Zur Übersicht</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            {/* Einstieg 3: Preis pro Tag berechnen */}
            <Link
              to="/preisrechner"
              onClick={() => scrollToSection('rechner')}
              className="bg-white hover:bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between text-left"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold mb-3">
                  <Calculator className="w-5 h-5 text-sky-600" />
                </div>
                <h3 className="font-extrabold text-slate-950 text-base group-hover:text-sky-700 transition-colors">
                  Preis pro Tag berechnen
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Monats- vs. Tageslinsen Kostenkalkulation anhand Ihrer Tragetage.
                </p>
              </div>
              <span className="text-xs font-bold text-sky-700 mt-4 flex items-center gap-1">
                <span>Zum Rechner</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

          </div>

          <div className="text-[11px] text-slate-500 font-medium">
            Sachlicher Vergleich · Transparente Datenquellen · Keine erfundenen Testsieger · Affiliate-Links gekennzeichnet
          </div>

        </div>
      </section>


      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* ZENTRALER USP: EIGENMARKEN-DECODER (Komponente) */}
        <EigenmarkenDecoder />

        {/* MEDIZINISCHER HINWEIS (Verpflichtend) */}
        <MedicalDisclaimer />

        {/* PRODUKTVERGLEICHS-KATALOG (#vergleich) */}
        <section id="vergleich" className="space-y-6 pt-4">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                DATENBANK &amp; SPEZIFIKATIONEN
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                Kontaktlinsen im technischen Datenvergleich
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Vergleichen Sie nachprüfbare Material- und Geometriewerte. Preise pro Einzellinse und Tragetag werden automatisch kalkuliert.
              </p>
            </div>

            {/* Suchfeld */}
            <div className="w-full md:w-72">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    trackSearchUsed(e.target.value);
                  }}
                  placeholder="Linsenname oder Material..."
                  className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                />
              </div>
            </div>
          </div>

          {/* KATEGORIE-TABS & HERSTELLER-FILTER */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            
            {/* Linsentyp Filter */}
            <div className="flex flex-wrap gap-1.5 text-xs">
              {[
                { key: 'all', label: 'Alle Produkte' },
                { key: 'monat', label: 'Monatslinsen' },
                { key: 'tag', label: 'Tageslinsen' },
                { key: 'toric', label: 'Torisch (Astigmatismus)' },
                { key: 'multifocal', label: 'Multifokal (Gleitsicht)' },
                { key: 'pflege', label: 'Pflegemittel' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActiveCategory(tab.key);
                    trackFilterUsed('category', tab.key);
                  }}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    activeCategory === tab.key
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Hersteller Filter */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-500 font-medium">Hersteller:</span>
              <select
                value={activeBrand}
                onChange={(e) => {
                  setActiveBrand(e.target.value);
                  trackFilterUsed('brand', e.target.value);
                }}
                className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 font-semibold text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="all">Alle Hersteller</option>
                <option value="coopervision">CooperVision</option>
                <option value="alcon">Alcon Vision Care</option>
                <option value="bausch">Bausch + Lomb</option>
                <option value="johnson">Johnson &amp; Johnson</option>
              </select>
            </div>

          </div>

          {/* PRODUKT-KARTEN GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((p) => (
              <div 
                key={p.id} 
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[11px] font-bold text-slate-500 uppercase">{p.manufacturer}</span>
                    <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">
                      {p.lens_type}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 leading-snug">
                    <Link to={`/${p.id === 'biofinity' ? 'biofinity' : p.id}`} className="hover:text-emerald-700 transition">
                      {p.product_name}
                    </Link>
                  </h3>
                  
                  <div className="mt-2 text-xs text-slate-500 flex items-center justify-between">
                    <span>Packungsgröße:</span>
                    <strong className="text-slate-800 font-semibold">{p.pack_size}</strong>
                  </div>

                  {/* Objektive Badges (Keine Siegel wie 'Testsieger') */}
                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {p.objective_badges.map((b, bIdx) => (
                      <span key={bIdx} className="bg-emerald-50 text-emerald-950 border border-emerald-200 text-[10px] font-semibold px-2 py-0.5 rounded">
                        {b}
                      </span>
                    ))}
                  </div>

                  {/* Spezifikations-Liste */}
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>Linsenmaterial:</span>
                      <strong className="text-slate-900 font-semibold">{p.material}</strong>
                    </div>
                    {p.dk_t && (
                      <div className="flex justify-between">
                        <span>Sauerstofffluss (Dk/t):</span>
                        <strong className="text-slate-900 font-semibold">{p.dk_t} Dk/t</strong>
                      </div>
                    )}
                    {p.water_content && (
                      <div className="flex justify-between">
                        <span>Wassergehalt:</span>
                        <strong className="text-slate-900 font-semibold">{p.water_content}</strong>
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

                {/* Preisteil & CTA */}
                <div className="mt-5 pt-3 border-t border-slate-100">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 mb-3 space-y-1 text-xs">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[11px] text-slate-500">Online-Vergleichspreis:</span>
                      <span className="text-base font-extrabold text-slate-900">ab {p.price.toFixed(2)} € *</span>
                    </div>
                    <div className="text-[9px] text-slate-400 italic">
                      Packungsgröße/Händler beachten.
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-600 pt-1 border-t border-slate-200/60">
                      <span>Preis pro Einzellinse:</span>
                      <span className="font-semibold text-slate-800">{p.price_per_lens || '–'}</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-600">
                      <span>Kosten pro Tragetag (2 Linsen):</span>
                      <span className="font-semibold text-emerald-700">{p.cost_per_day || '–'}</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-600">
                      <span>Kosten pro Monat (2 Linsen):</span>
                      <span className="font-semibold text-slate-800">{p.cost_per_month || '–'}</span>
                    </div>
                  </div>

                  {/* Quelle */}
                  <div className="text-[10px] text-slate-500 mb-2 px-1 flex justify-between items-center">
                    <span className="truncate">Quelle: {p.source_type || 'Herstellerangabe'}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to={`/${p.id === 'biofinity' ? 'biofinity' : p.id}`}
                      className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] py-2.5 px-2 rounded-xl text-center transition"
                    >
                      Datenblatt
                    </Link>
                    <a
                      href={getAmazonLink(p.amazon_query)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackAffiliateClick(p.product_name, 'amazon', 'home_catalog')}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] py-2.5 px-2 rounded-xl flex items-center justify-center gap-1 shadow-2xs transition"
                    >
                      <span>Amazon-Partnerlink *</span>
                      <ExternalLink className="w-3 h-3 text-emerald-400" />
                    </a>
                  </div>

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
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs">
              Keine Kontaktlinsen mit diesen Kriterien gefunden. Bitte passen Sie Ihre Filter an.
            </div>
          )}

        </section>


        {/* PARAMETER- & PREISRECHNER (#rechner) */}
        <section id="rechner" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          
          <div className="max-w-3xl mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Calculator className="w-3.5 h-3.5 text-sky-600" />
              Verbraucher-Tool
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Kontaktlinsen-Kostenrechner: Was kosten Linsen wirklich?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              Vergleichen Sie die realen Kosten pro Monat und Jahr zwischen Tages- und Monatslinsen basierend auf Ihren tatsächlichen Tragetagen.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Eingabefelder (7 cols) */}
            <div className="lg:col-span-7 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Linsentyp</label>
                  <select
                    value={lensType}
                    onChange={(e) => {
                      setLensType(e.target.value);
                      trackPriceCalculatorUsed(e.target.value, sph);
                    }}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 font-semibold text-slate-900"
                  >
                    <option>Monatslinsen (z. B. Biofinity)</option>
                    <option>Tageslinsen (z. B. Acuvue Moist / Clariti)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Tragetage pro Woche: {daysPerWeek} Tage</label>
                  <input
                    type="range"
                    min="1"
                    max="7"
                    value={daysPerWeek}
                    onChange={(e) => setDaysPerWeek(parseInt(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer mt-2"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>1 Tag (Gelegenheit)</span>
                    <span>4 Tage (Teilzeit)</span>
                    <span>7 Tage (Täglich)</span>
                  </div>
                </div>
              </div>

              {/* Erklärung zu den Werten */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-600 space-y-2 leading-relaxed">
                <h4 className="font-bold text-slate-900 text-xs">Hinweis zu Basiskurve (BC), Durchmesser (DIA) und Dk/t:</h4>
                <p>
                  • <strong>Basiskurve (BC):</strong> Beschreibt die Krümmung der Linse. Eine falsche Basiskurve kann zu Druckstellen oder mangelnder Tränenunterspülung führen.
                </p>
                <p>
                  • <strong>Dk/t:</strong> Die Sauerstofftransmissibilität ist eine physikalische Kenngröße. Sie sollte nicht isoliert zur Auswahl einer Linse herangezogen werden.
                </p>
              </div>
            </div>

            {/* Ergebnis-Panel (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-6 shadow-md space-y-4">
              <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-wider font-bold">Modellrechnung</span>
              <h3 className="text-lg font-black">Geschätzte Gesamtkosten</h3>
              
              <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Tragegewohnheit:</span>
                  <strong className="text-white">{daysPerWeek * 4} Tragetage / Monat</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Rechnerischer Preis pro Tragetag:</span>
                  <strong className="text-emerald-400 font-extrabold text-base">
                    {lensType.includes('Monats') ? 'ca. 0,22 € – 0,32 € / Tag' : `ca. ${(0.78 * 2).toFixed(2)} € / Tag`}
                  </strong>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Geschätzte Monatskosten (2 Augen):</span>
                  <strong className="text-white text-base">
                    {lensType.includes('Monats') 
                      ? 'ca. 6,63 € – 9,63 € (inkl. Pflege)' 
                      : `ca. ${(daysPerWeek * 4 * 1.57).toFixed(2)} €`}
                  </strong>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 text-[10px] text-slate-400 leading-normal">
                * Modellrechnung. Packungsgröße: 6er Packung (Monatslinsen) bzw. 30er Packung (Tageslinsen). Die tatsächliche Höhe hängt von individuellen Händlerkonditionen, Packungsgrößen und Pflegemitteln ab.
              </div>
            </div>

          </div>

        </section>


        {/* SCHNELLZUGRIFF AUF DIE SEO-VERGLEICHSSEITEN */}
        <section className="space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
            THEMATISCHE RECHERCHE-DOSSIERS
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Spezialisierte Vergleichsseiten &amp; Landingpages
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <Link 
              to="/tageslinsen-vergleich"
              className="bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-400 transition shadow-2xs group"
            >
              <span className="text-[10px] font-bold text-slate-400 uppercase">Kategorie</span>
              <h3 className="font-bold text-sm text-slate-900 mt-1 group-hover:text-emerald-700 transition">
                Tageslinsen-Vergleich →
              </h3>
              <p className="text-xs text-slate-500 mt-1">Dailies Total 1, Acuvue Moist &amp; Clariti</p>
            </Link>

            <Link 
              to="/monatslinsen-vergleich"
              className="bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-400 transition shadow-2xs group"
            >
              <span className="text-[10px] font-bold text-slate-400 uppercase">Kategorie</span>
              <h3 className="font-bold text-sm text-slate-900 mt-1 group-hover:text-emerald-700 transition">
                Monatslinsen-Vergleich →
              </h3>
              <p className="text-xs text-slate-500 mt-1">Biofinity, Air Optix &amp; B+L Ultra</p>
            </Link>

            <Link 
              to="/torische-kontaktlinsen"
              className="bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-400 transition shadow-2xs group"
            >
              <span className="text-[10px] font-bold text-slate-400 uppercase">Speziallinse</span>
              <h3 className="font-bold text-sm text-slate-900 mt-1 group-hover:text-emerald-700 transition">
                Torische Linsen (Astigmatismus) →
              </h3>
              <p className="text-xs text-slate-500 mt-1">Zylinder- und Achsen-Stabilität</p>
            </Link>

            <Link 
              to="/biofinity-vs-air-optix"
              className="bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-400 transition shadow-2xs group"
            >
              <span className="text-[10px] font-bold text-slate-400 uppercase">Direktvergleich</span>
              <h3 className="font-bold text-sm text-slate-900 mt-1 group-hover:text-emerald-700 transition">
                Biofinity vs. Air Optix →
              </h3>
              <p className="text-xs text-slate-500 mt-1">1:1 Parameter- und Preisvergleich</p>
            </Link>

          </div>
        </section>


        {/* TRANSPARENZ- & VERTRAUENSBEREICH (Komponente) */}
        <TrustSection />


        {/* FAQ BEREICH (Sachlich & rechtlich bereinigt) */}
        <section id="faq" className="space-y-6 pt-4">
          
          <div className="max-w-3xl">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
              HÄUFIG GESTELLTE FRAGEN
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Fragen zu Kontaktlinsen &amp; Optiker-Handelsmarken
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>Wie entstehen Optiker-Eigenmarken?</span>
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Optikerketten besitzen in der Regel keine eigenen Linsen-Fertigungsstätten. Sie beziehen lizenzierte Produkte der großen Hersteller (CooperVision, Alcon, Bausch + Lomb, Johnson &amp; Johnson) und verpacken diese unter eigenem Markennamen (Handelsmarke). Die chemische Materialzusammensetzung (USAN-Name) und die geometrischen Parameter sind in den technischen Herstellerangaben und Packungsdeklarationen dokumentiert.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>Was beschreibt der Dk/t-Wert?</span>
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Der Dk/t-Wert beschreibt die Sauerstofftransmissibilität einer Kontaktlinse bei einer bestimmten Mittendicke. Er ist eine technische Kenngröße und sollte nicht isoliert zur Auswahl einer Kontaktlinse verwendet werden, da auch Wassergehalt, Benetzung und Oberflächenmodifikation eine maßgebliche Rolle für die individuelle Verträglichkeit spielen.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>Kann man Brillenwerte 1:1 für Kontaktlinsen übernehmen?</span>
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Nein, in der Regel nicht. Da Kontaktlinsen direkt auf der Hornhaut aufliegen, während eine Brille ca. 12 mm vor dem Auge sitzt (Hornhaut-Scheitelabstand), weichen die Dioptrienwerte ab ca. +/- 4,00 dpt voneinander ab. Zudem erfordert die Kontaktlinse geometrische Werte wie Basiskurve (BC) und Durchmesser (DIA), die auf Brillenpässen nicht vorhanden sind.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>Sind Kontaktlinsen Medizinprodukte?</span>
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Ja, Kontaktlinsen und Kontaktlinsenpflegemittel unterliegen der europäischen Medizinprodukte-Verordnung (EU-MDR). Sie dürfen nur nach fachgerechter Erstanpassung und regelmäßiger augenärztlicher Nachkontrolle getragen werden, um Infektionen oder Hornhautschäden vorzubeugen.
              </p>
            </div>

          </div>

        </section>

      </main>


      {/* FOOTER */}
      <footer className="bg-slate-900 text-white py-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <div className="font-black text-xl tracking-tight text-white">optical<span className="text-emerald-400">.de</span></div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Die unabhängige Vergleichs- und Rechercheplattform für Kontaktlinsen &amp; Sehhilfen. Kein gesellschaftsrechtliches Verhältnis zu verglichenen Optikerketten oder Herstellern.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3">Kategorien</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/vergleichskatalog" onClick={() => scrollToSection('vergleich')} className="hover:text-white transition">Vergleichskatalog</Link></li>
              <li><Link to="/tageslinsen-vergleich" className="hover:text-white transition">Tageslinsen-Vergleich</Link></li>
              <li><Link to="/monatslinsen-vergleich" className="hover:text-white transition">Monatslinsen-Vergleich</Link></li>
              <li><Link to="/torische-kontaktlinsen" className="hover:text-white transition">Torische Linsen</Link></li>
              <li><Link to="/multifokale-kontaktlinsen" className="hover:text-white transition">Multifokale Linsen</Link></li>
              <li><Link to="/kontaktlinsen-preisvergleich" className="hover:text-white transition">Kontaktlinsen-Preisvergleich</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3">Eigenmarken-Dossiers</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/apollo-iwear-oxygen" className="hover:text-white transition">Apollo iWear Oxygen</Link></li>
              <li><Link to="/fielmann-actimed" className="hover:text-white transition">Fielmann ActiMed</Link></li>
              <li><Link to="/fielmann-atmo" className="hover:text-white transition">Fielmann Atmo</Link></li>
              <li><Link to="/mister-spex-true-day" className="hover:text-white transition">Mister Spex True Day</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3">Rechtliches</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/impressum" className="hover:text-white font-bold text-emerald-400 transition">→ Impressum</Link></li>
              <li><Link to="/datenschutz" className="hover:text-white transition">→ Datenschutzerklärung</Link></li>
              <li>
                <Link
                  to="/transparenz"
                  onClick={() => scrollToSection('trust')}
                  className="hover:text-white transition text-left text-slate-400 block"
                >
                  → So vergleichen wir
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  onClick={() => scrollToSection('faq')}
                  className="hover:text-white transition text-left text-slate-400 block"
                >
                  → Häufige Fragen (FAQ)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* AFFILIATE & MEDICAL DISCLAIMER BLOCK */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 border-t border-slate-800">
          <p className="text-slate-500 text-[11px] leading-relaxed">
            <strong className="text-slate-400">* Werbelink / Partnerlink:</strong> optical.de ist ein unabhängiges Vergleichsportal und steht in keinem gesellschaftsrechtlichen Verhältnis zu Apollo Optik, Fielmann, Mister Spex, Specsavers, CooperVision, Alcon, Bausch + Lomb oder Johnson &amp; Johnson. Mit Sternchen (*) gekennzeichnete Links sind Affiliate-Links zu Amazon.de. Bei einem Kauf über diese Links erhalten wir ggf. eine Provision vom Betreiber — für Sie entstehen keinerlei Mehrkosten. <strong className="text-slate-400">Medizinischer Hinweis:</strong> Die Informationen auf optical.de dienen dem Produktvergleich und ersetzen keine individuelle Anpassung oder Beratung durch Augenarzt oder Augenoptiker.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-slate-600 gap-2 text-center sm:text-left">
          <span>© {new Date().getFullYear()} Jens Kathe / optical.de Media. Alle Rechte vorbehalten.</span>
          <span className="text-slate-700">optical.de ist keine Augenarztpraxis und kein Optiker-Fachbetrieb.</span>
        </div>
      </footer>

      {/* FLOATING UTILITIES */}
      <ScrollToTop />
      <AdvisorChatbot />

    </div>
  );
}
