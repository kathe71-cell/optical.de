import React from 'react';
import { ShieldCheck, Database, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';

export default function TrustSection() {
  return (
    <section id="trust" className="py-12 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Transparenz &amp; Datenethik
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Transparenzstandard von optical.de
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Sachlicher Vergleich · transparente Datenquellen · Affiliate-Links gekennzeichnet. Hier erfahren Sie, woher unsere Daten stammen, wie wir rechnen und welche Grenzen unsere Plattform bewusst setzt.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: So vergleichen wir */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-slate-300 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-3.5">
              <FileText className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-sm text-slate-900 mb-2">So vergleichen wir</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Wir vergleichen Kontaktlinsen ausschließlich anhand nachprüfbarer technischer Herstellerdaten (Material, Dk/t, Wassergehalt, Geometrie) sowie mathematisch transparenter Preis-pro-Tag-Berechnungen. <strong>optical.de führt keine eigenen Labortests durch und vergibt keine Testsiegel.</strong> Wir verzichten strikt auf werbliche Siegelbegriffe wie „Testsieger“ oder „beste Linse“.
            </p>
          </div>

          {/* Card 2: Datenquellen */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-slate-300 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold mb-3.5">
              <Database className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-sm text-slate-900 mb-2">Unsere Datenquellen</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Die technischen Spezifikationen basieren auf öffentlich zugänglichen Hersteller-Datenblättern, Produktseiten und den behördlichen Pflichtkennzeichnungen auf den Verpackungen der Hersteller (CooperVision, Alcon, Bausch + Lomb, Johnson &amp; Johnson). Wo Daten fehlen, deklarieren wir diese als nicht verifiziert.
            </p>
          </div>

          {/* Card 3: Was optical.de nicht leistet */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-slate-300 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold mb-3.5">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-sm text-slate-900 mb-2">Was optical.de nicht leistet</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              optical.de ist keine Augenarztpraxis und kein Optikerbetrieb. Wir führen keine Sehstärkenmessungen durch und raten niemals zu einem eigenmächtigen Linsenwechsel. optical.de hilft Ihnen ausschließlich, genau die Linse zu finden und transparent zu vergleichen, die Sie bereits verwenden und die Ihnen fachgerecht angepasst wurde.
            </p>
          </div>

        </div>

        {/* Transparenz-Statement zu Affiliate */}
        <div className="mt-8 p-4 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>
              <strong>Redaktionelle Unabhängigkeit:</strong> Unsere sachliche Datenmatrix und die Zuordnungen sind unabhängig davon, ob für ein Produkt ein Partnerlink hinterlegt ist. Alle kommerziellen Links sind transparent mit einem Sternchen (*) gekennzeichnet.
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-mono flex-shrink-0">optical.de Redaktionsrichtlinie</span>
        </div>

      </div>
    </section>
  );
}
