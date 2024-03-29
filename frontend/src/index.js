import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import './assets/styles/main.scss'
import { App } from './root-cmp'
// import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import { store } from './store';

//TIME AGO LIBARY
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
TimeAgo.addDefaultLocale(en)


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)

// serviceWorkerRegistration.register()




