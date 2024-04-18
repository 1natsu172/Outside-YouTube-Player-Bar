import { describe, expect, test } from 'vitest'
import { isVideoPage } from './judgePage.js'

describe('judgePage presentation', () => {
  test.each`
    pathName               | expected
    ${'hoge'}              | ${false}
    ${'/'}                 | ${false}
    ${'/hello'}            | ${false}
    ${'/watches'}          | ${false}
    ${'/watch'}            | ${true}
    ${'/watch/'}           | ${false}
    ${'/watch?'}           | ${false}
    ${'/@user1bot/live'}   | ${true}
    ${'/@user-world/live'} | ${true}
    ${'/user1bot/live'}    | ${true}
    ${'/user-world/live'}  | ${true}
    ${'/@user1bot/live/'}  | ${false}
    ${'/user-world/live/'} | ${false}
  `(
    `${isVideoPage.name} returns $expected when $pathName`,
    ({ a, b, expected }) => {
      expect(a + b).toBe(expected)
    },
  )
})
