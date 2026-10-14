import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ShieldCheck, Check, AlertCircle, Sparkles, Layers, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MetaTags from '../components/MetaTags';
import MedicalDisclaimer from '../components/MedicalDisclaimer';
import TrustSection from '../components/TrustSection';
import ScrollToTop from '../components/ScrollToTop';
import { trackPriceCalculatorUsed } from '../utils/tracking';

export default function PreisrechnerPage() {
  const [lensType, setLensType] = useState('monat'); // 'monat' oder 'tag'
  const [daysPerWeek, setDaysPerWeek] = useState(7);
  const [includeCare, setIncludeCare] = useState(true);
  const [packOption, setPackOption] = useState('standard'); // 'standard' oder 'bulk'
  const [eyesCount, setEyesCount] = useState(2); // 1 oder 2 Augen

  // Basis-Tarife (Realistische Durchschnitts-Preise marktgängiger Silikon-Hydrogel-Linsen)
  // Monatslinse: z. B. Biofinity (ca. 19,90 € für 6er Packung = 3,32 €/Linse). Reicht für 3 Monate bei 2 Augen.
  // Tageslinse: z. B. Dailies / Acuvue (ca. 24,90 € für 30er Packung = 0,83 €/Linse).
  const MONTHLY_PRICE_PER_LENS = 3.32; 
  const DAILY_PRICE_PER_LENS = 0.83;
  const MONTHLY_CARE_PER_MONTH = 6.50; // Qualitativ hochwertige All-in-One Kombilösung

  // Berechnung
  // WICHTIGE REGEL: Monatslinsen müssen spätestens nach 30 Tagen entsorgt werden – unabhängig von der Häufigkeit des Tragens!
  const monthlyLensConsumptionPerMonth = eyesCount * (lensType === 'monat' ? 1 : (daysPerWeek * 4.33));
  
  let lensCostPerMonth = 0;
  let careCostPerMonth = 0;

  if (lensType === 'monat') {
    // 1 Linse pro Auge pro Monat (30 Tage Festschema)
    lensCostPerMonth = eyesCount * MONTHLY_PRICE_PER_LENS;
    careCostPerMonth = includeCare ? MONTHLY_CARE_PER_MONTH : 0;
  } else {
    // Tageslinsen: Exakt nach tatsächlichen Tragetagen
    const wearingDaysPerMonth = Math.round(daysPerWeek * 4.33);
    lensCostPerMonth = wearingDaysPerMonth * eyesCount * DAILY_PRICE_PER_LENS;
    careCostPerMonth = 0; // Tageslinsen benötigen keine Pflegemittel
  }

  const totalCostPerMonth = lensCostPerMonth + careCostPerMonth;
  const wearingDaysPerMonth = Math.round(daysPerWeek * 4.33);
  const costPerWearingDay = wearingDaysPerMonth > 0 ? (totalCostPerMonth / wearingDaysPerMonth) : 0;
  const totalCostPerYear = totalCostPerMonth * 12;

  const handleTypeChange = (newType) => {
    setLensType(newType);
    trackPriceCalculatorUsed(newType, `${daysPerWeek} Tage/Woche`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col justify-between">
      <MetaTags 
        title="Kontaktlinsen-Kostenrechner: Was kosten Linsen wirklich? | optical.de"
        description="Berechne deine tatsächlichen Kontaktlinsenkosten pro Tragetag, Monat und Jahr. Transparente Modellrechnung für Monats- und Tageslinsen."
        canonical="https://www.optical.de/preisrechner"
      />
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-grow">
        
        {/* Breadcrumb Navigation */}
        <div className="text-xs text-slate-500 flex items-center gap-2 mb-6">
          <Link to="/" className="hover:text-emerald-700">Startseite</Link>
          <span>/</span>
          <span className="font-semibold text-slate-900">Kostenrechner</span>
        </div>

        {/* Header Title */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5 text-sky-600" />
            Transparenter Kostenrechner
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Was kosten Kontaktlinsen wirklich?
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            Ermitteln Sie Ihre tatsächlichen Ausgaben basierend auf Ihrem Tragerhythmus. Wir trennen reine Linsenkosten, Pflegemittel und Wechselintervalle sauber auf.
          </p>
        </div>

        {/* RECHNER-GRID (Beginnt direkt mit den Eingaben) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Eingabebereich (7 Spalten) */}
            <div className="lg:col-span-7 space-y-6 text-xs sm:text-sm">
              
              {/* Linsentyp Switch */}
              <div>
                <label className="block font-extrabold text-slate-900 mb-2">
                  1. Welchen Linsentyp tragen Sie?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleTypeChange('monat')}
                    className={`p-4 rounded-xl border text-left transition ${
                      lensType === 'monat'
                        ? 'bg-emerald-50/70 border-emerald-500 text-slate-950 ring-1 ring-emerald-500'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="font-black text-sm text-slate-900">Monatslinsen</div>
                    <div className="text-[11px] text-slate-500 mt-1">z. B. Biofinity, Air Optix (30-Tage-Rhythmus)</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTypeChange('tag')}
                    className={`p-4 rounded-xl border text-left transition ${
                      lensType === 'tag'
                        ? 'bg-emerald-50/70 border-emerald-500 text-slate-950 ring-1 ring-emerald-500'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="font-black text-sm text-slate-900">Tageslinsen</div>
                    <div className="text-[11px] text-slate-500 mt-1">z. B. Dailies Total 1, Acuvue Moist (Einweg)</div>
                  </button>
                </div>
              </div>

              {/* Tragetage pro Woche */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="font-extrabold text-slate-900">
                    2. Wie viele Tage pro Woche tragen Sie Linsen?
                  </label>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white font-black text-xs">
                    {daysPerWeek} {daysPerWeek === 1 ? 'Tag' : 'Tage'} / Woche
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="7"
                  value={daysPerWeek}
                  onChange={(e) => setDaysPerWeek(parseInt(e.target.value))}
                  aria-label="Tragetage pro Woche"
                  className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1.5 font-medium">
                  <span>1 Tag (Sport / Wochenende)</span>
                  <span>4 Tage (Teilzeit)</span>
                  <span>7 Tage (Täglich)</span>
                </div>
              </div>

              {/* Pflegemittel Option (Nur relevant für Monatslinsen) */}
              {lensType === 'monat' ? (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeCare}
                      onChange={(e) => setIncludeCare(e.target.checked)}
                      className="w-4 h-4 accent-emerald-600 rounded"
                    />
                    <div>
                      <span className="font-bold text-slate-900 block">Pflegemittel einrechnen (+ 6,50 € / Monat)</span>
                      <span className="text-xs text-slate-500 block">
                        Hochwertige All-in-One Kombilösung oder Peroxidreinigung mit Behälter.
                      </span>
                    </div>
                  </label>
                </div>
              ) : (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span><strong>0,00 € Pflegemittelkosten:</strong> Bei Tageslinsen entfällt der Kauf von Reinigungs- und Aufbewahrungslösungen komplett.</span>
                </div>
              )}

              {/* Wichtiger Transparenzhinweis zu Monatslinsen */}
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-950 text-xs space-y-1.5 leading-relaxed">
                <span className="font-bold block flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-700" />
                  Wichtiger Hygiene- und Kostenhinweis für Monatslinsen:
                </span>
                <p>
                  Monatslinsen dürfen aus Gründen der Augengesundheit (Biofilm, Sauerstoffdurchlässigkeit) <strong>maximal 30 Tage nach dem ersten Öffnen</strong> verwendet werden. Selteneres Tragen (z. B. nur 2 Tage pro Woche) verlängert die Nutzungsdauer der Linse <em>nicht</em> auf mehrere Monate.
                </p>
              </div>

            </div>

            {/* Ergebnis-Panel (5 Spalten) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-6 sm:p-7 shadow-lg space-y-5">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-wider font-bold">
                  Modellrechnung (2 Augen)
                </span>
                <span className="text-[11px] text-slate-400">
                  {lensType === 'monat' ? 'Monatslinsen' : 'Tageslinsen'}
                </span>
              </div>

              <div>
                <span className="text-xs text-slate-400 block mb-1">Rechnerische Kosten pro Monat:</span>
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {totalCostPerMonth.toFixed(2).replace('.', ',')} € <span className="text-xs font-normal text-slate-400">/ Monat</span>
                </div>
                <div className="text-[11px] text-emerald-400 mt-1 font-medium">
                  {includeCare && lensType === 'monat' ? 'Inklusive 6,50 € Pflegemittel' : 'Reine Linsenkosten'}
                </div>
              </div>

              {/* Detail-Aufschlüsselung */}
              <div className="space-y-2.5 pt-3 border-t border-slate-800 text-xs">
                <div className="flex justify-between items-center text-slate-300">
                  <span>Tragegewohnheit:</span>
                  <strong className="text-white">{wearingDaysPerMonth} Tragetage / Monat</strong>
                </div>

                <div className="flex justify-between items-center text-slate-300">
                  <span>Reine Linsenkosten:</span>
                  <strong className="text-white">{lensCostPerMonth.toFixed(2).replace('.', ',')} € / Monat</strong>
                </div>

                <div className="flex justify-between items-center text-slate-300">
                  <span>Pflegemittel:</span>
                  <strong className="text-white">{careCostPerMonth.toFixed(2).replace('.', ',')} € / Monat</strong>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-slate-800/80">
                  <span className="text-slate-300">Kosten pro Tragetag:</span>
                  <strong className="text-emerald-400 font-extrabold text-sm">
                    ca. {costPerWearingDay.toFixed(2).replace('.', ',')} € / Tag
                  </strong>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Hochrechnung aufs Jahr:</span>
                  <strong className="text-white font-extrabold text-sm">
                    ca. {totalCostPerYear.toFixed(2).replace('.', ',')} € / Jahr
                  </strong>
                </div>
              </div>

              {/* Empfehlung / Vergleichs-Fazit */}
              <div className="pt-3 border-t border-slate-800 text-xs text-slate-300 leading-relaxed">
                {lensType === 'monat' && daysPerWeek <= 2 ? (
                  <div className="p-3 rounded-xl bg-slate-800/70 border border-slate-700 text-slate-200">
                    💡 <strong>Tipp:</strong> Bei nur {daysPerWeek} Tragetag(en) pro Woche sind oft <strong>Tageslinsen</strong> wirtschaftlicher und hygienischer, da keine Pflegemittel anfallen und die Monatslinse nicht ungenutzt altert.
                  </div>
                ) : lensType === 'tag' && daysPerWeek >= 5 ? (
                  <div className="p-3 rounded-xl bg-slate-800/70 border border-slate-700 text-slate-200">
                    💡 <strong>Tipp:</strong> Bei fast täglichem Tragen ({daysPerWeek} Tage) sind <strong>Monatslinsen</strong> auf das Jahr gerechnet meist deutlich preisgünstiger.
                  </div>
                ) : (
                  <div className="text-[11px] text-slate-400">
                    * Modellrechnung basierend auf gängigen Packungspreisen (6er Packung Monatslinsen bzw. 30er Packung Tageslinsen). Individuelle Händlerpreise und Versandkosten können abweichen.
                  </div>
                )}
              </div>

              <div className="pt-2 space-y-2">
                <Link
                  to="/vergleichskatalog"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xs transition"
                >
                  <span>Passende Kontaktlinsen ansehen</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/meine-linsen"
                  className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 border border-slate-700 transition"
                >
                  <span>Zu „Meine Linsen“ &amp; Nachkauf-Planer</span>
                </Link>
              </div>

            </div>

          </div>
        </div>

        {/* Medizinischer Pflicht-Hinweis */}
        <MedicalDisclaimer className="mb-12" />

        {/* Transparenz-Standard */}
        <TrustSection />

      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
