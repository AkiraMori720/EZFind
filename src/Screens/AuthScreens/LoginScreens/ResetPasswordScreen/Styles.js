
//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { StyleSheet } from "react-native";

//================================ Local Imported Files ======================================//

import colors from '../../../../Assets/Colors/colors';

const Styles = StyleSheet.create({

    mainContainer:
    {
        flex: 1,
        backgroundColor: colors.appDarkBlue
    },

    headerView:
    {
        flex: 0.09
    },
    textStyle1:
    {
        fontSize: wp(5),
        color: colors.appYellow,
        textAlign: 'center',
        marginBottom: wp(8)
    },
    upperView:
    {
        flex: 0.36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleStyles: {
        color: colors.white,
        fontSize: wp(4),
        fontWeight: "bold"
    },
    midView:
    {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: wp(2),
        backgroundColor: 'rgba(255, 255, 255, 0.3)'
    },

    lowerView:
    {
        flex: 0.25,
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
        color: colors.white,
        textAlign: 'center'
    },
    buttonStyles:
    {
        borderRadius: wp(7),
        height: hp(8),
        width: '85%',
        backgroundColor: colors.white,
        marginBottom: wp(4),
    },
    textContainer:
    {
        flex: 0.5,
        paddingHorizontal: wp(10),
        paddingTop: wp(5),
        justifyContent: 'center',
        alignItems: 'center',
    }

});
export default Styles;
