import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';

const MetaTags = ({ title, description, canonical }) => {
  React.useEffect(() => {
    document.title = title;
    let desc = document.querySelector('meta[name="description"]');
    if (!desc) { desc = document.createElement('meta'); desc.name = 'description'; document.head.appendChild(desc); }
    desc.content = description;
    let canon = document.querySelector('link[rel="canonical"]');
    if (!canon) { canon = document.createElement('link'); canon.rel = 'canonical'; document.head.appendChild(canon); }
    canon.href = canonical;
  }, [title, description, canonical]);
  return null;
};

export default function PflegemittelGuide() {
  const pflegemittel = PRODUCTS.filter(p => p.lens_type.toLowerCase().includes('pflegemittel') || p.lens_type.toLowerCase().includes('augentropfen'));

  return (
    <div className="min-h-screen bg-gray-50">
      <MetaTags
        title="Kontaktlinsen-Pflegemittel: Systeme & Unterschiede im Vergleich | optical.de"
        description="All-in-One-Lösungen, Peroxidsysteme und Kochsalzlösungen im objektiven Vergleich: Inhaltsstoffe, Einwirkzeiten und Verträglichkeit im Überblick."
        canonical="https://www.optical.de/ratgeber/kontaktlinsen-pflegemittel-vergleich"
      />

      <div className="bg-white border-b border-gray-200 py-4 px-4">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="text-blue-600 hover:text-blue-800 text-sm">optical.de</Link>
          <span className="text-gray-400 text-sm mx-2">/</span>
          <span className="text-gray-600 text-sm">Ratgeber</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-1 rounded-full">Ratgeber</span>
            <span className="text-gray-400 text-sm">Lesezeit: ca. 7 Min.</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Kontaktlinsen-Pflegemittel: Systeme &amp; Unterschiede im Vergleich
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            All-in-One, H2O2 oder No-Rub? Wir erkl&auml;ren die Unterschiede und zeigen, wann welches System sinnvoll ist.
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-yellow-900 mb-2">Wichtig vorab</h2>
          <p className="text-sm text-yellow-800">
            Nicht jedes Pflegemittel ist mit jeder Linse kompatibel. Immer die Herstellerempfehlung beachten und bei Unregelm&auml;&szlig;igkeiten einen Augenarzt aufsuchen.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Die drei Pflegesysteme im Vergleich</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-3 font-semibold">Kriterium</th>
                  <th className="text-center p-3 font-semibold text-blue-700">All-in-One</th>
                  <th className="text-center p-3 font-semibold text-purple-700">H2O2-Pflege</th>
                  <th className="text-center p-3 font-semibold text-teal-700">Kochsalzl&ouml;sung</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr><td className="p-3 font-medium">Anwendung</td><td className="p-3 text-center">Einf&auml;ltig, schnell</td><td className="p-3 text-center">6-8h Einwirkzeit</td><td className="p-3 text-center">Nur sp&uuml;len</td></tr>
                <tr className="bg-gray-50"><td className="p-3 font-medium">Reinigungsleistung</td><td className="p-3 text-center">Gut</td><td className="p-3 text-center text-green-700 font-bold">Sehr gut</td><td className="p-3 text-center">Gering</td></tr>
                <tr><td className="p-3 font-medium">Vertr&auml;glichkeit</td><td className="p-3 text-center">Variabel</td><td className="p-3 text-center text-green-700 font-bold">Sehr hoch</td><td className="p-3 text-center">Hoch</td></tr>
                <tr className="bg-gray-50"><td className="p-3 font-medium">Kosten/Monat</td><td className="p-3 text-center">5-10&euro;</td><td className="p-3 text-center">8-15&euro;</td><td className="p-3 text-center">2-5&euro;</td></tr>
                <tr><td className="p-3 font-medium">Ideal f&uuml;r</td><td className="p-3 text-center">Alltagstr&auml;ger</td><td className="p-3 text-center">Empfindliche Augen</td><td className="p-3 text-center">Zus&auml;tzliches Sp&uuml;len</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-blue-200 p-5">
            <div className="text-2xl mb-2">&#128167;</div>
            <h3 className="font-bold text-blue-800 mb-2">All-in-One L&ouml;sungen</h3>
            <p className="text-sm text-gray-600 mb-3">Reinigen, desinfizieren und aufbewahren in einem Schritt. Die beliebteste Wahl f&uuml;r die meisten Linsentr&auml;ger.</p>
            <div className="text-xs text-gray-500 space-y-1">
              <div>&#10003; Einfache Handhabung</div>
              <div>&#10003; G&uuml;nstig</div>
              <div>&#10007; M&ouml;gliche Konservierungsstoffe</div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-purple-200 p-5">
            <div className="text-2xl mb-2">&#128167;</div>
            <h3 className="font-bold text-purple-800 mb-2">H2O2-Systeme</h3>
            <p className="text-sm text-gray-600 mb-3">Wasserstoffperoxid neutralisiert alle Keime. Danach wird es zu Wasser umgewandelt. Ideal bei empfindlichen Augen.</p>
            <div className="text-xs text-gray-500 space-y-1">
              <div>&#10003; Hohe Desinfektionsleistung</div>
              <div>&#10003; Keine Konservierungsstoffe im Endprodukt</div>
              <div>&#10007; L&auml;ngere Einwirkzeit n&ouml;tig</div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-teal-200 p-5">
            <div className="text-2xl mb-2">&#128167;</div>
            <h3 className="font-bold text-teal-800 mb-2">Augentropfen</h3>
            <p className="text-sm text-gray-600 mb-3">Kein Ersatz f&uuml;r Pflegemittel, aber hilfreich bei trockenen Augen w&auml;hrend des Tragens.</p>
            <div className="text-xs text-gray-500 space-y-1">
              <div>&#10003; Sofortiger Komfort</div>
              <div>&#10003; Unterwegs einsetzbar</div>
              <div>&#10007; Kein Ersatz f&uuml;r Desinfektion</div>
            </div>
          </div>
        </div>

        {pflegemittel.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Empfohlene Pflegemittel auf Amazon</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {pflegemittel.slice(0, 6).map(p => (
                <a key={p.id} href={"https://www.amazon.de/dp/" + p.asin + "?tag=optical.de-21"} target="_blank" rel="noopener noreferrer sponsored"
                  className="block bg-white rounded-xl border border-gray-200 p-4 hover:border-purple-300 hover:shadow-md transition-all">
                  <div className="font-semibold text-gray-900 text-sm mb-1">{p.product_name}</div>
                  <div className="text-xs text-gray-500 mb-2">{p.pack_size}</div>
                  <div className="text-purple-600 font-bold">{p.price}</div>
                  <div className="text-xs text-gray-400 mt-1">auf Amazon ansehen &rarr;</div>
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">H&auml;ufige Fragen zur Linsenpflege</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="font-semibold text-gray-900 mb-2">Kann ich Leitungswasser zum Sp&uuml;len verwenden?</div>
              <div className="text-sm text-gray-600">Nein, niemals. Leitungswasser enth&auml;lt Keime wie Acanthamoeba, die zu schweren Hornhautinfektionen f&uuml;hren k&ouml;nnen. Immer sterile Kochsalzl&ouml;sung oder die empfohlene Pflegefl&uuml;ssigkeit verwenden.</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="font-semibold text-gray-900 mb-2">Wie oft muss ich den Linsenbeh&auml;lter wechseln?</div>
              <div className="text-sm text-gray-600">Den Beh&auml;lter sp&auml;testens alle 3 Monate wechseln. Nach dem Ablegen der Linsen den Beh&auml;lter mit frischer L&ouml;sung sp&uuml;len, nie mit Wasser, und offen trocknen lassen.</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="font-semibold text-gray-900 mb-2">Was tun wenn die Linsen im Pflegemittel brennen?</div>
              <div className="text-sm text-gray-600">Ein Brennen kann auf eine Unvertr&auml;glichkeit mit dem Pflegemittel hinweisen. Probiere ein Produkt ohne Konservierungsstoffe oder wechsle zu einem H2O2-System. Bei anhaltendem Brennen Augenarzt aufsuchen.</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white text-center mb-6">
          <h2 className="text-xl font-bold mb-2">Alle Pflegemittel im &Uuml;berblick</h2>
          <p className="text-purple-100 mb-4">Im Katalog findest du alle Produkte mit Preisvergleich.</p>
          <Link to="/vergleichskatalog" className="inline-block bg-white text-purple-600 font-semibold px-6 py-3 rounded-lg hover:bg-purple-50 transition-colors">
            Zum Katalog &rarr;
          </Link>
        </div>

        <div className="p-4 bg-gray-100 rounded-lg text-xs text-gray-500">
          <strong>Hinweis:</strong> Dieser Artikel dient der allgemeinen Information. Bei Augenreizungen oder Problemen mit Kontaktlinsen bitte immer einen Augenarzt aufsuchen. Links zu Amazon sind Affiliate-Links &mdash; optical.de erh&auml;lt eine Provision ohne Mehrkosten f&uuml;r dich.
        </div>
      </div>
    </div>
  );
}
