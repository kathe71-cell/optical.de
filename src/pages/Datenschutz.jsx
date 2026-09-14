import React from 'react';
import { ShieldCheck, Lock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MetaTags from '../components/MetaTags';
import ScrollToTop from '../components/ScrollToTop';

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col justify-between">
      <MetaTags 
        title="Datenschutzerklärung | optical.de"
        description="Datenschutzerklärung von optical.de: DSGVO-konforme Datenverarbeitung ohne Profiling, ohne externe Google CDN Fonts und mit 100% lokalem Merkzettel."
        canonical="https://www.optical.de/datenschutz"
      />
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex-grow w-full">
        
        <div className="text-xs text-slate-500 flex items-center gap-2 mb-6">
          <Link to="/" className="hover:text-emerald-700">Startseite</Link>
          <span>/</span>
          <span className="font-semibold text-slate-900">Datenschutz</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-xs">
          
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
              <p className="mt-2">
                Hierbei kann es sich um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Webseitenzugriffe und sonstige Daten handeln, die über eine Website generiert werden.
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer sicheren, schnellen und fehlerfreien Bereitstellung unseres Online-Angebots).
              </p>
            </div>

            <div>
              <h2 className="text-lg font-extrabold text-slate-900 mb-3 border-b border-slate-100 pb-2">
                3. Lokale Speicherung der Merkliste („Meine Linsen“)
              </h2>
              <p>
                Die Merkliste („Meine Linsen“) nutzt die lokale Speichertechnologie Ihres Browsers (<strong>Local Storage</strong>). Die Identifikatoren Ihrer gemerkten Kontaktlinsen werden ausschließlich lokal auf Ihrem Endgerät gespeichert. Es findet keinerlei Übertragung Ihrer gemerkten Produkte an unsere Server oder an Drittanbieter statt.
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Rechtsgrundlage: § 25 Abs. 2 Nr. 2 TDDDG i.V.m. Art. 6 Abs. 1 lit. f DSGVO (technisch erforderlich zur Bereitstellung der vom Nutzer ausdrücklich gewünschten Merkfunktion ohne Registrierungszwang).
              </p>
            </div>

            <div>
              <h2 className="text-lg font-extrabold text-slate-900 mb-3 border-b border-slate-100 pb-2">
                4. Keine externen Schriftarten (Zero Google Fonts CDN)
              </h2>
              <p>
                Diese Seite bindet <strong>keine externen Schriftarten über Google Fonts oder sonstige CDNs</strong> ein. Es werden ausschließlich systemeigene System-Schriftarten (System Fonts) verwendet, sodass keine IP-Adressen zu Typografiezwecken an Dritte übermittelt werden.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-extrabold text-slate-900 mb-3 border-b border-slate-100 pb-2">
                5. Vercel Web Analytics (DSGVO-konform ohne Cookies)
              </h2>
              <p>
                Wir nutzen Vercel Web Analytics zur aggregierten Reichweitenmessung. Vercel Analytics verwendet keine Cookies, speichert keine IP-Adressen und erstellt keine nutzerübergreifenden Profile. Es werden ausschließlich anonymisierte Telemetriedaten erfasst.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-extrabold text-slate-900 mb-3 border-b border-slate-100 pb-2">
                6. Ihre Rechte als betroffene Person
              </h2>
              <p>
                Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung (Art. 15 DSGVO) sowie ein Recht auf Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO) oder Einschränkung der Verarbeitung (Art. 18 DSGVO).
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
