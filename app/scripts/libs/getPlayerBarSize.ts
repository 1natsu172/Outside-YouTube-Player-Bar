import waitElement from '@1natsu/wait-element'

export default async () => {
  const playerBar = await waitElement('.ytp-chrome-bottom', {
    target: document.body
  })
  // const playerBar = document.querySelector('.ytp-chrome-bottom') as HTMLElement
  const playerBarHeight: number | null = playerBar.clientHeight

  return playerBarHeight
}
