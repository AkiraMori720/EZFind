//================================ React Native Imported Files ======================================//

import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import { View, Text, StatusBar, Image, TouchableOpacity, Modal, ImageBackground } from 'react-native';
import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment'
import auth from '@react-native-firebase/auth';
import { connect } from 'react-redux'
import { updateUser, updateUserProfile, updateFCMToken } from '../../../../reducers/user'
//================================ Local Imported Files ======================================//

import AppHeader from '../../../../Components/AppHeader/AppHeader';
import AppInput from '../../../../Components/AppInput/AppInput';
import Button from '../../../../Components/Button/Button';
import MyModel from '../../../../Components/Model/Model';
import colors from '../../../../Assets/Colors/colors';
import images from '../../../../Assets/Images/images';
import styles from './Styles';

import { CommonActions } from '@react-navigation/native';
import I18n from "../../../../i18n";

class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      view: 'this',
      showPassword: true,
      checkValue: false,

      showAlert: false,
      email: null,
      password: null,
      spinner: false,
      isValidEmail: false,
      isLeast6Char: false,
      isContainLetter: false,
      isContainNum: false,
      isContainSpecial: false,

    };
  }
  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  hasNumber(password) {
    return /\d/.test(password);
  }
  hasLetter(password) {
    return password.search(/[a-z]/i) < 0 ? false : true
  }
  hasSpecial(password) {
    const re = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    return re.test(String(password));
  }
  onPressSignup() {
    const {
      isValidEmail,
      isLeast6Char,
      isContainLetter,
      isContainNum,
      isContainSpecial } = this.state

    if (isValidEmail && isLeast6Char && isContainLetter && isContainNum && isContainSpecial) {
      this.setModalVisible(true)
    } else {
      alert(isValidEmail ? I18n.t('Please enter valid password') : I18n.t('Please enter valid email'))
    }
  }
  onCreateWithEmailAndPassword() {
    this.setModalVisible(false)
    const {
      isValidEmail,
      isLeast6Char,
      isContainLetter,
      isContainNum,
      isContainSpecial } = this.state

    if (isValidEmail && isLeast6Char && isContainLetter && isContainNum && isContainSpecial) {
      this.setState({ spinner: true })
      auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          if (res && res.user && res.user._user) {
            console.log('User account created & signed in!', res);
            this.props.updateUser(res.user._user)
            const providerData = res.user._user.providerData && res.user._user.providerData.length > 0 ? res.user._user.providerData[0] : {}
            const user_profile = { type: 'seller', createat: moment().valueOf(), ...providerData }
            firestore()
              .collection(`users`)
              .doc(`${res.user._user.uid}`)
              .set(user_profile)
              .then(() => {
                console.log('User added!');
                this.props.updateUserProfile(user_profile)
                this.setState({ spinner: false })
                setTimeout(() => {
                  this.navigteToHome()
                }, 100);
                this.props.updateFCMToken()
              })
              .catch(err => {
                this.setState({ spinner: false })
                setTimeout(() => {
                  alert(I18n.t("failed adding user data"))
                }, 100);
              });
          }
          else {
            this.setState({ spinner: false })
            setTimeout(() => {
              alert(I18n.t("failed signup"))
            }, 100);
          }
        })
        .catch(error => {
          this.setState({ spinner: false })
          setTimeout(() => {
            if (error.code === 'auth/email-already-in-use') {
              alert(I18n.t('That email address is already in use'));
              return
            }

            if (error.code === 'auth/invalid-email') {
              alert(I18n.t('That email address is invalid'));
              return
            }
            alert(error);
          }, 100);
        });
    } else {
      alert(isValidEmail ? I18n.t('Please enter valid password') : I18n.t('Please enter valid email'))
    }
  }
  //================================ Navigation Functions ======================================//

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  navigateScreem() {
    this.setModalVisible(false);
    this.props.navigation.navigate('TermsAndCondtions', {
      openModal: () => {
        this.setModalVisible(true);
      }
    })
  }
  Privacy() {
    this.setModalVisible(false);
    this.props.navigation.navigate('PrivacyScreen', {
      openModal: () => {
        this.setModalVisible(true);
      }
    })
  }

  navigteToHome() {
    this.setModalVisible(false);
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'drawer' },
        ],
      })
    );
  }

  togglePassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }
  render() {
    const {
      modalVisible,
      email,
      password,
      isValidEmail,
      isLeast6Char,
      isContainLetter,
      isContainNum,
      isContainSpecial,
      showPassword } = this.state
    return (
      <ImageBackground style={styles.mainContainer} source={images.backgroundImage}>
        {/* //================================ StatusBar ======================================// */}
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor={colors.AppGreenColor}
          translucent={false}
        />
        {/* //================================ Header ======================================// */}
        <View style={styles.headerView}>
          <AppHeader
            headerHeight="100%"
            titleFontSize={wp(5)}
            leftIconPath={images.headerLeftBack}
            iconWidth={wp(5)}
            lefticonSize={wp(5)}
            onLeftIconPress={() => this.props.navigation.goBack()}
          />
        </View>
        {/* //================================ Logo ======================================// */}
        <View style={styles.upperView}>
          <Image style={styles.imageStyles} source={images.logo}></Image>
        </View>
        <View style={styles.midView}>
          {/* //================================ Email Input ======================================// */}
          <Text style={styles.textStyleSignup}>{I18n.t('SIGN UP')}</Text>
          <AppInput
            height={hp(6)}
            placeholder={I18n.t('Email')}
            colortextInput={colors.white}
            paddingLeft={wp(5)}
            placeholderTextColor={colors.white}
            marginBottom={wp(3)}
            marginTop={5}
            borderRadius={wp(7)}
            backgroundColor={colors.AppBlackColor}
            leftIconPath={images.ic_email}
            value={email}
            onChangeText={value => this.setState({ email: value, isValidEmail: this.validateEmail(value) })}
            keyboardType="email-address"
          />
          <View style={styles.checkBoxContainer}>
            <View style={styles.checkBoxIcon}>
              <Image
                style={[styles.checkBoxIconStyle, { tintColor: isValidEmail ? colors.AppGreenColor : 'black' }]}
                source={isValidEmail ? images.ic_check_green : images.ic_check}
              />
            </View>
            <View style={styles.checkBoxText}>
              <Text style={styles.checkBoxTextStyle}>{I18n.t('Valid email')}</Text>
            </View>
          </View>
          {/* //================================ Password Input ======================================// */}
          <AppInput
            height={hp(6)}
            borderRadius={wp(7)}
            placeholder={I18n.t('Password')}
            marginTop={5}
            secureEntry={showPassword}
            colortextInput={colors.white}
            paddingLeft={wp(5)}
            placeholderTextColor={colors.white}
            marginBottom={wp(3)}
            backgroundColor={colors.AppBlackColor}
            tintColor={colors.white}
            rightIconPath={!showPassword ? images.ic_eye_no : images.ic_eye}
            leftIconPath={images.ic_key}
            value={password}
            onChangeText={value => this.setState({
              password: value,
              isLeast6Char: value && value.length >= 6 ? true : false,
              isContainLetter: this.hasLetter(value),
              isContainNum: this.hasNumber(value),
              isContainSpecial: this.hasSpecial(value)
            })}
            onRightIconPress={() => this.setState({ showPassword: !showPassword })}
          />
          {/* //================================ CheckBoxs ======================================// */}
          <View style={styles.checkBoxContainer}>
            <View style={styles.checkBoxIcon}>
              <Image
                style={[styles.checkBoxIconStyle, { tintColor: isLeast6Char ? colors.AppGreenColor : 'black' }]}
                source={isLeast6Char ? images.ic_check_green : images.ic_check}
              />
            </View>
            <View style={styles.checkBoxText}>
              <Text
                style={
                  styles.checkBoxTextStyle

                }>
                {I18n.t('At least 6 characters long')}
              </Text>
            </View>
          </View>
          <View style={styles.checkBoxContainer}>
            <View style={styles.checkBoxIcon}>
              <Image
                style={[styles.checkBoxIconStyle, { tintColor: isContainLetter ? colors.AppGreenColor : 'black' }]}
                source={isContainLetter ? images.ic_check_green : images.ic_check}
              />
            </View>
            <View style={styles.checkBoxText}>
              <Text
                style={
                  styles.checkBoxTextStyle}>
                {I18n.t('Contains a letter')}
              </Text>
            </View>
          </View>
          <View style={styles.checkBoxContainer}>
            <View style={styles.checkBoxIcon}>
              <Image
                style={[styles.checkBoxIconStyle, { tintColor: isContainNum ? colors.AppGreenColor : 'black' }]}
                source={isContainNum ? images.ic_check_green : images.ic_check}
              />
            </View>
            <View style={styles.checkBoxText}>
              <Text
                style={
                  styles.checkBoxTextStyle
                }>
                {I18n.t('Contains a number')}
              </Text>
            </View>
          </View>
          <View style={styles.checkBoxContainer}>
            <View style={styles.checkBoxIcon}>
              <Image
                style={[styles.checkBoxIconStyle, { tintColor: isContainSpecial ? colors.AppGreenColor : 'black' }]}
                source={isContainSpecial ? images.ic_check_green : images.ic_check}
              />
            </View>
            <View style={styles.checkBoxText}>
              <Text
                style={
                  styles.checkBoxTextStyle
                }>
                {I18n.t('Contains a special character')}
              </Text>
            </View>
          </View>
        </View>
        {/* //================================ Buttons ======================================// */}
        <View style={styles.buttonView}>
          <Button
            height={hp(8)}
            width={'80%'}
            style={styles.buttonStyles}
            title={I18n.t('SIGN UP')}
            titleColor={colors.appBlue}
            bgColor={colors.AppGreenColor}
            titleStyle={[styles.titleStyles]}
            onPress={() => this.onPressSignup()}
          />
        </View>
        <View style={styles.lowerView}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('LoginScreen')}>
            <Text style={styles.textStyle}>{I18n.t('Already have an account')}</Text>
          </TouchableOpacity>
        </View>
        {/* //================================ model ======================================// */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible);
          }}>
          <MyModel
            onPressPrivacy={() => this.Privacy()}
            onPressTerm={() => this.navigateScreem()}
            onPressCondition={() => this.navigateScreem()}
            onPressAgree={() => { this.onCreateWithEmailAndPassword() }}
            onPressCancel={() => {
              this.setModalVisible(false)
            }}
          />
        </Modal>
        <Spinner
          visible={this.state.spinner}
          textContent={I18n.t('Creating')}
          textStyle={{ color: 'white' }}
        />
      </ImageBackground>
    );
  }
}
const mapStateToProps = state => ({

})
const mapDispatchToProps = {
  updateUser,
  updateUserProfile,
  updateFCMToken
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen)