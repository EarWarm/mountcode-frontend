import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {fileURLToPath, URL} from 'url';
import autoprefixer from "autoprefixer";

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    supported: {
      'top-level-await': true //browsers can handle top-level-await features
    },
  },
  base: 'https://s3mountcode.spacemount.ru/',
  plugins: [vue()],
  server: {
    port: 8000
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer()
      ]
    }
  },
  resolve: {
    alias: {
      '{src}': fileURLToPath(new URL('./src', import.meta.url)),
      '{modules}': fileURLToPath(new URL('./src/modules', import.meta.url)),
      '{img}': fileURLToPath(new URL('./src/assets/img', import.meta.url)),
      '{scss}': fileURLToPath(new URL('./src/assets/scss', import.meta.url)),
      '{fonts}': fileURLToPath(new URL('./src/assets/fonts', import.meta.url)),
      '{components}': fileURLToPath(new URL('./src/components', import.meta.url)),
      '{helpers}': fileURLToPath(new URL('./src/helpers', import.meta.url)),
    }
  }
})
