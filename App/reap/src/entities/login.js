import { performApiRequest, performProtectedRequest } from './entityUtils';
import { storeItem, TokenKey } from '../browserStorage';
import { NOOP, LOG } from '../utils';

const actions = {
  login: (username, password) => dispatch => {
    const data = {username, password};

    performApiRequest(dispatch, "post", Login, "login", "authenticate", data).then(res => {
      storeItem(TokenKey, res.data.token, false);
      dispatch(actions.tryLoggingFromStorage());
    }).catch(LOG);
  },

  tryLoggingFromStorage: () => dispatch => {
    performProtectedRequest(dispatch, "get", Login, "loginFromStorage", "user").catch(NOOP);
  }
};

const Login = {
  key: "auth",
  actions: actions,
  actionNames: {
    login: "LOGIN",
    loginFromStorage: "LOGIN_FROM_STORAGE"
  }
};

const initialState = {
  data: {}
};

export const reducer = (state = initialState, action) => {
  const { login } = Login.actionNames;

  switch (action.type) {
    case login + "_SUCCEEDED":
      return state;
    default:
      return state;
  }
}

export default Login;
