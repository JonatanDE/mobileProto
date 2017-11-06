// @flow
import React, {PropTypes} from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';
import {addNavigationHelpers, StackNavigator, TabNavigator} from 'react-navigation';

// Screens
import SplashScreen from '../screens/splash/splashScreen';
import LoginScreen from '../screens/login/loginScreen';
import DashboardScreen from '../screens/dashboard/dashboardScreen';
import MessagingProgramsThreadsScreen from '../screens/messaging/messagingProgramsThreadsScreen';
import MessagingThreadsScreen from '../screens/messaging/messagingThreadsScreen';
import MessagingThreadComposeScreen from '../screens/messaging/messagingThreadComposeScreen';
import MessagingMessagesScreen from '../screens/messaging/messagingMessagesScreen';
import DiscoverScreen from '../screens/discover/discoverScreen';
import DiscoverProfileScreen from '../screens/discover/discoverProfileScreen';
import DiscoverFilterScreen from '../screens/discover/discoverFilterScreen';
import ProgramsScreen from '../screens/programs/programsScreen';
import ProfileScreen from '../screens/profile/profileScreen';

// Components
import TabIcon from './tabIcon';
import NavItems from './navItems';

// Styles
import styles from './styles/navigationRouterStyle';
import {Colors, Metrics} from '../theme';

const headerStyle = {
  headerStyle: styles.navBar,
  headerTintColor: Colors.white,
  headerBackTitle: null
};

const DashboardTab = StackNavigator({
  Dashboard: {
    screen: DashboardScreen,
    navigationOptions: {
      title: 'Dashboard',
      headerRight: (<NavItems type='logoutButton'/>)
    }
  }
}, {
  navigationOptions: headerStyle
});

const MessagingTab = StackNavigator({
  ProgramsThreads: {
    screen: MessagingProgramsThreadsScreen,
    path: '/',
    navigationOptions: {
      title: 'Messages in Programs'
    }
  },
  Threads: {
    screen: MessagingThreadsScreen,
    path: '/threads',
    navigationOptions: ({navigation}) => ({
      title: navigation.state.params.program,
      headerLeft: (<NavItems/>)
    }),
  },
  Messages: {
    screen: MessagingMessagesScreen,
    path: '/threads/:thread',
    navigationOptions: ({navigation}) => ({
      title: navigation.state.params.thread,
      headerLeft: (<NavItems/>)
    })
  }
}, {
  navigationOptions: headerStyle
});

const DiscoverTab = StackNavigator({
  Discover: {
    screen: DiscoverScreen,
    path: '/discover',
    navigationOptions: {
      title: 'Discover Suppliers',
      headerRight: (<NavItems type='searchButton'/>)
    }
  },
  DiscoverProfile: {
    screen: DiscoverProfileScreen,
    path: '/discover/:org',
    navigationOptions: ({navigation}) => ({
      title: navigation.state.params.org,
      headerLeft: (<NavItems/>)
    })
  },
  DiscoverFilter: {
    screen: DiscoverFilterScreen,
    path: '/discover/filter',
    navigationOptions: ({navigation}) => ({
      // title: navigation.state.params.org,
      headerLeft: (<NavItems/>)
    })
  }
}, {
  navigationOptions: headerStyle
});

const ProgramsTab = StackNavigator({
  Programs: {
    screen: ProgramsScreen,
    navigationOptions: {
      title: 'Buying Programs'
    }
  }
}, {
  navigationOptions: headerStyle
});

const TabsNav = TabNavigator({
  DashboardTab: {
    screen: DashboardTab,
    path: '/',
    navigationOptions: {
      title: 'Menu 1',
      tabBarIcon: ({tintColor}) => (<TabIcon iconName='home' tint={tintColor}/>)
    }
  },
  MessagingTab: {
    screen: MessagingTab,
    path: '/messages',
    navigationOptions: {
      title: 'Menu 2',
      tabBarIcon: ({tintColor}) => (<TabIcon iconName='comments-o' tint={tintColor}/>)
    }
  },
  DiscoverTab: {
    screen: DiscoverTab,
    path: '/discover',
    navigationOptions: {
      title: 'Menu 3',
      tabBarIcon: ({tintColor}) => (<TabIcon iconName='search' tint={tintColor}/>)
    }
  },
  ProgramsTab: {
    screen: ProgramsTab,
    path: '/programs',
    navigationOptions: {
      title: 'Menu 4',
      tabBarIcon: ({tintColor}) => (<TabIcon iconName='area-chart' tint={tintColor}/>)
    }
  },
  ProfileTab: {
    screen: ProfileScreen,
    path: '/profile',
    navigationOptions: {
      title: 'Menu 5',
      tabBarIcon: ({tintColor}) => (<TabIcon iconName='building-o' tint={tintColor}/>)
    }
  }
}, {
  // animationEnabled: true,
  tabBarOptions: {
    showLabel: false,
    activeTintColor: Colors.white,
    activeBackgroundColor: Colors.brandBlue,
    inactiveTintColor: Colors.lightGrey,
    inactiveBackgroundColor: Colors.white,
    style: styles.tabBar
  }
});

export const AppNavigator = StackNavigator({
  Splash: {
    screen: SplashScreen
  },
  Login: {
    screen: LoginScreen
  },
  Main: {
    screen: TabsNav
  }
}, {
  headerMode: 'none'
});

const NavigationRouter = ({dispatch, nav, user}) => (<AppNavigator navigation={addNavigationHelpers({dispatch, state: nav, user: user})}/>);

NavigationRouter.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
  user: PropTypes.string
};

const mapStateToProps = (state) => ({nav: state.nav, user: state.login.user});

export default connect(mapStateToProps)(NavigationRouter);
