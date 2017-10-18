export const withEntities = (...entities) => {
  console.log(entities);

  return dispatch => {
    const actions = {};
    entities.forEach(entity => {
      actions[entity.getKey()] = entity.getActions(dispatch);
    });

    return actions;
  };
};
