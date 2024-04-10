import { setPlayerBarHeight } from '../usecases/setCssVariables.js'

const observeConfig: ResizeObserverOptions = {
  box: 'border-box',
}

type MutationProps = {
  setPlayerBarHeight: typeof setPlayerBarHeight
}

const callback =
  (mutationProps: MutationProps): ResizeObserverCallback =>
  (entries) => {
    for (let entry of entries) {
      const { borderBoxSize } = entry

      const [size] = borderBoxSize
      const height = `${size.blockSize}px`
      mutationProps.setPlayerBarHeight(height)
    }
  }

export const observeHeightOfPlayerBar = (
  target: Element,
  mutationProps: MutationProps
) => new ResizeObserver(callback(mutationProps)).observe(target, observeConfig)
