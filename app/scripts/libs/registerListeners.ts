import extension from '../actions/extensionSwicher'

const YT_EVENTS = [
  'yt-request-panel-mode-change',
  'yt-service-request-completed',
  'yt-navigate',
  'yt-navigate-start',
  'yt-navigate-finish',
  'yt-page-data-updated',
  'yt-navigate-set-page-offset',
  'visibilitychange',
  'yt-autonav-pause-focus',
  'yt-visibility-refresh',
  'yt-page-data-will-update',
  'yt-page-manager-navigate-start',
  'yt-navigate-start'
]

const DEBUG_YT_EVENTS = () =>
  YT_EVENTS.forEach(eventName => {
    document.addEventListener(eventName, e => {
      console.log(eventName, e)
    })
  })

const pageNavigateListener = () => {
  document.addEventListener('yt-navigate-finish', e => {
    console.log(e)
    console.log('PAGE NAVIGATING...')
    extension.inactive()
  })
}

const videoLoadedListener = () => {
  document.addEventListener('yt-page-data-updated', e => {
    console.log(e)
    console.log('PAGE UPDATED')
    extension.active()
  })
}

const fullscreenListener = () => {
  const events = ['fullscreenchange', 'webkitfullscreenchange']
  events.forEach(event => {
    // Pause the extension when fullscreen mode.
    document.addEventListener(event, () => {
      document.body.classList.toggle('oypb-is-fullscreen')
    })
  })
}

const registerListeners = (): void => {
  pageNavigateListener()
  videoLoadedListener()
  fullscreenListener()
}

export { registerListeners, DEBUG_YT_EVENTS }
