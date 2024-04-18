import { useEffect } from 'react'
import { useBrowserLocation } from 'wouter/use-browser-location'
import { PlayerBarButton } from './feature/PlayerBarButton/index.js'

export const App = () => {
  const location = useBrowserLocation()
  useEffect(() => {
    logger.log(location)
  }, [location])

  return <PlayerBarButton />
}
