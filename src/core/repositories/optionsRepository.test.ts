import { describe, expect, test } from 'vitest'
import { debugMode } from './optionsRepository.js'

describe('repository', () => {
  test('should defined storage item with defaultValue', async () => {
    await expect(debugMode.getValue()).resolves.toBeTypeOf('boolean')
  })

  test('should get/set storage item value', async () => {
    await expect(debugMode.getValue()).resolves.toBe(true)
    await debugMode.setValue(false)
    await expect(debugMode.getValue()).resolves.toBe(false)
  })

  test('should get/set storage item meta', async () => {
    await expect(debugMode.getMeta()).resolves.toStrictEqual({})

    await debugMode.setMeta({ test1: 'test1' })
    await expect(debugMode.getMeta()).resolves.toStrictEqual({ test1: 'test1' })

    await debugMode.setMeta({ test2: 'test2' })
    await expect(debugMode.getMeta()).resolves.toStrictEqual({
      test1: 'test1',
      test2: 'test2',
    })
  })
})
