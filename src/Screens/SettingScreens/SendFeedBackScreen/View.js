
//================================ React Native Imported Files ======================================//

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, StatusBar, Keyboard, TouchableWithoutFeedback } from 'react-native';
import React from 'react';

//================================ Local Imported Files ======================================//

import AppHeader from '../../../Components/AppHeader/AppHeader';
import AppInput from '../../../Components/AppInput/AppInput';
import Button from '../../../Components/Button/Button';
import images from '../../../Assets/Images/images';
import colors from '../../../Assets/Colors/colors';
import styles from './Styles'

import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux'
import firestore from '@react-native-firebase/firestore';
var MessageBarManager = require('react-native-message-bar').MessageBarManager;

const max_length = 5000
class SendFeedback extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            subject: '',
            message: ''
        }
    }
    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }
    submit() {
        const { name, email, subject, message } = this.state
        if(!this.validateEmail(email)){
            alert('Please enter valid email address.')
            return 
        }
        if (name && name.length > 0 && email && email.length && subject && subject.length > 0 && message && message.length) {
            this.setState({ spinner: true })
            var self = this;
            firestore()
                .collection('feedbacks')
                .add({
                    name, email, subject, message, createdat: Date.now(), createdby: this.props.user.uid
                })
                .then(() => {
                    self.setState({ spinner: false }, () => {
                        setTimeout(() => {
                            MessageBarManager.showAlert({
                                title: '',
                                message: 'Successfully sent!',
                                alertType: 'success'
                            });
                            self.props.navigation.goBack()
                        }, 100)
                    })
                });
        } else alert('Please fill out this form.')
    }
    render() {
        const { name, email, subject, message } = this.state
        return (
            <TouchableWithoutFeedback
                onPress={() => Keyboard.dismiss()}>
                <View style={styles.mainContainer}>
                    {/* //================================ StatusBar ======================================// */}

                    <StatusBar barStyle="dark-content" hidden={false} backgroundColor={colors.AppDarkGreenColor} translucent={false} />
                    {/* //================================ Header ======================================// */}
                    <View style={styles.headerView}>

                        <AppHeader
                            headerHeight='100%'
                            title={'Report a Problem'}
                            titleFontSize={wp(5)}
                            leftIconPath={images.headerLeftBack}
                            iconWidth={wp(5)}
                            lefticonSize={wp(5)}
                            bgColor={colors.AppGreenColor}
                            onLeftIconPress={() => this.props.navigation.goBack()}

                        />
                    </View>
                    {/* //================================ Middle Container ======================================// */}
                    <View style={styles.bottomContainer}>
                        <View style={styles.uperfieldsContainer}>
                            <View style={styles.titleNameContainer}>
                                <AppInput
                                    height={hp(6)}
                                    placeholder={'Name'}
                                    width={'100%'}
                                    colortextInput={colors.black}
                                    placeholderTextColor={colors.placeholder_text_color}
                                    backgroundColor={colors.white}
                                    borderRadius={wp(8)}
                                    borderWidth={1}
                                    borderColor={colors.AppGreenColor}
                                    value={name}
                                    onChangeText={value => this.setState({ name: value })}
                                />
                            </View>
                            <View style={styles.titleContainer}>
                                <AppInput
                                    height={hp(6)}
                                    placeholder={'Email Address'}
                                    width={'100%'}
                                    colortextInput={colors.black}
                                    placeholderTextColor={colors.placeholder_text_color}
                                    backgroundColor={colors.white}
                                    borderRadius={wp(8)}
                                    borderWidth={1}
                                    borderColor={colors.AppGreenColor}
                                    value={email}
                                    onChangeText={value => this.setState({ email: value })}
                                />
                            </View>
                            <View style={styles.titleContainer}>
                                <AppInput
                                    height={hp(6)}
                                    placeholder={'Subject/Concern'}
                                    width={'100%'}
                                    colortextInput={colors.black}
                                    placeholderTextColor={colors.placeholder_text_color}
                                    backgroundColor={colors.white}
                                    borderRadius={wp(8)}
                                    borderWidth={1}
                                    borderColor={colors.AppGreenColor}
                                    value={subject}
                                    onChangeText={value => this.setState({ subject: value })}
                                />
                            </View>
                            <View style={styles.titleContainer}>
                                <AppInput
                                    height={hp(25)}
                                    placeholder={'Message'}
                                    width={'100%'}
                                    colortextInput={colors.black}
                                    placeholderTextColor={colors.placeholder_text_color}
                                    backgroundColor={colors.white}
                                    borderRadius={wp(4)}
                                    borderWidth={1}
                                    borderColor={colors.AppGreenColor}
                                    value={message}
                                    onChangeText={value => {
                                        if (max_length - message.length >= 0)
                                            this.setState({ message: value })
                                    }}
                                    multiline={true}
                                    numberOfLines={7}
                                    textAlignVertical="top"
                                />
                                <View style={styles.CharacterView}>
                                    <Text style={styles.CharacterStyle}>{max_length - message.length} Remaining Characters</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/* //================================ Buttons ======================================// */}
                    <View style={styles.LastView}>

                        <View style={styles.saveButtonView}>
                            <Button
                                height={hp(8)}
                                width={'90%'}
                                style={styles.buttonStyles}
                                title={'SAVE'}
                                bgColor={colors.AppGreenColor}
                                titleColor={colors.dark_red}
                                titleStyle={[styles.titleStyles]}
                                onPress={() => this.submit()}
                            />
                        </View>
                    </View>
                    <Spinner
                        visible={this.state.spinner}
                        textStyle={{ color: 'white' }}
                    />
                </View>
            </TouchableWithoutFeedback>
        )
    }
}
const mapStateToProps = state => ({
    user: state.user.user,
    profile: state.user.profile
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SendFeedback)