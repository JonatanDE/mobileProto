// @flow
import React, {Component, PropTypes} from 'react';
import {View, FlatList, Text} from 'react-native';
import {connect} from 'react-redux';
import API from '../../services/api';

// Components
import Panel from '../../components/panels/panel';

// Styles
import styles from './styles/programsScreenStyle';

class ProgramsScreen extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    token: PropTypes.string,
    dispatch: PropTypes.func.isRequired
  };

  state : {
    dataSource: Object
  }

  api : Object

  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
    };

    this.api = API.create(this.props.token);
  }

  componentDidMount() {
    this.fetchPrograms();
  }

  fetchPrograms() {
    this.api.api1().then((response) => {
      if (response.ok) {
        this.setState({dataSource: response.data.results});
      }
    });
  }

  _keyExtractor = (item) => (item.id);

  _renderRow(prog) {
    return (
      <Panel style={styles.section}>
        <Text style={styles.programTitle}>{prog.item.title}</Text>
        <Text>{prog.item.owner}</Text>
        <Text>Date 1: {new Date(prog.item.date1).toString()}</Text>
        <Text>Date 2: {new Date(prog.item.date2).toString()}</Text>
      </Panel>
    );
  }

  _renderFooter() {
    return (<View style={styles.containerScroll}></View>);
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList data={this.state.dataSource} keyExtractor={this._keyExtractor} renderItem={(prog) => this._renderRow(prog)} numColumns={1} ListFooterComponent={this._renderFooter} removeClippedSubviews={false}/>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({isAuthenticated: state.login.isAuthenticated, token: state.login.token});

export default connect(mapStateToProps)(ProgramsScreen);
