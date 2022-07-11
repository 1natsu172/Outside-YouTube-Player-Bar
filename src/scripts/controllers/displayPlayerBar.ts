import { waitElement } from '@1natsu/wait-element'
import { moviePlayerController } from './moviePlayerController'
import { getForceDisplayPlayerBarIntervalId } from '../repository/extensionState'
import { setForceDisplayPlayerBarIntervalId } from '../usecases/extensionBehavior'
import { interventionDOM } from '../usecases/interventionDOM'

export async function displayPlayerBar() {
  const moviePlayer = await waitElement('#movie_player')
  const { mousemove } = await moviePlayerController(moviePlayer)

  return {
    alwaysDisplay() {
      console.log('displayPlayerBar: to always display player bar')
      //NOTE: メモリリーク避けるためにコールしておく
      clearInterval(getForceDisplayPlayerBarIntervalId() as number)
      const intervalId = setInterval(() => {
        mousemove()
      }, 3000)
      setForceDisplayPlayerBarIntervalId(intervalId)
    },
    disappear() {
      console.log('displayPlayerBar: to disappear player bar')
      clearInterval(getForceDisplayPlayerBarIntervalId() as number)
      interventionDOM.removeVisiblePlayerBarClassName()
    },
  }
}
