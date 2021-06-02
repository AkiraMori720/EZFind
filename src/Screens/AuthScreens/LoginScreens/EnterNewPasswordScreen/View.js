//================================ React Native Imported Files ======================================//
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import { View, Text, StatusBar, Image, ScrollView, ImageBackground } from 'react-native';
import React from 'react';

//================================ Local Imported Files ======================================//

import AppInput from '../../../../Components/AppInput/AppInput';
import Button from '../../../../Components/Button/Button';
import images from '../../../../Assets/Images/images';
import colors from '../../../../Assets/Colors/colors';
import styles from './Styles';
import I18n from "../../../../i18n";

class NewPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: true,
      showConfirmPassword: true,
    };
  }

  togglePassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }
  toggleConfirmPassword() {
    this.setState({ showConfirmPassword: !this.state.showConfirmPassword });
  }

  render() {
    return (
      <ImageBackground style={styles.mainContainer} source={images.backgroundImage}>

        <View style={styles.headerView}>
          {/* //================================ StatusBar ======================================// */}
          <StatusBar
            barStyle="dark-content"
            hidden={false}
            backgroundColor={colors.AppDarkGreenColor}
            translucent={false}
          />

        </View>
        <ScrollView>
          {/* //================================ Logo ======================================// */}
          <View style={styles.upperView}>
            <Image style={styles.imageStyles} source={images.logo}></Image>
          </View>
          {/* //================================ Input Fields ======================================// */}
          <View style={styles.midView}>
            <Text style={styles.textStyleSignup}>{I18n.t('ENTER NEW PASSWORD')}</Text>

            <AppInput
              height={hp(6)}
              placeholder={'john'}
              width={'80%'}
              colortextInput={colors.white}
              paddingLeft={wp(5)}
              placeholderTextColor={colors.white}
              marginBottom={wp(3)}
              marginTop={5}
              borderRadius={wp(7)}
              backgroundColor={colors.AppBlackColor}
            />
            <AppInput
              height={hp(6)}
              placeholder={'Smith'}
              width={'80%'}
              colortextInput={colors.white}
              paddingLeft={wp(5)}
              placeholderTextColor={colors.white}
              marginBottom={wp(3)}
              marginTop={5}
              borderRadius={wp(7)}
              backgroundColor={colors.AppBlackColor}
            />
            <AppInput
              height={hp(6)}
              placeholder={'sample@email.com'}
              width={'80%'}
              colortextInput={colors.white}
              paddingLeft={wp(5)}
              placeholderTextColor={colors.white}
              marginBottom={wp(3)}
              marginTop={5}
              borderRadius={wp(7)}
              backgroundColor={colors.AppBlackColor}
            />
            <AppInput
              height={hp(6)}
              borderRadius={wp(7)}
              placeholder={I18n.t('New Password')}
              width={'80%'}
              marginTop={5}
              secureEntry={this.state.showPassword}
              onRightIconPress={() => this.togglePassword()}
              colortextInput={colors.white}
              paddingLeft={wp(5)}
              placeholderTextColor={colors.white}
              rightIconSize={wp(5)}
              marginBottom={wp(3)}
              backgroundColor={colors.AppBlackColor}
              tintColor={colors.grey1}
              rightIconPath={images.ic_eye}
              tintColor={colors.white}

            />
            <AppInput
              height={hp(6)}
              borderRadius={wp(7)}
              placeholder={I18n.t('Confirm New Password')}
              width={'80%'}
              marginTop={5}
              secureEntry={this.state.showPassword}
              onRightIconPress={() => this.togglePassword()}
              colortextInput={colors.white}
              paddingLeft={wp(5)}
              placeholderTextColor={colors.white}
              rightIconSize={wp(5)}
              marginBottom={wp(3)}
              backgroundColor={colors.AppBlackColor}
              tintColor={colors.grey1}
              rightIconPath={images.ic_eye}
              tintColor={colors.white}
            />
            <View style={styles.checkBoxContainer}>
              <Image
                style={styles.checkBoxIconStyle}
                source={images.ic_check_green}
              />
              <Text style={styles.checkBoxTextStyle}>{I18n.t('Password matched')}</Text>
            </View>
          </View>

          {/* //================================ Button ======================================// */}
          <View style={styles.lowerView}>
            <Button
              height={hp(8)}
              width={'80%'}
              style={styles.buttonStyles}
              title={I18n.t('SAVE CHANGES')}
              bgColor={colors.AppGreenColor}
              titleColor={colors.dark_red}
              titleStyle={styles.titleStyles}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

export default NewPassword;
