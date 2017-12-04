'use strict'
import * as types from '../ActionType'
import _ from 'lodash'

const initialState = {
  todoList: []
}

export default function changeTodoList(state = initialState, action) {
  // alert('changeTodoList: '+action.type)
  switch (action.type) {
    case types.ADD_TODO:
      var nextState = _.cloneDeep(state) // 用到了 lodash 的深克隆
      nextState.todoList.push(action.item);
      return nextState;
      break;
    case types.CHANGE_TODO:
      var nextState = _.cloneDeep(state) // 用到了 lodash 的深克隆
      nextState.todoList.splice(action.item.index, 1, action.item);
      return nextState;
      break;
    case types.DELETE_TODO:
      var nextState = _.cloneDeep(state) // 用到了 lodash 的深克隆
      // alert('DELETE_TODO state : '+action.item.index)
      nextState.todoList.splice(action.item.index, 1);
      return nextState;
      break;
    default:
      return state;
  }
}
