// @flow
import React, {Component, PropTypes} from 'react';
import {
  View,
  FlatList,
  Text,
  Image
} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import API from '../../services/api';

// Components
import Panel from '../../components/panels/panel';

// Styles
import styles from './styles/discoverScreenStyle';

class DiscoverScreen extends Component {
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

  stopLoading = false;
  dataObjects = [];
  page = 0;

  api : Object

  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      refreshing: false
    };

    this.api = API.create(this.props.token);
  }

  componentDidMount() {
    if (this.props.navigation.state.params && this.props.navigation.state.params.categories) {
      this.fetchDiscoverProfiles(this.props.navigation.state.params.categories);
      this.stopLoading = true;
    } else {
      this.fetchDiscoverProfiles();
    }

  }

  fetchDiscoverProfiles(category) {
    if (!category) {
      this.stopLoading = false;
    }

    this.setState({refreshing: true});
    this.page = 0;

    this.api.api2({limit: 12, offset: this.page, category: category}).then((response) => {
      if (response.ok) {
        this.dataObjects = response.data.results;
        this.page += 12;

        this.setState({dataSource: this.dataObjects, refreshing: false});
      }
    });
  }

  goToProfile(org) {
    this.props.dispatch(NavigationActions.navigate({
      routeName: 'DiscoverProfile',
      params: {
        org: org.item.name,
        orgId: org.item.identity_id
      }
    }));
  }

  _keyExtractor = (item) => (item.identity_id);

  _nextPage() {
    if (this.stopLoading) {
      return;
    }

    this.api.api2({limit: 12, offset: this.page}).then((response) => {
      if (response.ok && response.data.next) {
        this.dataObjects = this.dataObjects.concat(response.data.results);
        this.page += 12;

        this.setState({dataSource: this.dataObjects});
      }
    });
  }

  _renderRow(org) {
    let logo = org.item.logo;
    if (logo === null || logo === undefined) {
      logo = 'https://upload.wikimedia.org/wikipedia/en/a/aa/No_sign.png';
    } else {
      if (!logo.match('http*')) {
        logo = `https://s3.amazonaws.com/dev-profile-service-imgx-out/profile-service/logo/250x250/${logo}`;
      }
    }

    return (
      <Panel style={styles.tile} touchStyle={styles.tileContainer} onPress={() => this.goToProfile(org)}>
        <Image style={styles.orgImage} source={{
          uri: logo
        }}/>
        <Text ellipsizeMode='tail' numberOfLines={2} style={styles.tileText}>{org.item.name}</Text>
      </Panel>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList data={this.state.dataSource} keyExtractor={this._keyExtractor} renderItem={(org) => this._renderRow(org)} onRefresh={() => this.fetchDiscoverProfiles()} refreshing={this.state.refreshing} onEndReached={() => this._nextPage()} onEndReachedThreshold={0.45} numColumns={2} columnWrapperStyle={[styles.tiles, styles.section]} removeClippedSubviews={false}/>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({isAuthenticated: state.login.isAuthenticated, token: state.login.token});

export default connect(mapStateToProps)(DiscoverScreen);
