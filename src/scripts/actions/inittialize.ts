import { hasInjected } from '../repository/extensionState'
import { setHasInjected } from '../usecases/extensionBehavior'

export function initialize() {
  console.log('EXTENSION INITIALIZING...')
  setHasInjected(false) // set init state
  console.log('Init: hasInject?', hasInjected())
}
