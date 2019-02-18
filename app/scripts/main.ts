import extension from './actions/extensionSwicher'
import state from './libs/stateMap'
import { handle } from './libs/handleCollection'

// document.addEventListener('yt-request-panel-mode-change', (e)=> {
//   console.log(e);
// })
// document.addEventListener('yt-service-request-completed', (e)=> {
//   console.log(e);
// })
// document.addEventListener('yt-navigate', (e)=> {
//   console.log(e);
// })
// document.addEventListener('yt-navigate-start', (e)=> {
//   console.log(e);
// })
// document.addEventListener('yt-navigate-finish', (e)=> {
//   console.log(e);
// })
// document.addEventListener('yt-page-data-updated', (e)=> {
//   console.log(e);
// })
// document.addEventListener('yt-navigate-set-page-offset', (e)=> {
//   console.log(e);
// })
// document.addEventListener('visibilitychange', (e)=> {
//   console.log(e);
// })
// document.addEventListener('yt-autonav-pause-focus', (e)=> {
//   console.log(e);
// })
// document.addEventListener('yt-visibility-refresh', (e)=> {
//   console.log(e);
// })
// document.addEventListener('yt-page-data-will-update', (e)=> {
//   console.log(e);
// })
// document.addEventListener('yt-page-manager-navigate-start', (e)=> {
//   console.log(e);
// })
// document.addEventListener('yt-navigate-start', (e)=> {
//   console.log(e);
// })

const registerListeners = (): void => {
  const pageNavigateListener = document.addEventListener(
    'yt-navigate-finish',
    e => {
      console.log(e)
      console.log('PAGE NAVIGATING...')
      extension.inactive()
    }
  )

  const videoLoadedListener = document.addEventListener(
    'yt-page-data-updated',
    e => {
      console.log(e)
      console.log('PAGE UPDATED')
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
      document.addEventListener(event, () => {
        const extensionButton = document.getElementById(
          'oypb-toggleExtension'
        ) as HTMLElement

        extensionButton.classList.toggle('oypb-is-none')
        extension.pause()
      })
    })
  })()
}

const initExtension = (() => {
  console.log('EXTENSION INITIALIZING...')
  state.set('hasInjected', false) // set init flag
  console.log('Init: hasInject?', state.get('hasInjected'))
  registerListeners()
})()
