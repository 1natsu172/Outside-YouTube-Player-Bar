const waitElement = require('./waitElement')
import ResizeObserver from 'resize-observer-polyfill'

console.log(ResizeObserver)

// import CalcSize from './calcVideoContainerSize'

// export default async (requestType: string) => {
//   const element = await waitElement(document.body, '#player-container')
//   const calcSize = new CalcSize(element)
//   // console.log(calcSize.defaultState())
//   // console.log(calcSize.outsidedState())
//   let size = {}
//   if (requestType === 'default') {
//     size = calcSize.defaultState()
//   }
//   if (requestType === 'outsided') {
//     size = calcSize.outsidedState()
//   }
//   return size
// }

// let _is

// const element = await waitElement(document.body, '#player-container')

// export default (a:string) => {

//   const width = () => {
//     element.clientWidth
//   }
//   const height = () => {
//     element.clientHeight
//   }
//   return
// }
