import { waitElement } from '@1natsu/wait-element'
import { throttle } from '@github/mini-throttle'
import { observeIsVisiblePlayerBar } from '../controllers/observeIsVisiblePlayerBar'
import { displayPlayerBar } from '../controllers/displayPlayerBar.js'

export const observeNodes = async () => {
  const player = await waitElement('#movie_player')
  const { blockAutohide } = await displayPlayerBar()

  observeIsVisiblePlayerBar(player as Node, {
    blockAutohide: throttle(blockAutohide, 1000, {
      start: true,
    }),
  })
}
