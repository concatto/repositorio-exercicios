import { performApiRequest, performProtectedRequest } from './entityUtils';
import { storeItem, TokenKey } from '../browserStorage';

const actions = {
  login: (username, password) => dispatch => {
    performApiRequest(dispatch, "post", Login, "login", "authenticate", {username, password}).then(res => {
      dispatch(actions.tryLoggingFromStorage());
    });
  },

  tryLoggingFromStorage: () => dispatch => {
    performProtectedRequest(dispatch, "get", Login, "loginFromStorage", "user");
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
      storeItem(TokenKey, action.payload.token, false);
      return state;
    default:
      return state;
  }
}

export default Login;
