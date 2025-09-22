
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const navItems = [
  { name: "Inicio", href: "#", highlight: true, icon: "home" },
  { name: "Únete al equipo", href: "#reclutamiento", cta: true, icon: "team" },
  { name: "Propiedades", href: "#propiedades", icon: "building" },
  { name: "Contacto", href: "#contacto", icon: "contact" },
];

const iconComponents = {
  home: (props) => (
    <svg className={props.className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  team: (props) => (
    <svg className={props.className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  building: (props) => (
    <svg className={props.className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  contact: (props) => (
    <svg className={props.className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
};

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0.8, 0.95]);
  const headerBlur = useTransform(scrollY, [0, 100], [8, 20]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);
      
      // Detect active section
      const sections = ['hero', 'reclutamiento', 'propiedades', 'testimonios', 'contacto'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const smoothScroll = (href) => {
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setMenuOpen(false);
  };

  return (
    <motion.header 
      initial={{ y: -120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      style={{ 
        backdropFilter: `blur(${headerBlur}px)`,
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)'
      }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'shadow-2xl border-b border-gray-200/30' 
          : 'border-b border-white/20'
      }`}
    >
      {/* Gradiente decorativo superior */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-remax-red via-purple-500 to-remax-blue"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />

      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-4">
        {/* Logo premium */}
        <motion.div 
          className="flex items-center gap-4"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
          style={{ scale: logoScale }}
        >
          <motion.div
            className="relative"
            whileHover={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src="/assets/REMAX_mastrBalloon_RGB_R.pdf.pdf (10 x 2 in) (1).png" 
              alt="RE/MAX NOA" 
              className="h-12 w-auto drop-shadow-lg" 
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-remax-red/20 to-remax-blue/20 rounded-full blur-lg opacity-0"
              whileHover={{ opacity: 1, scale: 1.2 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="hidden sm:block"
          >
            <div className="font-black text-2xl tracking-tight bg-gradient-to-r from-remax-red via-gray-800 to-remax-blue bg-clip-text text-transparent">
              RE/MAX NOA
            </div>
            <motion.div 
              className="text-xs text-gray-500 font-medium tracking-wider uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              Alto Impacto
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Desktop Navigation premium */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item, idx) => {
            const Icon = iconComponents[item.icon];
            const isActive = activeSection === item.href.replace('#', '') || 
                           (item.href === '#' && activeSection === 'hero');
            
            return (
              <motion.button
                key={item.name}
                onClick={() => smoothScroll(item.href)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx + 0.5, duration: 0.5 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -3,
                  transition: { type: "spring", stiffness: 400 }
                }}
                whileTap={{ scale: 0.95 }}
                className={`
                  group relative flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold text-sm
                  transition-all duration-300 backdrop-blur-sm
                  ${item.cta 
                    ? 'bg-gradient-to-r from-remax-red to-remax-blue text-white shadow-lg hover:shadow-xl border border-white/20' 
                    : isActive
                      ? 'bg-remax-red/10 text-remax-red border-2 border-remax-red/30'
                      : 'text-gray-700 hover:text-remax-blue hover:bg-blue-50/80 border border-transparent hover:border-blue-200/50'
                  }
                `}
              >
                {/* Icono animado */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={item.cta ? 'text-white' : ''}
                >
                  <Icon className="w-4 h-4" />
                </motion.div>
                
                <span className="relative">
                  {item.name}
                  
                  {/* Efecto de subrayado animado */}
                  <motion.div
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-remax-red to-remax-blue`}
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </span>

                {/* Efecto de brillo para CTA */}
                {item.cta && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-2xl"
                    initial={{ x: "-100%", opacity: 0 }}
                    whileHover={{ x: "100%", opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                )}

                {/* Indicador activo */}
                {isActive && !item.cta && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-remax-red rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Mobile menu button premium */}
        <motion.button
          className="md:hidden relative w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:bg-white/90 flex items-center justify-center shadow-lg"
          aria-label="Abrir menú"
          onClick={() => setMenuOpen(!menuOpen)}
          whileHover={{ scale: 1.05, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div
            animate={menuOpen ? "open" : "closed"}
            className="flex flex-col justify-center items-center"
          >
            <motion.span
              variants={{
                closed: { rotate: 0, y: 0, backgroundColor: "#E11D48" },
                open: { rotate: 45, y: 6, backgroundColor: "#2563EB" }
              }}
              className="w-6 h-0.5 rounded-full mb-1.5 origin-center transition-all duration-300"
            />
            <motion.span
              variants={{
                closed: { opacity: 1, backgroundColor: "#E11D48" },
                open: { opacity: 0 }
              }}
              className="w-6 h-0.5 bg-remax-red rounded-full mb-1.5 transition-all duration-300"
            />
            <motion.span
              variants={{
                closed: { rotate: 0, y: 0, backgroundColor: "#E11D48" },
                open: { rotate: -45, y: -6, backgroundColor: "#2563EB" }
              }}
              className="w-6 h-0.5 rounded-full origin-center transition-all duration-300"
            />
          </motion.div>
        </motion.button>
      </div>

      {/* Mobile Navigation premium */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="md:hidden bg-white/95 backdrop-blur-2xl border-t border-gray-200/50 shadow-2xl"
          >
            <div className="px-6 py-8 space-y-4">
              {navItems.map((item, idx) => {
                const Icon = iconComponents[item.icon];
                const isActive = activeSection === item.href.replace('#', '') || 
                               (item.href === '#' && activeSection === 'hero');
                
                return (
                  <motion.button
                    key={item.name}
                    onClick={() => smoothScroll(item.href)}
                    initial={{ opacity: 0, x: -50, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                    whileHover={{ 
                      x: 10, 
                      scale: 1.02,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      w-full group flex items-center gap-4 px-6 py-4 rounded-2xl font-semibold text-left
                      transition-all duration-300
                      ${item.cta 
                        ? 'bg-gradient-to-r from-remax-red to-remax-blue text-white shadow-lg' 
                        : isActive
                          ? 'bg-remax-red/10 text-remax-red border-2 border-remax-red/30'
                          : 'text-gray-700 hover:text-remax-blue hover:bg-blue-50/80 border border-gray-200/30 hover:border-blue-200/50'
                      }
                    `}
                  >
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                      className={`flex-shrink-0 ${item.cta ? 'text-white' : ''}`}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.div>
                    
                    <span className="flex-1">{item.name}</span>
                    
                    <motion.svg 
                      className="w-5 h-5 opacity-60 group-hover:opacity-100 group-hover:translate-x-2 transition-all"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      whileHover={{ x: 5 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </motion.svg>
                  </motion.button>
                );
              })}
            </div>
            
            {/* Footer del menú móvil */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="px-6 py-4 border-t border-gray-200/30 bg-gray-50/50"
            >
              <p className="text-xs text-gray-500 text-center">
                © 2024 RE/MAX NOA - Alto Impacto
              </p>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Header;
