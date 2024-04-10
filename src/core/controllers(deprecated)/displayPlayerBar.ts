import { waitElement } from '@1natsu/wait-element'
import { moviePlayerController } from './moviePlayerController'
import { getForceDisplayPlayerBarIntervalId } from '../repositories/extensionState'
import { setForceDisplayPlayerBarIntervalId } from '../usecases/extensionBehavior'
import { interventionDOM } from '../usecases/interventionDOM'

export async function displayPlayerBar() {
  const moviePlayer = await waitElement('#movie_player')
  const { mousedown, mousemove, mouseleave } =
    await moviePlayerController(moviePlayer)

  return {
    // NOTE: ytp-autohideの解除がなぜかこのEvent操作でできる。
    blockAutohide() {
      mousedown()
      mouseleave()
      console.log('displayPlayerBar: block autohide')
    },
    /**
     * @deprecated v3リリース当初はmousemoveし続けるハック技でしかバー常時表示&プログレスバー稼働ができなかったが、v3.0.4の頃からytp-autohideを解除する操作が発見された(blockAutohide)のでこの方法は不要になった
     */
    alwaysDisplayByHack() {
      console.log('displayPlayerBar: to always display player bar')
      //NOTE: メモリリーク避けるためにコールしておく
      clearInterval(getForceDisplayPlayerBarIntervalId() as number)
      const intervalId = setInterval(() => {
        // NOTE: mousedownしておかないとmousemoveによるytp-autohideの解除が効かないので雑に呼んでおく
        mousedown()
        mousemove()
      }, 3000)
      setForceDisplayPlayerBarIntervalId(intervalId)
    },
    /**
     * @deprecated alwaysDisplayByHackと合わせて必要だったが不要になった
     */
    disappear() {
      console.log('displayPlayerBar: to disappear player bar')
      clearInterval(getForceDisplayPlayerBarIntervalId() as number)
      interventionDOM.removeVisiblePlayerBarClassName()
    },
  }
}
