import {legacy_createStore as createStore} from 'redux'
import {createAction, createReducer} from '@reduxjs/toolkit'

const saveToken = createAction("SAVE");

const reducer = createReducer([],{
  [saveToken]: (state, action) =>{
    state = action.payload;
  }
})

const store = createStore(reducer)
export const actionCreators = {
  saveToken
}
export default store;