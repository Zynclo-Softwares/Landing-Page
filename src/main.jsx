import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'

// GitHub Pages SPA redirect fix: restore original path from sessionStorage
(function() {
  const redirect = sessionStorage.getItem('spa_redirect');
  if (redirect) {
    sessionStorage.removeItem('spa_redirect');
    window.history.replaceState(null, '', redirect);
  }
})();

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)