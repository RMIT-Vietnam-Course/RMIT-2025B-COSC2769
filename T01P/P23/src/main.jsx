import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App2 from './App2/App2.jsx'
import App3 from './App3/App3.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App2 />
    <App3 />
  </StrictMode>,
)