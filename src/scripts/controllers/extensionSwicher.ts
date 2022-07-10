import state from '../infrastructure/stateMap'
import { injectButton, removeButton } from '../actions/extensionButton'
import { handle } from '../libs/handleCollection'
import { interventionDOM } from '../usecases/interventionDOM'
import { setHasInjected, setIsActive } from '../usecases/extensionBehavior'
import { hasInjected, isActive } from '../repository/extensionState'

class ExtensionSwitcher {
  active = async (): Promise<void> => {
    if (!handle.isActiveReady()) return

    console.log('ACTIVING EXTENSION...')

    await injectButton()
    interventionDOM.addOutsidePlayerBarClassName()
    setIsActive(true)
    setHasInjected(true)

    console.log('Extension is activing now: isActive?', isActive())
    console.log('Extension is activing now: hasInject?', hasInjected())
  }

  inactive = (): void => {
    if (!handle.isInactiveReady()) return

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
  toggle = (): void => {
    interventionDOM.toggleOutsidePlayerBarClassName()
    isActive() ? setIsActive(false) : setIsActive(true)
    console.log('Extension toggled: isActive?', isActive())
  }
}

export const extensionSwitcher = new ExtensionSwitcher()
