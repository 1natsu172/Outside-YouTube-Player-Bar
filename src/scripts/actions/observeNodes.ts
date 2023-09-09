import { waitElement } from '@1natsu/wait-element'
import { debounce } from 'mabiki'
import { observeIsVisiblePlayerBar } from '../controllers/observeIsVisiblePlayerBar'
import { displayPlayerBar } from '../controllers/displayPlayerBar.js'

export const observeNodes = async () => {
  const player = await waitElement('#movie_player')
  const { blockAutohide } = await displayPlayerBar()

  observeIsVisiblePlayerBar(player as Node, {
    blockAutohide: debounce(blockAutohide, 1000, {
      trailing: true,
      leading: true,
    }),
  })
}
