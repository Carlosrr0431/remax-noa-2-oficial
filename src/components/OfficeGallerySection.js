import React from "react";
import { motion } from "framer-motion";

// Imagen principal del equipo
const teamImage = require('../assets/EquipoRemax.jpg');

// Iconos SVG inline (sin dependencias externas)
const IconVision = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M1.5 12s3.5-7.5 10.5-7.5S22.5 12 22.5 12 19 19.5 12 19.5 1.5 12 1.5 12Z" />
    <circle cx="12" cy="12" r="3.5" />
  </svg>
);
const IconMission = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M12 21c4.97 0 9-4.03 9-9S16.97 3 12 3 3 7.03 3 12c0 2.12.74 4.07 2 5.61V21l3.1-1.55A8.96 8.96 0 0 0 12 21Z" />
    <path d="M9 10.5h6M9 13.5h3" strokeLinecap="round" />
  </svg>
);
const IconValues = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M12 21s-6-4.35-9-9C.94 9.53 2.22 5.5 6.5 5.5c2.21 0 3.57 1.34 4.5 2.67.93-1.33 2.29-2.67 4.5-2.67 4.28 0 5.56 4.03 3.5 6.5-3 4.65-9 9-9 9Z" />
  </svg>
);

// Pilares / contenido
const pilares = [
  {
    titulo: 'Visión',
    texto: 'Ser el equipo con más agentes reconocidos por su trayectoria y éxito de facturación en la industria.',
    icon: <IconVision />
  },
  {
    titulo: 'Misión',
    texto: 'Somos el equipo que eligen los mejores agentes/dueños del 40% del mercado.',
    icon: <IconMission />
  },
  {
    titulo: 'Valores',
    texto: 'Confianza, enfoque, generosidad, compromiso, responsabilidad y pasión.',
    icon: <IconValues />
  }
];

// Variants para animaciones consistentes
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut', delay: i * 0.15 }
  })
};

function OfficeGallerySection() {
  return (
  <section id="nosotros" className="relative py-24 md:py-28 bg-white overflow-hidden">
      {/* Gradientes decorativos */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <div className="hidden sm:block absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-rose-500 via-rose-400 to-blue-500 blur-3xl" />
        <div className="hidden sm:block absolute bottom-0 right-0 w-[460px] h-[460px] rounded-full bg-gradient-to-tr from-blue-500 via-rose-400 to-rose-500 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
          variants={fadeUp}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <span className="inline-block mb-4 px-5 py-1.5 rounded-full text-sm font-semibold tracking-wide bg-gradient-to-r from-rose-500 to-blue-600 text-white shadow-lg shadow-rose-500/30">
            Nosotros
          </span>
          <h2 className="text-3xl md:text-6xl font-extrabold bg-gradient-to-r from-remax-blue via-rose-600 to-remax-blue bg-clip-text text-transparent leading-tight">
            Pilares que nos definen
          </h2>
          <p className="mt-5 text-base md:text-xl text-gray-600 font-medium leading-relaxed">
            Estos son los pilares fundamentales que guían nuestro trabajo diario y nos ayudan a crear soluciones que realmente marcan la diferencia.
          </p>
        </motion.div>

  <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start md:items-center">
          {/* Imagen / media */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="relative group max-w-md md:max-w-lg xl:max-w-2xl mx-auto w-full"
          >
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-rose-500 via-rose-400 to-blue-500 opacity-70 group-hover:opacity-90 blur-xl transition duration-700" />
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <picture>
                {/* Futuras variantes WebP/AVIF se pueden agregar aquí */}
                <img
                  src={teamImage}
                  alt="Equipo RE/MAX NOA"
                  className="w-full h-[420px] sm:h-[480px] md:h-[560px] xl:h-[640px] object-cover object-center transition duration-[900ms] group-hover:scale-[1.03] will-change-transform select-none"
                  loading="lazy"
                  decoding="async"
                  fetchpriority="low"
                  sizes="(min-width:1536px) 700px, (min-width:1280px) 640px, (min-width:1024px) 560px, 90vw"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="backdrop-blur-sm bg-white/25 px-4 py-2.5 rounded-xl border border-white/40 shadow-md">
                  <p className="text-white font-semibold tracking-wide text-xs sm:text-sm">
                    Crecemos juntos · Alto Impacto
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

            {/* Pilares */}
          <div className="space-y-8 md:space-y-10 max-w-xl mx-auto">
            {pilares.map((p, i) => (
              <motion.div
                key={p.titulo}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="relative group"
              >
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-rose-500 to-blue-600 opacity-0 group-hover:opacity-90 blur-md transition duration-700" />
                <div className="relative bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl px-6 py-7 md:p-8 shadow-xl overflow-hidden">
                  <div className="absolute top-0 right-0 -translate-y-10 translate-x-10 w-44 h-44 bg-gradient-to-br from-rose-200 via-rose-100 to-blue-100 rounded-full opacity-30 group-hover:scale-110 transition duration-700" />
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-4">
                    <span className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-blue-600 text-white shadow-lg">
                      {p.icon}
                    </span>
                    {p.titulo}
                  </h3>
                  <p className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed font-medium">
                    {p.texto}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default OfficeGallerySection;
