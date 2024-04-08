import {
  isActive,
  isAlwaysDisplayPlayerBar,
} from '../infrastructures/repositories/extensionState'
import { interventionDOM } from '../usecases/interventionDOM'

const observeConfig: MutationObserverInit = {
  attributes: true, // check only attributes
  attributeFilter: ['class'], // check only className attribute
}

type MutationProps = {
  blockAutohide: () => void
}

const mutationCallback =
  (mutationProps: MutationProps): MutationCallback =>
  (mutations) => {
    mutations.forEach((mutation) => {
      const targetClassList = (mutation.target as HTMLElement).classList
      const isVisiblePlayerBar =
        targetClassList.contains('paused-mode') ||
        !targetClassList.contains('ytp-autohide')

      // console.log('mutation', isVisiblePlayerBar)
      // console.log('mutation is', mutation)

      if (isVisiblePlayerBar) {
        interventionDOM.addVisiblePlayerBarClassName()
      } else {
        // interventionDOM.removeVisiblePlayerBarClassName()
      }

      // NOTE: activeかつ常時表示かつプレイヤーバーが非表示のとき、autohideの場合があるので解除を試みる
      if (isActive() && isAlwaysDisplayPlayerBar() && !isVisiblePlayerBar) {
        mutationProps.blockAutohide()
      }
    })
  }

export const observeIsVisiblePlayerBar = (
  target: Node,
  mutationProps: MutationProps
) =>
  new MutationObserver(mutationCallback(mutationProps)).observe(
    target,
    observeConfig
  )
