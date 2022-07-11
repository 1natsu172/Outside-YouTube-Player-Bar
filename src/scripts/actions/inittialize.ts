import {
  hasInjected,
  isAlwaysDisplayPlayerBar,
} from '../repository/extensionState'
import {
  setHasInjected,
  setIsAlwaysDisplayPlayerBar,
} from '../usecases/extensionBehavior'

export function initialize() {
  console.log('EXTENSION INITIALIZING...')
  setHasInjected(false) // set init state
  setIsAlwaysDisplayPlayerBar(true) // NOTE: とりあえずオプション提供しないのでここてコンテキスト決め打ちする
  console.log('Init: hasInject?', hasInjected())
  console.log('Init: isAlwaysDisplayPlayerBar?', isAlwaysDisplayPlayerBar())
}
