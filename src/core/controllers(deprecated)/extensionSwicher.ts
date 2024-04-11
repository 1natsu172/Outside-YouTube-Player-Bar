import state from '../infrastructures/stateMap'
import { injectButton, removeButton } from '../mains/extensionButton'
import { conditionsCollection } from '../presenters/conditionsCollection'
import { interventionDOM } from '../usecases/interventionDOM'
import { setHasInjected, setIsActive } from '../usecases/extensionBehavior'
// import { displayPlayerBar } from './displayPlayerBar'
import { hasInjected, isActive } from '../repositories/extensionState'

class ExtensionSwitcher {
  active = async (): Promise<void> => {
    if (!conditionsCollection.isActiveReady()) return

    console.log('ACTIVING EXTENSION...')

    await injectButton()
    interventionDOM.addOutsidePlayerBarClassName()
    setIsActive(true)
    setHasInjected(true)

    console.log('Extension is activing now: isActive?', isActive())
    console.log('Extension is activing now: hasInject?', hasInjected())

    // await (await displayPlayerBar()).alwaysDisplayByHack()
  }

  inactive = (): void => {
    if (!conditionsCollection.isInactiveReady()) return

    console.log('INACTIVING EXTENSION...')
    removeButton()
    interventionDOM.removeOutsidePlayerBarClassName()
    state.clear()

    console.log('EXTENSION IS INACTIVED')
  }

  pause = (): void => {
    if (state.get('isActive')) {
      interventionDOM.removeOutsidePlayerBarClassName()
      console.log('PAUSED EXTENSION')
    }
  }

  // toggle means change inside/outside bar, when enable button in video page
  toggle = async (): Promise<void> => {
    interventionDOM.toggleOutsidePlayerBarClassName()
    // 内側になるときは `ForceDisplayPlayerBar` しなくなるようにする
    if (isActive()) {
      console.log('Extension order to disapper player bar mode')
      // await (await displayPlayerBar()).disappear()
    } else {
      console.log('Extension order to always display player bar mode')
      // await (await displayPlayerBar()).alwaysDisplayByHack()
    }

    isActive() ? setIsActive(false) : setIsActive(true)
    console.log('Extension toggled: isActive?', isActive())
  }
}

export const extensionSwitcher = new ExtensionSwitcher()
