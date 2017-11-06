import {LOGIN_PROCESS, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS} from '../actions/loginActions';

function login(state = {
  isLoggingIn: false,
  isAuthenticated: false,
  token: null,
  user: null
}, action) {
  switch (action.type) {
    case LOGIN_PROCESS:
      return {
        isLoggingIn: true,
        isAuthenticated: false
      };
    case LOGIN_SUCCESS:
      return {
        isLoggingIn: false,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user
      };
    case LOGIN_FAILURE:
      return {
        isLoggingIn: false,
        isAuthenticated: false,
        error: action.error
      };
    case LOGOUT_SUCCESS:
      return {
        isLoggingIn: false,
        isAuthenticated: false,
        token: null,
        user: null
      };
    default:
      return state;
  }
}

export default login;
