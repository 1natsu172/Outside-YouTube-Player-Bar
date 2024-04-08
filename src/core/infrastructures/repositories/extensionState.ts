import state, { StateMap } from '../stateMap'

export const hasInjected = (): StateMap['hasInjected'] =>
  state.get('hasInjected')

export const isActive = (): StateMap['isActive'] => state.get('isActive')

export const isAlwaysDisplayPlayerBar =
  (): StateMap['isAlwaysDisplayPlayerBar'] =>
    state.get('isAlwaysDisplayPlayerBar')

export const getForceDisplayPlayerBarIntervalId =
  (): StateMap['forceDisplayPlayerBarIntervalId'] =>
    state.get('forceDisplayPlayerBarIntervalId')
