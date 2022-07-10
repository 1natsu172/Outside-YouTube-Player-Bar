import state from '../infrastructure/stateMap'

export const setHasInjected = (is: boolean) => {
  state.set('hasInjected', is)
}
