//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen';
import { StyleSheet } from 'react-native';

//================================ Local Imported Files ======================================//

import colors from '../../Assets/Colors/colors';

const Styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  upperView: {
    flex: 0.8,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imageView: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  midView: {
    flex: 0.45,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: wp(10),
  },
  lowerView: {
    flex: 0.2,
    marginTop: wp(5),
    alignItems: 'center',
  },
  imageStyles: {
    height: wp(40),
    width: wp(40),
    resizeMode: 'contain',
  },
  textStyle: {
    fontSize: wp(5),
    color: colors.white,
    textAlign: 'center',
  },
  textStyleWelcome: {
    fontSize: wp(5),
    lineHeight: wp(8),
    marginBottom: wp(2),
    color: colors.white,
    textAlign: 'center',
  },
  textStyleNetwork: {
    fontSize: wp(5),
    marginBottom: wp(2),
    color: colors.AppRedColor,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonStyles: {
    borderRadius: wp(7),
    height: hp(8),
    width: '80%',
  },
  titleStyles: {
    color: colors.white,
    fontSize: wp(4),
  },
  slides: {
    flex: 1,
  },
  activeDot: {
    backgroundColor: colors.white,
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  skipButton: {
    width: wp('70%'),
    marginTop: wp(3),
    height: hp('7%'),
    alignItems: 'center',
  },
  skipButtonTextStyle: {
    color: colors.white,
    fontSize: wp(4),
    textDecorationLine: 'underline',
  },
});

export default Styles;
