import { logger } from '@/utils/logger.js'

export const isVideoPage = () => {
  if (!location) {
    throw Error('location object not found!')
  }

  const pathName = location.pathname
  const userLivePagePathnamePattern = /^\/@?[^\/]+\/live$/

  logger.info('LocationPathName?', pathName)
  return pathName === '/watch' || userLivePagePathnamePattern.test(pathName)
    ? true
    : false
}
