import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";

function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [wordIndex, setWordIndex] = useState(0);
  const [posterData, setPosterData] = useState(null);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef(null);
  const { scrollY } = useScroll();
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Palabras para la animación de texto dinámico
  const words = ["innovación", "tecnología", "excelencia", "compromiso", "resultados", "confianza"];
  
  // Parallax effects
  const yVideoParallax = prefersReducedMotion ? 0 : useTransform(scrollY, [0, 1000], [0, -200]);
  const yContentParallax = prefersReducedMotion ? 0 : useTransform(scrollY, [0, 1000], [0, -100]);
  const opacityParallax = prefersReducedMotion ? 1 : useTransform(scrollY, [0, 400], [1, 0]);
  
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
  }, [xSpring, ySpring]);

  // Effect para la animación de texto dinámico
  useEffect(() => {
    if (prefersReducedMotion) return; // no animar rotación de palabras
    const interval = setInterval(() => {
      setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [words.length, prefersReducedMotion]);

  // Capturar primer frame del video para usarlo como poster (mejor experiencia de carga / compartir)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth || 1280;
        canvas.height = video.videoHeight || 720;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        setPosterData(dataUrl);
      } catch (e) {
        console.warn('No se pudo generar poster dinámico:', e);
      }
    };
    const handleCanPlay = () => setVideoReady(true);
    video.addEventListener('loadeddata', handleLoadedData, { once: true });
    video.addEventListener('canplay', handleCanPlay, { once: true });
    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [prefersReducedMotion]);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 md:pt-32 pb-16"
      id="hero"
    >

      {/* Poster estático (primer frame) detrás mientras el video prepara */}
      {posterData && (
        <img
          src={posterData}
          alt="Primer frame video RE/MAX NOA"
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full object-cover scale-105 transition-opacity duration-700 ${videoReady ? 'opacity-0' : 'opacity-100'}`}
          style={{ zIndex: 1 }}
        />
      )}
      {/* Video de fondo con parallax (se muestra cuando está listo) */}
      <motion.video
        ref={videoRef}
        style={{ y: yVideoParallax, zIndex: 2 }}
        className={`absolute inset-0 w-full h-full object-cover scale-105 transition-opacity duration-700 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
        autoPlay={!prefersReducedMotion}
        loop={!prefersReducedMotion}
        muted
        playsInline
        preload="auto"
        poster={posterData || undefined}
      >
        <source src={require('../assets/video 1920x1080_convención 2024 (1).mp4')} type="video/mp4" />
        {/* Fallback simple */}
      </motion.video>
      
      {/* Overlay eliminado para quitar capa gris oscura al hacer scroll */}
      {/* Si se necesita un ligero oscurecimiento solo detrás del texto, usar un wrapper local */}

      {/* Partículas flotantes premium */}
      <div className="absolute inset-0 z-20">
        {[...Array(prefersReducedMotion ? 4 : 12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0
            }}
            animate={prefersReducedMotion ? { opacity: [0, 0.4, 0] } : {
              y: [null, -30, 0, -20, 0],
              x: [null, Math.random() * 50 - 25, null],
              scale: [0, 1, 0.8, 1, 0.6],
              opacity: [0, 0.6, 1, 0.4, 0],
            }}
            transition={prefersReducedMotion ? { duration: 6, repeat: Infinity } : {
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

      {/* GLOBO FLOTANTE - Aparece junto con el texto descriptivo */}
      <motion.div
        className="absolute top-16 md:top-20 lg:top-24 w-52 md:w-60 h-52 md:h-60 hidden md:flex items-center justify-center"
        style={{
          zIndex: 9999,
 
        }}
        initial={{ opacity: 0, scale: 0.3, y: -50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ 
          duration: 1.5, 
          delay: 1.5,
          ease: [0.25, 0.46, 0.45, 0.94],
          type: "spring",
          stiffness: 80,
          damping: 15
        }}
      >
        <motion.div
          animate={{ 
            x: [-15, 15, -15], // flotación lateral
            y: [-10, 10, -10], // flotación vertical suave
            rotate: [-2, 2, -2] // rotación muy sutil
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-full h-full flex items-center justify-center"
        >
          <img 
            src={require('../assets/WhatsApp Image 2025-03-31 at 15.50.41.png')} 
            className="w-full h-full object-contain" 
            alt="RE/MAX NOA Globo"
            style={{
              filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))'
            }}
          />
        </motion.div>
      </motion.div>

      {/* Contenido principal con parallax - Movido hacia abajo para dar espacio al globo */}
      <motion.div 
        style={{ 
          y: yContentParallax, 
          opacity: opacityParallax,
          x: xSpring,
          rotateY: xSpring
        }}
  className="relative z-30 w-full max-w-5xl mx-auto px-4 text-center md:mt-32 lg:mt-36 xl:mt-40"
      >
        {/* Globo móvil (separado para evitar solapamiento) */}
        <div className="flex md:hidden items-center justify-center mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, type: 'spring', stiffness: 90 }}
            className="w-40 h-40"
          >
            <motion.div
              animate={{
                y: [0, -14, 0, -10, 0],
                rotate: [0, 2, -2, 1.5, 0]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full h-full flex items-center justify-center"
            >
              <img
                src={require('../assets/WhatsApp Image 2025-03-31 at 15.50.41.png')}
                alt="RE/MAX NOA Globo"
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Título eliminado a pedido del usuario para destacar solo el globo animado */}
        <div className="mb-4" />

        {/* Subtítulo premium con texto animado */}
        <motion.p
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 1.8 }}
          whileHover={{ scale: 1.02 }}
          className="text-lg sm:text-xl md:text-2xl text-white/95 mb-8 sm:mb-10 max-w-xl sm:max-w-2xl mx-auto font-light backdrop-blur-sm bg-black/30 md:bg-white/5 px-6 py-5 rounded-3xl border border-white/10 shadow-2xl leading-snug"
        >
          <span className="block text-center">Transforma tu futuro inmobiliario</span>
          <span className="block text-center mt-1">
            <span className="inline-flex items-baseline justify-center gap-1.5">
              <span>con</span>
              <span className="relative inline-block h-[1.3em] overflow-hidden min-w-[7ch]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -30, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="text-remax-red font-semibold"
                  >
                    {words[wordIndex]}.
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>
          </span>
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
            href="https://remaxnoa.com.ar/sumate"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ 
              scale: 1.08, 
              y: -5,
              boxShadow: "0 20px 40px rgba(225,29,72,0.4), 0 0 0 1px rgba(255,255,255,0.1)"
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-remax-red via-red-500 to-remax-blue text-white px-8 sm:px-10 md:px-12 py-4 md:py-5 rounded-full font-bold text-lg md:text-xl shadow-2xl transition-all duration-500 overflow-hidden"
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
            {/* Texto CTA simplificado para evitar repetición de marca en exceso */}
            {/* <span className="relative z-10">¡Sumate al Equipo!</span> */}
            
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
            transition={{ delay: 2.6, duration: 1 }}
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mt-4 md:mt-6 text-white/80 text-xs sm:text-sm"
          >
            <motion.div 
              className="text-center min-w-[90px]"
              whileHover={{ scale: 1.1, color: "#E11D48" }}
            >
              <div className="font-bold text-xl sm:text-2xl">50+</div>
              <div>Agentes exitosos</div>
            </motion.div>
            <motion.div 
              className="text-center min-w-[90px]"
              whileHover={{ scale: 1.1, color: "#2563EB" }}
            >
              <div className="font-bold text-xl sm:text-2xl">17+</div>
              <div>Años de experiencia</div>
            </motion.div>
            <motion.div 
              className="text-center min-w-[90px]"
              whileHover={{ scale: 1.1, color: "#ffffff" }}
            >
              <div className="font-bold text-xl sm:text-2xl">#1</div>
              <div>En el NOA</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

     
    </section>
  );
}

export default HeroSection;