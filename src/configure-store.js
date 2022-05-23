import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { logger } from './store/middleware/logger'
import { rootReducer } from './store/root.reducer'
// import {initialState} from './store/initial-state'

export default function configureStore(preloadedState) {
  const middlewares = [logger, thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer]
  // const composedEnhancers = compose(...enhancers)
  const composedEnhancers = composeWithDevTools(...enhancers)

  const store = createStore(rootReducer, preloadedState, composedEnhancers)

  return store
}
