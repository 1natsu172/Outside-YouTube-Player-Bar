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
export const fullscreenBehavior = centralStorage.defineItem<
  FullscreenBehaviorV1,
  FullscreenBehaviorMeta
>(optionStorageKeys.fullscreenBehavior, { defaultValue: 'inside' })

type DebugModeV1 = boolean
type DebugModeMeta = Record<string, never>
export const debugMode = centralStorage.defineItem<DebugModeV1, DebugModeMeta>(
  optionStorageKeys.debugMode,
  { defaultValue: import.meta.env.PROD ? false : true },
)
