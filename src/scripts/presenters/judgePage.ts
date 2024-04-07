export const isVideo = () => {
  const pathName: any = location.pathname
  console.log('LocationPathName?', pathName)
  const userLivePagePathnamePattern = /^\/@?[^\/]+\/live$/

  return pathName === '/watch' || userLivePagePathnamePattern.test(pathName)
    ? true
    : false
}
