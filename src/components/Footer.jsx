import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye } from 'lucide-react';

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToTrust = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      // Already on home, just scroll
      const el = document.getElementById('trust');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Navigate to home first, then scroll after render
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('trust');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  };

  return (
    <footer className="bg-slate-900 text-white py-12 border-t border-slate-800 text-xs mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5 gap-8 mb-8">
        
        {/* Brand Info */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center">
              <Eye className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="font-black text-xl tracking-tight text-white">optical<span className="text-emerald-400">.de</span></span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">
            Die unabhängige Plattform zum Wiederfinden und Nachkaufen gewohnter Kontaktlinsen. Kein gesellschaftsrechtliches Verhältnis zu den verglichenen Optikerketten oder Herstellern.
          </p>
        </div>

        {/* Direktnavigation */}
        <div>
          <h4 className="font-bold text-white mb-3 tracking-wide">Funktionen &amp; Linsen</h4>
          <ul className="space-y-2 text-slate-400">
            <li><Link to="/vergleichskatalog" className="hover:text-white transition">Kontaktlinsen finden</Link></li>
            <li><Link to="/eigenmarken-decoder" className="hover:text-white transition">Eigenmarken-Decoder</Link></li>
            <li><Link to="/preisrechner" className="hover:text-white transition">Kostenrechner</Link></li>
            <li><Link to="/meine-linsen" className="hover:text-white transition">Meine gemerkten Linsen</Link></li>
            <li><Link to="/tageslinsen-vergleich" className="hover:text-white transition">Tageslinsen im Überblick</Link></li>
            <li><Link to="/monatslinsen-vergleich" className="hover:text-white transition">Monatslinsen im Überblick</Link></li>
          </ul>
        </div>

        {/* Handelsmarken-Dossiers */}
        <div>
          <h4 className="font-bold text-white mb-3 tracking-wide">Optiker-Eigenmarken</h4>
          <ul className="space-y-2 text-slate-400">
            <li><Link to="/apollo-iwear-oxygen" className="hover:text-white transition">Apollo iWear Oxygen</Link></li>
            <li><Link to="/fielmann-actimed" className="hover:text-white transition">Fielmann ActiMed</Link></li>
            <li><Link to="/fielmann-atmo" className="hover:text-white transition">Fielmann Atmo</Link></li>
            <li><Link to="/mister-spex-true-day" className="hover:text-white transition">Mister Spex True Day</Link></li>
            <li><Link to="/specsavers-easyvision-opteyes" className="hover:text-white transition">Specsavers Opteyes</Link></li>
          </ul>
        </div>

        {/* Ratgeber */}
        <div className="hidden md:block">
          <h4 className="font-bold text-white mb-3 tracking-wide">Ratgeber</h4>
          <ul className="space-y-2 text-slate-400">
            <li><Link to="/ratgeber/astigmatismus-kontaktlinsen" className="hover:text-white transition">Kontaktlinsen bei Astigmatismus</Link></li>
            <li><Link to="/ratgeber/tageslinsen-vs-monatslinsen-kosten" className="hover:text-white transition">Tages- vs. Monatslinsen Kosten</Link></li>
            <li><Link to="/ratgeber/kontaktlinsen-pflegemittel-vergleich" className="hover:text-white transition">Pflegemittel-Vergleich</Link></li>
            <li><Link to="/ratgeber/kontaktlinsen-anpassen" className="hover:text-white transition">Kontaktlinsen anpassen</Link></li>
          </ul>
        </div>

        {/* Rechtliches & Transparenz */}
        <div>
          <h4 className="font-bold text-white mb-3 tracking-wide">Rechtliches &amp; Schutz</h4>
          <ul className="space-y-2 text-slate-400">
            <li><Link to="/impressum" className="hover:text-white font-semibold text-emerald-400 transition">→ Impressum</Link></li>
            <li><Link to="/datenschutz" className="hover:text-white transition">→ Datenschutzerklärung</Link></li>
            <li><button onClick={scrollToTrust} className="hover:text-white transition text-left">→ Transparenz-Standard</button></li>
            <li><button onClick={scrollToTrust} className="hover:text-white transition text-left">→ Häufige Fragen (FAQ)</button></li>
          </ul>
        </div>

      </div>

      {/* Affiliate & MDR Disclaimer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 border-t border-slate-800">
        <p className="text-slate-400 text-[11px] leading-relaxed">
          <strong className="text-slate-300">* Werbelink / Partnerlink:</strong> optical.de ist eine unabhängige Plattform und steht in keinem gesellschaftsrechtlichen Verhältnis zu Apollo Optik, Fielmann, Mister Spex, CooperVision, Alcon oder anderen genannten Anbietern. Mit einem Sternchen (*) gekennzeichnete Links sind Partnerlinks (z. B. Amazon-Direktlinks zum Produkt). Der angezeigte Beispielpreis stammt aus unserer Datenbank (Stand 09/2026) und kann vom tagesaktuellen Händlerpreis abweichen. Bei einem Einkauf über einen solchen Link erhalten wir unter Umständen eine kleine Provision – für Sie bleibt der Preis unverändert.
        </p>
        <p className="text-slate-400 text-[11px] leading-relaxed mt-2">
          <strong className="text-slate-300">Medizinprodukte-Hinweis (EU-MDR):</strong> Kontaktlinsen sind sensible Medizinprodukte. optical.de bietet keinerlei medizinische Beratung und spricht keine eigenmächtigen Wechselempfehlungen aus. Unsere Plattform dient ausschließlich dem transparenten Wiederfinden und Nachkaufen von Kontaktlinsen, die Ihnen zuvor durch einen Facharzt für Augenheilkunde oder Augenoptiker fachgerecht angepasst wurden.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-slate-500 gap-2 text-center sm:text-left">
        <span>© {new Date().getFullYear()} optical.de Media. Alle Rechte vorbehalten.</span>
        <span className="text-slate-600">Keine Vor-Ort-Anpassung · Keine Sehstärkenbestimmung.</span>
      </div>
    </footer>
  );
}
