// @flow
import {StyleSheet} from 'react-native';
import {Colors} from '../../theme/';

export default StyleSheet.create({
  navIconContainer: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  navIcon: {
    color: Colors.white
  },
  navIconLeft: {
    // height: 20,
    marginLeft: 10,
    marginRight: 22,
    marginVertical: 12
  },
  navIconRight: {
    // height: 20,
    marginLeft: 22,
    marginRight: 10,
    marginVertical: 12
  }
});
