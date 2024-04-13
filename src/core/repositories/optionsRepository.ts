import type { StorageItemOptions } from '@/core/infrastructures/storage/centralStorage.js'
import { centralStorage } from '@/core/infrastructures/storage/centralStorage.js'
import { AllOptions } from '@/core/mains/options/index.js'
import type { ValueOf } from '@/utils/typeUtils.js'

const getStorageKey = (Option: ValueOf<typeof AllOptions>) => {
  const { storageArea, storageKey } = Option.config
  return `${storageArea}:${storageKey}`
}

// util hands
const defineItem = <Defs extends ValueOf<typeof AllOptions>>(
  Option: Defs,
  storageItemOptions?: Partial<StorageItemOptions<InstanceType<Defs>['value']>>,
) => {
  const stoOpts: StorageItemOptions<InstanceType<Defs>['value']> = {
    defaultValue: Option.config.defaultValue,
    version: Option.config.version,
    ...storageItemOptions,
  }

  return centralStorage.defineItem<InstanceType<Defs>['value']>(
    getStorageKey(Option),
    stoOpts,
  )
}

/**
 * Define Items
 */
export const debugMode = defineItem(AllOptions.DebugModeOption)
export const forceDisable = defineItem(AllOptions.ForceDisableOption)
