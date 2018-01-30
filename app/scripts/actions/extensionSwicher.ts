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
    console.log('is?', state.get('isActive'))
    console.log('hasinject?', state.get('hasInjected'))
  }

  inactive = (): void => {
    removeButton()
    removeStyle()
    document.body.classList.remove('oypb-is-outside-playerBar')
    state.clear()

    state.forEach((k: any, v: any) => {
      console.log(v, k)
    })
  }

  pause = (): void => {
    if (state.get('isActive')) {
      document.body.classList.toggle('oypb-is-outside-playerBar')
      console.log('is?', 'pause')
    }
  }

  // toggle means change inside/outside bar, when enable button in video page
  toggle = (): void => {
    state.forEach((k: any, v: any) => {
      console.log(v, k)
    })
    document.body.classList.toggle('oypb-is-outside-playerBar')
    let toggleValue = state.get('isActive')
      ? state.set('isActive', false)
      : state.set('isActive', true)
    state.forEach((k: any, v: any) => {
      console.log(v, k)
    })
  }
}

const extensionSwitcher = new ExtensionSwitcherWrapper()

export default extensionSwitcher
