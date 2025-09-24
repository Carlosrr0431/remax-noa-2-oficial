import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PHONE_NUMBER = '5493876852073';
const WA_URL = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent('Hola, quisiera más información sobre RE/MAX NOA')}`;

export default function BottomNav() {
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState('nosotros');

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - last;
      // Ocultar en scroll down, mostrar en scroll up
      if (Math.abs(delta) > 8) setHidden(delta > 0 && y > 80);
      last = y;
      // Detectar sección activa
      const sections = ['nosotros','reclutamiento','propiedades'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top <= 110 && r.bottom >= 110) { setActive(id); break; }
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const smoothScroll = (href) => {
    if (href === '#' || href === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const targetId = href.replace('#','');
    const el = document.getElementById(targetId);
    if (!el) return;
    const headerEl = document.querySelector('header');
    const headerH = window.innerWidth >= 768 && headerEl ? headerEl.offsetHeight : 0;
    const y = el.getBoundingClientRect().top + window.pageYOffset - headerH - 8;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: hidden ? 100 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 38 }}
        className="fixed md:hidden inset-x-0 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-[60] px-4 pointer-events-none"
        aria-label="Navegación inferior"
      >
        <div className="mx-auto w-full max-w-sm pointer-events-auto">
          <div className="relative bg-white/90 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl px-2 py-2 flex items-center justify-between gap-1">
          {/* Sumarte (externo) */}
          <a
            href="https://remaxnoa.com.ar/sumate"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-0 flex flex-col items-center gap-1 py-2 rounded-2xl text-white"
            aria-label="Sumarte"
          >
            <span className="relative inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-remax-red to-remax-blue shadow-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </span>
            <span className="text-[11px] font-semibold tracking-wide text-remax-blue">Sumarte</span>
          </a>

          {/* Nosotros (anchor) */}
          <button
            onClick={() => smoothScroll('#nosotros')}
            className={`flex-1 min-w-0 flex flex-col items-center gap-1 py-2 rounded-2xl ${active==='nosotros' ? 'text-remax-blue' : 'text-gray-700 hover:text-remax-blue'}`}
            aria-label="Nosotros"
          >
            <span className={`relative inline-flex items-center justify-center w-12 h-12 rounded-2xl border ${active==='nosotros' ? 'bg-gradient-to-br from-remax-red to-remax-blue text-white border-white/30 shadow-lg' : 'bg-white/70 border-gray-200'} shadow`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            </span>
            <span className="text-[11px] font-semibold tracking-wide">Nosotros</span>
          </button>

          {/* WhatsApp (externo) */}
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-0 flex flex-col items-center gap-1 py-2 rounded-2xl text-emerald-600"
            aria-label="WhatsApp"
          >
            <span className="relative inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 via-green-500 to-emerald-600 text-white shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-6 h-6"><path fill="currentColor" d="M16.04 3C9.41 3 4 8.41 4 15.06c0 2.65.91 5.11 2.46 7.1L4 29l7.13-2.37a12 12 0 004.91 1.04h.01c6.63 0 12.04-5.41 12.04-12.06C28.09 8.41 22.68 3 16.04 3zm0 22.01h-.01a10 10 0 01-4.78-1.21l-.34-.19-4.23 1.41 1.38-4.12-.22-.35a10 10 0 1118.54-5.49c0 5.53-4.5 9.95-10.04 9.95zm5.49-7.48c-.3-.15-1.79-.88-2.07-.98-.28-.1-.48-.15-.68.15-.2.29-.78.97-.95 1.16-.17.19-.35.21-.65.06-.3-.15-1.26-.46-2.4-1.47-.89-.8-1.48-1.79-1.66-2.09-.17-.29-.02-.45.13-.6.13-.13.3-.35.44-.52.15-.17.2-.29.3-.49.1-.19.05-.37-.03-.52-.08-.15-.68-1.64-.93-2.25-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.46 0 1.45 1.07 2.86 1.22 3.06.15.2 2.11 3.25 5.1 4.55.71.31 1.27.5 1.7.64.72.23 1.38.2 1.9.12.58-.09 1.79-.73 2.04-1.43.25-.7.25-1.29.17-1.42-.08-.13-.27-.21-.57-.36z"/></svg>
            </span>
            <span className="text-[11px] font-semibold tracking-wide">WhatsApp</span>
          </a>

          {/* Propiedades (anchor) */}
          <button
            onClick={() => smoothScroll('#propiedades')}
            className={`flex-1 min-w-0 flex flex-col items-center gap-1 py-2 rounded-2xl ${active==='propiedades' ? 'text-remax-blue' : 'text-gray-700 hover:text-remax-blue'}`}
            aria-label="Propiedades"
          >
            <span className={`relative inline-flex items-center justify-center w-12 h-12 rounded-2xl border ${active==='propiedades' ? 'bg-gradient-to-br from-remax-red to-remax-blue text-white border-white/30 shadow-lg' : 'bg-white/70 border-gray-200'} shadow`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
            </span>
            <span className="text-[11px] font-semibold tracking-wide">Propiedades</span>
          </button>
          </div>
        </div>
      </motion.nav>
    </AnimatePresence>
  );
}
