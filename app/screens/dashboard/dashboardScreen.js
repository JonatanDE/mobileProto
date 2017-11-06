// @flow
import React, {Component, PropTypes} from 'react';
import {Animated, View, ScrollView, Text} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NavigationActions} from 'react-navigation';
import API from '../../services/api';

// SVG
import Svg, {Circle, Ellipse, Path, Polygon, Rect} from 'react-native-svg';

// Components
import Panel from '../../components/panels/panel';

// Styles
import styles from './styles/dashboardScreenStyle';

class DashboardScreen extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    token: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.object
  };

  state : {
    dataSource: Object,
    fadeAnimation: Object
  }

  api : Object
  overviewData : Object

  constructor(props) {
    super(props);

    if (this.props.navigation.state.params) {
      this.overviewData = this.props.navigation.state.params.overview;
    } else {
      this.overviewData = null;
    }

    this.state = {
      dataSource: this.overviewData || {},
      fadeAnimation: new Animated.Value(.1)
    };

    this.api = API.create(this.props.token);
  }

  componentDidMount() {
    if (!this.overviewData) {
      this.fetchOverview();
    } else {
      this._animateBlocks();
    }
  }

  fetchOverview() {
    this.api.overview().then((response) => {
      if (response.ok) {
        this.setState({dataSource: response.data});
        this._animateBlocks();
      }
    });
  }

  goToVendor(id, name) {
    this.props.dispatch(NavigationActions.navigate({
      routeName: 'DiscoverProfile',
      params: {
        org: name,
        orgId: id
      }
    }));
  }

  _animateBlocks() {
    Animated.timing(this.state.fadeAnimation, {
      toValue: 1,
      duration: 1000
    }).start();
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Animated.View style={[
          styles.section, {
            opacity: this.state.fadeAnimation
          }
        ]}>
        {/* Should be a component */}
          <View style={styles.tiles}>
            <View style={[styles.tile, styles.tileBlue]}>
              <Icon name="barcode" style={styles.tileIcon}/>
              <Text style={styles.tileNumber}>{this.state.dataSource.data1}</Text>
              <Text style={styles.tileText}>{'Data'.toUpperCase()}</Text>
            </View>
            <View style={[styles.tile, styles.tileBlue]}>
              <Icon name="sitemap" style={styles.tileIcon}/>
              <Text style={styles.tileNumber}>{this.state.dataSource.data3}</Text>
              <Text style={styles.tileText}>{'Data'.toUpperCase()}</Text>
            </View>
            <View style={[styles.tile, styles.tilePlum]}>
              <Icon name="area-chart" style={styles.tileIcon}/>
              <Text style={styles.tileNumber}>{this.state.dataSource.data2}</Text>
              <Text style={styles.tileText}>{'Data'.toUpperCase()}</Text>
            </View>
            <View style={[styles.tile, styles.tilePlum]}>
              <Icon name="building-o" style={styles.tileIcon}/>
              <Text style={styles.tileNumber}>{this.state.dataSource.data4}</Text>
              <Text style={styles.tileText}>{'Data'.toUpperCase()}</Text>
            </View>
            <View style={[styles.tile, styles.tileYellow]}>
              <Icon name="comment-o" style={styles.tileIcon}/>
              <Text style={styles.tileNumber}>{this.state.dataSource.data5}</Text>
              <Text style={styles.tileText}>{'Data'.toUpperCase()}</Text>
            </View>
            <View style={[styles.tile, styles.tileGreen]}>
              <Icon name="star" style={styles.tileIcon}/>
              <Text style={styles.tileNumber}>{this.state.dataSource.data6}</Text>
              <Text style={styles.tileText}>{'Data'.toUpperCase()}</Text>
            </View>
          </View>

          {/* SVG Vector Map Example */}
          {<Svg height='340' width='340' viewBox='0 0 1200 800'>
            <Polygon points='1035.94 787.41 1035.94 423.16 855.37 423.16 855.37 350.52 1187.28 350.52 1187.28 12.59 548.09 12.59 548.09 68.87 437.36 68.87 437.36 12.59 49.37 12.59 49.37 366.5 12.72 366.5 12.72 787.41 356.2 787.41 414.93 584.41 554.4 584.41 627.81 787.41 1035.94 787.41' fill='#d7d7dc'></Polygon>
            <Path d='M1187.28,12.59V350.52H855.37v72.64h180.58V787.41H627.81l-73.41-203H414.93l-58.73,203H12.72V366.5H49.37V12.59h388V68.87H548.08V12.59h639.19M1200,0H535.36V56.28H450.09V0H36.65V353.91H0V800H365.8l2.64-9.13L424.52,597H545.44l70.39,194.65,3,8.35h429.82V410.57H868.09V363.11H1200V0h0Z' fill='#bbb'></Path>
            <Path d='M674.5,647c2,16.3,29.2,31.3,51.4,28.9c51.9-5.8,80.3-107.4,64.7-119c-6.4-4.7-27.9,11.2-70.8,43.1C676.6,632,673.7,640.5,674.5,647z' fill='#a2bbdd'></Path>
            <Ellipse cx='738.82' cy='595.48' rx='13.95' ry='13.8' fill='#7bad7f'></Ellipse>
            <Ellipse cx='768.46' cy='605.4' rx='13.95' ry='13.8' fill='#7bad7f'></Ellipse>
            <Ellipse cx='744.64' cy='624.92' rx='13.95' ry='13.8' fill='#7bad7f'></Ellipse>
            <Rect x='666.9' y='565.6' width='26.3' height='26' fill='#bdbdbd' fillOpacity='0.6'></Rect>
            <Path d='M454.8,266.2h63c13.4-0.1,24.4,10.8,24.5,24.2c0,0,0,0,0,0l0,0v199.4c-0.1,13.4-11.1,24.3-24.5,24.2h-63c-13.4,0.1-24.4-10.8-24.5-24.2c0,0,0,0,0,0l0,0V290.4C430.3,277,441.3,266.1,454.8,266.2C454.7,266.2,454.7,266.2,454.8,266.2L454.8,266.2L454.8,266.2z' fill='#ffa029' fillOpacity='0.6' onPressIn={() =>  this.goToVendor('299053952618501604078338412051215317212', 'Banana Split USA')}></Path>
            <Rect x='282.3' y='478.1' width='26.3' height='26' fill='#bdbdbd' fillOpacity='0.6'></Rect>
            <Rect x='12.7' y='366.5' width='202.4' height='175.1' fill='#00AAE5' fillOpacity='0.6' onPressIn={() =>  this.goToVendor('238916353211997119563886541572208773342', 'Cooper\'s Way')}></Rect>
            <Rect x='12.7' y='550.6' width='50.9' height='236.8' fill='#bdbdbd' fillOpacity='0.6'></Rect>
            <Circle cx='143.1' cy='708.1' r='49.5' fill='#bdbdbd' fillOpacity='0.6'></Circle>
            <Circle cx='288.6' cy='658.6' r='66' fill='#bdbdbd' fillOpacity='0.6'></Circle>
            <Polygon points='49.4,354.1 362.1,354.1 362.1,230.9 600,230.9 600,297.1 855.4,297.1 855.4,12.6 548.1,12.6 548.1,68.9 437.4,68.9 437.4,12.6 49.4,12.6' fill='#bdbdbd' fillOpacity='0.6'></Polygon>
            <Rect x='1065.6' y='12.6' width='121.7' height='110.5' fill='#bdbdbd' fillOpacity='0.6'></Rect>
            <Rect x='1065.6' y='132.1' width='121.7' height='218.4' fill='#bdbdbd' fillOpacity='0.6'></Rect>
            <Polygon points='901.3,92.6 886.9,67.8 901.3,43 929.9,43 944.2,67.8 929.9,92.6 ' fill='#bdbdbd' fillOpacity='0.6'></Polygon>
            <Polygon points='953.3,129.1 938.6,103.6 953.3,78.1 982.8,78.1 997.5,103.6 982.8,129.1' fill='#bdbdbd' fillOpacity='0.6'></Polygon>
            <Rect x='951.6' y='213.1' width='73.5' height='73.5' fill='#bdbdbd' fillOpacity='0.6'></Rect>
            <Rect x='639.6' y='399.5' width='151.5' height='121.1' fill='#bdbdbd' fillOpacity='0.6'></Rect>
            <Rect x='855.4' y='423.2' width='180.6' height='364.2' fill='#bdbdbd' fillOpacity='0.6'></Rect>
            <Polygon points='613.2,747 846.6,658.6 846.6,787.4 627.8,787.4' fill='#bdbdbd' fillOpacity='0.6'></Polygon>
          </Svg>}
        </Animated.View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({isAuthenticated: state.login.isAuthenticated, token: state.login.token});

export default connect(mapStateToProps)(DashboardScreen);
