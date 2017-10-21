import { performRequest } from "../asyncOperations";

export const loadAll = (dispatch, entity, path) => {
  if (!path) {
    path = entity.getKey();
  }

  performRequest(dispatch, entity.getActionNames().loadAll, "/api/" + path);
}

export const toObject = (resultSet) => {
  const obj = {};
  resultSet.forEach(record => {
    obj[record.id] = record;
  });
  return obj;
}
