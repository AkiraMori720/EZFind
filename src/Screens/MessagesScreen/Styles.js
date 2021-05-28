
//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { StyleSheet } from "react-native";

//================================ Local Imported Files ======================================//

import colors from '../../Assets/Colors/colors';

const Styles = StyleSheet.create({

    mainContainer:
    {
        flex: 1,
    },
    headerView:
    {
        flex: 0.10,
    },
    container:
    {
        flex: 0.90,
        marginHorizontal: wp(5)
    },
    upperView:
    {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewImageContainer:
    {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle:
    {
        height: wp(50),
        width: wp(50),
        resizeMode: 'contain',
        borderRadius: wp(25),
        overflow: 'hidden'
    },
    inputsView:
    {
        flex: 0.4,
        alignItems: 'center',
    },
    viewButton:
    {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
    },

    topView:
    {
        flex: 0.55,

    },
    incidentView:
    {
        flex: 0.45
    },
    incidentIndicator:
    {
        height: wp(6),
        width: '92%',
        marginHorizontal: '4%',
        borderRadius: wp(1.5),
        paddingHorizontal: wp(2),
        marginVertical: wp(2),
        backgroundColor: colors.dark_red,
        flexDirection: 'row',
        alignItems: 'center'
    },
    leftIconStyle:
    {
        height: wp(3.5),
        width: wp(3.5),
        resizeMode: 'contain',
        tintColor: colors.white,
    },
    textStyleIncident:
    {
        fontSize: wp(3.5),
        color: colors.white,
        paddingLeft: wp(2),
        fontWeight: 'bold'
    }
});
export default Styles;
