import debugLog from '../libs/debugLog'
import state from '../libs/stateMap'
import { injectButton, removeButton } from './extensionButton'
import { injectStyle, removeStyle } from './extensionStyle'

const ExtensionSwitcherWrapper = class ExtensionSwitcherWrapper {
  constructor() {
    // _
  }

  active = async (): Promise<void> => {
    debugLog('ACTIVING EXTENSION...')
    await injectStyle()
    await injectButton()
    document.body.classList.add('oypb-is-outside-playerBar')
    state.set('isActive', true)

    if (!state.get('hasInjected')) {
      state.set('hasInjected', true)
    }

    debugLog('Extension is activing: isActive?', state.get('isActive'))
    debugLog('Extension is activing: hasInject?', state.get('hasInjected'))
  }

  inactive = (): void => {
    debugLog('INACTIVING EXTENSION...')
    removeButton()
    removeStyle()
    document.body.classList.remove('oypb-is-outside-playerBar')
    state.clear()

    state.forEach((value: any, key: any) => {
      debugLog('Extension is inactived', key, value)
    })
  }

  pause = (): void => {
    if (state.get('isActive')) {
      document.body.classList.toggle('oypb-is-outside-playerBar')
      debugLog('PAUSED EXTENSION')
    }
  }

  // toggle means change inside/outside bar, when enable button in video page
  toggle = (): void => {
    document.body.classList.toggle('oypb-is-outside-playerBar')
    let toggleValue = state.get('isActive')
      ? state.set('isActive', false)
      : state.set('isActive', true)
    debugLog('Extension toggled: isActive?', state.get('isActive'))
  }
}

const extensionSwitcher = new ExtensionSwitcherWrapper()

export default extensionSwitcher
