// @flow
import {StyleSheet} from 'react-native';
import {MainStyles, Colors, Metrics} from '../../../theme/';

export default StyleSheet.create({
  ...MainStyles.screen,
  company: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain'
  },
  title: {
    paddingLeft: 5,
    fontWeight: 'bold',
    color: Colors.brandBlue
  },
  tagsContainer: {
    marginTop: 5
  }
});
