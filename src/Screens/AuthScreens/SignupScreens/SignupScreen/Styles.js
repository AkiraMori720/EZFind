
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
        flex: 0.09
    },
    upperView:
    {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle1:
    {
        fontSize: wp(5),
        color: colors.appYellow,
        textAlign: 'center',
        marginBottom: wp(3)
    },
    midView:
    {
        flex: 0.42,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.3)'


    },
    buttonView:
    {
        flex: 0.12,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingTop: wp(2),
        backgroundColor: 'rgba(255, 255, 255, 0.3)'
    },
    lowerView:
    {
        flex: 0.07,
        justifyContent: 'flex-start',
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
        color: colors.AppGreenColor,
        textAlign: 'center',
        textDecorationLine: "underline",
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
    checkBoxContainer:
    {
        flex: 0.4,
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: wp(4),

    },
    checkBoxIcon:
    {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    checkBoxText:
    {
        flex: 1,
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
    },
    textStyleSignup: {
        fontSize: wp(5),
        color: colors.white,
        marginBottom: wp(4),
        marginTop: wp(4)
    },

});
export default Styles;