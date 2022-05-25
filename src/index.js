import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import './assets/styles/main.scss'
import { App } from './root-cmp'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import configureStore from './configure-store'

// const store = configureStore()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // <Provider store={store}>
    <App />
  // {/* </Provider> */}
)

serviceWorkerRegistration.unregister();


