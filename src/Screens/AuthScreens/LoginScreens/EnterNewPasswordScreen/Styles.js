
//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { StyleSheet } from "react-native";

//================================ Local Imported Files ======================================//

import colors from '../../../../Assets/Colors/colors';

const Styles = StyleSheet.create({

    mainContainer:
    {
        flex: 1,

    },

    headerView:
    {
        height: wp(13),
        width: '100%',
    },
    upperView:
    {
        height: wp(40),
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    midView:
    {
        height: wp(85),
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: wp(2),
        backgroundColor: 'rgba(255, 255, 255, 0.3)'

    },
    textStyleSignup: {
        fontSize: wp(4.5),
        color: colors.white,
        marginBottom: wp(4),
        marginTop: wp(4)
    },
    buttonView:
    {
        height: wp(30),
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingTop: wp(2),

    },
    lowerView:
    {
        height: wp(34),
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.3)'
    },
    imageStyles:
    {
        height: '50%',
        width: '50%',
        resizeMode: 'contain'
    },
    textStyle:
    {
        fontSize: wp(4),
        color: colors.bright_red,
        textAlign: 'center',
        textDecorationLine: "underline",
    },
    buttonStyles:
    {
        borderRadius: wp(7),
        height: hp(8),
        width: '85%',
        backgroundColor: colors.white,
        marginBottom: wp(4),

    },
    titleStyles: {
        color: colors.white,
        fontSize: wp(4),
        fontWeight: "bold"
    },
    checkBoxContainer:
    {
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: wp(12),

    },
    checkBoxIcon:
    {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    checkBoxText:
    {
        flex: 0.9,
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
        paddingLeft: wp(3)
    }

});
export default Styles;
