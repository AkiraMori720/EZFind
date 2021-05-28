//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen';
import { StyleSheet } from 'react-native';

//================================ Local Imported Files ======================================//

import colors from '../../Assets/Colors/colors';

const Styles = StyleSheet.create({
  Cotainer: {
    flex: 1,
  },
  headerCotainer: {
    flex: 0.1,
  },
  mainCotainer: {
    flex: 0.9,
  },
  uperfieldsContainer: {
    height: hp(63),
    width: wp(90),
    marginTop: hp(2),
    backgroundColor: colors.white,
    alignSelf: "center",
    borderColor: colors.AppGreenColor,
    borderWidth: 1,
    borderRadius: wp(3)

  },
  addPicContainer: {
    height: hp(22),
    width: '100%',
    justifyContent: "center",
    alignItems: "center",

  },
  titleContainer: {
    height: hp(8),
    width: '90%',
    alignSelf: "center",
  },
  imageStylesTag: {
    height: wp(25),
    width: wp(25),
    resizeMode: 'contain',
    borderRadius: wp(25),
    overflow: 'hidden'
  },
  buttonView: {
    height: hp(15),
    width: '90%',
    marginTop: 4,
    alignSelf: "center",
    justifyContent: "flex-end",
    alignItems: "center",

  },
  buttonStyles:
  {
    borderRadius: wp(7),
    width: '85%',
    marginBottom: wp(4),

  },
  titleStyles: {
    color: colors.white,
    fontSize: wp(4.5),
    fontWeight: "bold"
  },
});
export default Styles;
