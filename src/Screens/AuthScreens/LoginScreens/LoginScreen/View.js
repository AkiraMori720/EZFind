
//================================ React Native Imported Files ======================================//

import { View, Text, StatusBar, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React from 'react';

//================================ Local Imported Files ======================================//

import AppHeader from '../../../../Components/AppHeader/AppHeader';
import AppInput from '../../../../Components/AppInput/AppInput';
import Button from '../../../../Components/Button/Button';
import colors from '../../../../Assets/Colors/colors';
import images from '../../../../Assets/Images/images';
import styles from "./Styles";
import auth from '@react-native-firebase/auth';
import { connect } from 'react-redux'
import { updateUser, updateUserProfile, updateFCMToken } from './../../../../reducers/user'
import Spinner from 'react-native-loading-spinner-overlay';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import { STORAGE_REMEMBER } from '../../../../constant'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            email: null,
            password: null,
            remember: false,
            showpwd: false
        }
    }
    async componentDidMount() {
        try {
            const value = await AsyncStorage.getItem(STORAGE_REMEMBER)
            if (value !== null) {
                const email = await AsyncStorage.getItem('email')
                const password = await AsyncStorage.getItem('password')
                this.setState({ remember: true, email, password })
            }
        } catch (e) {
            // error reading value
        }
    }
    onLoginEmailAndPassword() {
        if (this.state.email && this.state.password) {
            this.setState({ spinner: true })
            auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(async (res) => {
                    if (res && res.user && res.user._user) {
                        try {
                            await AsyncStorage.setItem('email', this.state.remember ? this.state.email : null)
                            await AsyncStorage.setItem('password', this.state.remember ? this.state.password : null)
                        } catch (e) {
                            console.log(e)
                        }
                        console.log('User account created & signed in!', res);
                        firestore()
                            .collection(`users`)
                            .doc(`${res.user._user.uid}`)
                            .get()
                            .then((doc) => {
                                if (doc) {
                                    console.log('fetch user profile!', doc.data());
                                    const user_data = doc.data()
                                    if (user_data && user_data.disabled || user_data.type == 'admin') {
                                        alert(user_data.type == 'admin' ? "You can't login as admin." : "Your account is inactived.")
                                        this.setState({ spinner: false })
                                        try {
                                            auth()
                                                .signOut()
                                                .then(() => {
                                                    this.props.updateUser()
                                                }).catch(e => {
                                                    this.props.updateUser()
                                                });
                                        } catch (e) {
                                            this.props.updateUser()
                                        }
                                        return
                                    }
                                    this.props.updateUser(res.user._user)
                                    this.setState({ spinner: false })
                                    setTimeout(() => {
                                        this.props.navigation.navigate('drawer')
                                    }, 100)
                                    this.props.updateFCMToken()
                                    this.props.updateUserProfile(doc.data())
                                }
                            })
                    }
                    else {
                        this.setState({ spinner: false })
                        setTimeout(() => {
                            alert("failed login!")
                        }, 100)
                    }
                })
                .catch(error => {
                    this.setState({ spinner: false })
                    setTimeout(() => {
                        if (error.code === 'auth/user-not-found') {
                            alert('User is not registered with this email.');
                            return
                        }
                        if (error.code === 'auth/email-already-in-use') {
                            alert('That email address is already in use!');
                            return
                        }

                        if (error.code === 'auth/invalid-email') {
                            alert('That email address is invalid!');
                            return
                        }

                        alert(error);
                    }, 100)
                });
        } else {
            alert('Please enter email and password.')
        }
    }

    render() {
        const { email, password, remember, showpwd } = this.state
        return (
            <ImageBackground style={styles.mainContainer} source={images.backgroundImage}>
                <View style={styles.headerView}>

                    {/* //================================ StatusBar ======================================// */}
                    <StatusBar barStyle="dark-content" hidden={false} backgroundColor={colors.AppDarkGreenColor} translucent={false} />

                    {/* //================================ Header ======================================// */}
                    <AppHeader
                        headerHeight='100%'
                        titleFontSize={wp(5)}
                        leftIconPath={images.headerLeftBack}
                        iconWidth={wp(5)}
                        onLeftIconPress={() => this.props.navigation.goBack()}
                        lefticonSize={wp(5)}
                    />
                </View>
                {/* //================================ Logo ======================================// */}
                <View style={styles.upperView}>
                    <Image
                        style={styles.imageStyles}
                        source={images.logo}  >
                    </Image>
                </View>
                <KeyboardAwareScrollView style={{ paddingBottom: 30, backgroundColor: 'rgba(255, 255, 255, 0.3)' }} enableOnAndroid>
                    <View style={styles.midView}>
                        <Text style={styles.textStyleSignup}>LOGIN</Text>

                        {/* //================================ Email Input ======================================// */}
                        <AppInput
                            height={hp(6)}
                            placeholder={'Email'}
                            width={'80%'}
                            colortextInput={colors.white}
                            paddingLeft={wp(5)}
                            placeholderTextColor={colors.white}
                            marginBottom={wp(3)}
                            marginTop={5}
                            borderRadius={wp(7)}
                            backgroundColor={colors.AppBlackColor}
                            leftIconPath={images.ic_email}
                            value={email}
                            onChangeText={value => this.setState({ email: value })}
                            keyboardType="email-address"
                        />
                        {/* //================================ Password Input ======================================// */}
                        <AppInput
                            height={hp(6)}
                            borderRadius={wp(7)}
                            placeholder={'Password'}
                            width={'80%'}
                            marginTop={5}
                            onRightIconPress={() => this.togglePassword()}
                            colortextInput={colors.white}
                            paddingLeft={wp(5)}
                            placeholderTextColor={colors.white}
                            rightIconSize={wp(5)}
                            marginBottom={wp(3)}
                            backgroundColor={colors.AppBlackColor}
                            rightIconPath={showpwd ? images.ic_eye_no : images.ic_eye}
                            tintColor={colors.grey1}
                            tintColor={colors.white}
                            leftIconPath={images.ic_key}
                            value={password}
                            onChangeText={value => this.setState({ password: value })}
                            secureEntry={!showpwd}
                            onRightIconPress={() => this.setState({ showpwd: !showpwd })}
                        />
                        {/* //================================ Remember Me ======================================// */}
                        <View style={styles.checkBoxContainer}>
                            <TouchableOpacity
                                style={styles.checkBoxIcon}
                                onPress={async () => {
                                    this.setState({ remember: !remember })
                                    if (!remember) {
                                        try {
                                            await AsyncStorage.setItem(STORAGE_REMEMBER, 'true')
                                        } catch (e) {
                                            console.log(e)
                                        }
                                    } else {
                                        try {
                                            await AsyncStorage.removeItem(STORAGE_REMEMBER)
                                            await AsyncStorage.removeItem('email')
                                            await AsyncStorage.removeItem('password')
                                        } catch (e) {
                                            console.log(e)
                                        }
                                    }
                                }}>
                                <Image
                                    style={styles.checkBoxIconStyle}
                                    source={remember ? images.ic_check_green : images.ic_check}
                                />
                            </TouchableOpacity>
                            <View style={styles.checkBoxText}>
                                <Text style={[styles.checkBoxTextStyle]}>Remember Me</Text>
                            </View>
                        </View>

                    </View>
                    {/* //================================ Buttons ======================================// */}
                    <View style={styles.lowerView}>
                        <Button
                            height={hp(8)}
                            width={'80%'}
                            style={styles.buttonStyles}
                            title={'Login'}
                            bgColor={colors.AppGreenColor}
                            titleColor={colors.dark_red}
                            titleStyle={[styles.titleStyles]}
                            onPress={() => this.onLoginEmailAndPassword()}
                        />
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('ResetPassword')} >
                            <Text style={styles.textStyle}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
                <Spinner
                    visible={this.state.spinner}
                    textContent={''}
                />
            </ImageBackground>
        )
    }
}
const mapStateToProps = state => ({

})

const mapDispatchToProps = {
    updateUser,
    updateUserProfile,
    updateFCMToken
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)