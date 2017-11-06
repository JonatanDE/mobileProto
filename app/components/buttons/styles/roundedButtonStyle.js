// @flow
import {StyleSheet} from 'react-native';
import {Fonts, Metrics} from '../../../theme/';

export default StyleSheet.create({
  button: {
    height: 36,
    borderWidth: 1,
    borderRadius: Metrics.buttonRadius,
    marginHorizontal: Metrics.section,
    marginVertical: Metrics.baseMargin,
    justifyContent: 'center'
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    marginVertical: Metrics.baseMargin
  }
});
