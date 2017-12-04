import { performRequest, failed } from "../asyncOperations";
import { retrieveItem, TokenKey } from "../browserStorage";

export const load = (dispatch, entity, path, restricted = true) => {
  return chooseAndPerformRequest(dispatch, "get", entity, "load", path, {}, {}, restricted);
}

export const loadAll = (dispatch, entity, path, restricted = true) => {
  return chooseAndPerformRequest(dispatch, "get", entity, "loadAll", path, {}, {}, restricted);
}

export const create = (dispatch, entity, path, data, restricted = true) => {
  return chooseAndPerformRequest(dispatch, "post", entity, "create", path, data, {}, restricted);
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

  if (token === null) {
    const name = entity.actionNames[actionName];

    dispatch({type: failed(name)});
    return Promise.reject("Token is null");
  }

  headers["Authorization"] = `Bearer ${token}`;
  return performApiRequest(dispatch, method, entity, actionName, path, data, headers);
}


const chooseAndPerformRequest = (dispatch, method, entity, actionName, path, data, headers, restricted = true) => {
  const func = restricted ? performProtectedRequest : performApiRequest;

  return func(dispatch, method, entity, actionName, path, data, headers);
}
