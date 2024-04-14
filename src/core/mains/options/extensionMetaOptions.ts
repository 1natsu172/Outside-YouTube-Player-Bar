import type { Option } from './options.types.js'

const CONST_KEY = 'option:EXT_META'

export type ExtensionMetaOptions<CK extends string = typeof CONST_KEY> = {
  debugModeV1: Option<CK, boolean>
  forceDisableV1: Option<
    CK,
    boolean,
    {
      extensionVersion: string | null
    }
  >
}

export const DebugModeOptionConfig = {
  storageArea: 'local',
  storageKey: `${CONST_KEY}:debugMode`,
  version: 1,
  defaultValue: import.meta.env.PROD ? false : true,
  defaultMeta: {},
} as const satisfies ExtensionMetaOptions['debugModeV1']['config']

export const ForceDisableOptionConfig = {
  storageArea: 'local',
  storageKey: `${CONST_KEY}:forceDisable`,
  version: 1,
  defaultValue: false,
  defaultMeta: {
    extensionVersion: null,
  },
} as const satisfies ExtensionMetaOptions['forceDisableV1']['config']
