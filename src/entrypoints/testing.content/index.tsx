import './style.css'
import ReactDOM from 'react-dom/client'
import { App } from '../content/App/App.jsx'

export default defineContentScript({
  matches: ['*://*/*'],
  cssInjectionMode: 'ui',

  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: 'wxt-react-example',
      position: 'inline',
      anchor: 'body',
      append: 'first',
      onMount: (container) => {
        console.log('omae')

        const root = ReactDOM.createRoot(container)
        root.render(<App />)
        return root
      },
      onRemove: (root) => {
        root?.unmount()
      },
    })

    ui.mount()
  },
})
