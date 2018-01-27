import getPlayerBarSize from '../libs/getPlayerBarSize'

export default async () => {
  const playerBarHeight = await getPlayerBarSize()
  console.log(playerBarHeight)
  const extensionStyle = `<style>:root{--oypb-player-bar-height: ${playerBarHeight}px;}</style>`
  document.head.insertAdjacentHTML('beforeend', extensionStyle)
}
