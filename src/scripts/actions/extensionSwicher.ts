import state from '../libs/stateMap'
import { injectButton, removeButton } from './extensionButton'
import { handle } from '../libs/handleCollection'

const ExtensionSwitcherWrapper = class ExtensionSwitcherWrapper {
  constructor() {
    // _
  }

  active = async (): Promise<void> => {
    if (!handle.isActiveReady()) return

    console.log('ACTIVING EXTENSION...')
    await injectButton()
    document.body.classList.add('oypb-is-outside-playerBar')
    state.set('isActive', true)
    state.set('hasInjected', true)

    console.log('Extension is activing now: isActive?', state.get('isActive'))
    console.log(
      'Extension is activing now: hasInject?',
      state.get('hasInjected')
    )
  }

  inactive = (): void => {
    if (!handle.isInactiveReady()) return

    console.log('INACTIVING EXTENSION...')
    removeButton()
    document.body.classList.remove('oypb-is-outside-playerBar')
    state.clear()

    console.log('EXTENSION IS INACTIVED')
  }

  pause = (): void => {
    if (state.get('isActive')) {
      document.body.classList.toggle('oypb-is-outside-playerBar')
      console.log('PAUSED EXTENSION')
    }
  }

  // toggle means change inside/outside bar, when enable button in video page
  toggle = (): void => {
    document.body.classList.toggle('oypb-is-outside-playerBar')
    let toggleValue = state.get('isActive')
      ? state.set('isActive', false)
      : state.set('isActive', true)
    console.log('Extension toggled: isActive?', state.get('isActive'))
  }
}

const extensionSwitcher = new ExtensionSwitcherWrapper()

export default extensionSwitcher
