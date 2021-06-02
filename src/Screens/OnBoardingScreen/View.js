
//================================ React Native Imported Files ======================================//

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { View, Text, StatusBar, Image, TouchableOpacity, ImageBackground } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

//================================ Local Imported Files ======================================//

import Button from '../../Components/Button/Button';
import images from '../../Assets/Images/images';
import colors from '../../Assets/Colors/colors';
import Swiper from 'react-native-swiper';
import styles from './Styles';
import { connect } from 'react-redux'
import I18n from "../../i18n";

class OnBoarding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newIndex: 1,
      currentIndex: 0,
    };
  }
  //================================ Index Checking ======================================//

  onIndexChanged(index) {
    this.setState({ currentIndex: index });
  }
  async scrollItem() {
    //if (this.state.currentIndex === 2) {
      try {
        await AsyncStorage.setItem('welcome', 'true')
        this.props.navigation.navigate(this.props.user ? 'drawer' : 'SignupWith')
      } catch (e) {
        console.log(e)
      }
    // } else {
    //   this.refs.swiper.scrollBy(1);
    // }
  }
  render() {
    return (
      //================================ ImageBackground ======================================//

      <ImageBackground style={styles.mainContainer} source={images.backgroundImage}>

        {/* //================================ StatusBar ======================================// */}

        <StatusBar barStyle="dark-content" hidden={false} backgroundColor={colors.AppDarkGreenColor} translucent={false} />

        <View style={styles.upperView}>
          {/* //================================ Swiper ======================================// */}

          <Swiper
            showsButtons={false}
            loop={false}
            ref={'swiper'}
            onIndexChanged={this.onIndexChanged.bind(this)}
            activeDotColor={colors.white}
            dotColor={colors.grey}
            activeDot={<View style={styles.activeDot} />}
            dot={() => <View />}>
            <View style={styles.slides}>
              <View style={styles.imageView}>
                <Image
                  style={styles.imageStyles}
                  source={images.logo_onboard}
                />
              </View>
              {/* //================================ Welcome Swiper Screen One ======================================// */}

              <View style={styles.midView}>
                <Text style={styles.textStyleWelcome}>{I18n.t('Welcome_EZFind')}</Text>
              </View>
            </View>
          </Swiper>
        </View>
        {/* //================================ Button ======================================// */}

        <View style={styles.lowerView}>
          <Button
            height={hp(8)}
            width={'80%'}
            style={styles.buttonStyles}
            title={I18n.t('CONTINUE')}
            bgColor={colors.AppGreenColor}
            titleColor={colors.dark_red}
            titleStyle={[styles.titleStyles]}
            onPress={() => this.scrollItem()}
          />
          {
            // <TouchableOpacity
            //   style={styles.skipButton}
            //   onPress={() => this.props.navigation.navigate(this.props.user ? 'drawer' : 'SignupWith')}>
            //   <Text style={styles.skipButtonTextStyle}>
            //     Skip
            //   </Text>
            // </TouchableOpacity>
          }
        </View>
      </ImageBackground>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user.user,
  profile: state.user.profile
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(OnBoarding)

