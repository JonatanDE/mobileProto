// @flow
import React, {Component, PropTypes} from 'react';
import {ActivityIndicator, View, Image, Text, Keyboard, TouchableWithoutFeedback, Alert} from 'react-native';
import {connect} from 'react-redux';

// Actions
import * as loginActions from '../../actions/loginActions';

// Components
import RoundedButton from '../../components/buttons/roundedButton';
import RoundedInput from '../../components/inputs/roundedInput';

// Styles
import styles from './styles/loginScreenStyle';
import images from '../../theme/images';

class LoginScreen extends Component {
  static propTypes = {
    isLoggingIn: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
    token: PropTypes.string,
    dispatch: PropTypes.func.isRequired
  };

  state : {
    username: String,
    password: String,
    grant_type: String,
    client_id: Number
  }

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  setUsername(text) {
    this.setState(() => {
      return {username: text};
    });
  }

  setPassword(text) {
    this.setState(() => {
      return {password: text};
    });
  }

  loginToApp() {
    if (this.state.username && this.state.password) {
      this.props.dispatch(loginActions.login(this.state.username, this.state.password));
    } else {
      Alert.alert('Type Login and Password');
    }
  }

  render() {
    const activityIndicator = () => {
      if (this.props.isLoggingIn) {
        return (<ActivityIndicator size="large" color="#0079A5" style={styles.activityIndicator}/>);
      }
    };

    return (
      <Image source={images.loginBg} style={styles.backgroundImage}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginContainer}>
            <Image source={images.logo} style={styles.loginLogo}/>
            <RoundedInput placeholder="email address" value={this.state.username} style={styles.emailInput} onChange={(event) => this.setUsername(event.nativeEvent.text)} keyboardType="email-address" autoCapitalize="none"/>
            <RoundedInput placeholder="password" style={styles.passInput} type="password" onChange={(event) => this.setPassword(event.nativeEvent.text)}/>
            <RoundedButton text="Sign In" style={styles.signinButton} type="key" onPress={() => this.loginToApp()}/>
          </View>
        </TouchableWithoutFeedback>
        {activityIndicator()}
      </Image>
    );
  }
}

const mapStateToProps = (state) => ({isLoggingIn: state.login.isLoggingIn, isAuthenticated: state.login.isAuthenticated, token: state.login.token, user: state.login.user});

export default connect(mapStateToProps)(LoginScreen);
