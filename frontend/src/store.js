import {legacy_createStore as createStore} from 'redux'

const ADD = "ADD";
const DELETE = "DELETE"

const addTodo = text => {
  return {
    type: ADD,
    text
  };
};

const deleteTodo = id => {
  return {
    type: DELETE,
    id: parseInt(id)
  };
};

const reducer = (state = [], action) => {
  switch(action.type){
    case ADD:
      return [{text: action.text, id:Date.now()}, ...state];
    case DELETE:
      return state.filter(toDo => toDo.id !== action.id)
    default:
      return state;
  };
};

const store = createStore(reducer)

const WRITE = "WRITE";
const writeFeed = state => {
  return {
    type: WRITE,
    state
  };
};

const isWrite = (state = false, action) => {
  switch(action.type){
    case WRITE:
      return !action.state;
    default:
      return state;
  };
};

const writeStore = createStore(isWrite)


export const actionCreators = {
  addTodo,
  deleteTodo,
  writeFeed
}
export default store;
// export default writeStore;