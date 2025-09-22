import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const benefits = [
  {
    id: 1,
    title: "Cultura colaborativa",
    desc: "Forma parte de un equipo unido donde el éxito individual impulsa el crecimiento colectivo, con mentorías personalizadas y networking constante.",
    icon: "🤝",
    iconSvg: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    gradient: "from-blue-500 via-indigo-500 to-purple-600",
    stats: "98% satisfacción",
    feature: "Mentorías 1:1"
  },
  {
    id: 2,
    title: "Tecnología de vanguardia",
    desc: "Acceso exclusivo a herramientas de última generación, CRM avanzado, marketing digital automatizado y plataformas de análisis de mercado.",
    icon: "💻",
    iconSvg: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    gradient: "from-emerald-500 via-teal-500 to-cyan-600",
    stats: "50+ herramientas",
    feature: "IA Integrada"
  },
  {
    id: 3,
    title: "Capacitación premium",
    desc: "Programa de formación continua con certificaciones internacionales, workshops exclusivos y acceso a los mejores coaches inmobiliarios.",
    icon: "🎓",
    iconSvg: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
      </svg>
    ),
    gradient: "from-purple-500 via-pink-500 to-rose-600",
    stats: "200+ cursos",
    feature: "Certificaciones"
  },
  {
    id: 4,
    title: "Ingresos excepcionales",
    desc: "Plan de comisiones líder en el mercado, bonos por performance, incentivos trimestrales y oportunidades de crecimiento económico ilimitado.",
    icon: "💰",
    iconSvg: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    gradient: "from-amber-500 via-orange-500 to-red-600",
    stats: "300% más ingresos",
    feature: "Bonos trimestrales"
  },
];

const achievements = [
  { number: "15+", label: "Años liderando", icon: "🏆" },
  { number: "950+", label: "Ventas exitosas", icon: "🎯" },
  { number: "100+", label: "Agentes top", icon: "⭐" },
  { number: "#1", label: "En el NOA", icon: "👑" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { 
    y: 80, 
    opacity: 0, 
    scale: 0.8,
    rotateX: -15 
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.8
    }
  }
};

const floatingVariants = {
  float: {
    y: [0, -20, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

function RecruitmentSection() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -100]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="reclutamiento" className="relative py-40 bg-gradient-to-br from-slate-50 via-white to-indigo-50 overflow-hidden">
      {/* Fondos animados premium */}
      <motion.div
        style={{ y: y1, opacity }}
        className="absolute inset-0"
      >
        <div className="absolute top-32 left-20 w-96 h-96 bg-gradient-to-br from-remax-red/15 to-pink-400/15 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-gradient-to-br from-remax-blue/15 to-purple-400/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-emerald-300/10 to-teal-400/10 rounded-full blur-3xl" />
      </motion.div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'%3e%3cpath d='m 40 0 l 0 40 l -40 0 l 0 -40 l 40 0' fill='none' stroke='%23000000' stroke-width='1'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23grid)' /%3e%3c/svg%3e")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header cinematográfico */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="text-center mb-32"
        >
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block mb-8"
          >
            <div className="bg-gradient-to-r from-remax-blue/10 to-remax-red/10 backdrop-blur-sm border border-white/30 rounded-full px-8 py-4">
              <span className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  🚀
                </motion.span>
                Tu Carrera Te Espera
              </span>
            </div>
          </motion.div>

          <motion.h2
            className="text-6xl md:text-8xl font-black mb-8 leading-tight"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <span className="bg-gradient-to-r from-gray-800 via-remax-blue to-remax-red bg-clip-text text-transparent">
              ¿Por qué elegir
            </span>
            <br />
            <span className="bg-gradient-to-r from-remax-red via-pink-500 to-remax-blue bg-clip-text text-transparent">
              RE/MAX NOA?
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Únete al equipo inmobiliario más exitoso del Noroeste Argentino y transforma 
            tu futuro profesional con oportunidades ilimitadas de crecimiento
          </motion.p>

          {/* Stats premium */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto"
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                className="text-center"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="text-4xl mb-2"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    delay: index * 0.5,
                    ease: "easeInOut"
                  }}
                >
                  {achievement.icon}
                </motion.div>
                <div className="text-3xl font-black bg-gradient-to-r from-remax-red to-remax-blue bg-clip-text text-transparent">
                  {achievement.number}
                </div>
                <div className="text-sm text-gray-600 font-semibold uppercase tracking-wide">
                  {achievement.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Imagen de premiados con efectos premium */}
        <motion.div 
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, type: "spring" }}
          className="mb-32 relative"
        >
          <div className="relative max-w-5xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.02, rotateY: 2 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative group"
            >
              <img 
                src="/assets/premiados.jpg" 
                alt="Equipo premiado RE/MAX NOA" 
                className="w-full rounded-3xl shadow-2xl border-4 border-white/50 backdrop-blur-sm"
              />
              
              {/* Overlay con información */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-3xl flex items-end justify-center pb-8"
                whileHover={{ opacity: 1 }}
              >
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  className="text-center text-white"
                >
                  <h3 className="text-2xl font-bold mb-2">🏆 Equipo Premiado 2024</h3>
                  <p className="text-lg">Reconocidos a nivel nacional por excelencia</p>
                </motion.div>
              </motion.div>

              {/* Badges flotantes */}
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                variants={floatingVariants}
                animate="float"
                className="absolute -top-6 -right-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-6 py-4 rounded-full font-bold shadow-2xl"
              >
                <div className="text-center">
                  <div className="text-2xl">🏆</div>
                  <div className="text-sm font-black">PREMIADOS</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ scale: 0, rotate: 45 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8 }}
                variants={floatingVariants}
                animate="float"
                style={{ animationDelay: '3s' }}
                className="absolute -top-6 -left-6 bg-gradient-to-r from-emerald-400 to-teal-500 text-white px-6 py-4 rounded-full font-bold shadow-2xl"
              >
                <div className="text-center">
                  <div className="text-2xl">🎯</div>
                  <div className="text-sm font-black">#1 NOA</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Cards con efectos 3D premium */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.id}
              variants={itemVariants}
              onHoverStart={() => setHoveredCard(benefit.id)}
              onHoverEnd={() => setHoveredCard(null)}
              whileHover={{ 
                scale: 1.03, 
                y: -20,
                rotateY: 3,
                rotateX: 2,
                transition: { type: "spring", stiffness: 300, damping: 30 }
              }}
              className="group relative bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl p-8 overflow-hidden transition-all duration-500"
              style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)`,
                backdropFilter: 'blur(20px)',
                transformStyle: "preserve-3d"
              }}
            >
              {/* Efecto de brillo dinámico */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700`}
              />

              {/* Partículas flotantes */}
              <div className="absolute top-4 right-4">
                <motion.div
                  className="w-2 h-2 bg-remax-red/40 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 1, 0.4]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.7
                  }}
                />
              </div>

              <div className="relative z-10 text-center">
                {/* Icono premium con animaciones */}
                <motion.div
                  className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${benefit.gradient} rounded-2xl shadow-xl flex items-center justify-center text-white relative overflow-hidden`}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, -5, 5, -5, 0],
                    transition: { duration: 0.6 }
                  }}
                >
                  {/* Efecto de brillo en el icono */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {benefit.iconSvg}
                  </motion.div>
                </motion.div>

                {/* Stats badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.5 }}
                  className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold mb-4"
                >
                  {benefit.stats}
                </motion.div>

                <motion.h3 
                  className="font-black text-2xl mb-4 text-gray-800"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {benefit.title}
                </motion.h3>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {benefit.desc}
                </p>

                {/* Feature highlight */}
                <motion.div
                  className={`inline-flex items-center gap-2 bg-gradient-to-r ${benefit.gradient} text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    ⚡
                  </motion.span>
                  {benefit.feature}
                </motion.div>
              </div>

              {/* Decoración inferior */}
              <div className={`absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r ${benefit.gradient} opacity-60`} />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action cinematográfico */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-center"
        >
          <motion.div
            className="relative inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.button
              className="group relative bg-gradient-to-r from-remax-red via-pink-500 to-remax-blue text-white px-16 py-6 rounded-full font-black text-2xl shadow-2xl overflow-hidden transition-all duration-500"
              whileHover={{
                boxShadow: "0 25px 50px rgba(225,29,72,0.4), 0 0 0 1px rgba(255,255,255,0.1)"
              }}
            >
              {/* Efecto de brillo deslizante */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  repeatDelay: 5,
                  ease: "easeInOut"
                }}
              />
              
              <span className="relative z-10 flex items-center gap-4">
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  🚀
                </motion.span>
                ¡Inicia tu carrera HOY!
                <motion.svg
                  className="w-8 h-8 group-hover:translate-x-3 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  whileHover={{ x: 8, rotate: 15 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </span>
            </motion.button>
          </motion.div>

          <motion.p 
            className="text-gray-500 mt-8 text-lg max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Más de <span className="text-remax-red font-bold">100 agentes</span> ya han cambiado sus vidas con nosotros.
            <br />
            <span className="text-remax-blue font-bold">Tu momento es ahora.</span>
          </motion.p>

          {/* Testimonial rápido */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12 bg-white/50 backdrop-blur-sm border border-white/30 rounded-2xl p-6 max-w-2xl mx-auto"
          >
            <p className="text-gray-700 italic text-lg mb-4">
              "Desde que llegué a RE/MAX NOA, mis ingresos se triplicaron y encontré una familia profesional increíble"
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-remax-red to-remax-blue rounded-full flex items-center justify-center text-white font-bold">
                AG
              </div>
              <div className="text-left">
                <div className="font-bold text-gray-800">Agente Exitoso</div>
                <div className="text-sm text-gray-600">3 años en RE/MAX NOA</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default RecruitmentSection;
