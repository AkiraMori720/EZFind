
//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { StyleSheet } from "react-native";

//================================ Local Imported Files ======================================//

import colors from '../../Assets/Colors/colors';

const Styles = StyleSheet.create({

    mainCotainer:
    {
        flex: 1,
    },
    headerCotainer: {
        flex: 0.1,
    },
    BottomCotainer: {
        flex: 0.9,
    },
    mapView: {
        flex: 1,
    },
    searchContainerLeft: {
        height: hp(8),
        width: wp(90),
        position: "absolute",
        top: hp(2),
        alignSelf: "center"

    },
    markerStyles: {
        height: 35,
        width: 35,
        resizeMode: 'contain'
    },

    mapStyles:
    {

        height: '100%',
        width: '100%',
    },
    bottomtext:
    {
        height: hp(30),
        width: '90%',
        marginHorizontal: '5%',
        position: 'absolute',
        bottom: wp(5),
        elevation: 10,
        borderRadius: wp(4)

    },
    bottomButton: {
        height: hp(8),
        width: wp(95),
        position: "absolute",
        bottom: hp(2),
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    rightButton: {
        height: '100%',
        width: "20%",
        justifyContent: "center",
        alignItems: "center"

    },
    imageStylesTag: {
        height: wp(5),
        width: wp(5),
        resizeMode: 'contain',


    },
    imageStylesAdd: {
        height: wp(4),
        width: wp(4),
        resizeMode: 'contain',
        tintColor: colors.grey

    },
    imageStylesSub: {
        height: wp(4),
        width: wp(4),
        resizeMode: 'contain',
        tintColor: colors.grey1
    },
    leftButton: {
        height: '100%',
        width: "9%",
        justifyContent: "space-between",

    },
    leftAddButton: {
        height: '50%',
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.white,
        elevation: 2
    },
    leftSubButton: {
        height: '50%',
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.white,
        marginTop: 4,
        elevation: 2,

    },
    rightButtonGps: {
        height: '100%',
        width: "80%",
        backgroundColor: colors.white,
        borderRadius: wp(15),
        justifyContent: "center",
        alignItems: "center"
    }
});
export default Styles;