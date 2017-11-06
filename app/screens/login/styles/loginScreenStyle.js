// @flow
import {StyleSheet} from 'react-native';
import {MainStyles} from '../../../theme/';

export default StyleSheet.create({
  ...MainStyles.screen,
  activityIndicator: {
    ...MainStyles.activityIndicator
  },
  loginContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 40
  },
  loginLogo: {
    width: 172,
    height: 172,
    overflow: 'visible'
  },
  emailInput: {
    marginHorizontal: 30,
    marginTop: 70
  },
  passInput: {
    marginHorizontal: 30,
    marginTop: 10
  },
  signinButton: {
    marginTop: 20,
    width: 100,
    height: 40
  },
  terms: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'transparent',
    width: 320
  },
  termsText: {
    fontSize: 10,
    color: 'rgba(255,255,255,.7)',
    paddingTop: 20
  }
});
