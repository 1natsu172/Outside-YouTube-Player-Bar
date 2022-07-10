import state from '../infrastructure/stateMap'

export const hasInjected = (): boolean => state.get('hasInjected')

export const isActive = (): boolean => state.get('isActive')
