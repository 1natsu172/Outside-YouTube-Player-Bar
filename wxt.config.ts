import { defineConfig } from 'wxt'

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',
  entrypointsDir: 'entrypoints', // src/entrypoints
  publicDir: 'public', // src/public
  // manifest: () => import('./manifest.json'),
})
