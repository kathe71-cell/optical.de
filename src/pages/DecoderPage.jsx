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
            Optiker-Eigenmarken prüfen &amp; Original finden
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            Große Optikerketten vertreiben Markenlinsen bekannter Hersteller oft unter eigenem Namen (z. B. Apollo iWear, Fielmann ActiMed). Prüfen Sie hier die technische Übereinstimmung anhand von Material und Geometrie.
          </p>
        </div>

        {/* Decoder-Komponente (Direkter Fokus) */}
        <EigenmarkenDecoder standalone={true} />

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
