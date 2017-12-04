'use strict'
import {combineReducers} from 'redux'
import changeTodoList from './DataReducer'

const RootReducer = combineReducers({
  changeTodoList
});

export default RootReducer;
