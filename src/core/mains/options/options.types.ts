import type { StorageArea } from '@/core/infrastructures/storage/constants.js'

export type OptionConfig<
  V,
  M extends Record<string, unknown> = Record<string, never>,
> = {
  storageArea: StorageArea
  defaultValue: V
  defaultMeta: M
}
export type Option<
  V,
  M extends Record<string, unknown> = Record<string, never>,
> = {
  __static__config: OptionConfig<V, M>
  value: V
  meta: M
}
