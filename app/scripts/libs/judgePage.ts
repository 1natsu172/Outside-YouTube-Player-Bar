import debugLog from './debugLog'

export const isVideo = () => {
  const pathName: any = location.pathname
  debugLog('LocationPathName?', pathName)
  return pathName === '/watch' ? true : false
}
