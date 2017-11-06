// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts} from '../../../theme';

export default StyleSheet.create({
  chatInputContainer: {
    flexDirection: 'row',
    height: Metrics.navBarHeight,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.slightGrey,
    padding: 10
  },
  chatInput: {
    flex:3,
    ...Fonts.style.description
  },
  chatInputButton: {
    flex:1,
    color: Colors.brandBlue,
    textAlign: 'right',
    paddingTop: 5
  }
});
