import type { Option } from './options.types.js'

type ExtensionMetaOptions = {
  debugModeV1: Option<boolean>
  forceDisableV1: Option<
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
