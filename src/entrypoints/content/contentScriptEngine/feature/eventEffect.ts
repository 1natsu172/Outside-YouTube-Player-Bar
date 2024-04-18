import {
  observeVideoLoaded,
  observePageNavigate,
} from '../libs/observeYTEvent.js'

const pageNavigateEffect = (event: unknown) => {
  logger.log('page navigated', event)
}

const videoLoadedEffect = (event: unknown) => {
  logger.log('video loaded', event)
}

const disposeList = new Set<() => void>()

export const setupEventEffect = () => {
  disposeList.add(observePageNavigate(pageNavigateEffect))
  disposeList.add(observeVideoLoaded(videoLoadedEffect))
}

export const disposeEventEffect = () => {
  disposeList.forEach((dispose) => {
    dispose()
  })
}
