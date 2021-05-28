//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { StyleSheet } from "react-native";

//================================ Local Imported Files ======================================//

import colors from '../../../../Assets/Colors/colors';


const Styles = StyleSheet.create({

    mainContainer:
    {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.appDarkBlue
    },
    headerView:
    {
        height: 50
    },
    upperView:
    {
        //flex: 0.36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyleSignup: {
        fontSize: wp(5),
        color: colors.white,
        marginBottom: wp(4),
        marginTop: wp(4)
    },
    textStyle1:
    {
        fontSize: wp(5),
        color: colors.appYellow,
        textAlign: 'center',
    },
    midView:
    {
        //flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: wp(2),
    },
    lowerView:
    {
        //flex: 0.25,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20
    },
    imageStyles:
    {
        height: '40%',
        width: '50%',
        resizeMode: 'contain'
    },
    textStyle:
    {
        fontSize: wp(4),
        color: colors.AppGreenColor,
        textAlign: 'center',
        textDecorationLine: "underline",
    },
    buttonStyles:
    {
        borderRadius: wp(7),
        height: hp(8),
        width: '85%',
        marginBottom: wp(4),
    },
    titleStyles: {
        color: colors.white,
        fontSize: wp(4.5),
        fontWeight: "bold"
    },
    checkBoxContainer:
    {
        //flex: 0.4,
        flexDirection: 'row',

    },
    checkBoxIcon:
    {
        //flex: 0.4,
        justifyContent: 'center',
        alignItems: 'flex-end',

    },
    checkBoxText:
    {
        ///flex: 0.6,
        paddingHorizontal: wp(2),
        justifyContent: 'center',
    },
    checkBoxIconStyle:
    {
        height: wp(4),
        width: wp(4),
        resizeMode: 'contain',
    },
    checkBoxTextStyle:
    {
        fontSize: wp(3.5),
        color: colors.white,
    }

});

export default Styles;