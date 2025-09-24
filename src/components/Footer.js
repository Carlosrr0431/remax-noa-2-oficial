import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-slate-900 text-slate-300 pt-6 pb-[calc(1rem+env(safe-area-inset-bottom))] border-t border-slate-800/70">
      {/* sutiles halos de color */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
        <div className="absolute -top-6 -left-10 w-64 h-64 rounded-full bg-remax-blue blur-3xl" />
        <div className="absolute -bottom-10 right-0 w-64 h-64 rounded-full bg-remax-red blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        {/* Contacto compacto */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[13px]">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <span>Salta Capital, Argentina</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            <a href="mailto:noa@remax.com.ar" className="hover:text-white transition-colors">noa@remax.com.ar</a>
          </div>
          <div className="flex items-center gap-2 sm:justify-end">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10l1.5 1.5A11 11 0 0012 20v0a11 11 0 007.5-8.5L21 10M8 10a4 4 0 108 0 4 4 0 10-8 0z" /></svg>
            <a href="tel:+5493876852073" className="hover:text-white transition-colors">+54 9 387 685 2073</a>
          </div>
        </div>

        {/* Divider */}
        <div className="my-4 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

        {/* Disclaimer legal con datos locales */}
        <p className="text-[11px] leading-relaxed text-slate-400">
          Se aclara que todas las operaciones en las que interviene o publicita <span className="font-semibold">RE/MAX NOA</span> son realizadas exclusivamente bajo la gestión del Corredor Inmobiliario y Martillero Público <span className="font-semibold">Pablo Castañeda</span> – C.U.C.I.S. Mat. Nº 208.
        </p>

        {/* Copyright */}
        <div className="mt-3 text-[11px] text-slate-500 flex items-center justify-between">
          <span>© {year} RE/MAX NOA. Todos los derechos reservados.</span>
    
        </div>
      </div>
    </footer>
  );
}

export default Footer;
