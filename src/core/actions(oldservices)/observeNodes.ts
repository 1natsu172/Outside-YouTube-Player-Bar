import { waitElement } from '@1natsu/wait-element'
import { debounce } from 'mabiki'
import { observeIsVisiblePlayerBar } from '../controllers/observeIsVisiblePlayerBar'
import { observeHeightOfPlayerBar } from '../controllers/observeHeightOfPlayerBar.js'
import { displayPlayerBar } from '../controllers/displayPlayerBar.js'
import { setPlayerBarHeight } from '../usecases/setCssVariables.js'

export const observeNodes = async () => {
  const player = await waitElement('#movie_player')
  const { blockAutohide } = await displayPlayerBar()
  const playerBarContainer = await waitElement('.ytp-chrome-bottom')

  observeIsVisiblePlayerBar(player as Node, {
    blockAutohide: debounce(blockAutohide, 1000, {
      trailing: true,
      leading: true,
    }),
  })

  observeHeightOfPlayerBar(playerBarContainer, {
    setPlayerBarHeight: debounce(setPlayerBarHeight, 500, {
      trailing: true,
      leading: true,
    }),
  })
}
