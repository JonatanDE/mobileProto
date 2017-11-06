// @flow
import React, {Component, PropTypes} from 'react';
import {View, StatusBar} from 'react-native';
import {connect} from 'react-redux';

import NavigationRouter from '../navigation/navigationRouter';

// Styles
import styles from './mobileProtoAppStyle';

class mobileProtoApp extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.appView}>
        <StatusBar barStyle="light-content"/>
        <NavigationRouter/>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({isAuthenticated: state.login.isAuthenticated});

export default connect(mapStateToProps)(mobileProtoApp);
