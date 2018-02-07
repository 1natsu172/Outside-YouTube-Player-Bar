import getPlayerBarSize from '../libs/getPlayerBarSize'

export const injectStyle = async () => {
  console.log('INJECTING STYLE...')
  const playerBarHeight = await getPlayerBarSize()
  const extensionStyle = `<style scope="oypb-is-outside-playerBar">:root{--oypb-player-bar-height: ${playerBarHeight}px;}</style>`

  document.head.insertAdjacentHTML('beforeend', extensionStyle)
}

export const removeStyle = () => {
  console.log('REMOVING STYLE...')
  const style = document.querySelector(
    'style[scope="oypb-is-outside-playerBar"]'
  )
  if (style) style.remove()
}
