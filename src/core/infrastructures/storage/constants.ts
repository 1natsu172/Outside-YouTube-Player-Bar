import type { ValueOf } from '@/utils/typeUtils.js'

export const STORAGE_AREA_KEY = {
  LOCAL: 'local',
  SESSION: 'session',
  MANAGED: 'managed',
  SYNC: 'sync',
} as const
export type StorageArea = ValueOf<typeof STORAGE_AREA_KEY>
