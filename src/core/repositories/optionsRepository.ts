import type { StorageItemOptions } from '@/core/infrastructures/storage/centralStorage.js'
import { centralStorage } from '@/core/infrastructures/storage/centralStorage.js'
import { allOptionsConfig } from '@/core/mains/options/index.js'
import type { ValueOf } from '@/utils/typeUtils.js'

export const getStorageKey = (config: ValueOf<typeof allOptionsConfig>) => {
  const { storageArea, storageKey } = config
  return `${storageArea}:${storageKey}` as const
}
export type AllStorageKeys = ReturnType<typeof getStorageKey>

// util hands that think about migrations
const defineItem = <Config extends ValueOf<typeof allOptionsConfig>>(
  config: Config,
  storageItemOptions?: Partial<StorageItemOptions<Config['defaultValue']>>,
) => {
  const stoOpts: StorageItemOptions<Config['defaultValue']> = {
    defaultValue: config.defaultValue,
    version: config.version,
    ...storageItemOptions,
  }

  return centralStorage.defineItem<Config['defaultValue']>(
    getStorageKey(config),
    stoOpts,
  )
}

/**
 * Define Items
 * @description Extension Meta Options
 */
export const debugMode = defineItem(allOptionsConfig.DebugModeOptionConfig)
export const forceDisable = defineItem(
  allOptionsConfig.ForceDisableOptionConfig,
)

/**
 * Define Items
 * @description User Options
 */
export const defaultViewBehaviorOption = defineItem(
  allOptionsConfig.DefaultViewBehaviorOptionConfig,
)
export const theaterModeBehaviorOption = defineItem(
  allOptionsConfig.TheaterModeBehaviorOptionConfig,
)
export const fullscreenBehaviorOption = defineItem(
  allOptionsConfig.FullscreenBehaviorOptionConfig,
)
