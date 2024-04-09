import { useCallback, useRef, useSyncExternalStore, use } from 'react'
import { centralStorage } from '@/core/infrastructures/storage/index.js'
import { type StorageKeys } from '@/core/infrastructures/storage/StorageKeys.js'

type Subscribe = Parameters<typeof useSyncExternalStore>[0]

export const useStorage = <VT = unknown>(key: StorageKeys) => {
  const initialV = use(storage.getItem<VT>(key))
  const cachedV = useRef<VT | null>(initialV)

  const subscribe: Subscribe = useCallback(
    (onStoreChange) => {
      const unSubscribe = storage.watch<VT>(key, (newValue, oldValue) => {
        if (newValue !== oldValue) {
          cachedV.current = newValue
        }
        onStoreChange()
      })
      return unSubscribe
    },
    [key],
  )

  // Must by sync method.
  const getSnapshot = (): VT | null => {
    return cachedV.current
  }

  const store = useSyncExternalStore<VT | null>(subscribe, getSnapshot)
  return store
}
