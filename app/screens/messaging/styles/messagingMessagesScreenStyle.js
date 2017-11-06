// @flow
import {StyleSheet} from 'react-native';
import {MainStyles, Colors, Metrics} from '../../../theme/';

export default StyleSheet.create({
  ...MainStyles.screen,
  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatarLeft: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginTop: 10,
    marginRight: 5
  },
  avatarRight: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginTop: 10,
    marginLeft: 5
  },
  name: {
    fontWeight: 'bold',
    color: Colors.mediumGrey
  },
  body: {
    paddingTop: 10,
    color: Colors.mediumGrey
  },
  date: {
    color: Colors.lightGrey
  }
});
