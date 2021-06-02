//================================ React Native Imported Files ======================================//

import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import { View, Text, Image, TouchableOpacity, StatusBar, ImageBackground } from 'react-native';
import React from 'react';

//================================ Local Imported Files ======================================//

import Button from '../../../../Components/Button/Button';
import colors from '../../../../Assets/Colors/colors';
import images from '../../../../Assets/Images/images';
import styles from './Styles';
import I18n from "../../../../i18n";

class SignupWith extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ImageBackground style={styles.mainContainer} source={images.backgroundImage}>
        {/* //================================ StatusBar ======================================// */}
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor={colors.AppGreenColor}
          translucent={false}
        />
        {/* //================================ Logo ======================================// */}
        <View style={styles.upperView}>
          <Image style={styles.imageStyles} source={images.logo}></Image>
        </View>
        {/* //================================ Sign up Buttons ======================================// */}
        <View style={styles.midView}>
          {/* <Button
            style={styles.buttonStyles}
            title={'Sign up with Facebook'}
            iconPlace={'left'}
            icon={images.ic_fb}
            bgColor={colors.fb_color}
            titleColor={colors.white}
            iconWidth={wp(3)}
            onPress={() => this.props.navigation.navigate('drawer')}
          />
          <Button
            style={styles.buttonStyles}
            title={'Sign up with Google'}
            iconPlace={'left'}
            bgColor={colors.white}
            icon={images.googleIcon}
            titleStyle={styles.titleStyles}
            iconStyle={styles.iconStyles}
            onPress={() => this.props.navigation.navigate('drawer')}
          />
          <Button
            style={styles.buttonStyles}
            title={'Sign up with Apple'}
            iconPlace={'left'}
            bgColor={colors.black}
            icon={images.appleIcon}
            iconWidth={wp(5)}
            onPress={() => this.props.navigation.navigate('drawer')}
          /> */}
          <Button
            style={styles.buttonStyles}
            title={I18n.t('Sign up with Email')}
            iconPlace={'left'}
            bgColor={colors.AppGreenColor}
            icon={images.ic_email}
            titleStyle={[styles.titleStylesEmail]}
            onPress={() => this.props.navigation.navigate('SignUpScreen')}
          />
        </View>

        <View style={styles.lowerView}>
          {/* //================================ Login Button ======================================// */}
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('LoginScreen')}>
            <Text style={styles.textStyle}>{I18n.t('Already have an account')}</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}
export default SignupWith;
