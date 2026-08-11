import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte(),
  tailwincss()],
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
})

