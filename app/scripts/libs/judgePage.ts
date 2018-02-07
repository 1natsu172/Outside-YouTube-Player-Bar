export const isVideo = () => {
  const pathName: any = location.pathname
  console.log('LocationPathName?', pathName)
  return pathName === '/watch' ? true : false
}
