// NOTE: viteがmanifestからのasset処理をせずJSからの参照がないとdistにコンパイルして吐いてくれないので、scssをsideEffect importしている
// import '../styles/style.scss'
import {
  DEBUG_YT_EVENTS,
  registerListeners,
} from '../core/actions/registerListeners'
import { observeNodes } from '../core/actions/observeNodes'
import {
  initialize,
  additionalInitializationOnVideoPage,
} from '../core/actions/inittialize'

const IS_DEBUG_YT_EVENTS = false

if (IS_DEBUG_YT_EVENTS) {
  DEBUG_YT_EVENTS()
}

const initExtension = () => {
  const { isInitializeOnVideoPage } = initialize()
  registerListeners()
  observeNodes()

  if (isInitializeOnVideoPage) {
    additionalInitializationOnVideoPage()
  }
}

// -----------------------------------------
// WXT WORLD underconstructions
//------------------------------------------
/**
 * FIXME: WXTのimport対応待ち manifestに寄せたい
 * https://wxt.dev/guide/entrypoints.html#side-effects
 * https://github.com/wxt-dev/wxt/issues/336
 */
export const YOUTUBE_MATCHES = ['https://*.youtube.com/*']
export default defineContentScript({
  matches: YOUTUBE_MATCHES,
  main() {
    console.log('Hello content.')
    // initExtension()
  },
})
