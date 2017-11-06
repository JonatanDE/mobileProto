// @flow
import React, {Component, PropTypes} from 'react';
import {ActivityIndicator, View, Image} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import API from '../../services/api';

// Actions
import * as loginActions from '../../actions/loginActions';

// Styles
import styles from './styles/splashScreenStyle';
import images from '../../theme/images';

class SplashScreen extends Component {
  static propTypes = {
    appLoaded: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
    token: PropTypes.string,
    dispatch: PropTypes.func.isRequired
  };

  api : Object

  componentDidUpdate() {
    if(this.props.appLoaded && !this.props.isAuthenticated) {
      this._navigateTo('Login');
    } else if (this.props.appLoaded && this.props.isAuthenticated) {
      this.fetchOverview();
    }
  }

  fetchOverview() {
    this.api = API.create(this.props.token);
    this.api.overview().then((response) => {
      if (response.ok) {
        this._navigateTo('Main', response.data);
      } else {
        this.props.dispatch(loginActions.logout(this.props.token));
      }
    });
  }

  _navigateTo = (routeName: string, data: Object) => {
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({
        routeName: routeName,
        params: {
          overview: data
        }
      })]
    });

    this.props.dispatch(actionToDispatch);
  }

  render() {
    return (
      <View style={styles.loginContainer}>
        <Image source={images.logo} style={styles.loginLogo}/>
        <ActivityIndicator size="large" color="#FFFFFF" style={styles.activityIndicator}/>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({appLoaded: state.storage.storageLoaded, isAuthenticated: state.login.isAuthenticated, token: state.login.token});

export default connect(mapStateToProps)(SplashScreen);
