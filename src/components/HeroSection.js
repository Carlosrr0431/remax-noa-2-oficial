import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  
  // Parallax effects
  const yVideoParallax = useTransform(scrollY, [0, 1000], [0, -200]);
  const yContentParallax = useTransform(scrollY, [0, 1000], [0, -100]);
  const opacityParallax = useTransform(scrollY, [0, 400], [1, 0]);
  
  // Smooth spring animations
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const xSpring = useSpring(0, springConfig);
  const ySpring = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      xSpring.set(x);
      ySpring.set(y);
      
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []); // Dependencias vacías para evitar re-renders infinitos

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      id="hero"
    >

      {/* Video de fondo con parallax */}
      <motion.video
        style={{ y: yVideoParallax }}
        className="absolute inset-0 w-full h-full object-cover scale-105"
        src="/assets/video 1920x1080_convención 2024 (1).mp4"
        autoPlay
        loop
        muted
        playsInline
        poster="/assets/0122-DSC08806+B.jpg"
      />
      
      {/* Overlay dinámico con gradiente animado */}
      <motion.div 
        className="absolute inset-0 z-10"
        style={{
          background: `
            radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(225,29,72,0.1) 0%, 
            rgba(37,99,235,0.2) 40%, 
            rgba(0,0,0,0.3) 70%,
            rgba(0,0,0,0.4) 100%)
          `
        }}
      />

      {/* Partículas flotantes premium */}
      <div className="absolute inset-0 z-20">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0
            }}
            animate={{
              y: [null, -30, 0, -20, 0],
              x: [null, Math.random() * 50 - 25, null],
              scale: [0, 1, 0.8, 1, 0.6],
              opacity: [0, 0.6, 1, 0.4, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
          >
            <div className={`w-1 h-1 bg-white/40 rounded-full ${
              i % 3 === 0 ? 'bg-remax-red/30' : i % 3 === 1 ? 'bg-remax-blue/30' : 'bg-white/30'
            }`} />
          </motion.div>
        ))}
      </div>

      {/* Contenido principal con parallax */}
      <motion.div 
        style={{ 
          y: yContentParallax, 
          opacity: opacityParallax,
          x: xSpring,
          rotateY: xSpring
        }}
        className="relative z-30 w-full max-w-6xl mx-auto px-4 text-center"
      >
        {/* Logo con animaciones premium */}
        <motion.div
          initial={{ scale: 0, rotateY: -180, opacity: 0 }}
          animate={{ scale: 1, rotateY: 0, opacity: 1 }}
          transition={{ 
            duration: 1.5, 
            type: "spring", 
            stiffness: 80,
            delay: 0.2
          }}
          whileHover={{ 
            scale: 1.05, 
            rotateY: 5,
            transition: { duration: 0.3 }
          }}
          className="mb-8"
        >
          <img 
            src="/assets/REMAX_mastrBalloon_RGB_R.pdf.pdf (10 x 2 in) (1).png" 
            alt="RE/MAX NOA" 
            className="h-16 md:h-24 w-auto mx-auto drop-shadow-2xl filter" 
          />
        </motion.div>

        {/* Título con efectos cinematográficos */}
        <div className="mb-8">
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white drop-shadow-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.span
              initial={{ x: -200, opacity: 0, rotateY: -90 }}
              animate={{ x: 0, opacity: 1, rotateY: 0 }}
              transition={{ 
                duration: 1.2, 
                delay: 0.7,
                type: "spring",
                stiffness: 100
              }}
              className="block bg-gradient-to-r from-remax-red via-red-400 to-remax-red bg-clip-text text-transparent mb-2"
              whileHover={{ 
                scale: 1.02,
                textShadow: "0 0 30px rgba(225,29,72,0.5)"
              }}
            >
              RE/MAX NOA
            </motion.span>
            
            <motion.span
              initial={{ x: 200, opacity: 0, rotateY: 90 }}
              animate={{ x: 0, opacity: 1, rotateY: 0 }}
              transition={{ 
                duration: 1.2, 
                delay: 1,
                type: "spring",
                stiffness: 100
              }}
              className="block bg-gradient-to-r from-remax-blue via-blue-400 to-remax-blue bg-clip-text text-transparent"
              whileHover={{ 
                scale: 1.02,
                textShadow: "0 0 30px rgba(37,99,235,0.5)"
              }}
            >
              Alto Impacto
            </motion.span>
          </motion.h1>
          
          {/* Línea decorativa animada */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "200px", opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="h-1 bg-gradient-to-r from-remax-red via-white to-remax-blue mx-auto rounded-full mt-6"
          />
        </div>

        {/* Subtítulo premium */}
        <motion.p
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 1.8 }}
          whileHover={{ scale: 1.02 }}
          className="text-xl md:text-2xl text-white/95 mb-12 max-w-3xl mx-auto leading-relaxed font-light backdrop-blur-sm bg-white/5 px-6 py-4 rounded-3xl border border-white/10 shadow-2xl"
        >
          Transforma tu futuro inmobiliario con 
          <span className="text-remax-red font-semibold"> innovación</span> y 
          <span className="text-remax-blue font-semibold"> tecnología</span>.
        </motion.p>

        {/* CTA Button premium con efectos avanzados */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ 
            duration: 1, 
            delay: 2.2,
            type: "spring",
            stiffness: 150
          }}
          className="relative"
        >
          <motion.a
            href="#reclutamiento"
            whileHover={{ 
              scale: 1.08, 
              y: -5,
              boxShadow: "0 20px 40px rgba(225,29,72,0.4), 0 0 0 1px rgba(255,255,255,0.1)"
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-remax-red via-red-500 to-remax-blue text-white px-12 py-5 rounded-full font-bold text-xl shadow-2xl transition-all duration-500 overflow-hidden"
          >
            {/* Efecto de brillo deslizante */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                repeatDelay: 4,
                ease: "easeInOut"
              }}
            />
            
            {/* Icono animado */}
            <motion.svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              whileHover={{ rotate: 15 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </motion.svg>
            
            <span className="relative z-10">¡Sumate a RE/MAX NOA!</span>
            
            {/* Flecha animada */}
            <motion.svg
              className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              whileHover={{ x: 10 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </motion.svg>
            
            {/* Efecto de pulso */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/30"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.a>
          
          {/* Stats flotantes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 1 }}
            className="flex justify-center gap-8 mt-8 text-white/80 text-sm"
          >
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.1, color: "#E11D48" }}
            >
              <div className="font-bold text-2xl">100+</div>
              <div>Agentes exitosos</div>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.1, color: "#2563EB" }}
            >
              <div className="font-bold text-2xl">15+</div>
              <div>Años de experiencia</div>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.1, color: "#ffffff" }}
            >
              <div className="font-bold text-2xl">#1</div>
              <div>En el NOA</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

     
    </section>
  );
}

export default HeroSection;