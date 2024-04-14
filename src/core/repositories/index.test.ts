import { allOptionsConfig } from '@/core/mains/options/index.js'
import { expect, test } from 'vitest'
import { getStorageKey } from './index.js'

test(getStorageKey.name, () => {
  expect(
    getStorageKey(allOptionsConfig.DebugModeOptionConfig),
  ).toMatchInlineSnapshot(`"local:option:EXT_META:debugMode"`)
})
