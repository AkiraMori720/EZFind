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
    bottomContainer: {
        paddingHorizontal: wp(5),
        paddingBottom: wp(5)
    },
    addContainer: {
        //flex: 0.12,
        position: 'absolute',
        right: 10,
        bottom: 20,
        alignItems: "flex-end",
        paddingRight: wp(4),
        paddingBottom: wp(5)
    },
    addButtonStyleContainer: {
        backgroundColor: colors.AppGreenColor,
        borderRadius: wp(20),
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        padding: wp(6)
    },
    imageStylesTag: {
        height: wp(5),
        width: wp(5),
        resizeMode: 'contain',
        tintColor: colors.white

    },
    checkboxTextStyle: {
        fontSize: wp(3.5),
        color: colors.grey1,
        marginTop: wp(3),
        paddingLeft: wp(2),
        marginBottom: wp(1)

    },
    flatListContainer: {
        width: '100%',
    },
});
export default Styles;
