// @flow
import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from './styles/chatInputStyle';

// Example
// <ChatInput
//   placeholder='Text...'
//   style={styles}
// />

type ChatInputProps = {
  placeholder: string,
  style?: Object,
  onPress: () => void
};

export default class ChatInput extends React.Component {
  state : {
    dataMessage: String
  }
  props : ChatInputProps

  updateText(text) {
    this.setState(() => {
      return {dataMessage: text};
    });
  }

  sendText() {
    this.props.onPress(this.state.dataMessage);
    this._textInput.setNativeProps({text: ''});
  }

  render() {
    return (
      <View style={[this.props.style, styles.chatInputContainer]}>
        <TextInput multiline={true} ref={component => this._textInput = component} style={styles.chatInput} placeholder={this.props.placeholder} onChange={(event) => this.updateText(event.nativeEvent.text)}/>
        <TouchableOpacity onPress={() => this.sendText()}>
          <Text style={styles.chatInputButton}>Send</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
