import type { NestedValueOf, ValueOf } from '@/core/utils/typeUtils.js'

/**
 * constants
 */
const localStorageArea = 'local'
const contentScriptStorageArea = `${localStorageArea}:contentScript` as const
const backgroundStorageArea = `${localStorageArea}:background` as const
const optionStorageArea = `${localStorageArea}:option` as const

/**
 * @description Definition the Central storage keys dictionary,
 */
export const storageKeysDict = {
  /**
   * @description for content-script storage
   */
  contentScriptStorageKeys: {
    isOutside: 'local:contentScript:isOutside',
  } as const satisfies {
    [Key in string]: `${typeof contentScriptStorageArea}:${string}`
  },
  /**
   * @description for content-script storage
   */
  backgroundStorageKeys: {
    test: 'local:background:test',
  } as const satisfies {
    [Key in string]: `${typeof backgroundStorageArea}:${string}`
  },
  /**
   * @description for content-script storage
   */
  optionStorageKeys: {
    fullscreenBehavior: 'local:option:fullscreenBehavior',
  } as const satisfies {
    [Key in string]: `${typeof optionStorageArea}:${string}`
  },
}

export type ContentScriptStorageKeys = ValueOf<
  typeof storageKeysDict.contentScriptStorageKeys
>
export type BackgroundStorageKeys = ValueOf<
  typeof storageKeysDict.backgroundStorageKeys
>
export type OptionStorageKeys = ValueOf<
  typeof storageKeysDict.optionStorageKeys
>
export type AllStorageKeys = NestedValueOf<typeof storageKeysDict>
