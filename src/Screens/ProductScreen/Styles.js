//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen';
import { StyleSheet } from 'react-native';

//================================ Local Imported Files ======================================//

import colors from '../../Assets/Colors/colors';

const Styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    headerCotainer: {
        flex: 0.1,
    },
    mainDataContainer: {
        flex: 0.9,

    },
    backgroundImageContainer: {
        flex: 0.35,
        justifyContent: "space-between"

    },
    buttonStyles:
    {
        borderRadius: wp(7),
        height: hp(8),
        width: '85%',
        marginBottom: wp(4),
    },
    buttonContainer: {
        flex: 0.4,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    titleStyles: {
        color: colors.white,
        fontSize: wp(4.5),
        fontWeight: "bold"
    },
    photoTag: {
        //flex: 0.25,
        paddingRight: wp(4),
        paddingTop: wp(4),
        // backgroundColor:'green'
    },
    photoTagNumber: {
        paddingVertical: 8,
        width: '35%',
        alignSelf: "flex-end",
        backgroundColor: colors.black,
        flexDirection: "row",
        borderRadius: wp(10),
        // paddingTop: '2%',
        // paddingLeft: '2%',
        justifyContent: "center",
        alignItems:'center'
    },
    imageStylesTag: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        tintColor: colors.white,
    },
    textStyle: {
        color: colors.white,
        paddingLeft: '6%'
    },
    descrpitionStyleContainer: {
        fontWeight: "bold"
    },
    SubDescrpitionStyleContainer: {
        color: colors.grey1
    },
    maintitleStyle: {
        flexDirection: "row",
        backgroundColor: "rgba(0,0, 0, 0.6)",
        paddingVertical: 10
    },
    maintitleText: {
        width: "80%",
        paddingLeft: wp(4)
    },
    maintitleTextStyle: {
        fontWeight: "bold",
        fontSize: wp(5),
        color: colors.white
    },
    subtitleTextStyle: {
        fontSize: wp(4),
        color: colors.white,
        fontStyle: "italic"
    },
    priceTextStyle: {
        fontWeight: "bold",
        fontSize: wp(7),
        color: colors.AppGreenColor
    },
    priceText: {
        width: "20%",
        justifyContent: 'center'

    },
    bottomContainer: {
        //flex: 0.19,
        backgroundColor: colors.white,
        marginHorizontal: wp(4),
        marginTop: wp(4),
        elevation: 3,
        borderRadius: 5,
        paddingVertical: wp(4)
    },
    descrpitionContainer: {
        //height: wp(10),
        width: "100%",
        paddingLeft: wp(4),
        justifyContent: "center",

    },
    SubDescrpitionContainer: {
        //height: wp(8),
        width: "100%",
        paddingLeft: wp(4),
        justifyContent: "center",
        paddingRight: wp(4),
        marginVertical: wp(3)
    },
    locationContainer: {
        //height: wp(10),
        width: "100%",
        paddingLeft: wp(4),
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "row",
        paddingRight: wp(4),
    },
    iconMarker: {
        height: 18,
        width: 14,
        resizeMode: 'contain',
        tintColor: colors.AppGreenColor
    },

});

export default Styles;
