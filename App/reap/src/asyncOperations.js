import axios from 'axios';

const path = "http://localhost:4000";

export const started = (name) => name + "_STARTED";
export const succeeded = (name) => name + "_SUCCEEDED";
export const failed = (name) => name + "_FAILED";

export const performRequest = (dispatch, method, data, name, url, headers) => {
  const dataKey = ["POST", "PUT", "PATCH"].includes(method.toUpperCase()) ? "data" : "params";
  const config = {
    method,
    headers,
    [dataKey]: data,
    url: path + url,
  };

  dispatch({type: started(name), payload: config});
  return axios(config).then(response => {
      dispatch({type: succeeded(name), payload: response.data});

      return response;
  }).catch(err => {
      dispatch({type: failed(name), payload: err});

      throw err;
  });
};
