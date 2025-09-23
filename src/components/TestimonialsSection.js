import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const videoTestimonials = [
  {
    id: 1,
    name: "Agustina",
    video: require('../assets/videoEmiliano.MOV'),
  },
  {
    id: 2,
    name: "Emiliano",
    video: require('../assets/VideoAgustina.MOV'), 

  },
  {
    id: 3,
    name: "Cecilia",
    video: require('../assets/IMG_4782.MOV'),
  }
];

function TestimonialsSection() {
  const [playingVideo, setPlayingVideo] = useState(null);
  const [videoErrors, setVideoErrors] = useState({});
  const videoRefs = useRef({});
  
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -200]);

  const handleVideoError = (index) => {
    setVideoErrors(prev => ({ ...prev, [index]: true }));
  };

  const toggleVideo = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      if (video.paused) {
        setPlayingVideo(index);
        video.play().catch(e => console.log('Video play failed:', e));
      } else {
        setPlayingVideo(null);
        video.pause();
      }
    }
  };

  return (
    <section className="py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden" id="testimonios">
      <motion.div style={{ y: backgroundY }} className="absolute inset-0">
        <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-remax-red/20 to-pink-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-remax-blue/20 to-purple-400/20 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-8 text-white">
            <span className="bg-gradient-to-r from-remax-red via-white to-remax-blue bg-clip-text text-transparent">
              Historias de éxito
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Conoce las experiencias reales de nuestros agentes más exitosos
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {videoTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ scale: 1.02, y: -10 }}
              className="group relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-remax-red/10 to-remax-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative mb-6 rounded-2xl overflow-hidden bg-black/50">
                {videoErrors[index] ? (
                  <div className="w-full h-64 bg-gradient-to-br from-remax-red/20 to-remax-blue/20 flex items-center justify-center">
                    <div className="text-center text-white">
                      <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <p className="text-lg font-semibold">{testimonial.name}</p>
                      <p className="text-sm opacity-75">Video testimonial</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <video
                      ref={el => videoRefs.current[index] = el}
                      className="w-full h-64 object-cover"
                      controls
                      preload="metadata"
                      playsInline
                      onError={() => handleVideoError(index)}
                    >
                      <source src={testimonial.video} type="video/mp4" />
                      <source src={testimonial.video} type="video/quicktime" />
                      Tu navegador no soporta videos HTML5.
                    </video>

                    {playingVideo !== index && (
                      <div 
                        className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer"
                        onClick={() => toggleVideo(index)}
                      >
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-2xl">
                          <svg className="w-6 h-6 text-remax-red ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </>
                )}

         
              </div>

              <div className="relative z-10 text-center">
                <h3 className="font-bold text-xl text-white mb-2">
                  {testimonial.name}
                </h3>
          
              </div>

              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-remax-red via-purple-500 to-remax-blue" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center"
        >
          <a
            href="https://remaxnoa.com.ar/sumate"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-remax-red to-remax-blue text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:scale-105 transition-transform"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            ¡Crea tu propia historia de éxito!
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <p className="text-gray-400 mt-4 text-sm">
            Únete a más de 100 agentes exitosos en RE/MAX NOA
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default TestimonialsSection;