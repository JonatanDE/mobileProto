// @flow
import React, {Component, PropTypes} from 'react';
import {View, Text} from 'react-native';
import styles from './styles/staticTagsStyle';
// import {Buttons} from '../theme/';

// Example
// <StaticTags
//   array={array}
// />

export default class StaticTags extends Component {
  static propTypes = {
    array: PropTypes.array
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {array} = this.props;
    let renderedTags;
    if (array !== undefined && array !== null) {
      renderedTags = array.map((value, index) => {
        return (
          <View style={styles.tagsContainer} key={index}>
            <Text style={styles.tagsText}>{value.toUpperCase()}</Text>
          </View>
        );
      });
    }

    return (
      <View style={styles.tags}>
        {renderedTags}
      </View>
    );
  }
}
