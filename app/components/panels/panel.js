// @flow
import React, {Component, PropTypes} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles/panelStyle';

// Example
// <Panel
//   header='Text...'
// />

export default class Panel extends Component {
  static propTypes = {
    header: PropTypes.string,
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    touchStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    onPress: PropTypes.func,
    children: React.PropTypes.any
  };

  constructor(props) {
    super(props);
  }

  renderHeader(data) {
    if (!data) {
      return;
    }

    return (
      <Text style={styles.panelHeader}>{data.toUpperCase()}</Text>
    );
  }

  renderPanel() {
    return (
      <View style={[styles.panel, this.props.style]}>
        {this.renderHeader(this.props.header)}
        {this.props.children}
      </View>
    );
  }

  renderTouchPanel() {
    return (
      <TouchableOpacity style={this.props.touchStyle} onPress={this.props.onPress}>
        {this.renderPanel()}
      </TouchableOpacity>
    );
  }

  render() {
    if (this.props.onPress) {
      return this.renderTouchPanel();
    } else {
      return this.renderPanel();
    }
  }
}
