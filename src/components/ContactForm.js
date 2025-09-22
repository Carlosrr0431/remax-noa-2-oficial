import React, { useState } from "react";
import { motion } from "framer-motion";

function ContactForm() {
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", mensaje: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contacto" className="py-20 bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <div className="max-w-md mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-extrabold text-center mb-16 text-gray-900"
        >
          <span className="text-remax-blue">Contáctanos</span>
        </motion.h2>
  <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-2xl shadow-lg p-10 flex flex-col gap-8">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            required
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-base"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-base"
          />
          <input
            type="tel"
            name="telefono"
            placeholder="Teléfono"
            value={form.telefono}
            onChange={handleChange}
            required
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-base"
          />
          <textarea
            name="mensaje"
            placeholder="Mensaje"
            value={form.mensaje}
            onChange={handleChange}
            required
            rows={4}
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-base resize-none"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.06 }}
            className="bg-remax-red text-white px-10 py-4 rounded-full font-bold shadow-xl hover:bg-remax-blue transition text-lg"
          >
            Enviar
          </motion.button>
          {sent && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-600 text-center font-medium mt-2">
              ¡Mensaje enviado!
            </motion.div>
          )}
        </form>
      </div>
    </section>
  );
}

export default ContactForm;
