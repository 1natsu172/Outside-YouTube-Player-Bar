const WaitElement = require('./libs/waitElement')
import BarHeight from './libs/getPlayerBarHeight'
console.log(BarHeight)

const getcontainer = async () => {
  const observeTarget = document.body
  const wait = await WaitElement(observeTarget, '#player-container')
  console.log(wait)
}
getcontainer()

// // `<style>:root{--oypb-player-bar-height: ${playerBarHeight};}</style>`
