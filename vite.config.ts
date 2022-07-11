import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
// import { viteStaticCopy } from 'vite-plugin-static-copy'
import manifest from './manifest.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // @ts-expect-error - stringに落ちるので型解決不可能
    crx({ manifest }),
    // FIXME: viteのdevモードでviteStaticCopyが動かないのでscripts/copy-assetsしている。動くようになったらこっちを使いたい
    // viteStaticCopy({
    //   targets: [
    //     {
    //       src: './src/_locales',
    //       dest: '',
    //     },
    //   ],
    // }),
  ],
})
