import { performRequest } from "../asyncOperations";
import { retrieveItem, TokenKey } from "../browserStorage";

export const loadAll = (dispatch, entity, path) => {
  performApiRequest(dispatch, "get", entity, "loadAll", path);
}

export const create = (dispatch, entity, path, data) => {
  performApiRequest(dispatch, "post", entity, "create", path, data);
}

/**
 * Performs an API request using an entity.
 * @param {*} dispatch Redux's dispatch
 * @param {String} method the HTTP method to use
 * @param {*} entity an entity from this directory
 * @param {String} actionName the name of the call to be performed
 * @param {String} path the path of the request (will be prefixed with the URL and /api/)
 * @param {Object} [data={}] the data to be sent
 * @param {Object} [headers={}] the headers to be sent
 */
export const performApiRequest = (dispatch, method, entity, actionName, path, data = {}, headers = {}) => {
  if (!path) {
    path = entity.key;
  }

  return performRequest(dispatch, method, data, entity.actionNames[actionName], "/api/" + path, headers);
}

// Same as performApiRequest(), but with Authorization.
export const performProtectedRequest = (dispatch, method, entity, actionName, path, data = {}, headers = {}) => {
  const token = retrieveItem(TokenKey);
  headers["Authorization"] = `Bearer ${token}`;

  return performApiRequest(dispatch, method, entity, actionName, path, data, headers);
}

export const toObject = (resultSet) => {
  const obj = {};
  resultSet.forEach(record => {
    obj[record.id] = record;
  });
  return obj;
}
