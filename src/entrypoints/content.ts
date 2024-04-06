// NOTE: viteがmanifestからのasset処理をせずJSからの参照がないとdistにコンパイルして吐いてくれないので、scssをsideEffect importしている
// import '../styles/style.scss'
import {
  DEBUG_YT_EVENTS,
  registerListeners,
} from '../scripts/actions/registerListeners'
import { observeNodes } from '../scripts/actions/observeNodes'
import {
  initialize,
  additionalInitializationOnVideoPage,
} from '../scripts/actions/inittialize'

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

// initExtension()

export default defineContentScript({
  // matches: ['*://*.google.com/*'],
  main() {
    console.log('Hello content.')
    initExtension()
  },
})
