// @flow
import React, {Component, PropTypes} from 'react';
import {View, Text, Image, ListView, ScrollView, KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import Moment from 'moment'
import API from '../../services/api';

// Components
import Panel from '../../components/panels/panel';
import ChatInput from '../../components/chat-component/chatInput';
import InvertibleScrollView from 'react-native-invertible-scroll-view';

// Styles
import styles from './styles/messagingMessagesScreenStyle';
import {Colors} from '../../theme/';

class MessagingMessagesScreen extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    token: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.string,
    navigation: PropTypes.object
  };

  static navigationOptions = () => ({tabBarVisible: false});

  state : {
    dataSource: Object,
    text: String
  }

  dataObjects = [];
  usersData = JSON.parse(this.props.user);

  api : Object
  ws : Object
  pingInterval : Function

  constructor(props : Object) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };

    this.api = API.create(this.props.token);
    this.progId = this.props.navigation.state.params.progId;
    this.threadId = this.props.navigation.state.params.threadId;
  }

  componentDidMount() {
    this.fetchMessages();

    // experimental WebSocket

    this.ws = new WebSocket();

    this.ws.onopen = () => {};

    this.ws.onmessage = (event) => {
      // //TODO no data !?
      // console.log('onmessage', event);
      // if (event.data && event.data.messages) {
      //   let data = JSON.parse(event.data.messages[0]);
      //   if (data.thread_id === this.threadId) {
      //     this.recieveMessage(data);
      //   }
      // }
      this.fetchMessages();
    };

    this.ws.onerror = () => {};

    this.pingInterval = setInterval(() => {
      if (this.ws.readyState && this.ws.readyState === 1) {
        this.ws.send(JSON.stringify({command: 'PING'}));
      }
    }, 60 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.pingInterval);
    this.ws.close();
  }

  fetchMessages() {
    this.api.getMessages(this.progId, this.threadId).then((response) => {
      if (response.ok) {
        this.dataObjects = response.data.messages;
        let rows = this.dataObjects;
        let rowIds = rows.map((row, index) => index);

        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(rows, rowIds)
        });
      }
    });
  }

  sendMessage(data) {
    this.ws.send(JSON.stringify({body: data, thread_id: this.threadId}));
  }

  recieveMessage(message) {
    this.dataObjects.push({avatar_image_url: message.avatar_image_url, first_name: message.first_name, last_name: message.last_name, org_name: message.org_name, body: message.body});

    let rows = this.dataObjects;
    let rowIds = rows.map((row, index) => index);

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(rows, rowIds)
    });
  }

  panelBorderColor(id) {
    return this.usersData.id !== id ? {borderColor: Colors.slightGrey, flex: 2} : {borderColor: Colors.brandBlue, flex: 1};
  }

  _renderRow(msg) {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        {this.usersData.id !== msg.participant_id &&
          <Image style={styles.avatarLeft} source={{
            uri: msg.avatar_image_url
          }}></Image>
        }
        <Panel style={this.panelBorderColor(msg.participant_id)}>
          <View style={styles.header}>
            <Text style={styles.name}>{msg.first_name} {msg.last_name} at {msg.org_name}</Text>
          </View>
          <Text style={styles.date}>{Moment(msg.date).format('lll')}</Text>
          <Text style={styles.body}>{msg.body}</Text>
        </Panel>
        {this.usersData.id === msg.participant_id &&
          <Image style={styles.avatarRight} source={{
            uri: msg.avatar_image_url
          }}></Image>
        }
      </View>
    );
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={64} style={styles.container}>
        <ListView renderScrollComponent={props => <InvertibleScrollView {...props} inverted/>} style={[styles.section, {paddingTop: 10}]} dataSource={this.state.dataSource} renderRow={(msg) => this._renderRow(msg)} enableEmptySections/>
        <ChatInput placeholder="Type a message..." onPress={(text) => this.sendMessage(text)}/>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state) => ({isAuthenticated: state.login.isAuthenticated, token: state.login.token, user: state.login.user});

export default connect(mapStateToProps)(MessagingMessagesScreen);
