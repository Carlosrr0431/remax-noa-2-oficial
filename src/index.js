import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/tailwind.css";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Coordinate fade: show root first, then remove loader to avoid flash
const doFade = () => {
  const loader = document.getElementById('initial-loader');
  const rootEl = document.getElementById('root');
  if (rootEl) rootEl.style.opacity = '1';
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.remove();
        document.body.classList.remove('loading');
      }, 500);
    }, 120);
  }
};

// Esperar a que App y Hero estén listos
let appReady = false, heroReady = false;
const tryFade = () => { if (appReady && heroReady) doFade(); };
window.addEventListener('app:ready', () => { appReady = true; tryFade(); }, { once: true });
window.addEventListener('hero:ready', () => { heroReady = true; tryFade(); }, { once: true });
// Fallback por si algún evento no llega en 3s
setTimeout(() => { appReady = true; heroReady = true; tryFade(); }, 3000);
