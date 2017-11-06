// @flow
import React, {Component, PropTypes} from 'react';
import {View, ScrollView, ListView, Text, Image, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import API from '../../services/api';

// Components
import Panel from '../../components/panels/panel';

// Styles
import styles from './styles/messagingProgramsThreadsScreen';
import images from '../../theme/images';

class MessagingProgramsThreadsScreen extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    token: PropTypes.string,
    dispatch: PropTypes.func.isRequired
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
  }

  componentDidMount() {
    this.fetchPrograms();
  }

  fetchPrograms() {
    this.setState({refreshing: true});

    this.api.api1().then((response) => {
      if (response.ok) {
        var rows = response.data.results;
        var rowIds = rows.map((row, index) => index).reverse();

        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(rows, rowIds),
          refreshing: false
        });
      }
    });
  }

  goToThreads(prog) {
    this.props.dispatch(NavigationActions.navigate({
      routeName: 'Threads',
      params: {
        program: prog.title,
        progId: prog.id
      }
    }));
  }

  showProgramStatusIcon(prog) {
    let icon = images.status_empty;

    if (prog.activated) {
      icon = images.status_in_process;
    }

    return icon;
  }

  _onRefresh() {
    this.fetchPrograms();
  }

  _renderRow(prog) {
    return (
      <Panel onPress={() => this.goToThreads(prog)}>
        <View style={styles.programContainer}>
          <Image source={this.showProgramStatusIcon(prog)} style={styles.programStatusIcon}/>
          <Text style={styles.programTitle}>{prog.title}</Text>
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
        } />} renderScrollComponent={props => <ScrollView {...props}/>} style={styles.section} dataSource={this.state.dataSource} renderRow={(prog) => this._renderRow(prog)} removeClippedSubviews={false}/>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({isAuthenticated: state.login.isAuthenticated, token: state.login.token});

export default connect(mapStateToProps)(MessagingProgramsThreadsScreen);
