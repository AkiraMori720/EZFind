import React from 'react';
import { View, Text, Image, ImageBackground, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { Divider, SocialIcon } from 'react-native-elements';

import Modal from 'react-native-modal';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../Assets/Colors/colors';
import I18n from "../../i18n";



class MyModel extends React.Component {



    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.conatiner}>
                    <View style={styles.mainModelContainer} >
                        <View style={styles.ModelTitleContainer}>
                            <Text style={styles.ModelTitleTextContainer}>
                                {I18n.t('Sign Up')}
                            </Text>
                        </View>
                        <View style={styles.ModelMessageContainer}>
                            <Text style={styles.modelText}>
                                {I18n.t('By_signing_up_you_agree_with_the')} <Text style={styles.ModelMessageTextColorContainer} onPress={this.props.onPressTerm}>
                                {I18n.t('Terms and Conditions')}
                            </Text> {I18n.t('and')} <Text style={styles.ModelMessageTextColorContainer} onPress={this.props.onPressPrivacy}>{I18n.t('Privacy Policy')} </Text>
                            </Text>

                        </View>
                        <View style={styles.buttonViewContainer}>
                            <View style={styles.okViewContainer}>
                                <TouchableOpacity onPress={this.props.onPressAgree} >
                                    <Text style={styles.AgreeTextStyleContainer}>
                                        {I18n.t('AGREE')}
                                    </Text>
                                </TouchableOpacity>

                            </View>
                            <View style={styles.CancelViewContainer}>
                                <TouchableOpacity onPress={this.props.onPressCancel}>
                                    <Text style={styles.AgreeTextStyleContainer}>
                                        {I18n.t('CANCEL')}
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
    modelText:
    {
        fontSize: wp(3.8),
        lineHeight: wp(6),
    },
    mainModelContainer: {
        //height: wp(40),
        width: '90%',
        backgroundColor: "white",
        alignItems: 'center',
        alignSelf: 'center',
    },
    ModelMessageTextColorContainer: {
        color: colors.AppGreenColor,
        fontSize: wp(3.8),
        lineHeight: wp(6),
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
        backgroundColor: 'transparent'
    },
    ModelMessageContainer: {
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
        width: '90%',
        flexDirection: "row",
        marginVertical: wp(4)
    },
    CancelViewContainer: {
        width: '30%',
        justifyContent: "center",
        alignItems: "center",
        alignSelf: 'center',
        alignContent: 'center',

    },
    okViewContainer: {
        width: '70%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 4,

    },



});

export default MyModel;