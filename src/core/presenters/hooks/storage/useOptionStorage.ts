import { useStorage } from '@/core/libs/useStorage/index.js'
import { type OptionStorageKeys } from '@/core/infrastructures/storage/StorageKeys.js'

export const useOptionStorage = (key: OptionStorageKeys) => {
  const store = useStorage(key)
  return { store }
}
