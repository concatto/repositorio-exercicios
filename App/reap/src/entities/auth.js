import { performApiRequest, performProtectedRequest } from './entityUtils';
import { started, succeeded, failed } from '../asyncOperations'
import { storeItem, TokenKey } from '../browserStorage';
import { NOOP, LOG } from '../utils';

const actions = {
  login: (username, password) => dispatch => {
    const data = {username, password};

    performApiRequest(dispatch, "post", Auth, "login", "authenticate", data).then(res => {
      storeItem(TokenKey, res.data.token, false);
      dispatch(actions.tryLoggingFromStorage());
    }).catch(LOG);
  },

  tryLoggingFromStorage: () => dispatch => {
    performProtectedRequest(dispatch, "get", Auth, "loginFromStorage", "user").catch(NOOP);
  }
};

const Auth = {
  key: "auth",
  actions: actions,
  actionNames: {
    login: "LOGIN",
    loginFromStorage: "LOGIN_FROM_STORAGE"
  }
};

const initialState = {
  user: undefined,
  authenticated: undefined,
};

export const reducer = (state = initialState, action) => {
  const { login, loginFromStorage } = Auth.actionNames;

  switch (action.type) {
    case started(loginFromStorage):
      return {authenticated: undefined};
    case succeeded(loginFromStorage):
      return {authenticated: true, user: action.payload};
    case failed(loginFromStorage):
      return {authenticated: false};
    default:
      return state;
  }
}

export default Auth;
