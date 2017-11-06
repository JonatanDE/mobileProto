// @flow
import React, {Component, PropTypes} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import API from '../../services/api';

// Components
import Panel from '../../components/panels/panel';

// Styles
import styles from './styles/discoverScreenStyle';

class DiscoverFilterScreen extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    token: PropTypes.string,
    dispatch: PropTypes.func.isRequired
  };

  state : {
    dataSource: Object,
    refreshing: Boolean
  }

  dataObjects = [];
  page = 0;

  api : Object

  constructor(props) {
    super(props);

    this.state = {
      dataSource: [
        {
          'title': 'Accessories',
          'name': 'Accessories'
        }, {
          'title': 'Apparel',
          'name': 'Apparel'
        }, {
          'title': 'Automotive',
          'name': 'Automotive'
        }, {
          'title': 'Baby & Kids',
          'name': 'Baby_and_Kids'
        }, {
          'title': 'Electronics',
          'name': 'Electronics'
        }, {
          'title': 'Entertainment',
          'name': 'Entertainment'
        }, {
          'title': 'Food, Beverage & Household',
          'name': 'Food_Beverage_and_Household'
        }, {
          'title': 'Footwear',
          'name': 'Footwear'
        }, {
          'title': 'Health & Beauty',
          'name': 'Health_and_Beauty'
        }, {
          'title': 'Home',
          'name': 'Home'
        }, {
          'title': 'Home Improvement & Commercial Supplies',
          'name': 'Home_Improvement_and_Commercial_Supplies'
        }, {
          'title': 'Other',
          'name': 'Other'
        }, {
          'title': 'Pets',
          'name': 'Pets'
        }, {
          'title': 'Sports & Outdoors',
          'name': 'Sports_and_Outdoors'
        }, {
          'title': 'Toys & Hobbies',
          'name': 'Toys_and_Hobbies'
        }, {
          'title': 'Travel',
          'name': 'Travel'
        }
      ],
      refreshing: false
    };

    this.api = API.create(this.props.token);
  }

  goToDiscover() {
    this.props.dispatch(NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({
          routeName: 'Discover',
          params: {
            categories: 'Accessories',
          }
        })]
    }));
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <Panel onPress={() => this.goToDiscover()}>
            <Text>Apply Accessories Filter</Text>
          </Panel>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({isAuthenticated: state.login.isAuthenticated, token: state.login.token});

export default connect(mapStateToProps)(DiscoverFilterScreen);
