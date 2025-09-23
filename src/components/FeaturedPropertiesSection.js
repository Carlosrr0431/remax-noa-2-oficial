import React, { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

// Datos construidos desde los 4 links provistos (resumen sintetizado)
// Si luego se obtienen imágenes oficiales de cada ficha, reemplazar las actuales.
const properties = [
  {
    id: 1,
    title: "Casa 3 Dormitorios Vertientes Eco Pueblo",
    url: "https://www.remax.com.ar/listings/casa-3-dormitorios-venta-vertientes-eco-pueblo",
    price: 160000,
    originalPrice: 160000,
  img: require("../assets/CASA 3 DORMITORIOS VENTA VERTIENTES ECO PUEBLO.webp"),
    desc: "Casa en barrio cerrado Vertientes Eco Pueblo (Vaqueros). Terreno 1.160 m², 238 m² totales aprox. Hall, living, cocina comedor, 2 dorm + 1 dorm en suite con jacuzzi, quincho, lavadero, balcón y amenities del barrio.",
    specs: { bedrooms: 3, bathrooms: 2, area: 238, garage: 1 },
    badge: "Barrio Privado",
    badgeType: "gated",
    location: "Vertientes Eco Pueblo, Vaqueros - Salta",
    type: "Casa",
    ogImage: null // Reemplazar por URL og:image cuando se obtenga
  },
  {
    id: 2,
    title: "Casa 4 Dorm Villa San Lorenzo 5000 m²",
    url: "https://www.remax.com.ar/listings/casa-4-dorm-venta-san-lorenzo-terreno-5000-m2",
    price: 750000,
    originalPrice: 750000,
  img: require("../assets/CASA 4 DORM VENTA SAN LORENZO TERRENO 5000 M2.webp"),
    desc: "Residencia premium en entorno natural. Lote 5.000 m², 336 m² construidos, 4 dorm (1 master suite), sala TV, pileta con deck, calefacción central y área de servicio.",
    specs: { bedrooms: 4, bathrooms: 4, area: 336, garage: 2 },
    badge: "Lote 5000 m²",
    badgeType: "premium",
    location: "Villa San Lorenzo - Salta",
    type: "Casa",
    ogImage: null
  },
  {
    id: 3,
    title: "Casa + 3 Monoambientes Macrocentro",
    url: "https://www.remax.com.ar/listings/casa-3-dorm-3-monoambientes-venta-macrocentro",
    price: 250000,
    originalPrice: 250000,
  img: require("../assets/CASA 3 DORM + 3 MONOAMBIENTES VENTA MACROCENTRO.webp"),
    desc: "Casa + 3 monoambientes independientes. 298 m² totales, 232 m² cubiertos. Ideal renta múltiple y vivienda simultánea.",
    specs: { bedrooms: 6, bathrooms: 5, area: 298, garage: 1 },
    badge: "Renta Múltiple",
    badgeType: "investment",
    location: "Macrocentro - Salta",
    type: "Casa / Inversión",
    ogImage: null
  },
  {
    id: 4,
    title: "Casa 4 Dorm Grand Bourg con Pileta",
    url: "https://www.remax.com.ar/listings/casa-4-dormitorios-venta-b-grand-bourg-con-pileta",
    price: 275000,
    originalPrice: 275000,
  img: require("../assets/CASA 4 DORMITORIOS VENTA B° GRAND BOURG CON PILETA.webp"),
    desc: "Casa en Grand Bourg. 415 m² totales (170 m² cubiertos), pileta, quincho, 4 dorm (2 en suite), altillo y cochera doble.",
    specs: { bedrooms: 4, bathrooms: 2, area: 415, garage: 2 },
    badge: "Ubicación Clave",
    badgeType: "location",
    location: "B° Grand Bourg - Salta",
    type: "Casa",
    ogImage: null
  }
];

const badgeStyles = {
  gated: "from-amber-500 to-orange-600",
  premium: "from-purple-600 to-fuchsia-600",
  investment: "from-blue-600 to-indigo-600",
  location: "from-emerald-500 to-teal-600"
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const cardVariants = {
  hidden: { 
    y: 100, 
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
      damping: 20,
      duration: 0.8
    }
  }
};

function FeaturedPropertiesSection() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [favoriteCards, setFavoriteCards] = useState(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [slideWidth, setSlideWidth] = useState(0);
  const [gap, setGap] = useState(40); // px
  const containerRef = React.useRef(null);

  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -150]);
  const backgroundOpacity = useTransform(scrollY, [0, 500], [1, 0.7]);

  // Calcular layout (ancho de cada slide y gap) para evitar cortes
  React.useEffect(() => {
    const compute = () => {
      if (!containerRef.current) return;
      const w = window.innerWidth;
      const spv = w < 768 ? 1 : 3;
      // Sin gap cuando es 1 por vista para centrar correctamente
      const g = spv === 1 ? 0 : 40;
      setGap(g);
      setSlidesPerView(spv);
      const containerWidth = containerRef.current.offsetWidth;
      const sw = Math.floor((containerWidth - g * (spv - 1)) / spv);
      setSlideWidth(sw);
      setCurrentIndex(0);
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  const maxIndex = React.useMemo(() => Math.max(0, properties.length - slidesPerView), [slidesPerView]);

  const goNext = () => {
    setCurrentIndex(i => (i >= maxIndex ? 0 : i + 1));
  };
  const goPrev = () => {
    setCurrentIndex(i => (i <= 0 ? maxIndex : i - 1));
  };

  // Drag logic
  const trackRef = React.useRef(null);
  const handleDragEnd = (event, info) => {
    const threshold = 80; // px
    if (info.offset.x < -threshold) {
      goNext();
    } else if (info.offset.x > threshold) {
      goPrev();
    } else {
      // Snap back
      setCurrentIndex(i => i);
    }
  };

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favoriteCards);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavoriteCards(newFavorites);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const truncate = (text, max = 190) => {
    if (!text) return '';
    return text.length > max ? text.slice(0, max).trim() + '…' : text;
  };

  return (
    <section id="propiedades" className="py-40 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Fondos animados premium */}
      <motion.div
        style={{ y: backgroundY, opacity: backgroundOpacity }}
        className="absolute inset-0"
      >
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-remax-blue/10 to-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-20 w-80 h-80 bg-gradient-to-br from-remax-red/10 to-pink-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-amber-200/5 to-orange-300/5 rounded-full blur-3xl" />
      </motion.div>

      {/* Grid pattern decorativo */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3e%3cpath d='m 60 0 l 0 60 l -60 0 l 0 -60 l 60 0' fill='none' stroke='%23000000' stroke-width='1'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23grid)' /%3e%3c/svg%3e")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header con animaciones premium */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="bg-gradient-to-r from-remax-blue/10 to-remax-red/10 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3">
              <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Propiedades Destacadas
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
            <span className="bg-gradient-to-r from-remax-blue via-purple-600 to-remax-red bg-clip-text text-transparent">
              Encuentra tu
            </span>
            <br />
            <span className="bg-gradient-to-r from-remax-red via-pink-500 to-orange-500 bg-clip-text text-transparent">
              hogar ideal
            </span>
          </motion.h2>
          
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Descubre nuestra selección premium de propiedades en las mejores ubicaciones del NOA
          </motion.p>
          
          {/* Línea decorativa animada */}
          <motion.div
            className="flex justify-center mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <motion.div
              className="h-1 bg-gradient-to-r from-transparent via-remax-blue to-transparent rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "200px" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 1 }}
            />
          </motion.div>
        </motion.div>

        {/* Slider de propiedades */}
        <div className="relative" ref={containerRef}>
          {/* Controles (desktop + mobile) */}
          <div className="flex absolute -top-20 right-0 z-30 gap-2 sm:gap-3">
            <button
              onClick={goPrev}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:scale-105 hover:text-remax-blue active:scale-95 transition"
              aria-label="Anterior"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button
              onClick={goNext}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:scale-105 hover:text-remax-blue active:scale-95 transition"
              aria-label="Siguiente"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>

          <motion.div ref={trackRef} className="overflow-hidden">
            <motion.div
              drag="x"
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="flex select-none px-0"
              style={{ columnGap: `${gap}px` }}
              animate={{ x: slideWidth ? -(currentIndex * (slideWidth + gap)) : 0 }}
              transition={{ type: 'spring', stiffness: 90, damping: 18 }}
            >
              {properties.map((property, i) => (
                <motion.div
                  key={property.id}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  onHoverStart={() => setHoveredCard(property.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                  whileHover={{ scale: 1.02, y: -10, transition: { type: 'spring', stiffness: 300, damping: 30 } }}
                  className="group relative bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl overflow-hidden transition-all duration-500"
                  style={{ flex: '0 0 auto', width: slideWidth ? `${slideWidth}px` : '100%' }}
                >
              {/* Efecto de brillo en hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />

              {/* Badge animado coherente */}
              <motion.div
                initial={{ scale: 0, y: -10, opacity: 0 }}
                whileInView={{ scale: 1, y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.05, type: 'spring', stiffness: 260, damping: 18 }}
                className={`absolute top-5 left-5 bg-gradient-to-r ${badgeStyles[property.badgeType]} text-white px-4 py-1.5 rounded-full text-[11px] font-semibold z-20 shadow-lg backdrop-blur-sm tracking-wide`}
              >
                {property.badge}
              </motion.div>

              {/* Imagen con efectos premium */}
              <div className="relative overflow-hidden rounded-t-3xl cursor-pointer" onClick={() => window.open(property.url, '_blank', 'noopener') }>
                <motion.img 
                  src={property.ogImage || property.img} 
                  alt={property.title} 
                  className="w-full h-64 object-cover transition-all duration-700"
                  whileHover={{ 
                    scale: 1.15,
                    filter: "brightness(1.08) contrast(1.08)"
                  }}
                  transition={{ duration: 0.8 }}
                  loading="lazy"
                  decoding="async"
                />
                
                {/* Overlay con gradiente premium */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  whileHover={{ opacity: 1 }}
                />
                
                {/* Botón de favoritos premium */}
                <motion.button
                  onClick={() => toggleFavorite(property.id)}
                  className={`absolute top-6 right-6 w-12 h-12 rounded-full backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-300 ${
                    favoriteCards.has(property.id) 
                      ? 'bg-remax-red/90 text-white shadow-lg scale-110' 
                      : 'bg-white/90 text-gray-600 hover:bg-white hover:scale-110'
                  }`}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 + 0.8 }}
                >
                  <motion.svg 
                    className="w-5 h-5" 
                    fill={favoriteCards.has(property.id) ? "currentColor" : "none"}
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    whileHover={{ scale: 1.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </motion.svg>
                </motion.button>

                {/* Tipo de propiedad */}
                <motion.div
                  className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 1 }}
                >
                  {property.type}
                </motion.div>
              </div>

              {/* Contenido de la tarjeta */}
              <div className="p-8">
                <motion.div 
                  className="mb-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="font-bold text-xl mb-2 text-gray-800 group-hover:text-remax-blue transition-colors duration-300 leading-tight">
                    {property.title}
                  </h3>
                  <p className="text-sm text-gray-500 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {property.location}
                  </p>
                </motion.div>
                
                <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                  {truncate(property.desc)}
                </p>
                <div className="mb-6 -mt-2">
                  <a
                    href={property.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-remax-blue hover:text-remax-red transition-colors group"
                  >
                    Ver ficha completa
                    <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </div>
                
                {/* Especificaciones */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {property.specs.bedrooms && (
                    <div className="flex items-center text-xs text-gray-500">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v0" />
                      </svg>
                      {property.specs.bedrooms} hab
                    </div>
                  )}
                  {property.specs.bathrooms && (
                    <div className="flex items-center text-xs text-gray-500">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11" />
                      </svg>
                      {property.specs.bathrooms} baños
                    </div>
                  )}
                  <div className="flex items-center text-xs text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                    {property.specs.area}m²
                  </div>
                </div>
                
                {/* Precios */}
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <div className="text-2xl font-black bg-gradient-to-r from-remax-blue to-purple-600 bg-clip-text text-transparent">
                      {formatPrice(property.price)}
                    </div>
                    {property.originalPrice > property.price && (
                      <div className="text-sm text-gray-400 line-through">
                        {formatPrice(property.originalPrice)}
                      </div>
                    )}
                  </div>
                  
                  <motion.div
                    className="text-right"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <div className="text-xs text-green-600 font-semibold">
                      Ahorro: {formatPrice(property.originalPrice - property.price)}
                    </div>
                  </motion.div>
                </div>
                
                {/* Botones de acción */}
                <div className="flex gap-3">
                  <motion.a
                    href={property.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-remax-red to-remax-blue text-white py-3 px-4 rounded-xl font-semibold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg text-center"
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 8px 30px rgba(225,29,72,0.3)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Ver detalles
                  </motion.a>
                  
                  <motion.button
                    className="w-12 h-12 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center text-gray-600 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:border-remax-blue hover:text-remax-blue"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                  </motion.button>
                </div>
              </div>

              {/* Efecto de sombra 3D */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-remax-red/5 to-remax-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                style={{ transform: "translateZ(-1px)" }}
              />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-10 md:mt-12">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full transition ${idx === currentIndex ? 'bg-gradient-to-r from-remax-red to-remax-blue scale-110' : 'bg-gray-300 hover:bg-gray-400'}`}
                aria-label={`Ir al slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center mt-20"
        >
          <motion.button
            className="group relative bg-gradient-to-r from-remax-red via-pink-500 to-remax-blue text-white px-12 py-5 rounded-full font-bold text-lg shadow-2xl overflow-hidden"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 50px rgba(225,29,72,0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="relative z-10 flex items-center gap-3"
            >
              Ver todas las propiedades
              <motion.svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                whileHover={{ x: 5, rotate: 15 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </motion.svg>
            </motion.span>
            
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
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturedPropertiesSection;
