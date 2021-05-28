//================================ React Native Imported Files ======================================//

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { StyleSheet } from 'react-native';

//================================ Local Imported Files ======================================//

import colors from '../../Assets/Colors/colors';

const Styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        // backgroundColor: colors.black,
    },
    headerCotainer: {
        flex: 0.1,
    },
    bottomContainer: {
        flex: 0.9,
        // alignItems: "center"
        // backgroundColor: "red"

    },
    uperfieldsContainer: {
        width: wp(90),
        marginTop: hp(2),
        // backgroundColor: "green",
        alignSelf: "center",
        borderColor: colors.AppGreenColor,
        borderWidth: 1,
        borderRadius: wp(3)

        // marginHorizontal: wp(3)

    },
    titleContainer: {
        height: hp(8),
        width: '90%',
        marginTop: hp(2),
        // backgroundColor: "green",
        alignSelf: "center",
        // borderColor: colors.AppGreenColor,
        // borderWidth: 1,
        // borderRadius: wp(3)


    },
    locationContainer: {
        width: '90%',
        // marginTop: hp(2),
        // backgroundColor: "green",
        alignSelf: "center",
        borderColor: colors.AppGreenColor,
        borderWidth: 1,
        borderRadius: wp(10),
        backgroundColor: 'white',
        marginBottom: hp(2),
        paddingVertical: hp(1.5),
        paddingHorizontal: hp(1.5),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    DescripationContainer: {
        height: hp(25),
        width: '90%',
        // marginTop: hp(2),
        // backgroundColor: "green",
        alignSelf: "center",
        // borderColor: colors.AppGreenColor,
        // borderWidth: 1,
        // borderRadius: wp(3)
    },
    textInput: {
        height: hp(8),
        width: '70%',
        // backgroundColor: "red",
        // justifyContent: "center",
        alignItems: "center",
        marginTop: wp(2)
    },
    checkboxContainer: {
        height: hp(5),
        width: '90%',
        alignSelf: "center",
        flexDirection: "row",
        borderColor: colors.AppGreenColor,
        // borderWidth: 1,
        // borderRadius: wp(3),
        marginTop: hp(2),
        // backgroundColor: "green",
        // alignSelf: "center",
    },
    mainText: {
        height: hp(10),
        width: '90%',
        alignSelf: "center",
        // backgroundColor: "green",
        paddingLeft: wp(8)
    },
    addPic: {
        height: hp(25),
        width: '90%',
        alignSelf: "center",
        // backgroundColor: "red",
        borderColor: colors.AppGreenColor,
        borderWidth: 1,
        borderRadius: wp(3),
        marginTop: wp(2),
        justifyContent: "center",
        alignItems: "center",
        overflow: 'hidden'
    },
    addMorePic: {
        height: hp(5),
        width: '90%',
        alignSelf: "center",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        // backgroundColor: "red",
        borderColor: colors.AppGreenColor,
    },
    textView: {
        height: hp(5),
        width: '90%',
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center"
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
    buttonView: {
        height: hp(10),
        width: '90%',
        marginTop: wp(7),
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center"

    },
    addPicStyle: {
        alignItems: "center"
    },
    imageStylesTag: {
        height: wp(5),
        width: wp(5),
        resizeMode: 'contain',

    },
    checkboxInputContainer: {
        height: hp(8),
        width: '90%',
        alignSelf: "center",
        alignItems: "center",
        // backgroundColor: "green",
        flexDirection: "row"
    },
    checkboxImage: {
        height: hp(5),
        width: '10%',
        // backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center"

    },
    checkboxText: {
        height: hp(5),
        width: '90%',
        // backgroundColor: "pink",
        justifyContent: "center"
    },
    forSaleText: {
        height: hp(5),
        width: '20%',
        // backgroundColor: "pink",
        justifyContent: "center"
    },
    checkboxTextStyle: {
        fontSize: wp(3.5),
        fontWeight: "bold"

    },
    addMorePicStyle: {
        color: colors.AppGreenColor,
        fontStyle: "italic",

        // fontSize: wp(3.5),
        // fontWeight: "bold"
    },
    picTextStyle: {
        fontStyle: "italic"
    },
    textStyle: {
        color: colors.AppGreenColor
        // paddingRight: 18
        // fontSize: wp(3.5),
        // fontWeight: "bold"
        // marginRight: 10
    },
    categoryDropDownCotainer: {
        height: hp(8),
        width: '90%',
        // backgroundColor: "green",
        alignSelf: "center",

        // width: '90%',
        // marginHorizontal: wp(4)
        // alignSelf: "center",
        // justifyContent: "center",
        // alignItems: "center",
        // paddingLeft:'5%',
        // backgroundColor:'red'

    },
    // checkBoxTextContainer: {
    //     height: hp(8),
    //     width: '90%',
    //     // marginTop: hp(2),
    //     backgroundColor: "green",
    //     // alignSelf: "center",

    // },
    dropdownStyle: {
        backgroundColor: colors.white,
        height: hp(6),
        width: '97%',
        borderColor: colors.AppGreenColor,
        borderWidth: 1,
        borderRadius: wp(8)


        // width: wp(90),
        // paddingHorizontal:'1%',
        // borderWidth:1,
        // borderColor: colors.AppGreenColor,
        // borderRadius: 1
    },
    dropdownLeftOptionsStyle: {
        // backgroundColor:'green',
        marginLeft: '2%',
        width: wp(76)
    },
    dropdownButtonText: {
        color: '#1F2023',
    },
    removeBtn: {
        position: 'absolute',
        right: 5,
        top: 5,
        borderRadius: 100,
        overflow: 'hidden',
        backgroundColor: 'white',
        padding: 2,
        borderColor: '#871E2C',
        borderWidth: 1,
        zIndex: 999999
    },
    removeBtnIcon: {
        width: 15,
        height: 15,
        resizeMode: 'contain'
    }

});

export default Styles;
