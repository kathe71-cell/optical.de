import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Eye, Bookmark, Sparkles, Menu, X, Layers, Calculator, Search, SlidersHorizontal, Glasses, Check } from 'lucide-react';
import { useSavedLenses } from '../hooks/useSavedLenses';
import { useSehkomfort } from '../context/SehkomfortContext';
import SearchModal from './SearchModal';
import RefillBanner from './RefillBanner';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { savedCount } = useSavedLenses();
  const { sehkomfort, toggleSehkomfort } = useSehkomfort();
  const location = useLocation();

  useEffect(() => {
    const handleCustomToggle = () => setSearchOpen(prev => !prev);
    window.addEventListener('toggle-optical-search', handleCustomToggle);
    return () => window.removeEventListener('toggle-optical-search', handleCustomToggle);
  }, []);

  const navLinks = [
    { to: '/vergleichskatalog', label: 'Kontaktlinsen finden', icon: Layers },
    { to: '/eigenmarken-decoder', label: 'Eigenmarke prüfen', icon: Sparkles },
    { to: '/preisrechner', label: 'Kostenrechner', icon: Calculator },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <RefillBanner />
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link 
          to="/" 
          onClick={() => {
            setMobileMenuOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
          className="flex items-center space-x-2 sm:space-x-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl shrink-0"
          aria-label="optical.de Startseite"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-bold text-lg sm:text-xl shadow-sm group-hover:bg-slate-800 transition shrink-0">
            <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
          </div>
          <div className="flex flex-col items-start justify-center leading-none">
            <span className="font-black text-lg sm:text-2xl tracking-tight text-slate-950 leading-tight">
              optical<span className="text-emerald-600">.de</span>
            </span>
            <span className="hidden sm:inline-block text-[11px] font-semibold text-slate-500 tracking-normal mt-0.5 leading-tight brand-claim">
              Deine Kontaktlinsen
            </span>
          </div>
        </Link>

        {/* Desktop Navigation (sicher ab xl: 1280px) */}
        <nav className="hidden xl:flex items-center space-x-1 lg:space-x-2 text-sm font-semibold text-slate-600" aria-label="Hauptnavigation">
          {navLinks.map((link) => {
            const active = isActive(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                  active 
                    ? 'bg-slate-100 text-slate-950 font-bold' 
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons: Sehkomfort, Suche & Meine Linsen */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Sehkomfort Umschalter */}
          <button
            type="button"
            onClick={toggleSehkomfort}
            aria-pressed={sehkomfort}
            aria-label={sehkomfort ? "Sehkomfort-Modus aktiv (Klicken zum Deaktivieren)" : "Sehkomfort-Modus aktivieren (größere Schrift & hohe Kontraste)"}
            className={`flex items-center gap-1 sm:gap-1.5 p-2 sm:px-2.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold border transition shrink-0 ${
              sehkomfort
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs ring-2 ring-emerald-500/30'
                : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200 hover:border-slate-300'
            }`}
            title={sehkomfort ? "Sehkomfort: AN" : "Sehkomfort: AUS"}
          >
            <Glasses className={`w-4 h-4 shrink-0 ${sehkomfort ? 'text-white' : 'text-slate-600'}`} />
            <span className="hidden md:inline">Sehkomfort</span>
            <span className={`hidden sm:inline-block text-[10px] font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-wider ${
              sehkomfort
                ? 'bg-emerald-800 text-emerald-100'
                : 'bg-slate-100 text-slate-600 border border-slate-200'
            }`}>
              {sehkomfort ? 'AN' : 'AUS'}
            </span>
          </button>

          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-1 sm:gap-1.5 p-2 sm:px-2.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 transition shrink-0"
            title="Suche öffnen (Strg + K)"
            aria-label="Suche öffnen"
          >
            <Search className="w-4 h-4 text-slate-600 shrink-0" />
            <span className="hidden md:inline">Suche</span>
            <kbd className="hidden 2xl:inline-block bg-white border border-slate-300 text-[10px] font-mono px-1 rounded text-slate-500">⌘K</kbd>
          </button>

          <Link
            to="/meine-linsen"
            aria-label={`Meine gemerkten Linsen (${savedCount})`}
            className={`relative flex items-center gap-1 sm:gap-1.5 p-2 sm:px-2.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold border transition shrink-0 ${
              isActive('/meine-linsen')
                ? 'bg-emerald-600 border-emerald-600 text-white'
                : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            <Bookmark className={`w-4 h-4 shrink-0 ${isActive('/meine-linsen') ? 'text-white fill-white' : 'text-emerald-600'}`} />
            <span className="hidden md:inline">Meine Linsen</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold transition-transform ${
              isActive('/meine-linsen') 
                ? 'bg-white text-emerald-700' 
                : savedCount > 0 
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                  : 'bg-slate-100 text-slate-500'
            }`}>
              {savedCount}
            </span>
          </Link>

          {/* Mobile Menu Toggle Button (aktiv bis xl) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-950 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 shrink-0"
            aria-expanded={mobileMenuOpen}
            aria-label="Hauptmenü umschalten"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 pt-1">
            Navigation
          </div>
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition ${
                  active 
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' 
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}

          <div className="pt-2 border-t border-slate-100 space-y-2">
            <button
              type="button"
              onClick={toggleSehkomfort}
              aria-pressed={sehkomfort}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold border transition ${
                sehkomfort
                  ? 'bg-emerald-600 text-white border-emerald-700'
                  : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <Glasses className={`w-4 h-4 ${sehkomfort ? 'text-white' : 'text-slate-600'}`} />
                <span>Sehkomfort-Modus</span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-extrabold uppercase tracking-wider ${
                sehkomfort
                  ? 'bg-emerald-800 text-white'
                  : 'bg-white text-slate-700 border border-slate-200'
              }`}>
                {sehkomfort ? 'Aktiv (AN)' : 'Inaktiv (AUS)'}
              </span>
            </button>

            <Link
              to="/meine-linsen"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold transition ${
                isActive('/meine-linsen')
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-50 text-slate-800 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-emerald-500" />
                <span>Meine gemerkten Linsen</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white text-slate-800 font-extrabold border border-slate-200">
                {savedCount}
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  </>
  );
}
