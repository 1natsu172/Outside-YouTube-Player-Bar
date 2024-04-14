import type { ValueOf } from '@/utils/typeUtils.js'
import {
  centralStorage,
  type StorageItemOptions,
} from '@/core/infrastructures/storage/centralStorage.js'
import type { allOptionsConfig } from '@/core/mains/options/index.js'

export type AllStorageConfig = ValueOf<typeof allOptionsConfig>

export const getStorageKey = (config: AllStorageConfig) => {
  const { storageArea, storageKey } = config
  return `${storageArea}:${storageKey}` as const
}

export type AllStorageKeys = ReturnType<typeof getStorageKey>

// util hands that think about migrations
export const defineItem = <Config extends AllStorageConfig>(
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
