import React from "react";
import { motion } from "framer-motion";

const officeImages = [
  {
    src: require('../assets/0122-DSC08806+B.jpg'),
    alt: "Oficina RE/MAX NOA - Área principal",
  },
  {
    src: require('../assets/0220 - _F6_1138 B (1) (1).jpg'),
    alt: "Oficina RE/MAX NOA - Sala de reuniones",
  },
  {
    src: require('../assets/premiados.jpg'),
    alt: "Equipo premiado RE/MAX NOA",
  },
];

function OfficeGallerySection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl md:text-6xl font-extrabold text-center mb-16 text-remax-blue">Nuestra oficina</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {officeImages.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="rounded-2xl overflow-hidden shadow-xl hover:scale-105 hover:shadow-2xl transition-transform cursor-pointer border border-gray-100"
            >
              <img src={img.src} alt={img.alt} className="w-full h-80 object-cover" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OfficeGallerySection;
