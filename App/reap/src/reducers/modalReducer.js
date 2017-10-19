import { types } from '../entities/modal';

const initialState = {
  stack: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PUSH:
      return {...state,
        stack: [...state.stack, {...action.payload, shown: true}]
      };
    case types.POP:
      return {...state,
        stack: state.stack.slice(0, -1)
      };
    case types.CLOSE:
      const newStack = [...state.stack];

      // Replace the last element's shown property with "false"
      newStack[newStack.length - 1] = {
        ...newStack[newStack.length - 1], shown: false
      };

      return {...state, stack: newStack};
    default:
      return state;
  }
};

export default reducer;
