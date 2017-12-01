import { performRequest } from "../asyncOperations";

export const loadAll = (dispatch, entity, path) => {
  performApiRequest(dispatch, "get", entity, "loadAll", path);
}

export const create = (dispatch, entity, path, data) => {
  performApiRequest(dispatch, "post", entity, "create", path, data);
}

export const login = (dispatch, entity, path, data) => {
  performApiRequest(dispatch, "post", entity, "login", path, data);
}

const performApiRequest = (dispatch, method, entity, actionName, path, data = {}) => {
  if (!path) {
    path = entity.key;
  }

  performRequest(dispatch, method, data, entity.actionNames[actionName], "/api/" + path);
}

export const toObject = (resultSet) => {
  const obj = {};
  resultSet.forEach(record => {
    obj[record.id] = record;
  });
  return obj;
}
