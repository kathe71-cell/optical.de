import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Bookmark, 
  ExternalLink, 
  Check, 
  SlidersHorizontal,
  Info,
  ShieldCheck, 
  RotateCcw
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
import { 
  trackSearchUsed, 
  trackZeroResults, 
  trackFilterUsed, 
  trackAffiliateClick,
  trackProductClicked
} from '../utils/tracking';

import { getAffiliateSearchUrl, getAffiliateCtaLabel, AFFILIATE_LINK_REL } from '../utils/affiliate';

const AMAZON_TAG = 'optical.de-21';
const AMAZON_SUBID = 'optical.de-21';

const getAmazonLink = (queryOrAsin, asin) => getAffiliateSearchUrl(queryOrAsin, asin);

export default function VergleichskatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(urlQuery);
  const [activeCategory, setActiveCategory] = useState('all'); // 'all', 'monat', 'zweiwoche', 'tag', 'pflege', 'tropfen', 'zubehoer'
  const [activeDesign, setActiveDesign] = useState('all'); // 'all', 'sphaerisch', 'torisch', 'multifokal'
  const [activeBrand, setActiveBrand] = useState('all'); // 'all', 'coopervision', 'alcon', 'bausch-lomb', 'johnson-johnson-vision'
  const [activeMaterial, setActiveMaterial] = useState('all'); // 'all', 'silicone', 'hydrogel'
  const [sortBy, setSortBy] = useState('popular'); // 'popular', 'price_asc', 'dkt_desc'

  const { isSaved, toggleSave } = useSavedLenses();
  const [compareList, setCompareList] = useState([]);

  const toggleCompare = (id) => {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p) return;
    
    // Verhindere Cross-Category-Vergleich von Nicht-Linsen mit Linsen
    if (!compareList.includes(id)) {
      if (p.category !== 'kontaktlinsen') {
        alert('Pflegemittel, Augentropfen und Zubehör können nicht in der Kontaktlinsen-Vergleichsmatrix verglichen werden.');
        return;
      }
      const existingLenses = compareList.map(x => PRODUCTS.find(prod => prod.id === x)).filter(Boolean);
      if (existingLenses.some(el => el.category !== 'kontaktlinsen')) {
        alert('Ein Vergleich ist nur zwischen Kontaktlinsen möglich.');
        return;
      }
    }

    setCompareList(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : prev.length < 4 ? [...prev, id] : prev
    );
  };

  // URL-Parameter 'q' bei direkter Navigation oder Browser-Zurück/Vorwärts übernehmen
  useEffect(() => {
    const q = searchParams.get('q') || '';
    setSearchQuery(q);
  }, [searchParams]);

  // Gefilterte & sortierte Produkte
  const filteredProducts = PRODUCTS.filter((item) => {
    // 1. Austauschintervall / Produktkategorie
    if (activeCategory === 'monat' && item.wear_schedule !== 'monatslinsen') return false;
    if (activeCategory === 'zweiwoche' && item.wear_schedule !== 'zweiwochenlinsen') return false;
    if (activeCategory === 'tag' && item.wear_schedule !== 'tageslinsen') return false;
    if (activeCategory === 'pflege' && item.category !== 'pflegemittel') return false;
    if (activeCategory === 'tropfen' && item.category !== 'augentropfen') return false;
    if (activeCategory === 'zubehoer' && item.category !== 'zubehoer') return false;

    // 2. Linsenausführung (Sphärisch, Torisch, Multifokal) - unabhängig kombinierbar
    if (activeDesign === 'sphaerisch' && item.design_type !== 'sphaerisch') return false;
    if (activeDesign === 'torisch' && item.design_type !== 'torisch') return false;
    if (activeDesign === 'multifokal' && item.design_type !== 'multifokal') return false;

    // 3. Hersteller über normalisierte manufacturer_id
    if (activeBrand !== 'all' && item.manufacturer_id !== activeBrand) return false;

    // 4. Material-Typ (strikte Prüfung nur auf Kontaktlinsen)
    if (activeMaterial === 'silicone') {
      if (item.category !== 'kontaktlinsen' || item.material_type !== 'silikon-hydrogel') return false;
    }
    if (activeMaterial === 'hydrogel') {
      if (item.category !== 'kontaktlinsen' || item.material_type !== 'hydrogel') return false;
    }

    // 5. Textsuche mit Token-Zerlegung, Aliasen, Intervall-Synonymen & Packungsgrößen
    if (searchQuery.trim().length > 0) {
      const searchTokens = searchQuery
        .toLowerCase()
        .trim()
        .split(/\s+/)
        .filter(Boolean);

      // Zugeordnete Handelsmarken für dieses Produkt finden
      const relatedEigenmarken = EIGENMARKEN_DATABASE.filter(
        (em) => em.matched_brand_product_id === item.id
      ).map((em) => `${em.optician_private_label} ${em.optician_chain}`).join(' ');

      const aliasesStr = Array.isArray(item.aliases) ? item.aliases.join(' ') : '';

      // Intervall-Synonyme anreichern
      let intervalSynonyms = '';
      if (item.wear_schedule === 'zweiwochenlinsen') intervalSynonyms = '2 wochen 2-wochen zweiwochen 14 tage 14-tage';
      else if (item.wear_schedule === 'monatslinsen') intervalSynonyms = 'monat monatslinse 30 tage monatlich';
      else if (item.wear_schedule === 'tageslinsen') intervalSynonyms = 'tag tageslinse 1 tag daily einweg';

      const searchableText = [
        item.product_name,
        item.manufacturer,
        item.brand || '',
        item.material || '',
        item.lens_type || '',
        item.replacement_schedule || '',
        item.pack_size || '',
        item.id,
        item.amazon_query || '',
        intervalSynonyms,
        aliasesStr,
        relatedEigenmarken
      ].join(' ').toLowerCase();

      // Jedes Token muss vorkommen (AND-Logik)
      const matchesAllTokens = searchTokens.every((token) => searchableText.includes(token));
      if (!matchesAllTokens) return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'price_asc') return a.price - b.price;
    if (sortBy === 'dkt_desc') return (b.dk_t || 0) - (a.dk_t || 0);
    return 0; // standard / popular
  });

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    trackSearchUsed(val);

    const newParams = new URLSearchParams(searchParams);
    if (val.trim()) {
      newParams.set('q', val);
    } else {
      newParams.delete('q');
    }
    setSearchParams(newParams, { replace: true });

    if (val.trim().length > 2 && filteredProducts.length === 0) {
      trackZeroResults(val);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('q');
    setSearchParams(newParams, { replace: true });
  };

  const resetFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
    setActiveDesign('all');
    setActiveBrand('all');
    setActiveMaterial('all');
    setSortBy('popular');
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('q');
    setSearchParams(newParams, { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col justify-between">
      <MetaTags 
        title="Kontaktlinsen finden & vergleichen | optical.de Katalog"
        description="Vergleiche technische Spezifikationen marktgängiger Kontaktlinsen (Biofinity, Dailies Total 1, Acuvue uvm.): Dk/t, Basiskurve, Wassergehalt und Preise."
        canonical="https://www.optical.de/vergleichskatalog"
      />
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-grow">
        
        {/* Breadcrumb Navigation */}
        <div className="text-xs text-slate-500 flex items-center gap-2 mb-6">
          <Link to="/" className="hover:text-emerald-700">Startseite</Link>
          <span>/</span>
          <span className="font-semibold text-slate-900">Kontaktlinsen-Vergleichskatalog</span>
        </div>

        {/* Header Title & Intro */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-600" />
            Objektive Spezifikationen
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Kontaktlinsen finden &amp; vergleichen
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            Filtern Sie nach Linsentyp, Hersteller und Material. Prüfen Sie verifizierte Hersteller-Parameter und finden Sie transparente Händlerangebote zum Nachkauf.
          </p>
        </div>

        {/* Filter- & Suchleiste (Direkter Einstieg oben) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs mb-8 space-y-4">
          
          {/* Suche & Sortierung */}
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            <div className="relative flex-grow">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Linsenname, Hersteller oder Material suchen (z. B. Biofinity, Comfilcon)..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-700"
                  aria-label="Suche leeren"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Sortieren nach:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Katalog sortieren nach"
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="popular">Standard / Beliebt</option>
                <option value="price_asc">Niedrigster Packungspreis</option>
                <option value="dkt_desc">Höchster Dk/t-Wert (Sauerstoff)</option>
              </select>
            </div>
          </div>

          {/* Filter-Zeile: Kategorien, Design, Hersteller, Material */}
          <div className="pt-3 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
            
            {/* Linsentyp & Kategorie Pills */}
            <div className="flex flex-wrap gap-1.5 text-xs">
              {[
                { key: 'all', label: 'Alle Produkte' },
                { key: 'monat', label: 'Monatslinsen' },
                { key: 'zweiwoche', label: '2-Wochen-Linsen' },
                { key: 'tag', label: 'Tageslinsen' },
                { key: 'pflege', label: 'Pflegemittel' },
                { key: 'tropfen', label: 'Augentropfen' },
                { key: 'zubehoer', label: 'Zubehör' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActiveCategory(tab.key);
                    trackFilterUsed('category', tab.key);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    activeCategory === tab.key
                      ? 'bg-slate-950 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Dropdowns für Linsenausführung, Hersteller & Material */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <select
                value={activeDesign}
                onChange={(e) => {
                  setActiveDesign(e.target.value);
                  trackFilterUsed('design', e.target.value);
                }}
                aria-label="Linsenausführung filtern"
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-semibold text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">Alle Ausführungen</option>
                <option value="sphaerisch">Sphärisch (Standard)</option>
                <option value="torisch">Torisch (Hornhautverkrümmung)</option>
                <option value="multifokal">Multifokal (Gleitsicht)</option>
              </select>

              <select
                value={activeBrand}
                onChange={(e) => {
                  setActiveBrand(e.target.value);
                  trackFilterUsed('brand', e.target.value);
                }}
                aria-label="Hersteller filtern"
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-semibold text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">Alle Hersteller</option>
                <option value="coopervision">CooperVision</option>
                <option value="alcon">Alcon</option>
                <option value="bausch-lomb">Bausch + Lomb</option>
                <option value="johnson-johnson-vision">Johnson &amp; Johnson</option>
              </select>

              <select
                value={activeMaterial}
                onChange={(e) => {
                  setActiveMaterial(e.target.value);
                  trackFilterUsed('material', e.target.value);
                }}
                aria-label="Linsenmaterial filtern"
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-semibold text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">Alle Materialien</option>
                <option value="silicone">Silikon-Hydrogel (hoher Dk/t)</option>
                <option value="hydrogel">Klassisches Hydrogel</option>
              </select>

              {(activeCategory !== 'all' || activeDesign !== 'all' || activeBrand !== 'all' || activeMaterial !== 'all' || searchQuery) && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-rose-600 px-2 py-1 transition"
                  title="Filter zurücksetzen"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

          </div>

          {/* Treffer-Zähler */}
          <div className="text-xs text-slate-500 pt-2 flex items-center justify-between">
            <span>
              {filteredProducts.length} {filteredProducts.length === 1 ? 'Kontaktlinse' : 'Kontaktlinsen'} gefunden
              {searchQuery.trim() ? ` für „${searchQuery.trim()}“` : ''}
            </span>
            <span className="text-[11px] text-slate-400">Verifizierte Herstellerdaten ohne Siegel</span>
          </div>
        </div>

        {/* VERGLEICHS-LEISTE */}
        {compareList.length > 0 && (
          <div className="sticky top-0 z-40 bg-emerald-900 text-white rounded-2xl px-5 py-3 mb-4 flex items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Vergleichen:</span>
              {compareList.map(id => {
                const prod = PRODUCTS.find(p => p.id === id);
                return (
                  <span key={id} className="bg-emerald-700 text-white text-xs font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                    {prod?.product_name}
                    <button onClick={() => toggleCompare(id)} className="text-emerald-300 hover:text-white ml-0.5">✕</button>
                  </span>
                );
              })}
            </div>
            <div className="flex items-center gap-2">
              <Link
                to={`/vergleich?ids=${compareList.join(',')}`}
                className="bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-black text-xs px-4 py-2 rounded-xl transition whitespace-nowrap"
              >
                Jetzt vergleichen →
              </Link>
              <button onClick={() => setCompareList([])} className="text-emerald-400 hover:text-white text-xs font-bold">
                Alle löschen
              </button>
            </div>
          </div>
        )}

        {/* PRODUKT-GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredProducts.map((p) => {
            const saved = isSaved(p.id);

            return (
              <div 
                key={p.id} 
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition group"
              >
                <div>
                  {/* Header-Zeile mit Hersteller, Linsentyp & Merken-Button */}
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
                        aria-label={`${p.product_name} ${saved ? 'aus Merkliste entfernen' : 'merken'}`}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-emerald-600' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Titel */}
                  <h2 className="text-lg font-black text-slate-900 leading-snug">
                    <Link 
                      to={p.id === 'biofinity' ? '/biofinity' : `/produkt/${p.id}`} 
                      onClick={() => trackProductClicked(p.id, p.product_name)}
                      className="hover:text-emerald-700 transition"
                    >
                      {p.product_name}
                    </Link>
                  </h2>
                  
                  <div className="mt-2 text-xs text-slate-500 flex items-center justify-between">
                    <span>Packungsgröße:</span>
                    <strong className="text-slate-800 font-semibold">{p.pack_size}</strong>
                  </div>

                  {/* Objektive Badges */}
                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {p.objective_badges?.map((b, bIdx) => (
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

                {/* Preisteil & CTAs */}
                <div className="mt-5 pt-3 border-t border-slate-100">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 mb-3 space-y-1 text-xs">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[11px] text-slate-600 font-medium">Beispielpreis auf Amazon.de:</span>
                      <span className="text-base font-extrabold text-slate-900">ca. {p.price.toFixed(2)} € *</span>
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Tagesaktueller Händlerpreis auf Amazon.de einsehbar
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-600 pt-1 border-t border-slate-200/60">
                      <span>Preis pro Einzellinse:</span>
                      <span className="font-semibold text-slate-800">{p.price_per_lens || '–'}</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-600">
                      <span>Kosten pro Tragetag (2 Linsen):</span>
                      <span className="font-semibold text-emerald-700">{p.cost_per_day || '–'}</span>
                    </div>
                  </div>

                  {/* CTA-Hierarchie: Primärer Amazon-Button prominent, Sekundäraktionen Datenblatt & Vergleich sauber getrennt */}
                  <div className="space-y-2">
                    <a
                      href={getAmazonLink(p.amazon_query, p.asin)}
                      target="_blank"
                      rel={AFFILIATE_LINK_REL}
                      onClick={() => trackAffiliateClick(p.product_name, 'amazon', 'vergleichskatalog')}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-2xs transition"
                    >
                      <span className="truncate">{getAffiliateCtaLabel(p)}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    </a>

                    <div className="grid grid-cols-2 gap-2 card-action-grid">
                      <Link
                        to={p.id === 'biofinity' ? '/biofinity' : `/produkt/${p.id}`}
                        onClick={() => trackProductClicked(p.id, p.product_name)}
                        className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2 px-2 rounded-xl text-center transition"
                      >
                        Datenblatt
                      </Link>
                      <button
                        onClick={() => toggleCompare(p.id)}
                        className={`w-full font-bold text-xs py-2 px-2 rounded-xl text-center transition border ${
                          compareList.includes(p.id)
                            ? 'bg-emerald-600 text-white border-emerald-700'
                            : compareList.length >= 4 && !compareList.includes(p.id)
                            ? 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed'
                            : 'bg-white text-emerald-700 border-emerald-300 hover:bg-emerald-50'
                        }`}
                        disabled={compareList.length >= 4 && !compareList.includes(p.id)}
                      >
                        {compareList.includes(p.id) ? '✓ Im Vergleich' : '+ Vergleichen'}
                      </button>
                    </div>
                  </div>

                  <div className="text-center mt-2 text-[9px] text-slate-400 leading-tight">
                    * Werbelink / Partnerlink (Amazon.de) · Beispielpreis Stand 09/2026 · Tagesaktueller Preis auf Amazon.de einsehbar · Preise können abweichen
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="p-10 sm:p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-600 shadow-xs mb-12">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 text-slate-600 flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-slate-500" />
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 mb-2">
              Keine Kontaktlinsen für {searchQuery.trim() ? `„${searchQuery.trim()}“` : 'diese Filterung'} gefunden
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6 leading-relaxed">
              Überprüfe bitte die Schreibweise oder setze die Filtereinstellungen zurück, um alle Produkte im Katalog anzuzeigen.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-xs transition"
                >
                  Suche zurücksetzen
                </button>
              )}
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition"
              >
                Alle Filter zurücksetzen
              </button>
            </div>
          </div>
        )}

        {/* Medizinischer Pflicht-Hinweis */}
        <MedicalDisclaimer className="mb-12" />

        {/* Transparenz-Standard */}
        <TrustSection />

      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
