import axios from 'axios';

export const SUBSCRIPTION_SUCCESS = 'SUBSCRIPTION_SUCCEEDED';
export const SUBSCRIPTION_FAIL = 'SUBSCRIPTION_FAILED';
export const CONFIRMATION_SUCCESS = 'CONFIRMATION_SUCCESS';
export const CONFIRMATION_FAIL = 'CONFIRMATION_FAIL';
export const INVITE_SUCCESS = 'INVITE_SUCCESS';
export const INVITE_FAIL = 'INVITE_FAIL';

export const handleSubscription = informations => {
  const URL = 'http://localhost:4000/api/user/';
  const request = axios.post(URL, informations);

  return dispatch => {
    request.then(data => {
      dispatch({
        type: SUBSCRIPTION_SUCCESS,
        payload: true,
      });
    }).catch(err => {
      dispatch({
        type: SUBSCRIPTION_FAIL,
        payload: false,
      });
    });
  };
};

export const handleConfirmationToken = (information, callback) => {
  const URL = 'http://localhost:4000/api/user/verify';
  const request = axios.post(URL, information);

  return dispatch => {
    request.then(data => {
      dispatch({
        type: CONFIRMATION_SUCCESS,
        payload: true,
      });
      callback(true);
    }).catch(err => {
      dispatch({
        type: CONFIRMATION_FAIL,
        payload: false,
      });
      callback(false);
    });
  };
};

export const handleConfirmationInvite = (information, callback) => {
  const URL = 'http://localhost:4000/api/room/accept';
  const request = axios.post(URL, information);

  return dispatch => {
    request.then(data => {
      dispatch({
        type: INVITE_SUCCESS,
        payload: true,
      });
      callback(true);
    }).catch(err => {
      dispatch({
        type: INVITE_FAIL,
        payload: false,
      });
      callback(false);
    });
  };
};

export const handleChangePrivegies = informations => {
    const URL = 'http://localhost/api/';
    const request = axios.post(URL, informations);

    return dispatch => {
        request.then ( data => {
            dispatch({
                type: CONFIRMATION_SUCCESS,
                payload: true
            });
        }).catch(err => {
            dispatch({
               type: CONFIRMATION_FAIL,
                payload: false
            });
        })
    }
}
