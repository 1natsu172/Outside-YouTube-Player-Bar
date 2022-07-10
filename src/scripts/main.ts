import style from '../styles/style.scss'
import extension from './actions/extensionSwicher'
import state from './libs/stateMap'
import { DEBUG_YT_EVENTS, registerListeners } from './libs/registerListeners'
import { observeNodes } from './actions/observeNodes'

console.log(style)

const IS_DEBUG_YT_EVENTS = false

if (IS_DEBUG_YT_EVENTS) DEBUG_YT_EVENTS()

const initExtension = (() => {
  console.log('EXTENSION INITIALIZING...')
  state.set('hasInjected', false) // set init flag
  console.log('Init: hasInject?', state.get('hasInjected'))
  registerListeners()
  observeNodes()
})()
