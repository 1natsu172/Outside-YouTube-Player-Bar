import style from '../styles/style.scss'
import { DEBUG_YT_EVENTS, registerListeners } from './libs/registerListeners'
import { observeNodes } from './actions/observeNodes'
import { initialize } from './actions/inittialize'

console.log(style)

const IS_DEBUG_YT_EVENTS = false

if (IS_DEBUG_YT_EVENTS) DEBUG_YT_EVENTS()

const initExtension = () => {
  initialize()
  registerListeners()
  observeNodes()
}

initExtension()
