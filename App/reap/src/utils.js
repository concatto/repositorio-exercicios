import { bindActionCreators } from 'redux';

export const toObject = (array, key = "id") => {
  const obj = {};
  array.forEach(record => {
    obj[record[key]] = record;
  });
  return obj;
}

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
