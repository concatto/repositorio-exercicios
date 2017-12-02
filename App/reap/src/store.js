import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { reducer as modalReducer} from './entities/modal';
import { reducer as exerciseReducer } from './entities/exercises';

const middleware = applyMiddleware(thunk, createLogger());

const reducer = (state={}, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

const __mockInitialUsers = {
  current: {
    name: "Tester",
    privilege: 3
  },
  others: []
};

const __mockUsersReducer = (state = __mockInitialUsers, action) => {
  return state;
}

export const store = createStore(combineReducers({
  data: reducer,
  modal: modalReducer,
  exercises: exerciseReducer,
  users: __mockUsersReducer
}), middleware);
