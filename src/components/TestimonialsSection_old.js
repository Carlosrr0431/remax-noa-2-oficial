import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const testimonials = [
  {
    name: "María López",
    text: "Ser agente RE/MAX NOA me permitió crecer profesionalmente y tener independencia financiera. El equipo es increíble!",
    img: require('../assets/0122-DSC08806+B.jpg'),
  },
  {
    name: "Carlos Pérez",
    text: "La capacitación y el soporte que recibí fueron clave para mi éxito. Recomiendo RE/MAX NOA a todos los que buscan una carrera inmobiliaria.",
    img: require('../assets/0220 - _F6_1138 B (1) (1).jpg'),
  },
  {
    name: "Lucía Gómez",
    text: "La cultura colaborativa y las oportunidades de desarrollo son únicas. Aquí encontré mi lugar.",
    img: require('../assets/0549 - MAR_6717 B.jpg'),
  },
];

function TestimonialsSection() {
  const [active, setActive] = useState(0);

  const next = () => setActive((a) => (a + 1) % testimonials.length);
  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100" id="testimonios">
      <div className="max-w-3xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-extrabold text-center mb-16 text-gray-900"
        >
          <span className="text-remax-blue">Testimonios de nuestros agentes</span>
        </motion.h2>
        <div className="relative flex flex-col items-center">
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-full p-2 shadow hover:bg-remax-blue/10 transition md:-left-12"
            aria-label="Anterior"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-full p-2 shadow hover:bg-remax-blue/10 transition md:-right-12"
            aria-label="Siguiente"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          </button>
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonials[active].name}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5 }}
              className="backdrop-blur-lg bg-white/80 rounded-2xl shadow-xl p-10 flex flex-col items-center text-center w-full max-w-md mx-auto border border-gray-100"
            >
              <img src={testimonials[active].img} alt={testimonials[active].name} className="w-20 h-20 rounded-full mb-4 object-cover border-4 border-remax-blue" />
              <p className="text-gray-700 italic mb-3 text-lg md:text-xl">“{testimonials[active].text}”</p>
              <span className="font-bold text-remax-red text-base md:text-lg">{testimonials[active].name}</span>
            </motion.div>
          </AnimatePresence>
          <div className="flex gap-2 mt-6 justify-center">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`w-3 h-3 rounded-full ${active === i ? "bg-remax-blue" : "bg-gray-300"}`}
                onClick={() => setActive(i)}
                aria-label={`Testimonio ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
