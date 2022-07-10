import state from '../infrastructure/stateMap'

export const setHasInjected = (is: boolean) => {
  state.set('hasInjected', is)
}

export const setIsActive = (is: boolean) => {
  state.set('isActive', is)
}
