import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Database, AlertTriangle, FileText, CheckCircle2, Scale, ExternalLink, Calculator } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MetaTags from '../components/MetaTags';
import MedicalDisclaimer from '../components/MedicalDisclaimer';
import ScrollToTop from '../components/ScrollToTop';

export default function TransparencyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col justify-between">
      <MetaTags 
        title="Transparenzstandard & Datenethik | optical.de"
        description="Wie optical.de Daten erfasst, verifiziert und zuordnet. Konfidenz-Klassen, Unabhängigkeit, Ausschluss von Testsiegeln und Schutz vor Fehlinformationen."
        canonical="https://www.optical.de/transparenz"
      />
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full flex-grow space-y-12">
        
        {/* Breadcrumb Navigation */}
        <div className="text-xs text-slate-500 flex items-center gap-2">
          <Link to="/" className="hover:text-emerald-700">Startseite</Link>
          <span>/</span>
          <span className="font-semibold text-slate-900">Transparenz-Standard</span>
        </div>

        {/* Header Title & Intro */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Transparenz &amp; Datenethik
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
            Transparenzstandard von optical.de
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            optical.de ist ein unabhängiges Informations- und Nachkaufportal für bereits augenoptisch angepasste Kontaktlinsen. Hier legen wir vollständig offen, wie unsere Daten entstehen, wie wir verifizieren und welche Grenzen wir uns bewusst setzen.
          </p>
        </div>

        {/* Section 1: Datenquellen & Erfassung */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold">
              <Database className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black text-slate-950">1. Woher stammen unsere Daten?</h2>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Alle in unserer Datenbank hinterlegten Spezifikationen (wie Basiskurve, Durchmesser, Wassergehalt, Sauerstofftransmissibilität Dk/t und Materialzusammensetzung) basieren auf öffentlich zugänglichen Primärquellen:
          </p>
          <ul className="text-xs sm:text-sm text-slate-700 space-y-2 list-disc pl-5 leading-relaxed">
            <li><strong>Offizielle Hersteller-Datenblätter:</strong> Technische Spezifikationsdokumente von CooperVision, Alcon, Bausch + Lomb sowie Johnson &amp; Johnson Vision.</li>
            <li><strong>Packungskennzeichnungen (Blister &amp; Umkarton):</strong> Gesetzlich vorgeschriebene Pflichtangaben gemäß Medizinprodukteverordnung (EU-MDR).</li>
            <li><strong>Behördliche Register &amp; USAN-Materialnomenklatur:</strong> Eindeutige chemische Wirkstoff- und Polymerbezeichnungen.</li>
          </ul>
          <p className="text-xs text-slate-500 italic pt-2 border-t border-slate-100">
            Wir erfinden keine Daten. Fehlt ein Wert in den Primärquellen, wird er transparent als nicht hinterlegt ausgewiesen.
          </p>
        </section>

        {/* Section 2: Die 4 Konfidenz-Klassen beim Eigenmarken-Mapping */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Scale className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black text-slate-950">2. Die 4 Konfidenz-Klassen beim Eigenmarken-Mapping</h2>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Optikerketten vertreiben Kontaktlinsen oft unter Handelsmarken (Private Labels). optical.de behauptet niemals pauschal, dass Produkte „100 % baugleich“ sind, sondern stuft jede Zuordnung in ein strenges vierstufiges Raster ein:
          </p>
          
          <div className="space-y-3 pt-2 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
              <span className="font-bold text-emerald-950 block text-sm">A. VERIFIED IDENTICAL (Bestätigte OEM-Identität)</span>
              <p className="text-emerald-900 text-xs mt-1">
                Wird nur vergeben, wenn eine formelle Bestätigung des Herstellers oder ein öffentlich dokumentierter OEM-Vertrag vorliegt.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-sky-50 border border-sky-200">
              <span className="font-bold text-sky-950 block text-sm">B. HIGH-CONFIDENCE MATCH (Hohe technische Übereinstimmung)</span>
              <p className="text-sky-900 text-xs mt-1">
                Der USAN-Materialname, Wassergehalt, Dk/t-Wert, Basiskurve und Durchmesser stimmen nach öffentlich dokumentiertem Datenblatt überein.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
              <span className="font-bold text-amber-950 block text-sm">C. RELATED / SAME MATERIAL FAMILY (Verwandte Materialfamilie)</span>
              <p className="text-amber-900 text-xs mt-1">
                Gleiche Polymerklasse, jedoch abweichende Oberflächenbehandlung, Geometrie oder Tragerhythmen.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-100 border border-slate-200">
              <span className="font-bold text-slate-900 block text-sm">D. UNVERIFIED (Unzureichende Datenbasis)</span>
              <p className="text-slate-700 text-xs mt-1">
                Keine belastbare Zuordnung möglich. optical.de gibt hier keine spekulativen Empfehlungen ab.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Keine erfundenen Siegel & Verzicht auf Superlative */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black text-slate-950">3. Verzicht auf Testsiegel &amp; werbliche Superlative</h2>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            optical.de führt keine eigenen Labortests durch und vergibt keine Testsiegel. Wir verzichten strikt auf werbliche Floskeln wie „Testsieger“, „beste Kontaktlinse“ oder „gesündeste Linse“. Welche Linse für ein Auge optimal ist, kann ausschließlich im Rahmen einer individuellen Spaltlampenuntersuchung durch einen Augenarzt oder Augenoptiker beurteilt werden.
          </p>
        </section>

        {/* Section 4: Preislogik & Transparenz */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Calculator className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black text-slate-950">4. Preislogik &amp; Filialpreise</h2>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            optical.de trifft keine pauschalen Preisfeststellungen für stationäre Optikerfilialen, da diese regional und aktionsabhängig variieren. Online-Preise werden als Orientierungspreise aus unserer Datenbank (Stand 09/2026) ausgewiesen. Für die Berechnung persönlicher Einsparungen bitten wir Nutzer, ihren tatsächlich bezahlten Filialpreis im Rechner einzutragen.
          </p>
        </section>

        {/* Section 5: Unabhängigkeit & Affiliate-Kennzeichnung */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black text-slate-950">5. Kommerzielle Unabhängigkeit &amp; Affiliate-Links</h2>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            optical.de finanziert sich über Partnerlinks (z. B. Amazon-Partnerprogramm). Alle kommerziellen Links sind transparent mit einem Sternchen (*) und dem Hinweis „* Werbelink / Partnerlink“ gekennzeichnet. Wir stehen in keinem gesellschaftsrechtlichen Verhältnis zu den verglichenen Marken oder Händlern. Die redaktionelle Einordnung erfolgt streng unabhängig von Provisionshöhen.
          </p>
        </section>

        {/* Medizinischer Pflicht-Hinweis */}
        <MedicalDisclaimer />

      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
