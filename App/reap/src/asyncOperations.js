import axios from 'axios';

const path = "http://localhost:4000";

export const performRequest = (dispatch, method, data, name, url, headers) => {
  const dataKey = ["POST", "PUT", "PATCH"].includes(method.toUpperCase()) ? "data" : "params";
  const config = {
    method,
    headers,
    [dataKey]: data,
    url: path + url,
  };

  dispatch({type: name + "_STARTED", payload: config});
  return axios(config).then(response => {
      dispatch({type: name + "_SUCCEEDED", payload: response.data});

      return response;
  }).catch(err => {
      dispatch({type: name + "_FAILED", payload: err});

      throw err;
  });
};
