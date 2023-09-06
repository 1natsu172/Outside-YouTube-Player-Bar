import { interventionDOM } from '../usecases/interventionDOM'

const observeConfig: MutationObserverInit = {
  attributes: true, // check only attributes
  attributeFilter: ['class'], // check only className attribute
}

type MutationProps = {
  // NOTE: またいつかmutation時に処理を入れたいとき用に残しておく
}

const mutationCallback =
  (_mutationProps: MutationProps): MutationCallback =>
  (mutations) => {
    mutations.forEach((mutation) => {
      const targetClassList = (mutation.target as HTMLElement).classList
      const isVisiblePlayerBar =
        targetClassList.contains('paused-mode') ||
        !targetClassList.contains('ytp-autohide')

      // console.log('mutation is', mutation)

      if (isVisiblePlayerBar) {
        interventionDOM.addVisiblePlayerBarClassName()
      } else {
        interventionDOM.removeVisiblePlayerBarClassName()
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
