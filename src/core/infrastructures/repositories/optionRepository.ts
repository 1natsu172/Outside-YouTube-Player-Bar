import {
  centralStorage,
  storageKeysDict,
} from '@/core/infrastructures/storage/index.js'

const { optionStorageKeys } = storageKeysDict

/**
 * Define Items
 */
type FullscreenBehaviorV1 = 'outside' | 'inside'
type FullscreenBehaviorMeta = Record<string, never>
const fullscreenBehavior = centralStorage.defineItem<
  FullscreenBehaviorV1,
  FullscreenBehaviorMeta
>(optionStorageKeys.fullscreenBehavior, { defaultValue: 'inside' })

export const optionRepository = {
  fullscreenBehavior,
}
