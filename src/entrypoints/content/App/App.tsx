import { useEffect } from 'react'
import { useNowRoute } from './hooks/router.js'
import { OypbButton } from './components/parts/oypbButton/index.js'

export const App = () => {
  const { bl } = useNowRoute()
  useEffect(() => {
    logger.log(bl)
  }, [bl])

  return (
    <div>
      <OypbButton />
    </div>
  )
}
