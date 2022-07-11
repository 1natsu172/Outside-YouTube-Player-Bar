import {
  isActive,
  isAlwaysDisplayPlayerBar,
} from '../repository/extensionState'
import { interventionDOM } from '../usecases/interventionDOM'

const observeConfig: MutationObserverInit = {
  attributes: true, // check only attributes
  attributeFilter: ['class'], // check only className attribute
}

type MutationProps = { forceDisplayPlayer: () => void }

const mutationCallback =
  (mutationProps: MutationProps): MutationCallback =>
  (mutations) => {
    mutations.forEach((mutation) => {
      const targetClassList = (mutation.target as HTMLElement).classList
      const isVisiblePlayerBar =
        targetClassList.contains('paused-mode') ||
        !targetClassList.contains('ytp-autohide')

      if (isVisiblePlayerBar) {
        interventionDOM.addVisiblePlayerBarClassName()
      } else {
        interventionDOM.removeVisiblePlayerBarClassName()

        // NOTE: activeかつ常時表示モードの場合、フェードアウト抑制する
        if (isActive() && isAlwaysDisplayPlayerBar()) {
          mutationProps.forceDisplayPlayer()
        }
      }
    })
  }

export const observeIsVisiblePlayerBar = (
  target: Node,
  mutationProps: MutationProps,
) =>
  new MutationObserver(mutationCallback(mutationProps)).observe(
    target,
    observeConfig,
  )
