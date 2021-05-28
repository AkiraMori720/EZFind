//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen';
import { StyleSheet, Dimensions } from 'react-native';
const { height } = Dimensions.get('window')
//================================ Local Imported Files ======================================//

import colors from '../../Assets/Colors/colors';

const Styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    headerCotainer: {
        height: height * 0.09
    },
    bottomContainer: {
        flex: 0.8,
        paddingHorizontal: wp(5)

    },
    searchContainer: {
        height: height * 0.1,
        flexDirection: "row"
    },
    searchContainerLeft: {
        height: '100%',
        width: "87%",
        justifyContent: "center"
    },
    searchContainerRight: {
        height: '100%',
        width: "13%",
        justifyContent: "center",
        paddingBottom: 11
    },
    imageStylesTag: {
        height: wp(5),
        width: wp(5),
        resizeMode: 'contain',
    },
    textStyle: {
        paddingLeft: wp(6),
        color: colors.grey1,
        fontWeight: "bold",
    },
});

export default Styles;
