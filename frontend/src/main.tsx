import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Landing from './pages/landing'
import Footer from './components/footer/footer'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Landing />
    <Footer />
  </StrictMode>,
)
