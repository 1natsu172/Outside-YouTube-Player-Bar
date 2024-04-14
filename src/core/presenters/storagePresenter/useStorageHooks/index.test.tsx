// @vitest-environment happy-dom

import { describe, expect, beforeEach, test } from 'vitest'
import { act, render, waitFor } from '@testing-library/react'
import { centralStorage } from '@/core/infrastructures/storage/centralStorage.js'
import { useStorage } from './index.js'
import { TestComponent } from './forTest.jsx'

describe(`${useStorage.name}`, () => {
  const TESTING_KEY = 'local:testing:useStorage'
  beforeEach(async () => {
    await centralStorage.setItem(TESTING_KEY, { name: 'Alice' })

    // cleanup
    return async () => {
      await centralStorage.removeItem(TESTING_KEY)
    }
  })

  /**
   * Hack testing for React18 canary
   * @description https://github.com/testing-library/react-testing-library/issues/1209
   */
  // Flakyすぎる
  test.skip('test', async () => {
    const { asFragment } = render(<TestComponent storageKey={TESTING_KEY} />)
    // hack for React18 canary "use()" hook
    await act(async () => {})

    // debug()

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          {
        "name": "Alice"
      }
        </div>
      </DocumentFragment>
    `)

    await waitFor(() =>
      centralStorage.setItem(TESTING_KEY, {
        name: 'bob',
      }),
    )
    await act(async () => {})

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          style="display: none !important;"
        >
          {
        "name": "Alice"
      }
        </div>
        loading
      </DocumentFragment>
    `)

    await act(async () => {})

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          style="display: none !important;"
        >
          {
        "name": "Alice"
      }
        </div>
        loading
      </DocumentFragment>
    `)
  })
})
