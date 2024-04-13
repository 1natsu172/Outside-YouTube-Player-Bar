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

type DebugModeOpt = ExtensionMetaOptions['debugModeV1']
export class DebugModeOption {
  static config: DebugModeOpt['__static__config'] = {
    storageArea: 'local',
    storageKey: `${CONST_KEY}:debugMode`,
    version: 1,
    defaultValue: import.meta.env.PROD ? false : true,
    defaultMeta: {},
  }
  constructor(
    public value: DebugModeOpt['value'],
    public meta: DebugModeOpt['meta'],
  ) {}
}

type ForceDisableOpt = ExtensionMetaOptions['forceDisableV1']
export class ForceDisableOption {
  static config: ForceDisableOpt['__static__config'] = {
    storageArea: 'local',
    storageKey: `${CONST_KEY}:forceDisable`,
    version: 1,
    defaultValue: false,
    defaultMeta: {
      extensionVersion: null,
    },
  }
  constructor(
    public value: ForceDisableOpt['value'],
    public meta: ForceDisableOpt['meta'],
  ) {}
}
