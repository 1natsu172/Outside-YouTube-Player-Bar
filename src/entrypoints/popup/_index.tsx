import { createRoot } from 'react-dom/client'
import { Popup } from './popup'

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(<Popup />)
