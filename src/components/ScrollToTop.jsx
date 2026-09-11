import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed right-4 sm:right-6 z-[9998] pointer-events-auto"
      style={{ 
        bottom: 'max(5.25rem, calc(4.75rem + env(safe-area-inset-bottom, 0px)))',
        transform: 'translate3d(0,0,0)',
        WebkitTransform: 'translate3d(0,0,0)'
      }}
    >
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Nach oben scrollen"
        title="Nach oben"
        className="p-3 rounded-full bg-white/95 text-slate-700 hover:text-emerald-700 hover:bg-white border border-slate-300 hover:border-emerald-500 shadow-lg hover:shadow-xl transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 group"
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </div>
  );
}
