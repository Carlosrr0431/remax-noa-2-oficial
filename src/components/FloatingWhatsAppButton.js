import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Número destino actualizado (formato internacional sin signos) +54 9 387 685 2073 => 5493876852073
const PHONE_NUMBER = '5493876852073';
const WHATSAPP_URL = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent('Hola, quisiera más información sobre RE/MAX NOA')}`;

function FloatingWhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const onReady = () => setVisible(true);
    window.addEventListener('app:ready', onReady, { once: true });
    return () => window.removeEventListener('app:ready', onReady);
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      setHasScrolled(currentY > 120);
      // mostrar si sube, ocultar si baja mucho (pequeño auto-hide)
      if (Math.abs(currentY - lastY) > 25) {
        setVisible(currentY < lastY || currentY < 160);
        lastY = currentY;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          key="wa-btn"
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chatear por WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 40 }}
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          className={[
            'fixed z-[60] right-4 sm:right-6',
            'bottom-[calc(1.25rem+env(safe-area-inset-bottom))] sm:bottom-[calc(1.75rem+env(safe-area-inset-bottom))]',
            'group focus:outline-none'
          ].join(' ')}
        >
          {/* Halo */}
          <motion.div
            className="absolute inset-0 rounded-full bg-green-400/40 blur-md opacity-60 group-hover:opacity-90 transition" 
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg shadow-green-600/30 bg-gradient-to-br from-emerald-400 via-green-500 to-emerald-600 text-white flex items-center justify-center"
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow"
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, 2, -2, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <path fill="currentColor" d="M16.04 3C9.41 3 4 8.41 4 15.06c0 2.65.91 5.11 2.46 7.1L4 29l7.13-2.37a12 12 0 004.91 1.04h.01c6.63 0 12.04-5.41 12.04-12.06C28.09 8.41 22.68 3 16.04 3zm0 22.01h-.01a10 10 0 01-4.78-1.21l-.34-.19-4.23 1.41 1.38-4.12-.22-.35a10 10 0 1118.54-5.49c0 5.53-4.5 9.95-10.04 9.95zm5.49-7.48c-.3-.15-1.79-.88-2.07-.98-.28-.1-.48-.15-.68.15-.2.29-.78.97-.95 1.16-.17.19-.35.21-.65.06-.3-.15-1.26-.46-2.4-1.47-.89-.8-1.48-1.79-1.66-2.09-.17-.29-.02-.45.13-.6.13-.13.3-.35.44-.52.15-.17.2-.29.3-.49.1-.19.05-.37-.03-.52-.08-.15-.68-1.64-.93-2.25-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.46 0 1.45 1.07 2.86 1.22 3.06.15.2 2.11 3.25 5.1 4.55.71.31 1.27.5 1.7.64.72.23 1.38.2 1.9.12.58-.09 1.79-.73 2.04-1.43.25-.7.25-1.29.17-1.42-.08-.13-.27-.21-.57-.36z" />
            </motion.svg>
            {/* Badge opcional al hacer scroll */}
            <AnimatePresence>
              {hasScrolled && (
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute -top-2 -right-2 bg-white text-green-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow"
                >
                  +
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
          {/* Tooltip minimal */}
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur text-white text-[11px] font-medium whitespace-nowrap pointer-events-none hidden sm:block"
          >
            Escribinos por WhatsApp
          </motion.span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

export default FloatingWhatsAppButton;