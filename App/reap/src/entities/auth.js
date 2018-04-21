import { performApiRequest, performProtectedRequest, createOptions } from './entityUtils';
import { started, succeeded, failed } from '../asyncOperations';
import { storeItem, removeItem, TokenKey } from '../browserStorage';
import { NOOP, LOG } from '../utils';

const Auth = {
  key: 'auth',
  actionNames: {
    login: 'LOGIN',
    loginFromStorage: 'LOGIN_FROM_STORAGE',
  },
};

Auth.actions = {
  login: (username, password, persist) => dispatch => {
    const data = {username, password};

    performApiRequest(dispatch, createOptions('post', Auth, 'login', 'authenticate', data)).then(res => {
      storeItem(TokenKey, res.data.token, !persist);
      dispatch(Auth.actions.tryLoggingFromStorage());
    }).catch(LOG);
  },

  logout: () => dispatch => {
    removeItem(TokenKey, 'both');
    dispatch({type: 'LOGOUT'});
  },

  tryLoggingFromStorage: () => dispatch => {
    performProtectedRequest(dispatch, createOptions('get', Auth, 'loginFromStorage', 'user')).catch(NOOP);
  },
};

export const States = {
  Logging: 'LOGGING',
  Dormant: 'DORMANT',
  Failed: 'FAILED',
};

const initialState = {
  user: undefined,
  loginState: States.Dormant,
  authenticated: undefined,
};

export const reducer = (state = initialState, action) => {
  const { login, loginFromStorage } = Auth.actionNames;

  switch (action.type) {
  case started(login):
    return {...state, loginState: States.Logging};
  case succeeded(login):
    return {...state, loginState: States.Dormant};
  case failed(login):
    return {...state, loginState: States.Failed};

  case started(loginFromStorage):
    return {authenticated: undefined};
  case succeeded(loginFromStorage):
    return {authenticated: true, user: action.payload};
  case failed(loginFromStorage):
    return {authenticated: false};
  default:
    return state;
  }
};

export default Auth;
