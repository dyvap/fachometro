import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Registro del Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    try {
      navigator.serviceWorker.register('/fachometro/sw.js').then(registration => {
        console.log('ServiceWorker registration successful:', registration.scope);
      }).catch(error => {
        console.log('ServiceWorker registration failed:', error);
      });
    } catch (error) {
      console.log('ServiceWorker registration failed:', error);
    }
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)