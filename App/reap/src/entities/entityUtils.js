import { performRequest } from "../asyncOperations";

export const loadAll = (dispatch, entity, path) => {
  if (!path) {
    path = entity.key;
  }

  console.log(entity);
  performRequest(dispatch, entity.actionNames.loadAll, "/api/" + path);
}

export const toObject = (resultSet) => {
  const obj = {};
  resultSet.forEach(record => {
    obj[record.id] = record;
  });
  return obj;
}
