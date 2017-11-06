// @flow
import React, {Component, PropTypes} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import API from '../../services/api';

// Components
import StaticTags from '../../components/elements/staticTags';
import Panel from '../../components/panels/panel';

// Styles
import styles from '../profile/styles/profileScreenStyle';
import images from '../../theme/images';

class ProfileScreen extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    token: PropTypes.string,
    user: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.object
  };

  api : Object

  constructor(props) {
    super(props);

    this.state = {
      dataSource: {}
    };

    this.api = API.create(this.props.token);
    this.orgId = this.props.navigation.state.params.orgId;
  }

  componentDidMount() {
    this.fetchProfile();
  }

  fetchProfile() {
    this.api.profile(this.orgId).then((response) => {
      if (response.ok) {
        this.setState({dataSource: response.data});
      }
    });
  }

  renderHq() {
    if (this.state.dataSource.headquarter) {
      return (
        <View>
          <Text>{this.state.dataSource.headquarter.city} {this.state.dataSource.headquarter.state} {this.state.dataSource.headquarter.country_name}</Text>
          <Text>{this.state.dataSource.headquarter.address_line_1} {this.state.dataSource.headquarter.address_line_2} {this.state.dataSource.headquarter.zip}</Text>
        </View>
      );
    }
  }

  render() {
    let logo = this.state.dataSource.logo;
    if (logo === null || logo === undefined) {
      logo = 'https://upload.wikimedia.org/wikipedia/en/a/aa/No_sign.png';
    } else {
      if (!logo.match('http*')) {
        logo = `https://s3.amazonaws.com/dev-profile-service-imgx-out/profile-service/logo/250x250/${logo}`;
      }
    }

    return (
      <View style={styles.container}>
        <ScrollView>
          {this.state.dataSource.backdrop_photo &&
          <View style={styles.coverImageContainer}>
            <Image source={{
              uri: `https://s3.amazonaws.com/dev-profile-service-imgx-out/profile-service/backdrop/ ${this.state.dataSource.backdrop_photo}`
            }} style={styles.coverImage}/>
          </View>
          }
          <View style={this.state.dataSource.backdrop_photo ? styles.profileHeader : [styles.profileHeader, {marginTop: 85}]}>
            <Text style={styles.profileSite} ellipsizeMode="tail" numberOfLines={1}>{this.state.dataSource.website}</Text>
            <View style={styles.profileLogoContainer}>
              <Image source={{
                uri: logo
              }} style={styles.profileLogo}/>
            </View>
            <Text style={styles.profileSocial}>social icons</Text>
          </View>
          <View style={[styles.section, styles.containerScroll]}>
            <Panel>
              <StaticTags array={this.state.dataSource.business_types}/>
              <Text style={styles.panelHeader}>INTERESTS</Text>
              <StaticTags array={this.state.dataSource.interests}/>
            </Panel>
            <Panel header="Categories">
              <StaticTags array={this.state.dataSource.categories}/>
            </Panel>
            <Panel header="Headquater">
              {this.renderHq()}
            </Panel>
            <Panel header="Description">
              <Text>{this.state.dataSource.description}</Text>
            </Panel>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({isAuthenticated: state.login.isAuthenticated, token: state.login.token, user: state.login.user});

export default connect(mapStateToProps)(ProfileScreen);
