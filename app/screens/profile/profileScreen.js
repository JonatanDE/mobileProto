// @flow
import React, {Component, PropTypes} from 'react';
import {Animated, View, Text, ScrollView, Image} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import API from '../../services/api';

// Components
import StaticTags from '../../components/elements/staticTags';
import Panel from '../../components/panels/panel';

// Styles
import styles from './styles/profileScreenStyle';
import images from '../../theme/images';

const HEADER_MAX_HEIGHT = 150;
const HEADER_MIN_HEIGHT = 50;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class ProfileScreen extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    token: PropTypes.string,
    user: PropTypes.string,
    dispatch: PropTypes.func.isRequired
  };

  api : Object

  constructor(props) {
    super(props);

    this.state = {
      dataSource: {},
      scrollY: new Animated.Value(0)
    };

    this.api = API.create(this.props.token);
  }

  componentDidMount() {
    this.fetchProfile();
  }

  fetchProfile() {
    const usersOrg = JSON.parse(this.props.user);

    this.api.profile(usersOrg.organization.id).then((response) => {
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
    const headerTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    });

    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 100],
      extrapolate: 'clamp',
    });

    const logoTranslateScale = this.state.scrollY.interpolate({
      inputRange: [1, HEADER_SCROLL_DISTANCE],
      outputRange: [1, .6],
      extrapolate: 'clamp',
    });

    const logoTranslatePosition = this.state.scrollY.interpolate({
      inputRange: [1, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 32],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.container}>
        <Animated.ScrollView style={{flex: 1}}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}],
            {useNativeDriver: true},
          )}>
          <View style={{marginTop: 190}}>
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
          </View>
        </Animated.ScrollView>
        <Animated.View style={[styles.coverImageContainer, {backgroundColor: this.state.dataSource.color},
          {transform: [{translateY: headerTranslate}]}]}>
          <Animated.Image
            style={[styles.coverImage,
            {transform: [{translateY: imageTranslate }]}]}
            source={{
              uri: 'https://s3.amazonaws.com/dev-profile-service-imgx-out/profile-service/backdrop/' + this.state.dataSource.backdrop_photo
            }}
          />
        </Animated.View>
        <Animated.View style={[styles.profileHeaderContainer, {borderTopColor: this.state.dataSource.color}, {transform: [{translateY: headerTranslate}]}]}>
          <View style={styles.profileHeader}>
            <Text style={styles.profileSite} ellipsizeMode="tail" numberOfLines={1}>{this.state.dataSource.website}</Text>
            <Animated.View style={[styles.profileLogoContainer,
            {transform: [{scale: logoTranslateScale}, {translateY: logoTranslatePosition }]}]}>
              <Image source={{
                uri: 'https://s3.amazonaws.com/dev-profile-service-imgx-out/profile-service/logo/250x250/' + this.state.dataSource.logo
              }} style={styles.profileLogo}/>
            </Animated.View>
            <Text style={styles.profileSocial}>social icons</Text>
          </View>
        </Animated.View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({isAuthenticated: state.login.isAuthenticated, token: state.login.token, user: state.login.user});

export default connect(mapStateToProps)(ProfileScreen);
