//@flow
import {persistStore} from "redux-persist";
import {Alert} from 'react-native';
import API from '../services/api';

export const LOGIN_PROCESS = 'login.process';
export const LOGIN_SUCCESS = 'login.success';
export const LOGIN_FAILURE = 'login.failure';
export const LOGOUT_SUCCESS = 'logout.success';

export const login = (username, password) => {
  return dispatch => {
    dispatch(loginProcess());

    this.api = API.create();

    let userFields = {
      username: username,
      password: password
    };

    this.api.login(userFields).then((response) => {

      if (response.ok) {
        this.api.me(response.data.access_token).then((responseUser) => {
          dispatch(loginSuccess(response.data.access_token, JSON.stringify(responseUser.data)));
        });
      } else {
        Alert.alert('Auth failure', response.data.error || response.data.errors.username[0] || response.data.errors.password[0]);
        dispatch(loginFailure());
      }

    }, (reject) => {
      Alert.alert('Error', reject);
    });
  };
};

export const logout = (token) => {
  return dispatch => {
    this.api = API.create(token);
    this.api.logout().then(() => {});
    dispatch(logoutSuccess());
  };
};

const loginProcess = () => {
  return {type: LOGIN_PROCESS};
};

const loginSuccess = (token, user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      token,
      user
    }
  };
};

const loginFailure = (error) => {
  return {type: LOGIN_FAILURE, payload: {
      error
    }};
};

const logoutSuccess = () => {
  return {type: LOGOUT_SUCCESS};
};
