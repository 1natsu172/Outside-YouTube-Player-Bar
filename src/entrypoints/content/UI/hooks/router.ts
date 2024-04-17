import { useBrowserLocation } from 'wouter/use-browser-location'

export const useNowRoute = () => {
  const bl = useBrowserLocation()
  return {
    bl,
  }
}
