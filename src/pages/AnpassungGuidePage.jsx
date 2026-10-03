import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

import { Eye, ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight, UserCheck, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AnpassungGuidePage() {
  const breadcrumbItems = [
    { label: 'Startseite', href: '/' },
    { label: 'Ratgeber', href: '/vergleichskatalog' },
    { label: 'Kontaktlinsen-Anpassung', href: '/ratgeber/kontaktlinsen-anpassen' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 w-full">
                {/* Breadcrumb nav */}
        <nav className="text-xs text-slate-500 flex items-center space-x-2">
          <Link to="/" className="hover:underline">Startseite</Link>
          <span>/</span>
          <Link to="/vergleichskatalog" className="hover:underline">Katalog</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Kontaktlinsen anpassen</span>
        </nav>

        {/* Hero Section */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-950 font-mono text-xs font-bold border border-emerald-300">
            <Eye className="w-3.5 h-3.5 text-emerald-800" />
            Fachwissen & Augengesundheit · Keine Ferndiagnose
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Kontaktlinsen anpassen:<br />
            <span className="text-emerald-700">Warum Brillenwerte nicht für Linsen reichen.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            Kontaktlinsen sitzen direkt auf dem Tränenfilm der Hornhaut, während eine Brille typischerweise 12 bis 14 mm vor dem Auge platziert ist. 
            Erfahre hier, wie eine professionelle Anpassung bei Augenarzt oder Optiker abläuft, welche Parameter entscheidend sind und warum Selbstexperimente das Auge gefährden können.
          </p>
        </section>

        {/* Answer-First Box */}
        <section className="bg-amber-50 border border-amber-200 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            Wichtigste Regel für Erstträger & Nachbesteller:
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            <strong>Niemals Linsen ohne Erstanpassung bestellen:</strong> Brillenwerte können insbesondere ab etwa ±4,00 Dioptrien nicht 1:1 als Kontaktlinsenstärke (SPH) übernommen werden (Scheitelabstandseffekt). 
            Zusätzlich müssen Basiskurve (BC, Hornhautkrümmung), Durchmesser (DIA) und Benetzungsverhalten individuell von einem Augenoptiker oder Facharzt für Augenheilkunde ermittelt werden.
          </p>
        </section>

        {/* Die 4 entscheidenden Parameter */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold text-slate-950 tracking-tight">
            Die 4 Kern-Parameter einer Kontaktlinse
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-700 uppercase">1. SPH / PWR (Dioptrien)</span>
              <h3 className="font-extrabold text-slate-900 text-base">Sphärische Stärke</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Gibt die Korrektur der Kurz- (-) oder Weitsichtigkeit (+) an. Wegen des fehlenden Scheitelabstands weicht sie bei höheren Werten von der Brille ab.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-700 uppercase">2. BC (Basiskurve)</span>
              <h3 className="font-extrabold text-slate-900 text-base">Krümmungsradius (8.3 – 8.8 mm)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bestimmt die Wölbung der Linse. Ist der BC zu klein, sitzt die Linse zu fest und schnürt die Sauerstoffversorgung ab. Ist er zu groß, schwimmt sie instabil.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-700 uppercase">3. DIA (Durchmesser)</span>
              <h3 className="font-extrabold text-slate-900 text-base">Linsendurchmesser (13.8 – 14.5 mm)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Muss die gesamte Hornhaut (Cornea) vollständig und ohne mechanische Scheuerkanten überdecken.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-700 uppercase">4. Dk/t (Sauerstoffdurchlässigkeit)</span>
              <h3 className="font-extrabold text-slate-900 text-base">Material & Atmungsaktivität</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Moderne Silikon-Hydrogel-Linsen (z. B. Comfilcon A, Senofilcon A) bieten Werte über 100 Dk/t und schützen die Hornhaut vor Hypoxie.
              </p>
            </div>
          </div>
        </section>

        {/* Ablauf der Anpassung */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold text-slate-950 tracking-tight">
            Schritt für Schritt: Wie läuft eine professionelle Anpassung ab?
          </h2>
          
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center flex-shrink-0 text-sm">
                1
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-base">Anamnese & Trageprofil</h3>
                <p className="text-sm text-slate-600">
                  Besprechung der Trageabsichten: Täglicher Dauereinsatz, Sport oder gelegentliche Freizeitnutzung? Bildschirmarbeitsplatz oder staubige Umgebung?
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center flex-shrink-0 text-sm">
                2
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-base">Spaltlampen-Untersuchung & Hornhaut-Topografie</h3>
                <p className="text-sm text-slate-600">
                  Der Spezialist vermisst die Hornhautkrümmung, prüft die Tränenfilmqualität (Tränenfilm-Aufrisszeit / BUT) und schließt Entzündungen oder Kontraindikationen aus.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center flex-shrink-0 text-sm">
                3
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-base">Probetragen & Sitzkontrolle</h3>
                <p className="text-sm text-slate-600">
                  Einsetzen von Probelinsen. Nach etwa 30 bis 60 Minuten wird der Sitz unter der Spaltlampe mikroskopisch beurteilt (Beweglichkeit beim Blinzeln, Zentrierung).
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center flex-shrink-0 text-sm">
                4
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-base">Linsenpass & Nachkauf</h3>
                <p className="text-sm text-slate-600">
                  Sobald die optimale Linse gefunden ist, erhältst du deinen Kontaktlinsenpass mit exakter Herstellerbezeichnung, BC, DIA und SPH. 
                  Mit diesen Daten kannst du Linsen sicher online nachbestellen oder mit unserem <Link to="/eigenmarken-decoder" className="text-emerald-700 underline font-semibold">Eigenmarken-Decoder</Link> günstige Originale ermitteln.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Funnel Call to Action */}
        <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-mono uppercase text-emerald-400 font-bold">Linsenpass bereits zur Hand?</span>
            <h2 className="text-2xl font-bold tracking-tight">Finde jetzt passende Angebote für deine angepassten Linsen</h2>
            <p className="text-sm text-slate-300">
              Vergleiche hinterlegte Spezifikationen, prüfe ob deine Filial-Linse einer bekannten Handelsmarke entspricht und finde transparente Angebote zum Nachkauf.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link
              to="/eigenmarken-decoder"
              className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-colors text-center"
            >
              Eigenmarke entschlüsseln
            </Link>
            <Link
              to="/vergleichskatalog"
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition-colors text-center border border-slate-700"
            >
              Katalog öffnen
            </Link>
          </div>
        </section>

        {/* YMYL Disclaimer */}
        <section className="p-4 bg-slate-100 rounded-xl border border-slate-200 text-xs text-slate-500 space-y-1">
          <div className="font-bold text-slate-700 flex items-center gap-1.5">
            <Stethoscope className="w-3.5 h-3.5 text-slate-500" />
            Medizinischer Hinweis (YMYL):
          </div>
          <p>
            Die Inhalte auf optical.de dienen ausschließlich der allgemeinen Information und der Markttransparenz. 
            Sie ersetzen keinesfalls die persönliche Untersuchung und Beratung durch einen zugelassenen Augenarzt oder Augenoptikermeister. 
            Lassen Sie Ihre Augen und Linsen mindestens einmal jährlich fachärztlich kontrollieren.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
