'use strict'

import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import RootReducer from './reducer/RootReducer'

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

export default function configureScene(initialState) {
  const store = createStoreWithMiddleware(RootReducer, initialState);

  return store;
}
