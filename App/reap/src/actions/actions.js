import axios from 'axios';

export const SUBSCRIPTION_SUCCESS = "SUBSCRIPTION_SUCCESS";
export const SUBSCRIPTION_FAIL = "SUBSCRIPTION_FAIL";

export const handleSubscription = (informations) => {

  const URL = "http://localhost:4000/api/user/";
  const request = axios.post(URL, informations);

    return (dispatch) => {
      request.then((data) => {
        dispatch({
          type: SUBSCRIPTION_SUCCESS,
          payload: true
        });
      }).catch((err) => {
        dispatch({
          type: SUBSCRIPTION_FAIL,
          payload: false
        });
      });

    }
}
