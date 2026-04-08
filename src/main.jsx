import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './PortfolioApp.css'
import PortfolioApp from './PortfolioApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PortfolioApp />
  </StrictMode>,
)
