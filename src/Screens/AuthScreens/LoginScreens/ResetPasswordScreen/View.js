//================================ React Native Imported Files ======================================//

import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import { View, Text, Alert, Image, StatusBar, ImageBackground } from 'react-native';
import React from 'react';

//================================ Local Imported Files ======================================//

import AppHeader from '../../../../Components/AppHeader/AppHeader';
import AppInput from '../../../../Components/AppInput/AppInput';
import Button from '../../../../Components/Button/Button';
import colors from '../../../../Assets/Colors/colors';
import images from '../../../../Assets/Images/images';
import styles from './Styles';
import auth from '@react-native-firebase/auth';
import Spinner from 'react-native-loading-spinner-overlay';

class ResetPassword extends React.Component {
  ShowAlert = (title, message) => {
    Alert.alert(title, message, [{ text: 'OKAY' }]);
  };
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      spinner: false,
      email: ''
    }
  };
  sendResetMail = () => {
    //this.setState({ showAlert: !this.state.showAlert });
    if (this.state.email) {
      this.setState({ spinner: true })
      auth().sendPasswordResetEmail(this.state.email).then(res => {
        this.setState({ spinner: false })
        setTimeout(() => {
          if (res == null) {
            this.setState({ showAlert: true, email: '' })
            this.props.navigation.goBack()
            alert('sent reset email!');
          }
        }, 100)
      }).catch(error => {
        this.setState({ spinner: false })
        setTimeout(() => {
          if (error.code === 'auth/invalid-email') {
            alert('Please enter valid email id');
            return
          }

          if (error.code === 'auth/user-not-found') {
            alert('There is no user corresponding to the email address.');
            return
          }

          alert(error);
        }, 100)
      })
    } else {
      alert('Please enter email address.')
    }
  };
  render() {
    const { email } = this.state
    return (
      <ImageBackground style={styles.mainContainer} source={images.backgroundImage}>

        {/* //================================ StatusBar ======================================// */}
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor={colors.AppDarkGreenColor}
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
        {/* //================================ Password Input ======================================// */}
        <View style={styles.midView}>
          <AppInput
            height={hp(6)}
            borderRadius={wp(7)}
            placeholder={'Email'}
            width={'80%'}
            marginTop={5}
            onRightIconPress={() => this.togglePassword()}
            colortextInput={colors.white}
            paddingLeft={wp(5)}
            placeholderTextColor={colors.white}
            rightIconSize={wp(5)}
            marginBottom={wp(3)}
            backgroundColor={colors.AppBlackColor}
            tintColor={colors.grey1}
            leftIconPath={images.ic_email}
            value={email}
            onChangeText={(email) => this.setState({ email })}
          />
          <View style={styles.textContainer}>
            <Text style={styles.textStyle}>
              Input the email used to create your account. We will send you a
              link to reset your password.
            </Text>
          </View>
        </View>
        {/* //================================ Button ======================================// */}
        <View style={styles.lowerView}>
          <Button
            height={hp(8)}
            width={'80%'}
            style={styles.buttonStyles}
            title={'RESET PASSWORD'}
            bgColor={colors.AppGreenColor}
            titleColor={colors.dark_red}
            titleStyle={[styles.titleStyles]}
            onPress={() => this.sendResetMail()}
          />
        </View>
        <Spinner
          visible={this.state.spinner}
          textContent={''}
        />
      </ImageBackground>
    );
  }
}

export default ResetPassword;
