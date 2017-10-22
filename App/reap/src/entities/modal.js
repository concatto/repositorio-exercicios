export const types = {
  CLOSE: "CLOSE_MODAL",
  PUSH: "PUSH_MODAL",
  POP: "POP_MODAL",
};

const Modal = {
  key: "modal",
  actions: {
    push: (component, params = {}, callback = () => {}) => {
      return {type: types.PUSH, payload: {component, params, callback}};
    },
    pop: () => {
      return {type: types.POP};
    },
    close: () => {
      return {type: types.CLOSE};
    }
  }
};

const initialState = {
  stack: []
};

export const reducer = (state = initialState, action) => {
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

export default Modal;
