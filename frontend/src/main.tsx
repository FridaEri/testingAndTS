import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Footer from './components/footer/footer'
import AppRouter from './router/AppRouter'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouter />
    <Footer />
  </StrictMode>,
)
