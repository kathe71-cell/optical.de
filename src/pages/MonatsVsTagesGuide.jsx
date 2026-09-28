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

export default function MonatsVsTagesGuide() {
  const tageslinsen = PRODUCTS.filter(p => p.lens_type.toLowerCase().includes('tageslinse') && !p.lens_type.toLowerCase().includes('torisch')).slice(0, 3);
  const monatslinsen = PRODUCTS.filter(p => p.lens_type.toLowerCase().includes('monatslinse') && !p.lens_type.toLowerCase().includes('torisch')).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <MetaTags
        title="Tageslinsen vs. Monatslinsen: Kosten-Vergleich 2024 | optical.de"
        description="Tageslinsen oder Monatslinsen? Wir vergleichen die echten Jahreskosten, Pflegeaufwand und wann sich welche Linse lohnt. Mit konkreten Zahlen und Empfehlungen."
        canonical="https://www.optical.de/ratgeber/tageslinsen-vs-monatslinsen-kosten"
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
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full">Ratgeber</span>
            <span className="text-gray-400 text-sm">Lesezeit: ca. 6 Min.</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tageslinsen vs. Monatslinsen: Was ist wirklich g&uuml;nstiger?
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Die kurze Antwort: Es kommt auf deine Tr&auml;geh&auml;ufigkeit an. Die lange Antwort mit echten Zahlen findest du hier.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-blue-900 mb-3">Kurz-Antwort</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <div className="font-bold text-blue-800 mb-2">Tageslinsen lohnen sich wenn&hellip;</div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>&#8226; Du die Linsen selten tr&auml;gst (unter 5&times; pro Woche)</li>
                <li>&#8226; Du kein Lust auf Pflegepflicht hast</li>
                <li>&#8226; Du trockene oder empfindliche Augen hast</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <div className="font-bold text-green-800 mb-2">Monatslinsen lohnen sich wenn&hellip;</div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>&#8226; Du die Linsen t&auml;glich oder fast t&auml;glich tr&auml;gst</li>
                <li>&#8226; Du Jahreskosten minimieren willst</li>
                <li>&#8226; Du spezielle Parameter brauchst (Torik, Multifokal)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Die echten Jahreskosten im Vergleich</h2>
          <p className="text-gray-600 mb-6">
            Viele Vergleiche ignorieren die Pflegemittelkosten bei Monatslinsen. Wir rechnen alles mit ein.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-3 font-semibold text-gray-700">Tr&auml;geh&auml;ufigkeit</th>
                  <th className="text-center p-3 font-semibold text-blue-700">Tageslinsen (~0,50&euro;/Paar)</th>
                  <th className="text-center p-3 font-semibold text-green-700">Monatslinsen (+ Pflege)</th>
                  <th className="text-center p-3 font-semibold text-gray-700">Empfehlung</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50"><td className="p-3 font-medium">2&times; pro Woche</td><td className="p-3 text-center text-blue-700 font-mono">52&euro;</td><td className="p-3 text-center text-green-700 font-mono">190&euro;</td><td className="p-3 text-center">Tageslinse</td></tr>
                <tr className="hover:bg-gray-50"><td className="p-3 font-medium">3&times; pro Woche</td><td className="p-3 text-center text-blue-700 font-mono">78&euro;</td><td className="p-3 text-center text-green-700 font-mono">190&euro;</td><td className="p-3 text-center">Tageslinse</td></tr>
                <tr className="hover:bg-gray-50"><td className="p-3 font-medium">5&times; pro Woche</td><td className="p-3 text-center text-blue-700 font-mono">130&euro;</td><td className="p-3 text-center text-green-700 font-mono">190&euro;</td><td className="p-3 text-center">Je nach Typ</td></tr>
                <tr className="hover:bg-gray-50"><td className="p-3 font-medium">T&auml;glich (7&times;)</td><td className="p-3 text-center text-blue-700 font-mono">182&euro;</td><td className="p-3 text-center text-green-700 font-mono">190&euro;</td><td className="p-3 text-center">Monatslinse</td></tr>
                <tr className="hover:bg-gray-50"><td className="p-3 font-medium">T&auml;glich (Premium)</td><td className="p-3 text-center text-blue-700 font-mono">260&euro;+</td><td className="p-3 text-center text-green-700 font-mono">190&euro;</td><td className="p-3 text-center font-bold text-green-700">Monatslinse</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-3">Monatslinsen: 12 Paare/Jahr (~180&euro;) + Pflegemittel (~10&euro;/Monat). Tageslinse: 0,50&euro;/Paar &times; Tragetage.</p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Unsere Tageslinsen-Empfehlungen</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {tageslinsen.map(p => (
              <a key={p.id} href={"https://www.amazon.de/dp/" + p.asin + "?tag=optical.de-21"} target="_blank" rel="noopener noreferrer sponsored"
                className="block bg-white rounded-xl border border-gray-200 p-4 hover:border-blue-300 hover:shadow-md transition-all">
                <div className="font-semibold text-gray-900 text-sm mb-1">{p.product_name}</div>
                <div className="text-xs text-gray-500 mb-2">{p.pack_size}</div>
                <div className="text-blue-600 font-bold">{p.price_per_day} / Tag</div>
                <div className="text-xs text-gray-400 mt-1">{p.price} auf Amazon &rarr;</div>
              </a>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Unsere Monatslinsen-Empfehlungen</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {monatslinsen.map(p => (
              <a key={p.id} href={"https://www.amazon.de/dp/" + p.asin + "?tag=optical.de-21"} target="_blank" rel="noopener noreferrer sponsored"
                className="block bg-white rounded-xl border border-gray-200 p-4 hover:border-green-300 hover:shadow-md transition-all">
                <div className="font-semibold text-gray-900 text-sm mb-1">{p.product_name}</div>
                <div className="text-xs text-gray-500 mb-2">{p.pack_size}</div>
                <div className="text-green-600 font-bold">{p.price_per_day} / Tag</div>
                <div className="text-xs text-gray-400 mt-1">{p.price} auf Amazon &rarr;</div>
              </a>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white text-center mb-6">
          <h2 className="text-xl font-bold mb-2">Preise direkt vergleichen</h2>
          <p className="text-blue-100 mb-4">Alle Linsen mit echten Kosten pro Tag &mdash; transparent berechnet.</p>
          <Link to="/vergleichskatalog" className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
            Zum Preisvergleich &rarr;
          </Link>
        </div>

        <div className="p-4 bg-gray-100 rounded-lg text-xs text-gray-500">
          <strong>Hinweis:</strong> Kontaktlinsen sind Medizinprodukte. Dieser Artikel dient der Information und ersetzt keine augen&auml;rztliche Beratung. Links zu Amazon sind Affiliate-Links.
        </div>
      </div>
    </div>
  );
}
