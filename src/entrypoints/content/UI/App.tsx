import { useEffect } from 'react'
import { useNowRoute } from './hooks/router.js'
import { PlayerBarButton } from './feature/PlayerBarButton/index.js'

export const App = () => {
  const { bl } = useNowRoute()
  useEffect(() => {
    logger.log(bl)
  }, [bl])

  return <PlayerBarButton />
}
