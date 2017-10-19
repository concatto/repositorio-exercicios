export const types = {
  CLOSE: "CLOSE_MODAL",
  PUSH: "PUSH_MODAL",
  POP: "POP_MODAL",
};

class Modal {
  getKey() {
    return "modal";
  }

  getActions() {
    return {
      push: (component, params = {}, callback = () => {}) => {
        return {type: types.PUSH, payload: {component, params, callback}};
      },
      pop: () => {
        return {type: types.POP};
      },
      close: () => {
        return {type: types.CLOSE};
      }
    };
  }
};


export default new Modal();
