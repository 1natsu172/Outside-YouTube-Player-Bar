import debugLog from '../libs/debugLog'
import getPlayerBarSize from '../libs/getPlayerBarSize'

export const injectStyle = async () => {
  debugLog('INJECTING STYLE...')
  const playerBarHeight = await getPlayerBarSize()
  const extensionStyle = `<style scope="oypb-is-outside-playerBar">:root{--oypb-player-bar-height: ${playerBarHeight}px;}</style>`

  document.head.insertAdjacentHTML('beforeend', extensionStyle)
}

export const removeStyle = () => {
  debugLog('REMOVING STYLE...')
  const style = document.querySelector(
    'style[scope="oypb-is-outside-playerBar"]'
  )
  if (style) style.remove()
}
