import {StyleSheet, StatusBar, Platform} from 'react-native';
import appColors from './color';
// import {getBookingStatusColor} from '../constants/Booking';
// import appColors from './colors';
// import theme from '../../native-base-theme/variables/platform';
// import {scale, verticalScale} from 'react-native-size-matters';

const appStyles = StyleSheet.create({
  // safeArea: {
  //   flex: 1,
  //   // paddingTop: Platform.select({ios: 0, android: StatusBar.currentHeight}),
  // },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexCount: count => ({
    flex: count,
  }),
  containerBorderRadius: (radius = 8) => ({
    borderRadius: radius,
  }),
  boxShadow: {
    shadowColor: appColors.primary,
    elevation: 4,
  },
});

export default appStyles;
