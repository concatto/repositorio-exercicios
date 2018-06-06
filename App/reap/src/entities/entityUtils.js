import { performRequest, failed } from '../asyncOperations';
import { retrieveItem, TokenKey } from '../browserStorage';

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
export const performApiRequest = (dispatch, options) => {
  return performRequest(dispatch, {
    method: options.method || 'get',
    data: options.data || {},
    headers: options.headers || {},
    url: '/api/' + (options.path || options.entity.key),
    name: options.entity.actionNames[options.actionName],
  });
};

// Same as performApiRequest(), but with Authorization.
export const performProtectedRequest = (dispatch, options) => {
  const token = retrieveItem(TokenKey);

  if (token === null) {
    const name = options.entity.actionNames[options.actionName];

    dispatch({type: failed(name)});
    return Promise.reject('Token is null');
  }

  const headers = {...options.headers, Authorization: `Bearer ${token}`};
  return performApiRequest(dispatch, {...options, headers});
};


const chooseAndPerformRequest = (dispatch, options, restricted = true) => {
  if (restricted === true) {
    return performProtectedRequest(dispatch, options);
  }

  return performApiRequest(dispatch, options);
};

export const createOptions = (method, entity, actionName, path, data, headers) => ({
  method, entity, actionName, path, data, headers,
});

export const load = (dispatch, entity, path, restricted = true) => {
  const options = createOptions('get', entity, 'load', path, {}, {});
  return chooseAndPerformRequest(dispatch, options, restricted);
};

export const loadAll = (dispatch, entity, path, restricted = true) => {
  const options = createOptions('get', entity, 'loadAll', path, {}, {});
  return chooseAndPerformRequest(dispatch, options, restricted);
};

export const create = (dispatch, entity, path, data, restricted = true) => {
  const options = createOptions('post', entity, 'create', path, data, {});
  return chooseAndPerformRequest(dispatch, options, restricted);
};

export const invite = (dispatch, entity, path, data, restricted = true) => {
		  console.log('WAIT A MINUTEEEEEEEEEEE');
	  console.log(data);
	const options = createOptions('post', entity, 'inviteAll', path, data, {});
	return chooseAndPerformRequest(dispatch, options, restricted);
};
