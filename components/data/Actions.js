'use strict'
import * as types from './ActionType'

export function addTodo(item) {
  return dispatch => {
    dispatch(getAddItemAction(item));
  }
}

export function changeTodo(item) {
  return dispatch => {
    dispatch(getChangeItemAction(item));
  }
}

export function deleteTodo(item) {
  return dispatch => {
    dispatch(getDeleteItemAction(item));
  }
}

function getAddItemAction(item) {
  return {
    type: types.ADD_TODO,
    item: item
  }
}

function getChangeItemAction(item) {
  return {
    type: types.CHANGE_TODO,
    item: item
  }
}

function getDeleteItemAction(item) {
  return {
    type: types.DELETE_TODO,
    item: item
  }
}
