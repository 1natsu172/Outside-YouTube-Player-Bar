import { centralStorage } from '@/core/infrastructures/storage/centralStorage.js'
import { AllOptions, type AllOptionDefs } from '@/core/mains/options/index.js'
import type { ValueOf } from '@/utils/typeUtils.js'

const getStorageKey = (Option: ValueOf<typeof AllOptions>) => {
  const { storageArea, storageKey } = Option.config
  return `${storageArea}:${storageKey}`
}

// export interface IOptionsRepository {
//   getOption(): Promise<typeof AllOptions>
//   updateOption(options: typeof AllOptions): Promise<void>
// }

// export class OptionsRepository implements IOptionsRepository {
//   constructor() {}

//   getOptions(): Promise<Option> {}
// }

/**
 * Define Items
 */
export const debugMode = centralStorage.defineItem<
  AllOptionDefs['debugModeV1']['value'],
  AllOptionDefs['debugModeV1']['meta']
>(getStorageKey(AllOptions.DebugModeOption), {
  defaultValue: AllOptions.DebugModeOption.config.defaultValue,
  version: AllOptions.DebugModeOption.config.version,
})
