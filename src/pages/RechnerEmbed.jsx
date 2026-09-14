import React, { useState } from 'react';
import { Eye, ExternalLink, Sparkles, RefreshCw, Check } from 'lucide-react';

export default function RechnerEmbed() {
  const [selectedBrand, setSelectedBrand] = useState('apollo');
  const [copiedLink, setCopiedLink] = useState(false);
  const [userPrice, setUserPrice] = useState('');

  const DECODER_DATA = {
    apollo: {
      privateName: 'Apollo iWear Oxygen',
      optician: 'Apollo Optik',
      originalName: 'CooperVision Biofinity',
      manufacturer: 'CooperVision',
      brandPriceNum: 19.90,
      bestPrice: '19,90 €',
      specs: 'Monatslinse | Silikon-Hydrogel | Dk/t 160 | 6er Pack'
    },
    fielmann: {
      privateName: 'Fielmann ActiMed Monatslinse',
      optician: 'Fielmann',
      originalName: 'CooperVision Biofinity',
      manufacturer: 'CooperVision',
      brandPriceNum: 19.90,
      bestPrice: '19,90 €',
      specs: 'Monatslinse | Silikon-Hydrogel | Dk/t 160 | 6er Pack'
    },
    misterspex: {
      privateName: 'Mister Spex True Day',
      optician: 'Mister Spex',
      originalName: 'Alcon Dailies AquaComfort Plus',
      manufacturer: 'Alcon',
      brandPriceNum: 20.50,
      bestPrice: '20,50 €',
      specs: 'Tageslinse | Nelfilcon A | 30er Pack'
    },
    specsavers: {
      privateName: 'Specsavers Easyvision Opteyes',
      optician: 'Specsavers / Pearle',
      originalName: 'Bausch + Lomb Ultra',
      manufacturer: 'Bausch + Lomb',
      brandPriceNum: 21.90,
      bestPrice: '21,90 €',
      specs: 'Monatslinse | Samfilcon A | Dk/t 163 | 6er Pack'
    }
  };

  const current = DECODER_DATA[selectedBrand];
  const parsedPrice = parseFloat(userPrice.replace(',', '.'));
  const hasUserPrice = !isNaN(parsedPrice) && parsedPrice > current.brandPriceNum;
  const savingsPercent = hasUserPrice 
    ? Math.round(((parsedPrice - current.brandPriceNum) / parsedPrice) * 100) 
    : null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://www.optical.de/?brand=${selectedBrand}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 sm:p-6 font-sans antialiased flex flex-col justify-between border border-slate-800 rounded-xl">
      <div>
        {/* EMBED HEADER */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500/20 text-emerald-400 rounded-lg flex items-center justify-center font-bold">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-white">Eigenmarken<span className="text-emerald-400">-Decoder</span></span>
              <span className="text-[10px] text-slate-400 block">Powered by optical.de</span>
            </div>
          </div>

          <button 
            onClick={handleCopyLink}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 transition flex items-center gap-1.5"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Sparkles className="w-3.5 h-3.5 text-amber-400" />}
            <span>{copiedLink ? 'Kopiert!' : 'Link teilen'}</span>
          </button>
        </div>

        {/* SELECTOR BUTTONS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          <button 
            onClick={() => setSelectedBrand('apollo')}
            className={`py-2.5 px-2 rounded-lg text-xs font-bold transition border text-center ${selectedBrand === 'apollo' ? 'bg-emerald-600 text-white border-emerald-400 shadow' : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'}`}
          >
            Apollo iWear
          </button>
          <button 
            onClick={() => setSelectedBrand('fielmann')}
            className={`py-2.5 px-2 rounded-lg text-xs font-bold transition border text-center ${selectedBrand === 'fielmann' ? 'bg-emerald-600 text-white border-emerald-400 shadow' : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'}`}
          >
            Fielmann ActiMed
          </button>
          <button 
            onClick={() => setSelectedBrand('misterspex')}
            className={`py-2.5 px-2 rounded-lg text-xs font-bold transition border text-center ${selectedBrand === 'misterspex' ? 'bg-emerald-600 text-white border-emerald-400 shadow' : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'}`}
          >
            Mister Spex True
          </button>
          <button 
            onClick={() => setSelectedBrand('specsavers')}
            className={`py-2.5 px-2 rounded-lg text-xs font-bold transition border text-center ${selectedBrand === 'specsavers' ? 'bg-emerald-600 text-white border-emerald-400 shadow' : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'}`}
          >
            Specsavers Opteyes
          </button>
        </div>

        {/* RESULT BOX */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Erkannte Optiker-Handelsmarke</span>
              <div className="text-lg font-black text-amber-400">{current.privateName}</div>
              <div className="text-xs text-slate-400">Anbieter: {current.optician}</div>
            </div>
            {savingsPercent ? (
              <div className="bg-emerald-500 text-slate-950 font-black text-xs px-3 py-1 rounded">
                ca. -{savingsPercent} % Modell-Ersparnis
              </div>
            ) : (
              <div className="text-[10px] text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700">
                Preisrechner aktiv
              </div>
            )}
          </div>

          {/* Interaktiver Nutzerpreis */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3 flex items-center justify-between gap-3">
            <label htmlFor="embed-user-price" className="text-xs text-slate-300 font-medium cursor-pointer">
              Ihr bezahlter Filialpreis:
            </label>
            <div className="flex items-center gap-1">
              <input
                id="embed-user-price"
                type="number"
                step="0.10"
                min="1"
                placeholder="z. B. 35,00"
                value={userPrice}
                onChange={(e) => setUserPrice(e.target.value)}
                className="w-24 px-2 py-1 text-right text-xs font-bold text-white bg-slate-950 border border-slate-700 rounded focus:border-emerald-500 focus:outline-none"
              />
              <span className="text-xs text-slate-400 font-bold">€</span>
            </div>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Zugeordnetes Markenprodukt</span>
            <div className="text-xl font-black text-white">{current.originalName}</div>
            <div className="text-xs text-slate-300 mt-0.5">Hersteller: <strong className="text-white">{current.manufacturer}</strong></div>
            <div className="text-xl font-black text-emerald-400 mt-2">ca. {current.bestPrice} *</div>
            <div className="text-[10px] text-slate-400">Orientierungspreis / UVP. Tagesaktueller Händlerpreis auf Amazon.de einsehbar.</div>
          </div>
        </div>

        <div className="mt-3 text-[11px] text-slate-400 leading-relaxed">
          ℹ️ {current.specs}. optical.de trifft keine pauschalen Preisfeststellungen für stationäre Filialen. Die Berechnung ist eine individuelle Modellrechnung auf Basis der Nutzereingabe. * Werbelink / Partnerlink.
        </div>
      </div>

      {/* ATTRIBUTION FOOTER BACKLINK */}
      <div className="pt-4 mt-6 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
        <span>© optical.de Media</span>
        <a 
          href="https://www.optical.de/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-emerald-400 font-bold hover:underline flex items-center gap-1"
        >
          <span>Auf optical.de vergleichen</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
