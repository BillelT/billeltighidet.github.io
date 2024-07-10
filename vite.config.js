import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Dossier de sortie pour les fichiers construits
    sourcemap: false, // Générer des sourcemaps si nécessaire
    minify: true, // Minification des fichiers en production
  },
});
