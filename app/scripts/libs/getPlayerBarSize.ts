const waitElement = require('./waitElement')

export default async () => {
  const playerBar = await waitElement(document.body, '.ytp-chrome-bottom')
  // const playerBar = document.querySelector('.ytp-chrome-bottom') as HTMLElement
  const playerBarHeight: number | null = playerBar.clientHeight

  return playerBarHeight
}
