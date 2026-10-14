import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MetaTags from '../components/MetaTags';
import MedicalDisclaimer from '../components/MedicalDisclaimer';
import ScrollToTop from '../components/ScrollToTop';

export default function AstigmatismusGuide() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col">
      <MetaTags
        title="Kontaktlinsen bei Astigmatismus – Torische Linsen erklärt | optical.de"
        description="Alles zu torischen Kontaktlinsen bei Astigmatismus: Wie sie funktionieren, welche Marken es gibt und was sie kosten. Unabhängiger Ratgeber."
        canonical="https://www.optical.de/ratgeber/astigmatismus-kontaktlinsen"
      />
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16 flex-grow w-full">
        <div className="text-xs text-slate-500 flex items-center gap-2 mb-6">
          <Link to="/" className="hover:text-emerald-700">Startseite</Link>
          <span>/</span>
          <span className="font-semibold text-slate-900">Astigmatismus &amp; torische Linsen</span>
        </div>

        <article className="prose prose-slate max-w-none min-w-0 w-full">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mb-4 break-words">
            Kontaktlinsen bei Astigmatismus: Alles zu torischen Linsen
          </h1>
          <p className="text-base text-slate-600 mb-8 leading-relaxed">
            Etwa jeder dritte Kontaktlinsenträger hat zusätzlich zur Kurz- oder Weitsichtigkeit einen Astigmatismus (Hornhautverkrümmung). Für diese Sehschwäche gibt es speziell konstruierte torische Kontaktlinsen.
          </p>

          <h2 className="text-xl font-black text-slate-900 mt-8 mb-3">Was ist Astigmatismus?</h2>
          <p className="text-sm text-slate-700 leading-relaxed mb-4">
            Bei einem Astigmatismus ist die Hornhaut nicht kugelförmig, sondern leicht oval — ähnlich einem Rugbyball statt eines Fußballs. Das führt dazu, dass Licht in verschiedenen Meridianen unterschiedlich gebrochen wird und ein unscharfes, verzerrtes Bild entsteht. Der Astigmatismus wird auf dem Rezept als Zylinderwert (Cyl) und Achse (Axis) angegeben.
          </p>

          <h2 className="text-xl font-black text-slate-900 mt-8 mb-3">Wie funktionieren torische Linsen?</h2>
          <p className="text-sm text-slate-700 leading-relaxed mb-4">
            Torische Kontaktlinsen haben zwei verschiedene Brechkräfte — eine für den sphärischen Anteil (Kurz-/Weitsichtigkeit) und eine für den zylindrischen Anteil (Astigmatismus). Damit die Linse nicht rotiert und die Achse stets korrekt sitzt, haben torische Linsen besondere Stabilisierungssysteme: Prismatic Ballast (Gewichtsverteilung unten), Periballast oder Thin Zones (dünne Zonen oben und unten).
          </p>

          <h2 className="text-xl font-black text-slate-900 mt-8 mb-3">Welche torischen Linsen gibt es?</h2>
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 mb-6 overflow-x-auto max-w-full">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left pb-2 font-black text-slate-900">Linse</th>
                  <th className="text-left pb-2 font-black text-slate-900">Typ</th>
                  <th className="text-left pb-2 font-black text-slate-900">Material</th>
                  <th className="text-right pb-2 font-black text-slate-900">Preis (ca.)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { name: 'Acuvue Oasys Max 1-Day for Astigmatism', typ: 'Täglich', mat: 'Silikon-Hydrogel', price: '44,99 €' },
                  { name: 'Alcon Dailies AquaComfort Plus Toric', typ: 'Täglich', mat: 'Hydrogel', price: '29,99 €' },
                  { name: 'CooperVision MyDay Toric', typ: 'Täglich', mat: 'Silikon-Hydrogel', price: '34,99 €' },
                  { name: 'Acuvue Oasys for Astigmatism', typ: '2-wöchentlich', mat: 'Silikon-Hydrogel', price: '34,99 €' },
                  { name: 'Bausch ULTRA for Astigmatism', typ: 'Monatlich', mat: 'Silikon-Hydrogel', price: '39,99 €' },
                ].map((row, i) => (
                  <tr key={i} className="text-slate-700">
                    <td className="py-2 font-semibold pr-3">{row.name}</td>
                    <td className="py-2 pr-3">{row.typ}</td>
                    <td className="py-2 pr-3">{row.mat}</td>
                    <td className="py-2 text-right font-bold text-slate-900">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-black text-slate-900 mt-8 mb-3">Tageslinsen vs. Monatslinsen bei Astigmatismus</h2>
          <p className="text-sm text-slate-700 leading-relaxed mb-4">
            Torische Tageslinsen bieten maximale Hygiene ohne Pflegeaufwand, sind aber teurer im Jahresverbrauch. Torische Monatslinsen sind günstiger pro Packung, erfordern aber tägliche Pflege. Torische Zweiwochen-Linsen wie die Acuvue Oasys for Astigmatism sind ein beliebter Kompromiss.
          </p>

          <h2 className="text-xl font-black text-slate-900 mt-8 mb-3">Was kostet die Korrektur von Astigmatismus mit Kontaktlinsen?</h2>
          <p className="text-sm text-slate-700 leading-relaxed mb-4">
            Torische Linsen kosten im Schnitt 20–30% mehr als vergleichbare sphärische Linsen. Für Tageslinsen rechnet man mit 2–3 € pro Tag (beide Augen), für Monatslinsen mit 0,35–0,50 € pro Tag plus Pflegemittelkosten.
          </p>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 mt-8">
            <h3 className="font-black text-emerald-900 text-base mb-2">Jetzt torische Linsen vergleichen</h3>
            <p className="text-xs text-emerald-800 mb-3">Im Katalog alle verfügbaren torischen Linsen mit Preisen und Spezifikationen auf einen Blick.</p>
            <div className="flex flex-wrap gap-2">
              <Link
                to="/vergleichskatalog?cat=toric"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition"
              >
                Torische Linsen filtern →
              </Link>
              <Link
                to="/torische-kontaktlinsen"
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs px-4 py-2.5 rounded-xl transition"
              >
                Zur Kategorie Torische Linsen →
              </Link>
            </div>
          </div>
        </article>

        <MedicalDisclaimer className="mt-12" />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
