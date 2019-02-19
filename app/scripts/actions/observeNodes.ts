import waitElement from '@1natsu/wait-element'
import { observeIsVisiblePlayerBar } from '../libs/observeIsVisiblePlayerBar'

export const observeNodes = async () => {
  const player = (await waitElement('#movie_player')) as Node
  observeIsVisiblePlayerBar(player)
}
