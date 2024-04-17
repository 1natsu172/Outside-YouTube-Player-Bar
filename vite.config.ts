// MEMO: WXTがviteをラップしているのでviteのdefineConfigの型を引っ張るためだけにwxtからimportしている（config置き場を分置しておきたいがため）
import type { WxtViteConfig } from 'wxt'
import react from '@vitejs/plugin-react'
import reactSvgr from 'vite-plugin-svgr'
import postcssNesting from 'postcss-nesting'

export default {
  plugins: [react(), reactSvgr()],
  css: {
    postcss: {
      plugins: [postcssNesting],
    },
  },
} as const satisfies WxtViteConfig
