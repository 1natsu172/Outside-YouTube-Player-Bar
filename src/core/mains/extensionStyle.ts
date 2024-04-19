/**
 * styleタグでインジェクトするメリットが無くなったのでまた使うときが来るまで一旦コードフリーズする
 */
export default {};

// import getPlayerBarSize from '../libs/getPlayerBarSize'

// export const injectStyle = async () => {
//   console.log('INJECTING STYLE...')
//   const playerBarHeight = await getPlayerBarSize()
//   const extensionStyle = `<style scope="oypb-is-outside-playerBar">:root{--oypb-player-bar-height: ${playerBarHeight}px;}</style>`

//   document.head.insertAdjacentHTML('beforeend', extensionStyle)
// }

// export const removeStyle = () => {
//   console.log('REMOVING STYLE...')
//   const style = document.querySelector(
//     'style[scope="oypb-is-outside-playerBar"]'
//   )
//   if (style) style.remove()
// }

// export const addFullScreenPlayerBarVariable = async () => {
//   console.log('ADD FULLSCREEN PLAYER BAR HEIGHT SIZE...')

//   const fullScreenBarHeight = 58

//   const fullScreenCssVar = `:root{--oypb-fullscreen-player-bar-height: ${fullScreenBarHeight}px;}`

//   const style = document.querySelector(
//     'style[scope="oypb-is-outside-playerBar"]'
//   )
//   if (style) style.insertAdjacentText('beforeend', fullScreenCssVar)
// }
