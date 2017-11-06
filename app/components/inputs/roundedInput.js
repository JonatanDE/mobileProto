// @flow
import React from 'react';
import {TextInput} from 'react-native';
import styles from './styles/roundedInputStyle';

// Example
// <RoundedInput
//   placeholder='Text...'
//   style={styles}
// />

type RoundedInputProps = {
  placeholder: string,
  type?: string,
  style?: Object,
  onFocus: () => void,
  onChange: () => void
};

export default class RoundedInput extends React.Component {
  props : RoundedInputProps

  getType() {
    let inputType = false;

    if (this.props.type) {
      inputType = true;
    }

    return inputType;
  }

  render() {
    return (<TextInput {...this.props} style={[this.props.style, styles.input]} placeholder={this.props.placeholder} onFocus={this.props.onFocus} onChange={this.props.onChange} secureTextEntry={this.getType()}/>);
  }
}
