
//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { StyleSheet } from "react-native";

//================================ Local Imported Files ======================================//

import colors from "../../Assets/Colors/colors";

const Styles = StyleSheet.create({

    Cotainer:
    {
        flex: 1,

    },
    headerCotainer: {
        flex: 0.1,
    },
    mainCotainer: {
        flex: 0.9,
    },
    uperprofileCotainer: {
        height: hp(40),
        width: wp(90),
        marginTop: hp(2),
        alignSelf: "center",
        borderColor: colors.AppGreenColor,
        borderWidth: 1,
        borderRadius: wp(3)

    },
    addPicContainer: {
        height: hp(20),
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
    },
    imageStylesTag: {
        height: wp(25),
        width: wp(25),
        resizeMode: 'cover',
        borderRadius: wp(25),
        overflow: 'hidden',
        backgroundColor: 'gray'
    },
    bottomProfileCotainer: {
        height: hp(15),
        width: '100%',
        marginTop: wp(2)
    },
    titleCotainer: {
        height: hp(5),
        width: '100%',
        justifyContent: 'center',
        alignItems: "center",
    },
    titleStyleCotainer: {
        color: colors.AppRedColor,
        fontSize: wp(4),
        fontWeight: "bold"

    },
    addressCotainer: {
        height: hp(4),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: wp(2)
    },
    addressPicCotainer: {
        height: '100%',
        width: '10%',
        justifyContent: "center",
        alignItems: "flex-end",

    },
    phonePicCotainer: {
        height: '100%',
        width: '5%',
        justifyContent: "center",
        alignItems: "center",
    },
    lineCotainer: {
        height: '100%',
        width: '0.3%',
        backgroundColor: 'grey',
        marginLeft: wp(2)
    },
    worldCotainer: {
        height: '100%',
        width: '5%',
        marginLeft: wp(2),
        justifyContent: "center",
        alignItems: "center"
    },
    lockCotainer: {
        height: '100%',
        width: '4%',
        marginLeft: wp(2),
        justifyContent: "center",
        alignItems: "center"
    },
    downArrowCotainer: {
        height: '100%',
        width: '5%',
        justifyContent: "center",
        alignItems: "center"
    },
    buttonCotainer: {
        height: hp(10),
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: wp(2),
        marginTop: wp(1)
    },
    NetworkCotainer: {
        height: hp(30),
        width: '100%',
        paddingHorizontal: wp(4)
    },
    buttonStyles:
    {
        height: hp(5),
        width: '100%',
    },
    addressTextCotainer: {
        height: '100%',
        justifyContent: "center",
        paddingRight: wp(4)

    },
    phoneTextCotainer: {
        height: '100%',
        justifyContent: "center"
    },
    addressTextStyleCotainer: {
        fontSize: wp(3),
    },
    phoneCotainer: {
        height: hp(4),
        flexDirection: "row",
        justifyContent: "center",
        marginTop: wp(1)
    },
    pointsCotainer: {
        height: '100%',
        width: '30%',
        justifyContent: 'center',
        alignItems: "flex-end",
        paddingRight: wp(4)
    },
    pointViewCotainer: {
        height: '100%',
        width: '30%',
        backgroundColor: 'pink',
    },
    picCotainer: {
        height: '100%',
        width: '40%',
        justifyContent: "center",
        alignItems: "center"
    },
    imageStyles: {
        height: wp(25),
        width: wp(25),
        resizeMode: 'contain'

    },
    starImageStyles: {
        height: wp(6),
        width: wp(6),
        resizeMode: 'contain'
    },
    markerImageStyles: {
        height: wp(4),
        width: wp(4),
        tintColor: colors.grey1,
        resizeMode: 'contain',
        marginRight: 5
    },
    worldImageStyles: {
        height: wp(4),
        width: wp(4),
        tintColor: colors.AppRedColor,
        resizeMode: 'contain'
    },
    downArrowImageStyles: {
        height: wp(3),
        width: wp(3),
        tintColor: colors.grey,
        resizeMode: 'contain'
    },

    starCotainer: {
        height: '100%',
        width: '30%',
        justifyContent: "center",
        alignItems: "flex-start",
    },
    starViewCotainer: {
        height: '50%',
        width: '100%',
        justifyContent: "center",
        alignItems: "center",

    },
    starTextCotainer: {
        height: '50%',
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: wp(4)
    },
    pointsStyleCotainer: {
        fontSize: wp(6),
        color: colors.AppRedColor,
        fontWeight: "bold"
    },
    pointsTextStyleCotainer: {
        fontSize: wp(3),
    },
});
export default Styles;