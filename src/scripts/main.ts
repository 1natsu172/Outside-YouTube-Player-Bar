// NOTE: viteがmanifestからのasset処理をせずJSからの参照がないとdistにコンパイルして吐いてくれないので、scssをsideEffect importしている
import '../styles/style.scss'
import { DEBUG_YT_EVENTS, registerListeners } from './actions/registerListeners'
import { observeNodes } from './actions/observeNodes'
import { initialize } from './actions/inittialize'

const IS_DEBUG_YT_EVENTS = false

if (IS_DEBUG_YT_EVENTS) {
  DEBUG_YT_EVENTS()
}

const initExtension = () => {
  initialize()
  registerListeners()
  observeNodes()
}

initExtension()
