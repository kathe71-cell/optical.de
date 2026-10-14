import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MetaTags from '../components/MetaTags';
import MedicalDisclaimer from '../components/MedicalDisclaimer';
import TrustSection from '../components/TrustSection';
import ScrollToTop from '../components/ScrollToTop';
import { PRODUCTS } from '../data/products';
import { getProductAffiliateUrl, getAffiliateCtaLabel, AFFILIATE_LINK_REL } from '../utils/affiliate';

export default function MonatsVsTagesGuide() {
  const tageslinsen = PRODUCTS.filter(p => p.lens_type.toLowerCase().includes('tageslinse') && !p.lens_type.toLowerCase().includes('torisch')).slice(0, 3);
  const monatslinsen = PRODUCTS.filter(p => p.lens_type.toLowerCase().includes('monatslinse') && !p.lens_type.toLowerCase().includes('torisch')).slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col justify-between">
      <MetaTags
        title="Tageslinsen vs. Monatslinsen: Kosten-Vergleich | optical.de"
        description="Tageslinsen oder Monatslinsen? Wir vergleichen die echten Jahreskosten, Pflegeaufwand und wann sich welche Linse lohnt. Mit konkreten Zahlen und Empfehlungen."
        canonical="https://www.optical.de/ratgeber/tageslinsen-vs-monatslinsen-kosten"
      />
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-grow">
        {/* Breadcrumb Navigation */}
        <div className="text-xs text-slate-500 flex items-center gap-2 mb-6">
          <Link to="/" className="hover:text-emerald-700">Startseite</Link>
          <span>/</span>
          <span className="font-semibold text-slate-900 truncate max-w-xs">Tageslinsen vs. Monatslinsen Kosten</span>
        </div>

        {/* Title Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold px-2.5 py-1 rounded-full">Ratgeber</span>
            <span className="text-slate-500 text-sm">Lesezeit: ca. 6 Min.</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-950 tracking-tight mb-4">
            Tageslinsen vs. Monatslinsen: Was ist wirklich günstiger?
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Die kurze Antwort: Es kommt auf deine Tragehäufigkeit an. Die lange Antwort mit echten Zahlen findest du hier.
          </p>
        </div>

        {/* Medical Disclaimer */}
        <MedicalDisclaimer className="mb-8" />

        <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-black text-slate-950 mb-3">Kurz-Antwort &amp; Kosten-Schwelle</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs">
              <div className="font-bold text-slate-900 mb-2">Tageslinsen lohnen sich rechnerisch wenn…</div>
              <ul className="text-sm text-slate-600 space-y-1.5">
                <li>• Du die Linsen an bis zu 2 Tagen pro Woche trägst (z. B. Sport oder Wochenende)</li>
                <li>• Du keinen Aufwand für tägliche Reinigung und Aufbewahrung möchtest</li>
                <li>• Du maximale Hygiene ohne Pflegemittel bevorzugst</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs">
              <div className="font-bold text-slate-900 mb-2">Monatslinsen lohnen sich rechnerisch wenn…</div>
              <ul className="text-sm text-slate-600 space-y-1.5">
                <li>• Du die Linsen an 3 oder mehr Tagen pro Woche trägst</li>
                <li>• Du deine Jahreskosten bei regelmäßigem Tragen minimieren willst</li>
                <li>• Eine sorgfältige tägliche Reinigung für dich selbstverständlich ist</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs mb-8">
          <h2 className="text-xl font-black text-slate-950 mb-4">Die echten Jahreskosten im Vergleich</h2>
          <p className="text-sm text-slate-600 mb-6 leading-relaxed">
            Viele Vergleiche ignorieren die notwendigen Pflegemittelkosten bei Monatslinsen. In dieser Modellrechnung stellen wir realistische Marktpreise transparenter Markenprodukte gegenüber (Basis: 52 Wochen/Jahr, beide Augen).
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left p-3 font-semibold text-slate-700">Tragehäufigkeit</th>
                  <th className="text-center p-3 font-semibold text-slate-800">Tageslinsen (Standard, ~1,30 &euro;/Paar)</th>
                  <th className="text-center p-3 font-semibold text-emerald-800">Monatslinsen (Linsen + Pflege)</th>
                  <th className="text-center p-3 font-semibold text-slate-700">Kostenvorteil</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                <tr className="hover:bg-slate-50"><td className="p-3 font-medium text-slate-900">1× pro Woche (52 Tage)</td><td className="p-3 text-center text-slate-800 font-mono">68 &euro;</td><td className="p-3 text-center text-emerald-800 font-mono font-medium">190 &euro;</td><td className="p-3 text-center font-bold text-slate-900">Tageslinse (-122 &euro;)</td></tr>
                <tr className="hover:bg-slate-50"><td className="p-3 font-medium text-slate-900">2× pro Woche (104 Tage)</td><td className="p-3 text-center text-slate-800 font-mono">135 &euro;</td><td className="p-3 text-center text-emerald-800 font-mono font-medium">190 &euro;</td><td className="p-3 text-center font-bold text-slate-900">Tageslinse (-55 &euro;)</td></tr>
                <tr className="hover:bg-slate-50"><td className="p-3 font-medium text-slate-900">3× pro Woche (156 Tage)</td><td className="p-3 text-center text-slate-800 font-mono">203 &euro;</td><td className="p-3 text-center text-emerald-800 font-mono font-medium">190 &euro;</td><td className="p-3 text-center font-bold text-emerald-700">Monatslinse (-13 &euro;)</td></tr>
                <tr className="hover:bg-slate-50"><td className="p-3 font-medium text-slate-900">5× pro Woche (260 Tage)</td><td className="p-3 text-center text-slate-800 font-mono">338 &euro;</td><td className="p-3 text-center text-emerald-800 font-mono font-medium">190 &euro;</td><td className="p-3 text-center font-bold text-emerald-700">Monatslinse (-148 &euro;)</td></tr>
                <tr className="hover:bg-slate-50"><td className="p-3 font-medium text-slate-900">Täglich / 7× (365 Tage)</td><td className="p-3 text-center text-slate-800 font-mono">475 &euro;</td><td className="p-3 text-center text-emerald-800 font-mono font-medium">190 &euro;</td><td className="p-3 text-center font-bold text-emerald-700">Monatslinse (-285 &euro;)</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-4 leading-relaxed border-t border-slate-100 pt-3">
            * Modellrechnung: Monatslinsen kalkuliert mit ca. 120 &euro; für 12 Linsenpaare/Jahr (z. B. 4x 6er Pack gängiger Silikon-Hydrogel-Monatslinsen zu je ca. 30 &euro;) zzgl. ca. 70 &euro; für All-in-One Kombilösungen (ca. 6 Flaschen à 300–360 ml/Jahr). Tageslinsen kalkuliert mit ca. 0,65 &euro; pro Einzellinse (1,30 &euro; pro Paar). Tatsächliche Preise hängen vom gewählten Produkt, individuellen Verordnungen und Packungsgrößen ab.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-black text-slate-950 mb-4">Gängige Tageslinsen im Überblick</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {tageslinsen.map(p => (
              <a key={p.id} href={getProductAffiliateUrl(p)} target="_blank" rel={AFFILIATE_LINK_REL}
                className="block bg-white rounded-xl border border-slate-200 p-4 hover:border-emerald-300 hover:shadow-xs transition">
                <div className="font-bold text-slate-900 text-sm mb-1">{p.product_name}</div>
                <div className="text-xs text-slate-500 mb-2">{p.pack_size}</div>
                <div className="text-emerald-700 font-black text-sm">{p.price_per_day} / Tag</div>
                <div className="text-xs text-slate-600 font-medium mt-1">{getAffiliateCtaLabel(p)} →</div>
              </a>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-black text-slate-950 mb-4">Gängige Monatslinsen im Überblick</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {monatslinsen.map(p => (
              <a key={p.id} href={getProductAffiliateUrl(p)} target="_blank" rel={AFFILIATE_LINK_REL}
                className="block bg-white rounded-xl border border-slate-200 p-4 hover:border-emerald-300 hover:shadow-xs transition">
                <div className="font-bold text-slate-900 text-sm mb-1">{p.product_name}</div>
                <div className="text-xs text-slate-500 mb-2">{p.pack_size}</div>
                <div className="text-emerald-700 font-black text-sm">{p.price_per_day} / Tag</div>
                <div className="text-xs text-slate-600 font-medium mt-1">{getAffiliateCtaLabel(p)} →</div>
              </a>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 text-white text-center mb-8">
          <h2 className="text-xl font-bold mb-2">Preise direkt vergleichen</h2>
          <p className="text-slate-300 text-sm mb-4">Alle Linsen mit echten Kosten pro Tag — transparent berechnet.</p>
          <Link to="/vergleichskatalog" className="inline-block bg-white hover:bg-slate-100 text-slate-950 font-bold px-6 py-3 rounded-xl transition shadow-xs text-sm">
            Zum Preisvergleich →
          </Link>
        </div>

        <div className="p-4 bg-slate-100 rounded-xl text-xs text-slate-600 leading-relaxed">
          * Werbelink / Partnerlink: Als Amazon-Partner verdient optical.de an qualifizierten Verkäufen. Kontaktlinsen sind Medizinprodukte. Dieser Artikel dient der Information und ersetzt keine augenärztliche Beratung.
        </div>

        {/* Vertrauensbereich */}
        <div className="mt-12">
          <TrustSection />
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
