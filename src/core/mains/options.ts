import type { StorageArea } from '@/core/infrastructures/storage/constants.js'

type OptionV<V> = {
  storageArea: StorageArea
  value: V
}

export interface ExtensionMetaOptions {
  debugMode: OptionV<boolean>
  forceDisableForEscapeHatch: boolean
}

export interface UserOptions {
  fullscreenBehavior: {}
  defaultBehavior: {}
}
