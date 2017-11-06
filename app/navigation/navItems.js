// @flow
import React, {Component, PropTypes} from 'react';
import {TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome';

// Actions
import * as loginActions from '../actions/loginActions';

// Styles
import styles from './styles/navItemsStyle';
import {Metrics} from '../theme/';

class NavItems extends Component {
  static propTypes = {
    type: PropTypes.string,
    onPress: PropTypes.func,
    dispatch: PropTypes.func.isRequired,
    token: PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  backButton() {
    const backAction = NavigationActions.back();

    return (
      <TouchableOpacity style={styles.navIconContainer} onPress={() => this.props.dispatch(backAction)}>
        <Icon name='chevron-left' size={Metrics.icons.nav} style={[styles.navIcon, styles.navIconLeft]}/>
      </TouchableOpacity>
    );
  }

  logoutButton() {
    const logout = () => {
      this.props.dispatch(loginActions.logout(this.props.token));
    };

    return (
      <TouchableOpacity style={styles.navIconContainer} onPress={() => logout()}>
        <Icon name='power-off' size={Metrics.icons.nav} style={[styles.navIcon, styles.navIconRight]}/>
      </TouchableOpacity>
    );
  }

  composeThread(callback : Function) {
    return (
      <TouchableOpacity style={styles.navIconContainer} onPress={callback}>
        <Icon name='edit' size={Metrics.icons.nav} style={[styles.navIcon, styles.navIconRight]}/>
      </TouchableOpacity>
    );
  }

  searchButton() {
    const action = NavigationActions.navigate({
      routeName: 'DiscoverFilter'});

    return (
      <TouchableOpacity style={styles.navIconContainer} onPress={() => this.props.dispatch(action)}>
        <Icon name='search' size={Metrics.icons.nav} style={[styles.navIcon, styles.navIconRight]}/>
      </TouchableOpacity>
    );
  }

  render() {
    switch (this.props.type) {
      case 'backButton':
        return this.backButton();
      case 'logoutButton':
        return this.logoutButton();
      case 'composeThread':
        return this.composeThread();
      case 'searchButton':
        return this.searchButton();
      default:
        return this.backButton();
    }
  }

}

const mapStateToProps = (state) => ({isAuthenticated: state.login.isAuthenticated, token: state.login.token, user: state.login.user});

export default connect(mapStateToProps)(NavItems);
