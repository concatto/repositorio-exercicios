import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import modalReducer from './reducers/modalReducer';

const middleware = applyMiddleware(thunk, createLogger());

const reducer = (state={}, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

export const store = createStore(combineReducers({
  data: reducer,
  modal: modalReducer,
}), middleware);
