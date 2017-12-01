import axios from 'axios';

export const SUBSCRIPTION_SUCESSESS = "SUBSCRIPTION_SUCESSESS";
export const SUBSCRIPTION_FAIL = "SUBSCRIPTION_FAIL";

export const handleSubscription = (informations, callback) => {

  const URL = "http://localhost:4000/api/user/";
  const request = axios.post(URL, informations);

    return (dispatch) => {
      request.then((data) => {
        dispatch({
          type: SUBSCRIPTION_SUCESSESS,
          payload: true
        });
        callback(true, data)
      }).catch((err) => {
        dispatch({
          type: SUBSCRIPTION_FAIL,
          payload: false
        });
        callback(false, err);
      });

    }
}
