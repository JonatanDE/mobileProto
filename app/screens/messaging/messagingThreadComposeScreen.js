import React, {Component, PropTypes} from 'react';
import {View, Text, Image, ScrollView, ListView} from 'react-native';
import {connect} from 'react-redux';
import API from '../../services/api';

// Components
import ChatInput from '../../components/chat-component/chatInput';

// Styles
import styles from './styles/messagingThreadComposeScreenStyle';

class MessagingThreadComposeScreen extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    token: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    prog_id: PropTypes.number
  };

  api : Object

  constructor(props) {
    super(props);

    // this.state = {
    //   dataSource: new ListView.DataSource({
    //     rowHasChanged: (row1, row2) => row1 !== row2
    //   }),
    //   refreshing: false
    // };

    this.api = API.create(this.props.token);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.section}>
          <Text>Compose new message...</Text>
        </View>
        <ChatInput placeholder="Type a message..." onPress={(text) => this.sendMessage(text)}/>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({isAuthenticated: state.login.isAuthenticated, token: state.login.token, user: state.login.user});

export default connect(mapStateToProps)(MessagingThreadComposeScreen);
