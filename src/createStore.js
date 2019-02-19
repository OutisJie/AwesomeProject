import { createStore, applyMiddleware, combineReducers } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'

import articleListState from './pages/home/redux'

const middleware = applyMiddleware(
  thunk,
)

export default (data: Object = {}) => {
  const rootReducer = combineReducers({
    //every modules reducer should be define here
    articleListState
  })

  return createStore(rootReducer, data, middleware)
}