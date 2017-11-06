// @flow
import React, {PropTypes} from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Metrics} from '../theme';

import styles from './styles/tabIconStyle';

const propTypes = {
  tint: PropTypes.string,
  iconName: PropTypes.string
};

const TabIcon = (props) => (
  <View style={styles.tab}>
    <Icon name={props.iconName} size={Metrics.icons.tabs} style={{color: props.tint}}/>
  </View>
);

TabIcon.propTypes = propTypes;

export default TabIcon;
