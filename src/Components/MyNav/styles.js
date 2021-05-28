import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Platform } from 'react-native';
import colors from '../../Assets/Colors/colors';

let Styles = {
    drawerMainContainer: {
        width: "100%"
        // backgroundColor: 'red',
    },
    backgroundImageContainer: {
        width: "100%", height: hp(100),
    },
    userInfoContainer: {
        width: "100%",
        paddingTop: wp(10),
        //height: Platform.OS === 'ios' ? "22%" : '20',
        // paddingTop: wp(5),
        // backgroundColor: colors.bright_red,
        // flexDirection: "row"
    },
    userImageContainer: {
        width: "100%",
        paddingTop: hp(2),
        // backgroundColor: colors.blue,

        // width: "40%",
        justifyContent: "center",
        alignItems: "center"
    },

    userProfileImage: {
        width: wp(20),
        height: wp(20),
        resizeMode: 'cover',
        borderRadius: wp(11.5),
        overflow: 'hidden',
        backgroundColor: 'gray'
    },
    userTextContainer: {
        width: "100%",
        //height: "20%",
        backgroundColor: colors.white,
        paddingTop: hp(2),


        // flexDirection: "column",
        // justifyContent: "center",
        // alignItems: "flex-start",
        // paddingLeft: wp(5)
    },
    userNameText: {
        textAlign: "center",
        color: colors.black,
        fontSize: 17,
        fontWeight: "bold"
    },
    emailText: {
        marginTop: 5,
        textAlign: "center",
        color: "white",
        fontSize: 13
    },
    drawerItemsContainer: {
        width: "100%",
        marginTop: wp(5),


    },
    drawerItemLabelText: {
        fontWeight: "500",
        fontSize: wp(3.5),
        color: colors.AppGreenColor,

    },
    drawerItemImage: {
        width: 17,
        height: 17,
        tintColor: colors.AppGreenColor,
        resizeMode: "contain"
    }
    ,
    drawerItemStyles:
    {
        //height: Platform.OS === 'ios' ? wp(12) : wp(11),
        // width:wp(100),
        marginVertical: wp(0.5),
        // backgroundColor: colors.bright_red,
        justifyContent: 'center',
        borderColor: colors.AppGreenColor,
        borderWidth: 1,
        borderRadius: wp(10)

    },
    drawerItemStylesLogin: {
        //height: Platform.OS === 'ios' ? wp(12) : wp(11),
        // width:wp(100),
        marginVertical: wp(0.5),
        backgroundColor: colors.white,
        justifyContent: 'center',
        borderColor: colors.bright_red,
        borderWidth: 1,
        borderRadius: wp(10)
    }

};
export default Styles;
