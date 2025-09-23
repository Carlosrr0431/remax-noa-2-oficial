import React from "react";
import { motion } from "framer-motion";

function Footer() {
  return (
    <footer id="contacto" className="bg-slate-900 text-gray-300 py-10 mt-20">
      <div className="max-w-6xl mx-auto px-4 flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src={require('../assets/REMAX_mastrBalloon_RGB_R.pdf.pdf (10 x 2 in) (1).png')}
              alt="RE/MAX NOA"
              className="h-10 w-auto"
            />
            <div>
              <h3 className="font-extrabold text-white text-lg">RE/MAX NOA</h3>
              <p className="text-xs uppercase tracking-wide text-gray-400">Alto Impacto</p>
            </div>
          </div>
          <div className="text-sm flex flex-col sm:items-end gap-1">
            <span>Salta Capital - Argentina</span>
            <a href="tel:+543811234567" className="hover:text-white">+54 381 123 4567</a>
            <a href="mailto:info@remax-noa.com.ar" className="hover:text-white">info@remax-noa.com.ar</a>
          </div>
        </div>
        <div className="pt-6 border-t border-white/10 text-xs flex flex-col sm:flex-row justify-between items-start gap-4">
          <p className="text-gray-400">© {new Date().getFullYear()} RE/MAX NOA. Todos los derechos reservados.</p>
          <p className="text-gray-500 max-w-xl leading-relaxed">Corredor Responsable: Pablo Castañeda C.U.C.I.S. Mat. Nº 208.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
