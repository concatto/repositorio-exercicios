import shortid from 'shortid';

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
    pop: (identifier) => {
      return {type: types.POP, payload: identifier};
    },
    close: () => {
      return {type: types.CLOSE};
    }
  }
};

const initialState = {
  stack: []
};

const removeModal = (stack, identifier) => {
  let index = stack.findIndex(el => el.identifier === identifier);
  if (index === -1) index = stack.length - 1;

  return [
    ...stack.slice(0, index),
    ...stack.slice(index + 1)
  ];
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PUSH:
      return {...state,
        stack: [...state.stack, {...action.payload, shown: true, identifier: shortid.generate()}]
      };
    case types.POP:
      // The removeModal() function removes the specified modal (or the last if the identifier is undefined)
      return {...state,
        stack: removeModal(state.stack, action.payload)
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
