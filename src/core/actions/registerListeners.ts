import { extensionSwitcher } from '../controllers/extensionSwicher'
import { interventionDOM } from '../usecases/interventionDOM'

const YT_EVENTS = [
  'yt-request-panel-mode-change',
  'yt-service-request-sent',
  'yt-service-request-error',
  'yt-service-request-completed',
  'yt-navigate',
  'yt-navigate-cache',
  'yt-navigate-start',
  'yt-navigate-finish',
  'yt-navigate-redirect',
  'yt-page-data-fetched',
  'yt-page-data-updated',
  'yt-navigate-set-page-offset',
  'visibilitychange',
  'yt-autonav-pause-focus',
  'yt-visibility-refresh',
  'yt-page-type-changed',
  'yt-page-data-will-update',
  'yt-page-manager-navigate-start',
  'yt-navigate-start',
  // 'yt-action',
  'yt-player-updated',
]

const DEBUG_YT_EVENTS = () =>
  YT_EVENTS.forEach((eventName) => {
    document.addEventListener(eventName, (e) => {
      console.log(eventName, e)
    })
  })

const pageNavigateListener = () => {
  document.addEventListener('yt-navigate-finish', (e) => {
    console.log(e)
    console.log('PAGE NAVIGATING...')
    extensionSwitcher.inactive()
  })
}

const videoLoadedListener = () => {
  document.addEventListener('yt-page-data-updated', (e) => {
    console.log(e)
    console.log('PAGE UPDATED')
    extensionSwitcher.active()
  })
}

const fullscreenListener = () => {
  const events = ['fullscreenchange', 'webkitfullscreenchange']
  events.forEach((event) => {
    // Pause the extensionSwitcher when fullscreen mode.
    document.addEventListener(event, () => {
      interventionDOM.toggleIsFullScreenClassName()
      extensionSwitcher.toggle()
    })
  })
}

const enhanceUXListener = async (): Promise<void> => {}

const registerListeners = async (): Promise<void> => {
  pageNavigateListener()
  videoLoadedListener()
  fullscreenListener()
  await enhanceUXListener()
}

export { registerListeners, DEBUG_YT_EVENTS }
