import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'

// GitHub Pages SPA redirect fix: restore original path from query param
(function() {
  const params = new URLSearchParams(window.location.search);
  const p = params.get('p');
  if (p) {
    const q = params.get('q');
    const hash = window.location.hash;
    const newUrl = p + (q ? '?' + q : '') + (hash || '');
    window.history.replaceState(null, '', newUrl);
  }
})();

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)