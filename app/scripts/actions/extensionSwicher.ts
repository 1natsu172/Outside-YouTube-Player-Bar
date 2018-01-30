import debugLog from '../libs/debugLog'
import state from '../libs/stateMap'
import { injectButton, removeButton } from './extensionButton'
import { injectStyle, removeStyle } from './extensionStyle'

const ExtensionSwitcherWrapper = class ExtensionSwitcherWrapper {
  constructor() {
    // _
  }

  active = async (): Promise<void> => {
    await injectStyle()
    await injectButton()
    document.body.classList.add('oypb-is-outside-playerBar')

    state.set('isActive', true)

    if (!state.get('hasInjected')) {
      state.set('hasInjected', true)
    }

    debugLog('is?', state.get('isActive'))
    debugLog('hasinject?', state.get('hasInjected'))
    debugLog('hasinject?', state.get('hasInjected'))
  }

  inactive = (): void => {
    removeButton()
    removeStyle()
    document.body.classList.remove('oypb-is-outside-playerBar')
    state.clear()

    state.forEach((k: any, v: any) => {
      debugLog(v, k)
    })
  }

  pause = (): void => {
    if (state.get('isActive')) {
      document.body.classList.toggle('oypb-is-outside-playerBar')
      debugLog('is?', 'pause')
    }
  }

  // toggle means change inside/outside bar, when enable button in video page
  toggle = (): void => {
    state.forEach((k: any, v: any) => {
      debugLog(v, k)
    })
    document.body.classList.toggle('oypb-is-outside-playerBar')
    let toggleValue = state.get('isActive')
      ? state.set('isActive', false)
      : state.set('isActive', true)
    state.forEach((k: any, v: any) => {
      debugLog(v, k)
    })
  }
}

const extensionSwitcher = new ExtensionSwitcherWrapper()

export default extensionSwitcher
