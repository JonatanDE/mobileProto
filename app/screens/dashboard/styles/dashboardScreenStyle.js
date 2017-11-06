// @flow
import {StyleSheet} from 'react-native';
import {MainStyles, Colors, Metrics} from '../../../theme/';

export default StyleSheet.create({
  ...MainStyles.screen,
  tiles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  tile: {
    width: 110,
    height: 110,
    borderRadius: Metrics.buttonRadius,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  tileIcon: {
    color: Colors.white,
    fontSize: Metrics.icons.medium,
    opacity: 0.85
  },
  tileNumber: {
    color: Colors.white,
    fontSize: Metrics.icons.medium
  },
  tileText: {
    color: Colors.white,
    textAlign: 'center'
  },
  tileBlue: {
    backgroundColor: Colors.brandBlue
  },
  tilePlum: {
    backgroundColor: Colors.plum
  },
  tileGreen: {
    backgroundColor: Colors.green
  },
  tileYellow: {
    backgroundColor: Colors.yellow
  },
  floorMap: {
    transform: [
      { rotateX: '70deg' },
      { rotateZ: '-45deg'}
    ]
  }
});
