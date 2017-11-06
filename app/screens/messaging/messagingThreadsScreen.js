// @flow
import React, {Component, PropTypes} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ListView,
  PushNotificationIOS,
  RefreshControl
} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import API from '../../services/api';

// Components
import Panel from '../../components/panels/panel';
import StaticTags from '../../components/elements/staticTags';

// Styles
import styles from './styles/messagingThreadsScreenStyle';

class MessagingThreadsScreen extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    token: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.object
  };

  state : {
    dataSource: Object,
    refreshing: Boolean
  }

  api : Object

  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      refreshing: false
    };

    this.api = API.create(this.props.token);
    this.progId = this.props.navigation.state.params.progId;
  }

  componentWillMount() {
    PushNotificationIOS.addEventListener('register', () => {});
    PushNotificationIOS.checkPermissions((permissions) => {
      if (permissions.badge === 0) {
        PushNotificationIOS.requestPermissions();
      }
    });
  }

  componentWillUnmount() {
    PushNotificationIOS.removeEventListener('register', () => {});
    PushNotificationIOS.cancelAllLocalNotifications();
  }

  componentDidMount() {
    this.fetchTreads();
    PushNotificationIOS.cancelAllLocalNotifications();
    PushNotificationIOS.scheduleLocalNotification(
      {
        alertBody: 'You have received new messages...',
        repeatInterval: 'minute'
      }
    );
  }

  fetchTreads() {
    this.setState({refreshing: true});

    this.api.getThreads(this.progId).then((response) => {
      if (response.ok) {
        var rows = response.data.threads;
        var rowIds = rows.map((row, index) => index).reverse();

        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(rows, rowIds),
          refreshing: false
        });
        PushNotificationIOS.setApplicationIconBadgeNumber(rows.length);
      }
    });
  }

  goToMessages(thread) {
    this.props.dispatch(NavigationActions.navigate({
      routeName: 'Messages',
      params: {
        thread: thread.metadata.company_name,
        progId: this.progId,
        threadId: thread.thread_id
      }
    }));
  }

  _onRefresh() {
    this.fetchTreads();
  }

  _renderRow(thread) {
    let logo = thread.metadata.company_logo;
    if (!logo.match('http*')) {
      logo = `https://s3.amazonaws.com/dev-profile-service-imgx-out/profile-service/logo/250x250/${thread.metadata.company_logo}`;
    }

    return (
      <Panel onPress={() => this.goToMessages(thread)}>
        <View style={styles.company}>
          <Image style={styles.logo} source={{
            uri: logo
          }}/>
          <Text style={styles.title}>
            {thread.metadata.company_name}
          </Text>
        </View>
        <View style={styles.tagsContainer}>
          <StaticTags array={thread.metadata.topics}/>
        </View>
      </Panel>
    );
  }

  render() {
    return (
      <View style={[styles.container, styles.containerScroll]}>
        <ListView refreshControl={< RefreshControl refreshing = {
          this.state.refreshing
        }
        onRefresh = {
          () => this._onRefresh()
        } />} renderScrollComponent={props => <ScrollView {...props}/>} style={styles.section} dataSource={this.state.dataSource} renderRow={(thread) => this._renderRow(thread)} removeClippedSubviews={false} enableEmptySections/>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({isAuthenticated: state.login.isAuthenticated, token: state.login.token});

export default connect(mapStateToProps)(MessagingThreadsScreen);
