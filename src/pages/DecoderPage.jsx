import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, ArrowRight, Database } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MetaTags from '../components/MetaTags';
import EigenmarkenDecoder from '../components/EigenmarkenDecoder';
import MedicalDisclaimer from '../components/MedicalDisclaimer';
import TrustSection from '../components/TrustSection';
import ScrollToTop from '../components/ScrollToTop';

export default function DecoderPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col justify-between">
      <MetaTags 
        title="Optiker-Eigenmarken-Decoder | optical.de"
        description="Finde heraus, welches Markenprodukt hinter deiner Apollo iWear, Fielmann ActiMed oder Mister Spex Linse steckt. Transparenter Parameter-Abgleich."
        canonical="https://www.optical.de/eigenmarken-decoder"
      />
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-grow space-y-10">
        
        {/* Breadcrumb Navigation */}
        <div className="text-xs text-slate-500 flex items-center gap-2">
          <Link to="/" className="hover:text-emerald-700">Startseite</Link>
          <span>/</span>
          <span className="font-semibold text-slate-900">Eigenmarken-Decoder</span>
        </div>

        {/* Header Title & Intro */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Transparente Handelsmarken
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Optiker-Eigenmarken prüfen &amp; Spezifikationen abgleichen
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            Große Optikerketten vertreiben Kontaktlinsen oft unter eigenem Namen (z. B. Apollo iWear, Fielmann ActiMed). Prüfen Sie hier die technische Übereinstimmung anhand von Material, Dk/t und Geometrie mit etablierten Herstellermarken.
          </p>
        </div>

        {/* Decoder-Komponente (Direkter Fokus) */}
        <EigenmarkenDecoder standalone={true} />

        {/* Statische Übersicht der analysierten Handelsmarken (SEO- & Discoverability-Anker) */}
        <section aria-labelledby="dossiers-heading" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-6">
            <div>
              <h2 id="dossiers-heading" className="text-xl font-black text-slate-950">
                Analysierte Optiker-Handelsmarken
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Alle Einzeldossiers mit detaillierter Gegenüberstellung von Material, Wassergehalt und Parametern.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { slug: 'apollo-iwear-oxygen', brand: 'Apollo iWear Oxygen', chain: 'Apollo Optik', match: 'CooperVision Biofinity', type: 'Monatslinse' },
              { slug: 'apollo-iwear-harmony', brand: 'Apollo iWear Harmony', chain: 'Apollo Optik', match: 'CooperVision Proclear Sphere', type: 'Monatslinse' },
              { slug: 'fielmann-actimed', brand: 'Fielmann ActiMed', chain: 'Fielmann', match: 'CooperVision Biofinity', type: 'Monatslinse' },
              { slug: 'fielmann-atmo', brand: 'Fielmann Atmo', chain: 'Fielmann', match: 'Air Optix Plus HydraGlyde', type: 'Monatslinse' },
              { slug: 'mister-spex-true-day', brand: 'Mister Spex True Day', chain: 'Mister Spex', match: 'Dailies AquaComfort Plus', type: 'Tageslinse' },
              { slug: 'specsavers-easyvision-opteyes', brand: 'Specsavers Easyvision Opteyes', chain: 'Specsavers', match: 'Bausch + Lomb Ultra', type: 'Monatslinse' },
            ].map((d) => (
              <Link
                key={d.slug}
                to={`/${d.slug}`}
                className="p-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 transition group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase mb-1">
                    <span>{d.chain}</span>
                    <span className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">{d.type}</span>
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-emerald-700 transition">
                    {d.brand}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2">
                    Technischer Abgleich mit <strong className="text-slate-800">{d.match}</strong>
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-800">
                  <span>Dossier öffnen</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Medizinischer Pflicht-Hinweis */}
        <MedicalDisclaimer />

        {/* Transparenz-Standard */}
        <TrustSection />

      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
