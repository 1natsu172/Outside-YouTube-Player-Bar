const WaitElement = require('./WaitElement')

export default async () => {
  const playerBar = await WaitElement(document.body, '.ytp-chrome-bottom')
  // const playerBar = document.querySelector('.ytp-chrome-bottom') as HTMLElement
  const playerBarHeight: number | null = playerBar.clientHeight

  return playerBarHeight
}
