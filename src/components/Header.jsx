import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Eye, Bookmark, Sparkles, Menu, X, Layers, Calculator, Search } from 'lucide-react';
import { useSavedLenses } from '../hooks/useSavedLenses';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { savedCount } = useSavedLenses();
  const location = useLocation();

  const navLinks = [
    { to: '/vergleichskatalog', label: 'Kontaktlinsen finden', icon: Layers },
    { to: '/eigenmarken-decoder', label: 'Eigenmarke prüfen', icon: Sparkles },
    { to: '/preisrechner', label: 'Kostenrechner', icon: Calculator },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link 
          to="/" 
          onClick={() => {
            setMobileMenuOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
          className="flex items-center space-x-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl"
          aria-label="optical.de Startseite"
        >
          <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-sm group-hover:bg-slate-800 transition">
            <Eye className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <span className="font-black text-2xl tracking-tight text-slate-950">optical<span className="text-emerald-600">.de</span></span>
            <span className="hidden sm:inline-block ml-2 text-xs font-semibold text-slate-500 border-l border-slate-200 pl-2">
              Deine Kontaktlinsen
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 text-sm font-semibold text-slate-600" aria-label="Hauptnavigation">
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

        {/* Action Button: Meine Linsen (Bookmark) */}
        <div className="flex items-center space-x-2">
          <Link
            to="/meine-linsen"
            aria-label={`Meine gemerkten Linsen (${savedCount})`}
            className={`relative flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold border transition ${
              isActive('/meine-linsen')
                ? 'bg-emerald-600 border-emerald-600 text-white'
                : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isActive('/meine-linsen') ? 'text-white fill-white' : 'text-emerald-600'}`} />
            <span className="hidden sm:inline">Meine Linsen</span>
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

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-950 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-expanded={mobileMenuOpen}
            aria-label="Hauptmenü umschalten"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
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

          <div className="pt-2 border-t border-slate-100">
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
  );
}
