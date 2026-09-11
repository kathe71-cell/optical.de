import React from 'react';
import { Eye, ArrowLeft, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Datenschutz() {
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
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>100 % DSGVO-Konform &amp; Zero-CDN Privacy</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mb-8">
            Datenschutzerklärung
          </h1>

          <div className="space-y-8 text-sm leading-relaxed text-slate-700">
            
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 mb-3 border-b border-slate-100 pb-2">
                1. Verantwortlicher für die Datenverarbeitung
              </h2>
              <p>
                Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) und sonstiger nationaler Datenschutzgesetze ist der Webseitenbetreiber.
              </p>
              <p className="mt-2 font-medium text-emerald-800">
                Vollständige Kontaktdaten siehe <Link to="/impressum" className="underline font-bold">Impressum</Link>.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-extrabold text-slate-900 mb-3 border-b border-slate-100 pb-2">
                2. Hosting &amp; Server-Log-Files (Vercel)
              </h2>
              <p>
                Diese Website wird extern bei <strong>Vercel Inc.</strong> gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert.
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-extrabold text-slate-900 mb-3 border-b border-slate-100 pb-2">
                3. Zero External Fonts &amp; Keine IP-Übertragung an Drittstaaten
              </h2>
              <p>
                Auf optical.de werden <strong>keine externen Schriftarten (wie Google Fonts CDNs)</strong> eingebunden. Die Typografie wird ausschließlich über lokale System-Schriftarten deines Endgeräts gerendert. Es findet somit keine Übermittlung deiner IP-Adresse an externe Schriftserver statt.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-extrabold text-slate-900 mb-3 border-b border-slate-100 pb-2">
                4. Werbe- &amp; Affiliate-Partnerlinks (* Sternchenlinks)
              </h2>
              <p>
                Auf unserer Website setzen wir Partner-Links ein, die mit einem Sternchen (*) gekennzeichnet sind. Wenn du auf einen solchen Affiliate-Link klickst und anschließend ein Produkt beim Händler kaufst, erhalten wir eine Vermittlungsprovision. Dabei werden anonymisierte Parameter zur Zuordnung der Transaktion verarbeitet.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-extrabold text-slate-900 mb-3 border-b border-slate-100 pb-2">
                5. Webanalyse via Vercel Analytics (Cookielos &amp; Datenschutzkonform)
              </h2>
              <p>
                Diese Website nutzt <strong>Vercel Web Analytics</strong> (Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA). Vercel Analytics arbeitet <strong>vollständig ohne Cookies</strong>, speichert keine personenbezogenen Daten und erstellt keine geräteübergreifenden Profile.
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Erfasst werden ausschließlich aggregierte Metriken wie Seitenaufrufe, Verweildauer, Referrer-URLs sowie anonymisierte Systeminformationen (Browser, Betriebssystem, Land). Die Verarbeitung erfolgt auf Grundlage unseres berechtigten Interesses an der statistischen Analyse und Optimierung unseres Webangebots (Art. 6 Abs. 1 lit. f DSGVO).
              </p>
            </div>

            <div>
              <h2 className="text-lg font-extrabold text-slate-900 mb-3 border-b border-slate-100 pb-2">
                6. Deine Betroffenenrechte nach DSGVO
              </h2>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
                <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
                <li>Recht auf Löschung („Recht auf Vergessenwerden“, Art. 17 DSGVO)</li>
                <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
              </ul>
              <p className="mt-3 text-xs">
                Zur Ausübung deiner Rechte wende dich bitte an die im <Link to="/impressum" className="text-emerald-700 underline font-bold">Impressum</Link> genannten Kontaktdaten.
              </p>
            </div>

          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white py-6 text-xs text-center border-t border-slate-800">
        <p className="text-slate-400">© {new Date().getFullYear()} optical.de Media. Alle Rechte vorbehalten.</p>
      </footer>
    </div>
  );
}
