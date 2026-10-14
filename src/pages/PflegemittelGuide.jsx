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

export default function PflegemittelGuide() {
  const pflegemittel = PRODUCTS.filter(p => p.lens_type.toLowerCase().includes('pflegemittel') || p.lens_type.toLowerCase().includes('augentropfen'));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col justify-between">
      <MetaTags
        title="Kontaktlinsen-Pflegemittel: Systeme & Unterschiede im Vergleich | optical.de"
        description="All-in-One-Lösungen, Peroxidsysteme und Kochsalzlösungen im objektiven Vergleich: Inhaltsstoffe, Einwirkzeiten und Verträglichkeit im Überblick."
        canonical="https://www.optical.de/ratgeber/kontaktlinsen-pflegemittel-vergleich"
      />
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-grow">
        {/* Breadcrumb Navigation */}
        <div className="text-xs text-slate-500 flex items-center gap-2 mb-6">
          <Link to="/" className="hover:text-emerald-700">Startseite</Link>
          <span>/</span>
          <span className="font-semibold text-slate-900 truncate max-w-xs">Kontaktlinsen-Pflegemittel</span>
        </div>

        {/* Title Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold px-2.5 py-1 rounded-full">Ratgeber</span>
            <span className="text-slate-500 text-sm">Lesezeit: ca. 7 Min.</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-950 tracking-tight mb-4">
            Kontaktlinsen-Pflegemittel: Systeme &amp; Unterschiede im Vergleich
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            All-in-One, H2O2 oder Kochsalzlösung? Wir erklären die Unterschiede und zeigen, wann welches System sinnvoll ist.
          </p>
        </div>

        {/* Medical Disclaimer */}
        <MedicalDisclaimer className="mb-8" />

        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-6 mb-8 text-xs text-amber-950 leading-relaxed">
          <h2 className="text-base font-black text-amber-900 mb-2">Wichtiger Anwendungshinweis:</h2>
          <p>
            Nicht jedes Pflegemittel ist mit jedem Kontaktlinsenmaterial kompatibel. Beachten Sie stets die Packungsbeilage sowie die Empfehlung Ihres Augenoptikers oder Augenarztes. Bei Rötungen, Brennen oder Schmerzen Linsen sofort absetzen und eine augenärztliche Praxis aufsuchen.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs mb-8">
          <h2 className="text-xl font-black text-slate-950 mb-6">Die drei Pflegesysteme im Vergleich</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left p-3 font-semibold text-slate-700">Kriterium</th>
                  <th className="text-center p-3 font-semibold text-slate-800">All-in-One (Kombi)</th>
                  <th className="text-center p-3 font-semibold text-emerald-800">H2O2-Peroxidsystem</th>
                  <th className="text-center p-3 font-semibold text-slate-700">Kochsalzlösung</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                <tr><td className="p-3 font-medium text-slate-900">Anwendung</td><td className="p-3 text-center text-slate-700">Einfach, direkt einsatzbereit</td><td className="p-3 text-center text-slate-700">6–8h Neutralisationszeit beachten</td><td className="p-3 text-center text-slate-700">Nur zum Abspülen</td></tr>
                <tr className="bg-slate-50"><td className="p-3 font-medium text-slate-900">Desinfektionsleistung</td><td className="p-3 text-center text-slate-700">Gut</td><td className="p-3 text-center text-emerald-800 font-bold">Sehr hoch (tiefenwirksam)</td><td className="p-3 text-center text-slate-500">Keine Desinfektion</td></tr>
                <tr><td className="p-3 font-medium text-slate-900">Verträglichkeit</td><td className="p-3 text-center text-slate-700">Variabel (Konservierungsstoffe)</td><td className="p-3 text-center text-emerald-800 font-bold">Sehr hoch (konservierungsmittelfrei nach Neutralisation)</td><td className="p-3 text-center text-slate-700">Sehr hoch</td></tr>
                <tr className="bg-slate-50"><td className="p-3 font-medium text-slate-900">Kosten/Monat</td><td className="p-3 text-center text-slate-700">ca. 5–10 €</td><td className="p-3 text-center text-slate-700">ca. 8–15 €</td><td className="p-3 text-center text-slate-700">ca. 2–5 €</td></tr>
                <tr><td className="p-3 font-medium text-slate-900">Ideal für</td><td className="p-3 text-center text-slate-700">Alltagsträger mit unkomplizierten Augen</td><td className="p-3 text-center text-slate-700">Empfindliche Augen &amp; Allergiker</td><td className="p-3 text-center text-slate-700">Spülen &amp; Einsetzen</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
            <h3 className="font-bold text-slate-950 mb-2">All-in-One Lösungen</h3>
            <p className="text-xs text-slate-600 mb-3 leading-relaxed">Reinigen, desinfizieren, abspülen und aufbewahren in einem Schritt. Die beliebteste Wahl für flexible Linsenträger.</p>
            <div className="text-xs text-slate-500 space-y-1">
              <div>✓ Einfache Handhabung</div>
              <div>✓ Wirtschaftlich</div>
              <div>• Enthält Konservierungsstoffe</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-emerald-200 p-5 shadow-2xs bg-emerald-50/20">
            <h3 className="font-bold text-emerald-950 mb-2">H2O2-Peroxidsysteme</h3>
            <p className="text-xs text-slate-600 mb-3 leading-relaxed">Wasserstoffperoxid vernichtet Keime und neutralisiert sich am Platinkatalysator zu Wasser. Ideal bei empfindlichen Augen.</p>
            <div className="text-xs text-slate-500 space-y-1">
              <div>✓ Maximale Desinfektion</div>
              <div>✓ 100 % konservierungsmittelfrei nach Katalyse</div>
              <div>• Mindesteinwirkzeit (6h) zwingend beachten</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
            <h3 className="font-bold text-slate-950 mb-2">Kochsalzlösungen</h3>
            <p className="text-xs text-slate-600 mb-3 leading-relaxed">Sterile Kochsalzlösung (NaCl 0,9 %) dient ausschließlich zum Abspülen gelöster Partikel vor dem Einsetzen.</p>
            <div className="text-xs text-slate-500 space-y-1">
              <div>✓ Sanftes Abspülen</div>
              <div>✓ Höchste Verträglichkeit</div>
              <div>✕ Niemals zur Desinfektion geeignet</div>
            </div>
          </div>
        </div>

        {pflegemittel.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-black text-slate-950 mb-4">Gängige Pflegemittel &amp; Augentropfen</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {pflegemittel.slice(0, 6).map(p => (
                <a key={p.id} href={getProductAffiliateUrl(p)} target="_blank" rel={AFFILIATE_LINK_REL}
                  className="block bg-white rounded-xl border border-slate-200 p-4 hover:border-emerald-300 hover:shadow-xs transition">
                  <div className="font-bold text-slate-900 text-sm mb-1">{p.product_name}</div>
                  <div className="text-xs text-slate-500 mb-2">{p.pack_size}</div>
                  <div className="text-emerald-700 font-black text-sm">ca. {p.price.toFixed(2)} € *</div>
                  <div className="text-xs text-slate-600 font-medium mt-1">{getAffiliateCtaLabel(p)} →</div>
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-xl font-black text-slate-950 mb-4">Häufige Fragen zur Linsenpflege</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
              <h3 className="font-bold text-slate-900 mb-2 text-sm">Kann ich Leitungswasser zum Spülen verwenden?</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Nein, niemals. Leitungswasser enthält Keime wie Acanthamoeba, die zu schweren Hornhautinfektionen führen können. Immer sterile Kochsalzlösung oder die empfohlene Pflegeflüssigkeit verwenden.</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
              <h3 className="font-bold text-slate-900 mb-2 text-sm">Wie oft muss ich den Linsenbehälter wechseln?</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Den Behälter spätestens alle 3 Monate wechseln. Nach dem Ablegen der Linsen den Behälter mit frischer Lösung spülen, nie mit Wasser, und offen trocknen lassen.</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
              <h3 className="font-bold text-slate-900 mb-2 text-sm">Was tun wenn die Linsen im Pflegemittel brennen?</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Ein Brennen kann auf eine Unverträglichkeit mit dem Pflegemittel hinweisen. Probiere ein Produkt ohne Konservierungsstoffe oder wechsle zu einem H2O2-System. Bei anhaltendem Brennen Augenarzt aufsuchen.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 text-white text-center mb-8">
          <h2 className="text-xl font-bold mb-2">Alle Pflegemittel im Überblick</h2>
          <p className="text-slate-300 text-sm mb-4">Im Gesamtkatalog findest du alle Markenprodukte mit Spezifikationen.</p>
          <Link to="/vergleichskatalog" className="inline-block bg-white hover:bg-slate-100 text-slate-950 font-bold px-6 py-3 rounded-xl transition shadow-xs text-sm">
            Zum Gesamtkatalog →
          </Link>
        </div>

        <div className="p-4 bg-slate-100 rounded-xl text-xs text-slate-600 leading-relaxed">
          * Werbelink / Partnerlink: Als Amazon-Partner verdient optical.de an qualifizierten Verkäufen. Kontaktlinsen und Pflegemittel sind Medizinprodukte. Dieser Artikel dient der Information und ersetzt keine augenärztliche Beratung.
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
