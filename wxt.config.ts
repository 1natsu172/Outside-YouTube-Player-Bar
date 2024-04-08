import { defineConfig, UserConfig } from 'wxt'

export const developConfig: UserConfig = {
  srcDir: 'src',
  entrypointsDir: 'entrypoints', // src/entrypoints
  publicDir: 'public', // src/public,
  runner: {
    binaries: {
      arc: '/Applications/Arc.app/Contents/MacOS/Arc',
      edge: '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
      firefox: 'firefoxdeveloperedition',
    },
    openConsole: true,
  },
}
/**
 * @description manifest.json config
 * @returns Some explicit configuration of manifest.json
 */
export const manifestJsonConfig: UserConfig['manifest'] = (_configEnv) => ({
  name: '__MSG_appName__',
  short_name: '__MSG_appShortName__',
  description: '__MSG_appDescription__',
  // FIXME あとで消す
  version: '4.0.0',
  // FIXME firefoxがmv2っぽいので明示指定いらないっぽい あとで消す
  // manifest_version: 3,
  default_locale: 'en',
  icons: {
    '16': '/images/icon-16.png',
    '32': '/images/icon-32.png',
    '48': '/images/icon-48.png',
    '128': '/images/icon-128.png',
  },
  action: {
    default_icon: {
      '16': '/images/icon-16.png',
      '32': '/images/icon-32.png',
      '48': '/images/icon-48.png',
      '128': '/images/icon-128.png',
    },
    default_title: '__MSG_browserActionTitle__',
  },
  permissions: ['declarativeContent', 'notifications', 'storage'],
})

// polymer config
export const createWxtConfig = ({
  developConfig,
  manifestConfig = manifestJsonConfig,
}: {
  developConfig: UserConfig
  manifestConfig?: UserConfig['manifest']
}) => {
  const config: UserConfig = {
    ...developConfig,
    manifest: manifestConfig,
  }
  return defineConfig(config)
}

// See https://wxt.dev/api/config.html
export default createWxtConfig({ developConfig })
