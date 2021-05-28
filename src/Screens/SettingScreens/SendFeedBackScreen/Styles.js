
//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { StyleSheet } from "react-native";

//================================ Local Imported Files ======================================//

import colors from "../../../Assets/Colors/colors";

const Styles = StyleSheet.create({

    mainContainer:
    {
        flex: 1,
    },
    headerView:
    {
        backgroundColor: colors.appDarkBlue,
        flex: 0.1
    },
    middleView: {
        marginTop: wp(4),
        flex: 0.55,
        marginHorizontal: wp(3),
        borderColor: colors.AppGreenColor,
        borderWidth: 1,
        borderRadius: wp(3)

    },
    LastView: {
        flex: 0.2,
        marginHorizontal: wp(3),
        justifyContent: "center",
        alignItems: "center",
    },
    uploadButtonView: {
        width: '100%',
        height: '50%',
        justifyContent: "flex-end",
        alignItems: "center",

    },
    saveButtonView: {
        width: '100%',
        height: '50%',
        justifyContent: "center",
        alignItems: "center",
    },
    titleStyles: {
        color: colors.white,
        fontSize: wp(4),

    },
    bottomContainer: {
        flex: 0.9,
    },
    uperfieldsContainer: {
        height: hp(55),
        width: wp(90),
        marginTop: hp(2),
        backgroundColor: colors.white,
        alignSelf: "center",
        borderColor: colors.AppGreenColor,
        borderWidth: 1,
        borderRadius: wp(3)

    },
    titleNameContainer: {
        height: hp(8),
        width: '90%',
        marginTop: hp(2),
        alignSelf: "center",

    },
    titleContainer: {
        height: hp(8),
        width: '90%',
        alignSelf: "center",

    },
    NameView: {
        marginTop: wp(2),
        height: hp(8),
        borderColor: colors.AppGreenColor,
        borderRadius: wp(8),
        borderWidth: 1.5,
        marginHorizontal: wp(3)

    },
    EmailView: {
        marginTop: wp(2),
        height: hp(8),
        borderColor: colors.AppGreenColor,
        borderRadius: wp(2),
        borderWidth: 1,
        marginHorizontal: wp(3)

    },
    SubjectView: {
        marginTop: wp(2),
        height: hp(8),
        borderColor: colors.AppGreenColor,
        borderRadius: wp(2),
        borderWidth: 1,
        marginHorizontal: wp(3)

    },
    MessageView: {
        height: hp(15),
        borderColor: colors.AppGreenColor,
        borderRadius: wp(2),
        borderWidth: 1,
        marginHorizontal: wp(3)

    },
    CharacterView: {
        height: hp(5),
        alignItems: "flex-end",
        paddingRight: '5%',
        position: 'absolute',
        top: hp(21),
        right: wp(0)
    },
    CharacterStyle: {
        color: colors.placeholder_text_color,
    },
    buttonStyles:
    {
        borderRadius: wp(7),
        height: hp(8),
        width: '100%',
    },
});
export default Styles;