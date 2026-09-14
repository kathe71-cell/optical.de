import React from 'react';
import { ShieldCheck, Mail, MapPin, User, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MetaTags from '../components/MetaTags';
import ScrollToTop from '../components/ScrollToTop';

export default function Impressum() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col justify-between">
      <MetaTags 
        title="Impressum | optical.de"
        description="Impressum und rechtliche Anbieterkennzeichnung von optical.de gemäß § 5 DDG und § 18 MStV."
        canonical="https://www.optical.de/impressum"
      />
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex-grow w-full">
        
        <div className="text-xs text-slate-500 flex items-center gap-2 mb-6">
          <Link to="/" className="hover:text-emerald-700">Startseite</Link>
          <span>/</span>
          <span className="font-semibold text-slate-900">Impressum</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-xs">
          
          <div className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-300 text-emerald-950 text-xs font-extrabold px-3 py-1 rounded-full mb-6">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Rechtssicheres Impressum (§ 5 DDG &amp; § 18 MStV)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mb-8">
            Impressum
          </h1>

          <div className="space-y-8 text-sm leading-relaxed text-slate-700">
            
            {/* ANBIETERANGABEN */}
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 mb-3 border-b border-slate-100 pb-2">
                Angaben gemäß § 5 DDG
              </h2>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-2">
                <p className="font-extrabold text-slate-950 text-base flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  Jens Kathe
                </p>
                <p className="flex items-center gap-2 text-slate-700">
                  <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  Hansastraße 6, 34119 Kassel, Deutschland
                </p>
              </div>
            </div>

            {/* KONTAKT */}
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 mb-3 border-b border-slate-100 pb-2">
                Kontakt
              </h2>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                E-Mail: <a href="mailto:jens@kathe.org" className="font-bold text-emerald-700 hover:underline">jens@kathe.org</a>
              </p>
            </div>

            {/* VERANTWORTLICH */}
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 mb-3 border-b border-slate-100 pb-2">
                Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
              </h2>
              <p>Jens Kathe, Hansastraße 6, 34119 Kassel</p>
            </div>

            {/* ABGRENZUNG */}
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 mb-3 border-b border-slate-100 pb-2">
                Hinweis zur Tätigkeit &amp; gesellschaftsrechtliche Unabhängigkeit
              </h2>
              <p>
                optical.de ist ein unabhängiges redaktionelles Verbraucherportal und steht in keinem gesellschaftsrechtlichen Verhältnis zu den verglichenen oder erwähnten Optikerketten (z. B. Fielmann, Apollo-Optik, Mister Spex, Specsavers) oder Herstellern (z. B. CooperVision, Alcon, Bausch + Lomb, Johnson &amp; Johnson).
              </p>
              <p className="mt-2 text-slate-600 text-xs">
                optical.de ist keine Augenarztpraxis und kein Optikerbetrieb. Wir führen keine medizinische Beratung oder Sehstärkenbestimmung durch.
              </p>
            </div>

            {/* AFFILIATE */}
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 mb-3 border-b border-slate-100 pb-2">
                Verbraucherhinweis zu Partnerlinks (Affiliate)
              </h2>
              <p>
                Einige Links auf dieser Website sind sogenannte Affiliate-Links (z. B. zu Amazon.de). Wenn Sie über einen solchen Link ein Produkt erwerben, erhalten wir vom jeweiligen Anbieter eine Vermittlungsprovision. Für Sie als Verbraucher ändert sich der Preis dadurch nicht.
              </p>
            </div>

          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
