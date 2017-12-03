import { bindActionCreators } from 'redux';

export const withEntities = (...entities) => {

  return dispatch => {
    const actions = {};
    entities.forEach(entity => {
      actions[entity.key] = bindActionCreators(entity.actions, dispatch);
    });

    return actions;
  };
};

export const NOOP = () => {};
export const LOG = (...args) => console.log(...args);
