import { bindActionCreators } from 'redux';

export const withEntities = (...entities) => {
  console.log(entities);

  return dispatch => {
    const actions = {};
    entities.forEach(entity => {
      actions[entity.key] = bindActionCreators(entity.actions, dispatch);
    });

    return actions;
  };
};
