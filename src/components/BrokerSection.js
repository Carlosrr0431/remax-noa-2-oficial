import React from 'react';
import { motion } from 'framer-motion';

const socials = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/pablocastaneda.ok',
    gradient: 'from-pink-500 via-rose-500 to-purple-500',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069Zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073Zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162Zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4Zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44Z" />
      </svg>
    )
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/pablocastanedabroker',
    gradient: 'from-blue-600 to-blue-800',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073Z" />
      </svg>
    )
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/pablo-casta%C3%B1eda-66ba89316/',
    gradient: 'from-sky-600 to-blue-700',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065Zm1.782 13.019H3.555V9h3.564v11.452Z" />
      </svg>
    )
  },
  {
    name: 'Perfil RE/MAX',
    href: 'https://www.remax.com.ar/agent/pablo-castaneda',
    gradient: 'from-red-600 via-rose-600 to-blue-600',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2 2 7l10 5 9-4.5V13h2V7L12 2Zm0 7L5.5 7 12 4l6.5 3L12 9Zm-7 4v3l7 3 7-3v-3l-7 3-7-3Z" />
      </svg>
    )
  }
];

function BrokerSection() {
  return (
    <section id="broker" className="relative pt-28 pb-20 bg-gradient-to-b from-white via-slate-50 to-slate-100 overflow-hidden">
      {/* Decorative gradients refinados */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-32 w-[520px] h-[520px] rounded-full bg-gradient-to-tr from-remax-red/20 via-pink-400/20 to-remax-blue/20 blur-[120px]" />
        <div className="absolute top-1/3 right-[-200px] w-[620px] h-[620px] rounded-full bg-gradient-to-tr from-remax-blue/15 via-indigo-400/15 to-remax-red/15 blur-[130px]" />
      </div>

      {/* Suave degradado hacia el footer para evitar corte blanco */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent via-slate-200/40 to-slate-900" />

      <div className="relative max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full text-xs font-semibold tracking-wide uppercase bg-gradient-to-r from-remax-red/10 to-remax-blue/10 text-gray-600 border border-gray-200">
            Liderazgo
          </span>
          <h2 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-gray-800 via-remax-blue to-remax-red bg-clip-text text-transparent leading-tight">
            Pablo Castañeda
          </h2>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600 font-medium leading-relaxed">
            Broker responsable y referente estratégico de RE/MAX NOA. Impulsa el crecimiento sostenible del equipo a través de formación constante, visión comercial y una cultura basada en resultados éticos y colaborativos.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start lg:items-center">
          {/* Profile card */}
          <motion.div
            initial={{ opacity: 0, x: -50, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="relative group mx-auto w-full flex justify-center will-change-transform"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
              className="relative"
            >
              {/* Gradient ring */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,theme(colors.remax.red),theme(colors.pink.500),theme(colors.remax.blue),theme(colors.remax.red))] blur-sm opacity-80"
              />
              <div className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full p-[4px] bg-gradient-to-tr from-remax-red via-pink-500 to-remax-blue shadow-2xl">
                <div className="w-full h-full rounded-full overflow-hidden bg-black/5 relative">
                  <picture>
                    <source srcSet={require('../assets/pablo castañeda.webp')} type="image/webp" />
                    <img
                      src={require('../assets/pablo castañeda.webp')}
                      alt="Broker Pablo Castañeda"
                      className="w-full h-full object-cover object-center select-none will-change-transform transition duration-[1400ms] ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-[1.03]"
                      loading="eager"
                      decoding="async"
                      fetchpriority="high"
                      sizes="(min-width:1280px) 288px, (min-width:1024px) 256px, (min-width:640px) 224px, 160px"
                    />
                  </picture>
                  {/* subtle overlay highlight */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/5" />
                </div>
                {/* status badge */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 backdrop-blur-md bg-white/20 px-3 py-1 rounded-full border border-white/30 shadow text-[10px] sm:text-xs font-semibold text-white flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  En crecimiento continuo
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Bio + metrics */}
          <motion.div
            initial={{ opacity: 0, x: 60, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="space-y-10 max-w-xl mx-auto will-change-transform"
          >
            <div className="grid grid-cols-3 gap-4">
              {[
                { n: '17+', l: 'Años de experiencia' },
                { n: '50+', l: 'Agentes guiados' },
                { n: '#1', l: 'Posicionando NOA' }
              ].map((m, i) => (
                <motion.div
                  key={m.l}
                  initial={{ opacity: 0, y: 28, scale: 0.94 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, delay: 0.1 * i, ease: 'easeOut' }}
                  className="relative p-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/60 shadow group overflow-hidden"
                >
                  <div className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-remax-red to-remax-blue bg-clip-text text-transparent">
                    {m.n}
                  </div>
                  <div className="mt-1 text-[11px] md:text-[12px] tracking-wide font-semibold text-gray-600 uppercase">
                    {m.l}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-remax-red to-remax-blue opacity-0 group-hover:opacity-15 transition" />
                </motion.div>
              ))}
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 tracking-tight flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-remax-red to-remax-blue flex items-center justify-center text-white shadow">⭐</span>
                Filosofía de liderazgo
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base font-medium">
                Lidera con visión clara, foco en productividad y desarrollo humano. Su abordaje combina estrategia comercial, acompañamiento profesional y adopción temprana de tecnología para acelerar resultados.
              </p>
              <div>
                <a
                  href="https://www.remax.com.ar/agent/pablo-castaneda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-2 bg-gradient-to-r from-remax-red to-remax-blue text-white px-5 py-3 rounded-xl font-semibold shadow hover:shadow-lg hover:scale-105 transition"
                >
                  Ver Perfil RE/MAX
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </a>
              </div>
            </div>

            <div className="space-y-5">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Conectá con Pablo</h4>
              <div className="flex flex-wrap gap-4">
                {socials.map((s, i) => (
                  <motion.a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.05 * i }}
                    className={`relative inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold text-white bg-gradient-to-r ${s.gradient} shadow-lg hover:shadow-xl hover:-translate-y-1 transition overflow-hidden group`}
                  >
                    <span className="relative z-10 flex items-center gap-2">{s.icon}{s.name}</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 -translate-x-full group-hover:translate-x-full skew-x-12"
                      transition={{ duration: 0.8, ease: 'easeInOut' }}
                    />
                  </motion.a>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="pt-2 border-t border-gray-200 text-xs text-gray-500 leading-relaxed"
            >
              Corredor Responsable: Pablo Castañeda C.U.C.I.S. Mat. Nº 208.
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default BrokerSection;
