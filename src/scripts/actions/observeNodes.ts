import { waitElement } from '@1natsu/wait-element'
import { moviePlayerController } from '../controllers/moviePlayerController'
import { observeIsVisiblePlayerBar } from '../controllers/observeIsVisiblePlayerBar'

export const observeNodes = async () => {
  const player = await waitElement('#movie_player')
  const { mouseleave, mousedown } = await moviePlayerController(
    player as Element
  )

  observeIsVisiblePlayerBar(player as Node, {
    // NOTE: コメントフレームをクリックしたときのautohide解除がなぜかmouseleave&&mousedownなのでこのハンドラを渡す
    blockAutohide: () => {
      mouseleave()
      mousedown()
    },
  })
}
