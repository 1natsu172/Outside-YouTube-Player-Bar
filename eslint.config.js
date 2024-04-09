/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import configPrettier from 'eslint-config-prettier'

// import path from 'path'
// import { fileURLToPath } from 'url'
// import { FlatCompat } from '@eslint/eslintrc'
import eslintjs from '@eslint/js'

// mimic CommonJS variables -- not needed if using CommonJS
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)
// const compat = new FlatCompat({
//   baseDirectory: __dirname,
//   recommendedConfig: eslintjs.configs.recommended,
// })

export default [
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { project: true },
    },
  },
  eslintjs.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  pluginReactConfig,
  {
    plugins: {
      'react-hooks': pluginReactHooks,
    },
    rules: pluginReactHooks.configs.recommended.rules,
  },
  configPrettier,
]
