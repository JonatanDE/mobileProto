// @flow
import {StyleSheet} from 'react-native';
import {MainStyles, Colors, Metrics, Fonts} from '../../../theme/';

export default StyleSheet.create({
  ...MainStyles.screen,
  tiles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  tileContainer: {
    width: 170,
    height: 160,
    marginBottom: Metrics.baseMargin
  },
  tile: {
    width: 170,
    height: 160,
    alignItems: 'center'
  },
  tileText: {
    paddingTop: 5,
    textAlign: 'center',
    fontSize: Fonts.size.medium,
    fontWeight: '600',
    color: Colors.brandBlue
  },
  orgImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain'
  }
});
