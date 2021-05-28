
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
        flex: 0.88,
        alignItems: 'center',
        padding: wp(5),
        borderTopColor: colors.white,
        borderTopWidth: wp(0.7),
    },
    textContainer:
    {
        fontSize: wp(4),
        color: colors.black,
    }

});
export default Styles;