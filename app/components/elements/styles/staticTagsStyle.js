// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts} from '../../../theme/';

export default StyleSheet.create({
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: -Metrics.baseMargin
  },
  tagsContainer: {
    height: 20,
    marginRight: Metrics.baseMargin,
    marginBottom: Metrics.baseMargin,
    borderRadius: Metrics.buttonRadius,
    backgroundColor: Colors.paleGrey,
    padding: 3
  },
  tagsText: {
    fontSize: Fonts.size.small,
    fontWeight: '600',
    textAlign: 'center',
  }
});
