import { waitElement } from '@1natsu/wait-element'
import { moviePlayerController } from '../controllers/moviePlayerController'
import { observeIsVisiblePlayerBar } from '../controllers/observeIsVisiblePlayerBar'

export const observeNodes = async () => {
  const player = await waitElement('#movie_player')
  const { mousemove } = await moviePlayerController(player as Element)
  observeIsVisiblePlayerBar(player as Node, { forceDisplayPlayer: mousemove })
}
