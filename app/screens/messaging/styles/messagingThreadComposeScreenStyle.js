// @flow
import {StyleSheet} from 'react-native';
import {MainStyles, Colors, Metrics} from '../../../theme/';

export default StyleSheet.create({
  ...MainStyles.screen,
  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  name: {
    paddingLeft: 5,
    fontWeight: 'bold',
    color: Colors.mediumGrey
  },
  body: {
    paddingTop: 10,
    color: Colors.mediumGrey
  }
});
