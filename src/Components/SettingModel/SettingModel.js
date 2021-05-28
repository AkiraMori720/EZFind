import React from 'react';
import { View, Text, Image, ImageBackground, Platform, StyleSheet, TouchableOpacity, Settings } from 'react-native';
import { Divider, SocialIcon } from 'react-native-elements';

import Modal from 'react-native-modal';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../Assets/Colors/colors';
import images from '../../Assets/Images/images';



class SettingsModel extends React.Component {



    render() {
        return (
            <View style={styles.mainContainer}>


                <View style={styles.conatiner}>


                    <View style={styles.mainModelContainer} >
                        <ImageBackground style={styles.mainModelPicContainer} source={images.backgroundImage}>
                            <Image source={images.logo}
                                style={styles.imageStylesTag}
                            />

                        </ImageBackground>
                        <View style={styles.textContainer}>
                            <Text>This app lets users to post an item they want to dispose and make it available for people who want to take it. Users of this app gets to re-purpose items by making it available for other people who needs it.</Text>
                        </View>

                        <View style={styles.buttonViewContainer}>
                            <View style={styles.okViewContainer}>
                                

                            </View>
                            <View style={styles.CancelViewContainer}>
                                <TouchableOpacity onPress={this.props.onPressCancel}>
                                    <Text style={styles.AgreeTextStyleContainer}>
                                        CLOSE
                                    </Text>
                                </TouchableOpacity>
                            </View>


                        </View>



                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        // backgroundColor: 'white'

    },
    mainModelPicContainer: {
        height: hp(20), width: '100%', backgroundColor: "red", justifyContent: "center", alignItems: "center", elevation: 5,
    },
    imageStylesTag: {
        height: wp(20),
        width: wp(20),
        resizeMode: 'contain',

    },
    textContainer: {
        width: '100%', justifyContent: "center", alignItems: "center", paddingTop: wp(3),
        paddingHorizontal: wp(3)
    },
    modelText:
    {
        fontSize: wp(3.8)
    },
    mainModelContainer: {
        //height: Platform.OS === 'ios' ? wp(79) : wp(70),
        width: '80%',
        backgroundColor: "white",
        alignItems: 'center',
        alignSelf: 'center',
        // marginHorizontal: wp(5)
    },
    ModelMessageTextColorContainer: {
        color: colors.AppGreenColor,
        fontSize: wp(3.8)

    },
    ModelMessageColorContainer: {
        height: hp(3.5),
        width: '20%',
        alignItems: 'flex-start',
        // backgroundColor:"red"


    },
    ModelMessagePrivacyContainer: {
        height: '100%',
        width: '37%',
        alignItems: "flex-start"


    },
    ModelMessageAndContainer: {
        height: '100%',
        width: '9%',
        alignItems: 'flex-start',

    },
    ModelMessageAndConditionContainer: {
        height: '100%',
        width: wp(27),
        alignItems: 'flex-start',






    },
    ModelMessageBothTwoContainer: {
        height: wp(7),
        width: '100%',
        flexDirection: 'row',

        alignItems: 'flex-start'



    },
    AgreeTextStyleContainer: {
        fontWeight: 'bold',
        color: colors.AppGreenColor,

    },
    ModelTitleContainer: {
        height: wp(11),
        width: '90%',
        justifyContent: "center",



    },
    conatiner:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)'

    },
    ModelMessageSimpleContainer: {
        height: '100%',
        width: '72%',
        // backgroundColor:"pink"


    },
    ModelMessageContainer: {
        height: wp(14),
        width: '90%',

        justifyContent: 'center'



    },
    ModelMessageBothContainer: {
        height: wp(6),
        width: '100%',
        flexDirection: 'row',

        alignItems: "flex-end"


    },
    ModelTitleTextContainer: {
        fontWeight: 'bold',
        fontSize: wp(4.5),
        color: colors.AppRedColor

    },
    rateTextStyleContainer: {
        color: 'black',
        fontWeight: 'bold',


    },
    ratingViewContainer: {
        height: '15%',
        width: '90%',


    },
    rateViewContainer: {
        height: '15%',
        width: '100%',
        justifyContent: "center",
        alignItems: "center",

    },
    secondTextViewContainer: {
        height: '20%',
        width: '80%',


    },
    socialViewContainer: {
        height: '15%',
        width: '80%',
        flexDirection: "row",

        justifyContent: 'center'


    },
    secondTextStyleContainer: {
        color: 'black',
        textAlign: 'center'
    },
    buttonViewContainer: {
        height: wp(15),
        width: '90%',
        flexDirection: "row",
    },
    CancelViewContainer: {
        height: '100%',
        width: '30%',
        justifyContent: "center",
        alignItems: "center",
        alignSelf: 'center',
        alignContent: 'center',

    },
    okViewContainer: {
        height: '100%',
        width: '70%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 4,

    },



});

export default SettingsModel;