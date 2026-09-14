import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, ArrowLeft, Search, Layers, Sparkles, Calculator } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MetaTags from '../components/MetaTags';
import ScrollToTop from '../components/ScrollToTop';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col justify-between">
      <MetaTags 
        title="404 – Seite nicht gefunden | optical.de"
        description="Die angeforderte Seite existiert leider nicht auf optical.de. Nutzen Sie unsere Suche oder das Inhaltsverzeichnis."
        canonical="https://www.optical.de/404"
      />
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center my-auto">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center mx-auto mb-6">
          <Eye className="w-8 h-8 text-amber-800" />
        </div>

        <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Fehler 404
        </span>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mt-4 mb-3">
          Seite nicht gefunden
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed mb-8">
          Die aufgerufene Webadresse existiert auf optical.de nicht oder wurde verschoben. Finden Sie Ihre gewohnten Kontaktlinsen über unsere Einstiege:
        </p>

        {/* Direkt-Einstiege */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left mb-8">
          <Link
            to="/vergleichskatalog"
            className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-400 hover:shadow-xs transition"
          >
            <Layers className="w-5 h-5 text-emerald-600 mb-2" />
            <div className="font-bold text-sm text-slate-900">Kontaktlinsen finden</div>
            <div className="text-xs text-slate-500 mt-0.5">Katalog &amp; Spezifikationen</div>
          </Link>

          <Link
            to="/eigenmarken-decoder"
            className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-400 hover:shadow-xs transition"
          >
            <Sparkles className="w-5 h-5 text-emerald-600 mb-2" />
            <div className="font-bold text-sm text-slate-900">Eigenmarke prüfen</div>
            <div className="text-xs text-slate-500 mt-0.5">Apollo, Fielmann &amp; Co.</div>
          </Link>

          <Link
            to="/preisrechner"
            className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-400 hover:shadow-xs transition"
          >
            <Calculator className="w-5 h-5 text-sky-600 mb-2" />
            <div className="font-bold text-sm text-slate-900">Kostenrechner</div>
            <div className="text-xs text-slate-500 mt-0.5">Monats- vs. Tageslinsen</div>
          </Link>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-xs transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Zurück zur Startseite</span>
        </Link>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
