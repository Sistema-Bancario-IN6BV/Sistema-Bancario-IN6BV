import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from "@material-tailwind/react"
import { Toaster } from 'react-hot-toast'
import '../styles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
