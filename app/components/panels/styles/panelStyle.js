// @flow
import {StyleSheet} from 'react-native';
import {MainStyles, Metrics, Colors} from '../../../theme/';

export default StyleSheet.create({
  panel: {
    backgroundColor: Colors.white,
    borderRadius: Metrics.buttonRadius,
    borderWidth: 1,
    borderColor: Colors.slightGrey,
    padding: 10,
    marginTop: 10
  },
  panelHeader: {
    ...MainStyles.panelHeader
  }
});
