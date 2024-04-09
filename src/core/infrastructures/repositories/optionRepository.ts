import {
  centralStorage,
  storageKeysDict,
} from '@/core/infrastructures/storage/index.js'

const { optionStorageKeys } = storageKeysDict

/**
 * Define Items
 */
type fullscreenBehaviorV1 = boolean
const fullscreenBehavior = centralStorage.defineItem<fullscreenBehaviorV1>(
  optionStorageKeys.fullscreenBehavior,
  { defaultValue: false },
)

export const optionRepository = {
  fullscreenBehavior,
}
