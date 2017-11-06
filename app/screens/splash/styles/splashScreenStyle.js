// @flow
import {StyleSheet} from 'react-native';
import {MainStyles, Colors} from '../../../theme/';

export default StyleSheet.create({
  ...MainStyles.screen,
  activityIndicator: {
    ...MainStyles.activityIndicator,
    top: 240,
    backgroundColor: 'transparent'
  },
  loginContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.brandBlue
  },
  loginLogo: {
    width: 172,
    height: 172,
    overflow: 'visible'
  }
});
