import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '../styles/globals.css'
import './styles.css'

// Chrome extension popup - isolated CSS scope
const root = document.getElementById('root')
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
