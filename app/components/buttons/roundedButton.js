// @flow
import React, {Component, PropTypes} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './styles/roundedButtonStyle';
import {Buttons} from '../../theme/';

// Example
// <RoundedButton
//   text='Text...'
//   type='key'
//   style={styles}
//   onPress={() => window.alert('Button pressed!')}
// />

export default class RoundedButton extends Component {
  static propTypes = {
    text: PropTypes.string,
    type: PropTypes.oneOf(['primary', 'key', 'confirm']),
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    disabled: PropTypes.bool,
    onPress: PropTypes.func
  };

  buttonTypeStyle = {
    btnStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    btnStyleText: PropTypes.oneOfType([PropTypes.number, PropTypes.object])
  };

  constructor(props) {
    super(props);

    this.getType(props.type);
  }

  getType(data) {
    let btnType = data || 'primary';
    switch (btnType) {
      case 'key':
        this.buttonTypeStyle.btnStyle = Buttons.key;
        this.buttonTypeStyle.btnStyleText = Buttons.keyText;
        break;
      case 'confirm':
        this.buttonTypeStyle.btnStyle = Buttons.confirm;
        this.buttonTypeStyle.btnStyleText = Buttons.confirmText;
        break;
      default:
        this.buttonTypeStyle.btnStyle = Buttons.primary;
        this.buttonTypeStyle.btnStyleText = Buttons.primaryText;
    }
  }

  render() {
    const {text, style, onPress} = this.props;
    return (
      <TouchableOpacity style={[styles.button, style, this.buttonTypeStyle.btnStyle]} onPress={onPress}>
        <Text style={[styles.buttonText, this.buttonTypeStyle.btnStyleText]}>{text}</Text>
      </TouchableOpacity>
    );
  }
}
