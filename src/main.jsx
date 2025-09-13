import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
// import PageMeta, { AppWrapper } from './pages/utils.jsx/PageMeta.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <AppWrapper> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    {/* </AppWrapper> */}
  </StrictMode>,
)
