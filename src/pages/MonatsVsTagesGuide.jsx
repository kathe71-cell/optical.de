import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { getProductAffiliateUrl, getAffiliateCtaLabel, AFFILIATE_LINK_REL } from '../utils/affiliate';

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
          <h2 className="text-lg font-bold text-blue-900 mb-3">Kurz-Antwort &amp; Kosten-Schwelle</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <div className="font-bold text-blue-800 mb-2">Tageslinsen lohnen sich rechnerisch wenn&hellip;</div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>&#8226; Du die Linsen an bis zu 2 Tagen pro Woche tr&auml;gst (z. B. Sport oder Wochenende)</li>
                <li>&#8226; Du keinen Aufwand f&uuml;r t&auml;gliche Reinigung und Aufbewahrung m&ouml;chtest</li>
                <li>&#8226; Du maximale Hygiene ohne Pflegemittel bevorzugst</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <div className="font-bold text-green-800 mb-2">Monatslinsen lohnen sich rechnerisch wenn&hellip;</div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>&#8226; Du die Linsen an 3 oder mehr Tagen pro Woche tr&auml;gst</li>
                <li>&#8226; Du deine Jahreskosten bei regelm&auml;&szlig;igem Tragen minimieren willst</li>
                <li>&#8226; Eine sorgf&auml;ltige t&auml;gliche Reinigung f&uuml;r dich selbstverst&auml;ndlich ist</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Die echten Jahreskosten im Vergleich</h2>
          <p className="text-gray-600 mb-6">
            Viele Vergleiche ignorieren die notwendigen Pflegemittelkosten bei Monatslinsen. In dieser Modellrechnung stellen wir realistische Marktpreise transparenter Markenprodukte gegen&uuml;ber (Basis: 52 Wochen/Jahr, beide Augen).
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-3 font-semibold text-gray-700">Tr&auml;geh&auml;ufigkeit</th>
                  <th className="text-center p-3 font-semibold text-blue-700">Tageslinsen (Standard, ~1,30 &euro;/Paar)</th>
                  <th className="text-center p-3 font-semibold text-green-700">Monatslinsen (Linsen + Pflege)</th>
                  <th className="text-center p-3 font-semibold text-gray-700">Kostenvorteil</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50"><td className="p-3 font-medium">1&times; pro Woche (52 Tage)</td><td className="p-3 text-center text-blue-700 font-mono">68 &euro;</td><td className="p-3 text-center text-green-700 font-mono">190 &euro;</td><td className="p-3 text-center font-bold text-blue-700">Tageslinse (-122 &euro;)</td></tr>
                <tr className="hover:bg-gray-50"><td className="p-3 font-medium">2&times; pro Woche (104 Tage)</td><td className="p-3 text-center text-blue-700 font-mono">135 &euro;</td><td className="p-3 text-center text-green-700 font-mono">190 &euro;</td><td className="p-3 text-center font-bold text-blue-700">Tageslinse (-55 &euro;)</td></tr>
                <tr className="hover:bg-gray-50"><td className="p-3 font-medium">3&times; pro Woche (156 Tage)</td><td className="p-3 text-center text-blue-700 font-mono">203 &euro;</td><td className="p-3 text-center text-green-700 font-mono">190 &euro;</td><td className="p-3 text-center font-bold text-green-700">Monatslinse (-13 &euro;)</td></tr>
                <tr className="hover:bg-gray-50"><td className="p-3 font-medium">5&times; pro Woche (260 Tage)</td><td className="p-3 text-center text-blue-700 font-mono">338 &euro;</td><td className="p-3 text-center text-green-700 font-mono">190 &euro;</td><td className="p-3 text-center font-bold text-green-700">Monatslinse (-148 &euro;)</td></tr>
                <tr className="hover:bg-gray-50"><td className="p-3 font-medium">T&auml;glich / 7&times; (365 Tage)</td><td className="p-3 text-center text-blue-700 font-mono">475 &euro;</td><td className="p-3 text-center text-green-700 font-mono">190 &euro;</td><td className="p-3 text-center font-bold text-green-700">Monatslinse (-285 &euro;)</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-3 leading-relaxed">
            * Modellrechnung: Monatslinsen kalkuliert mit ca. 120 &euro; f&uuml;r 12 Linsenpaare/Jahr (z. B. 4x 6er Pack g&auml;ngiger Silikon-Hydrogel-Monatslinsen zu je ca. 30 &euro;) zzgl. ca. 70 &euro; f&uuml;r All-in-One Kombil&ouml;sungen (ca. 6 Flaschen &agrave; 300–360 ml/Jahr). Tageslinsen kalkuliert mit ca. 0,65 &euro; pro Einzellinse (1,30 &euro; pro Paar). Tats&auml;chliche Preise h&auml;ngen vom gew&auml;hlten Produkt, individuellen Verordnungen und Packungsgr&ouml;&szlig;en ab.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Unsere Tageslinsen-Empfehlungen</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {tageslinsen.map(p => (
              <a key={p.id} href={getProductAffiliateUrl(p)} target="_blank" rel={AFFILIATE_LINK_REL}
                className="block bg-white rounded-xl border border-gray-200 p-4 hover:border-blue-300 hover:shadow-md transition-all">
                <div className="font-semibold text-gray-900 text-sm mb-1">{p.product_name}</div>
                <div className="text-xs text-gray-500 mb-2">{p.pack_size}</div>
                <div className="text-blue-600 font-bold">{p.price_per_day} / Tag</div>
                <div className="text-xs text-gray-400 mt-1">{getAffiliateCtaLabel(p)} &rarr;</div>
              </a>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Unsere Monatslinsen-Empfehlungen</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {monatslinsen.map(p => (
              <a key={p.id} href={getProductAffiliateUrl(p)} target="_blank" rel={AFFILIATE_LINK_REL}
                className="block bg-white rounded-xl border border-gray-200 p-4 hover:border-green-300 hover:shadow-md transition-all">
                <div className="font-semibold text-gray-900 text-sm mb-1">{p.product_name}</div>
                <div className="text-xs text-gray-500 mb-2">{p.pack_size}</div>
                <div className="text-green-600 font-bold">{p.price_per_day} / Tag</div>
                <div className="text-xs text-gray-400 mt-1">{getAffiliateCtaLabel(p)} &rarr;</div>
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
