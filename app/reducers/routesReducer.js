// @flow
import {LOGIN_SUCCESS, LOGOUT_SUCCESS} from '../actions/loginActions';
import {REHYDRATE} from "redux-persist/constants";
import {NavigationActions} from 'react-navigation';
import {AppNavigator} from '../navigation/navigationRouter';

const initialNavState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Splash'));

function nav(state = initialNavState, action = {}) {
  let nextState;
  switch (action.type) {
    case LOGIN_SUCCESS:
      nextState = AppNavigator.router.getStateForAction(NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'Main'})]
      }), state);
      break;
    case LOGOUT_SUCCESS:
      nextState = AppNavigator.router.getStateForAction(NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'Login'})]
      }));
      break;
    case REHYDRATE:
      action.payload.nav = null;
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  return nextState || state;
}

export default nav;
