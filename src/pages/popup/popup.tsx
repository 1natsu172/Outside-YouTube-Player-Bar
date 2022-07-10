import { GlobalWrapper } from './components/globalWrapper'
import { GlobalHeader } from './components/globalHeader'
import { GlobalFooter } from './components/globalFooter'
import { MainContents } from './components/mainContent'

export const Popup: React.FC<{}> = () => {
  return (
    <>
      <GlobalWrapper>
        <GlobalHeader />
        <MainContents />
        <GlobalFooter />
      </GlobalWrapper>
    </>
  )
}
