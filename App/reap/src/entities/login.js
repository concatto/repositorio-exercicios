import {login} from './entityUtils';

const Login = {
  key: "authenticate",
  actions: {
    login: (user, password) => dispatch => {
      login(dispatch, Login, "authenticate", {user, password});
    }
  },
  actionNames: {
    login: "LOGIN",
  }
};

const initialState = {
  data: {}
};

export const reducer = (state = initialState, action) => {
  const { login } = Login.actionNames;

  switch (action.type) {
    case login + "_SUCCEEDED":
      return true;
    default:
      return state;
  }
}

export default Login;
