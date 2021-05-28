//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { StyleSheet } from "react-native";

//================================ Local Imported Files ======================================//

import colors from "../../../Assets/Colors/colors";

const Styles = StyleSheet.create({

    mainContainer:
    {
        flex: 1,
        backgroundColor: colors.white
    },

    headerView:
    {
        flex: 0.1,
        backgroundColor: colors.appDarkBlue
    },
    container:
    {
        flex: 0.73,
        borderTopColor: colors.white,
        paddingHorizontal: wp(4),
    },
    logout:
    {
        flex: 0.06,
        marginHorizontal: wp(4),
        paddingLeft: wp(9),
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: wp(8),
        borderWidth: 1,
        borderColor: colors.bright_red
    },
    textStyle:
    {
        fontSize: wp(4.5),
        paddingLeft: wp(5),
        color: colors.bright_red
    },
    logoutIcon:
    {
        height: wp(5),
        width: wp(5),
        resizeMode: 'contain',
        tintColor: colors.bright_red
    },

});
export default Styles;