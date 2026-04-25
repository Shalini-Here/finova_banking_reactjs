/**
 * main.jsx — React app entry point
 * • Wraps the entire app with BrowserRouter so react-router-dom works
 * • Mounts to #root in index.html
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* BrowserRouter must wrap everything for <Routes>/<Link> to function */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
