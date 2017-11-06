// @flow
import {StyleSheet} from 'react-native';
import {MainStyles, Colors, Metrics} from '../../../theme/';

export default StyleSheet.create({
  ...MainStyles.screen,
  programContainer: {
    flexDirection: 'row',
  },
  programTitle: {
    color: Colors.brandBlue,
    fontWeight: 'bold'
  },
  programStatusIcon: {
    width: 20,
    height: 20,
    marginRight: 8
  }
});
