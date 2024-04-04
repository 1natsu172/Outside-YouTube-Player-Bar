import { extensionSwitcher } from '../controllers/extensionSwicher.js'
import { isVideo } from '../presenters/judgePage.js'
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

  // NOTE: URL直打ちあるいは新規タブで動画ページを開いたかを判定する
  const isInitializeOnVideoPage = isVideo()
  return { isInitializeOnVideoPage }
}

export function additionalInitializationOnVideoPage() {
  console.log('EXTENSION ADDITIONAL INITIALIZATION ON VIDEO PAGE')
  extensionSwitcher.active()
}
