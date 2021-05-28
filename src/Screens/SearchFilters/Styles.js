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
        flex: 0.9,
    },
    uperfieldsContainer: {
        height: hp(35),
        width: wp(90),
        marginTop: hp(2),
        alignSelf: "center",
        borderColor: colors.AppGreenColor,
        borderWidth: 1,
        borderRadius: wp(3),
        paddingHorizontal: wp(3)

    },
    buttonView: {
        height: hp(40),
        width: wp(90),
        marginTop: hp(2),
        alignSelf: "center",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    checkboxTextStyle: {
        fontSize: wp(3.5),
        fontWeight: "bold",
        marginTop: wp(2)

    },
    checkboxText: {
        height: hp(4),
        width: '90%',
        alignSelf: "center",
        flexDirection: "row"

    },
    checkboxImage: {
        height: hp(5),
        width: '10%',
        justifyContent: "center",
        alignItems: "center"

    },
    forSaleText: {
        height: hp(5),
        width: '60%',
        justifyContent: "center",
        paddingBottom: wp(2)
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
});

export default Styles;
