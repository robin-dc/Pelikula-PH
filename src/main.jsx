import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ScrollProvider from './utils/ScrollContext.jsx'
import { Provider } from 'react-redux'

import store from './app/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ScrollProvider>
          <App />
        </ScrollProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
