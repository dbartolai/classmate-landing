import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LandingPageUltra from './components/LandingPageUltra'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LandingPageUltra />
  </StrictMode>,
)
