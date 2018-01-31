import debugLog from './libs/debugLog'
import extension from './actions/extensionSwicher'
import state from './libs/stateMap'
import { handle } from './libs/handleCollection'

// document.addEventListener('yt-request-panel-mode-change', (e)=> {
//   debugLog(e);
// })
// document.addEventListener('yt-service-request-completed', (e)=> {
//   debugLog(e);
// })
// document.addEventListener('yt-navigate', (e)=> {
//   debugLog(e);
// })
// document.addEventListener('yt-navigate-start', (e)=> {
//   debugLog(e);
// })
// document.addEventListener('yt-navigate-finish', (e)=> {
//   debugLog(e);
// })
// document.addEventListener('yt-page-data-updated', (e)=> {
//   debugLog(e);
// })
// document.addEventListener('yt-navigate-set-page-offset', (e)=> {
//   debugLog(e);
// })
// document.addEventListener('visibilitychange', (e)=> {
//   debugLog(e);
// })
// document.addEventListener('yt-autonav-pause-focus', (e)=> {
//   debugLog(e);
// })
// document.addEventListener('yt-visibility-refresh', (e)=> {
//   debugLog(e);
// })
// document.addEventListener('yt-page-data-will-update', (e)=> {
//   debugLog(e);
// })
// document.addEventListener('yt-page-manager-navigate-start', (e)=> {
//   debugLog(e);
// })
// document.addEventListener('yt-navigate-start', (e)=> {
//   debugLog(e);
// })

const registerListeners = (): void => {
  const pageNavigateListener = document.addEventListener(
    'yt-navigate-finish',
    e => {
      debugLog(e)
      debugLog('PAGE NAVIGATING...')
      extension.inactive()
    }
  )

  const videoLoadedListener = document.addEventListener(
    'yt-page-data-updated',
    e => {
      debugLog(e)
      debugLog('PAGE UPDATED')
      extension.active()
    }
  )

  const fullscreenListener = ((): void => {
    const events = [
      'fullscreenchange',
      'webkitfullscreenchange',
      'mozfullscreenchange',
      'MSFullscreenChange'
    ]
    events.forEach(event => {
      // Pause the extension when fullscreen mode.
      document.addEventListener(event, extension.pause)
    })
  })()
}

const initExtension = (() => {
  debugLog('EXTENSION INITIALIZING...')
  state.set('hasInjected', false) // set init flag
  debugLog('Init: hasInject?', state.get('hasInjected'))
  registerListeners()
})()
