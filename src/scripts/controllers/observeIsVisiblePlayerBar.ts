import { interventionDOM } from '../usecases/interventionDOM'

const observeConfig: MutationObserverInit = {
  attributes: true, // check only attributes
  attributeFilter: ['class'], // check only className attribute
}

const mutationCallback: MutationCallback = (mutations) => {
  mutations.forEach((mutation) => {
    const targetClassList = (mutation.target as HTMLElement).classList
    const isVisiblePlayerBar =
      targetClassList.contains('paused-mode') ||
      !targetClassList.contains('ytp-autohide')

    if (isVisiblePlayerBar) {
      interventionDOM.addVisiblePlayerBarClassName()
    } else {
      interventionDOM.removeVisiblePlayerBarClassName()
    }
  })
}

export const observeIsVisiblePlayerBar = (target: Node) =>
  new MutationObserver(mutationCallback).observe(target, observeConfig)
