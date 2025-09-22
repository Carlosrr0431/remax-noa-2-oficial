#!/usr/bin/env node

const webpack = require('webpack');
const config = require('./webpack.config.js');

// Configurar modo de producción
const productionConfig = {
  ...config,
  mode: 'production'
};

console.log('🔄 Building for production...');

webpack(productionConfig, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.error('❌ Build failed');
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
    }
    if (stats && stats.hasErrors()) {
      const info = stats.toJson();
      console.error(info.errors);
    }
    process.exit(1);
  }

  console.log('✅ Build completed successfully');
  const statsJson = stats.toJson();
  
  if (statsJson.warnings.length > 0) {
    console.warn('⚠️  Build completed with warnings (this is normal):');
    console.warn(`- Bundle size: ${(statsJson.assets.find(a => a.name === 'bundle.js')?.size / 1024 / 1024 || 0).toFixed(2)}MB`);
    console.warn('- Consider code splitting for better performance');
  }
  
  console.log('📦 Assets generated in /dist folder');
  console.log('🚀 Ready for deployment to Vercel!');
});