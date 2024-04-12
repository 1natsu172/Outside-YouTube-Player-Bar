import type { StorageArea } from '@/core/infrastructures/storage/constants.js'
import type { ExtensionBehavior } from '@/core/mains/extensionFeatures.js'

type OptionType<
  V,
  M extends Record<string, unknown> = Record<string, never>,
> = {
  storageArea: StorageArea
  value: V
  meta: M
}

export interface ExtensionMetaOptions {
  debugModeV1: OptionType<boolean>
  forceDisableV1: OptionType<
    boolean,
    {
      extensionVersion: string
    }
  >
}

export interface UserOptions {
  defaultViewBehaviorV1: OptionType<ExtensionBehavior>
  theaterModeBehaviorV1: OptionType<ExtensionBehavior>
  fullscreenBehaviorV1: OptionType<ExtensionBehavior>
}
