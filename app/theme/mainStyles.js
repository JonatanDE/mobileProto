// @flow
import Colors from './colors';
import Metrics from './metrics';

const MainStyles = {
  screen: {
    backgroundImage: {
      flex: 1,
      width: Metrics.screenWidth,
      height: Metrics.screenHeight
    },
    container: {
      flex: 1,
      backgroundColor: Colors.paleGrey
    },
    containerScroll: {
      paddingBottom: Metrics.baseMargin
    },
    containerCenter: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    center: {
      alignItems: 'center'
    },
    section: {
      marginHorizontal: Metrics.baseMargin
    }
  },
  panelHeader: {
    fontSize: Metrics.icons.tiny,
    fontWeight: '600',
    color: Colors.lightGrey,
    marginBottom: Metrics.baseMargin
  },
  navBar: {
    backgroundColor: Colors.brandBlue,
    borderBottomWidth: 1,
    borderBottomColor: Colors.slightGrey
  },
  tabBar: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.slightGrey,
    height: 40
  },
  activityIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,.1)'
  }
};

export default MainStyles;
