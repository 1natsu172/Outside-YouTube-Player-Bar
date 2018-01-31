const state = new Map()
export default state

export const hasInjected = (): boolean => state.get('hasInjected')

export const isActive = (): boolean => state.get('isActive')
