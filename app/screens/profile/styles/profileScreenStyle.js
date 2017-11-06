// @flow
import {StyleSheet} from 'react-native';
import {MainStyles, Colors, Metrics} from '../../../theme/';

export default StyleSheet.create({
  ...MainStyles.screen,
  coverImageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    height: 150
  },
  coverImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: 150,
    opacity: .8,
    resizeMode: 'cover'
  },
  profileHeaderContainer: {
    position: 'absolute',
    top: 150,
    left: 0,
    right: 0,
    borderTopWidth: 4,
    borderTopColor: Colors.slightGrey,
    borderBottomWidth: 1,
    borderBottomColor: Colors.slightGrey,
    backgroundColor: Colors.paleGrey
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Metrics.marginVertical
  },
  profileLogoContainer: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.slightGrey,
    borderRadius: Metrics.buttonRadius,
    borderBottomWidth: 0,
    padding: 10,
    marginTop: -75
  },
  profileLogo: {
    width: 75,
    height: 75,
    resizeMode: 'contain'
  },
  profileSite: {
    color: Colors.brandBlue,
    paddingRight: 15,
    width: 125
  },
  profileSocial: {
    color: Colors.brandBlue,
    paddingLeft: 15,
    width: 125
  },
  panelHeader: {
    ...MainStyles.panelHeader,
    marginTop: Metrics.baseMargin
  }
});
