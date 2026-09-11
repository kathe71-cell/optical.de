import React from 'react';
import { Eye, ArrowLeft, ShieldCheck, Mail, MapPin, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Impressum() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col">
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-sm">
              <Eye className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <span className="font-black text-2xl tracking-tight text-slate-900">optical<span className="text-emerald-600">.de</span></span>
            </div>
          </Link>

          <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-600 transition bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg">
            <ArrowLeft className="w-4 h-4" />
            <span>Zurück zur Startseite</span>
          </Link>
        </div>
      </header>

      {/* CONTENT */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex-grow w-full">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm">
          
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
                Kontakt &amp; Schnelle elektronische Kommunikation
              </h2>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="font-medium text-slate-600">E-Mail:</span>
                  <a href="mailto:jens@kathe.org" className="font-bold text-emerald-700 hover:underline">
                    jens@kathe.org
                  </a>
                </p>
              </div>
            </div>

            {/* VERANTWORTLICH NACH MSTV */}
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 mb-3 border-b border-slate-100 pb-2">
                Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
              </h2>
              <p className="font-semibold text-slate-900">
                Jens Kathe<br />
                Hansastraße 6, 34119 Kassel
              </p>
            </div>

            {/* DISCLAIMS */}
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 mb-3 border-b border-slate-100 pb-2">
                Affiliate- &amp; Werbehinweise (* Werbelinks)
              </h2>
              <p className="text-xs text-slate-600 leading-normal bg-amber-50 border border-amber-200 rounded-xl p-4">
                <strong>Haftungsausschluss &amp; Transparenz:</strong> optical.de ist ein unabhängiges Vergleicherportal und steht in keinem gesellschaftsrechtlichen Verhältnis zu den verglichenen Anbietern, Marken oder Optikern (z. B. Apollo Optik, Fielmann, Mister Spex, CooperVision, Alcon, Bausch + Lomb). Links mit einem Sternchen (*) sind Affiliate-Links. Bei Kaufabschluss über diese Links erhalten wir ggf. eine Provision. Für dich entstehen dabei keinerlei Zusatzkosten.
              </p>
            </div>

            {/* MEDIZINISCHER DISCLAIMER */}
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 mb-3 border-b border-slate-100 pb-2">
                Medizinischer Hinweis (DIN EN ISO 14534 / EU-MDR)
              </h2>
              <p className="text-xs text-slate-600 leading-normal">
                Kontaktlinsen sind Medizinprodukte im Sinne der EU Medical Device Regulation (EU-MDR 2017/745). Die Angaben auf optical.de dienen rein der Information und dem Preisvergleich. Sie ersetzen keine fachgerechte Anpassung oder Nachkontrolle durch einen qualifizierten Augenarzt oder Augenoptikermeister.
              </p>
            </div>

          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white py-6 text-xs text-center border-t border-slate-800">
        <p className="text-slate-400">© {new Date().getFullYear()} Jens Kathe / optical.de Media. Alle Rechte vorbehalten.</p>
      </footer>
    </div>
  );
}
