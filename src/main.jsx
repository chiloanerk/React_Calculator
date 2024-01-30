import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import SideMenu from "./SideMenu.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <SideMenu />
    <App />
  </React.StrictMode>,
)
