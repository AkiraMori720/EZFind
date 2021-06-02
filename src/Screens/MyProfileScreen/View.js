//================================ React Native Imported Files ======================================//
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen';
import { Image, StatusBar, View, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import React from 'react';

//================================ Local Imported Files ======================================//
import AppHeader from '../../Components/AppHeader/AppHeader';
import AppInput from '../../Components/AppInput/AppInput';
import Button from '../../Components/Button/Button';
import images from '../../Assets/Images/images';
import colors from '../../Assets/Colors/colors';
import styles from './Styles';


import storage from '@react-native-firebase/storage';
import { connect } from 'react-redux'
import { updateUser, updateUserProfile } from '../../reducers/user'
import Spinner from 'react-native-loading-spinner-overlay';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-action-sheet';
import I18n from "../../i18n";
var MessageBarManager = require('react-native-message-bar').MessageBarManager;

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      profile: {
        avatar: null, first_name: null, last_name: null, name: null, address: null, phone: null,
        ...props.profile
      }
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.profile != this.props.profile) {
      this.setState({ profile: nextProps.profile })
    }
  }
  selectPhoto = () => {
    Keyboard.dismiss()
    ActionSheet.showActionSheetWithOptions(
      {
        options: [
          I18n.t('Take_Photo'),
          I18n.t('Choose_From_Library'),
          I18n.t('Cancel')
        ],
        cancelButtonIndex: 2,
        destructiveButtonIndex: 0,
        tintColor: 'black',
      },
      index => {
        switch (index) {
          case 0: {
            ImagePicker.openCamera({
              width: 300,
              height: 300,
              cropping: true,
              mediaType: 'photo',
              cropperCircleOverlay: true,
            }).then(image => {
              this.updateFormField('avatar', { uri: image.path })
            });
            break;
          }
          case 1: {
            ImagePicker.openPicker({
              width: 300,
              height: 300,
              cropping: true,
              cropperCircleOverlay: true,
              mediaType: 'photo',
            }).then(image => {
              this.updateFormField('avatar', { uri: image.path })
            });
            break;
          }
        }
      },
    );

  };
  updateFormField(name, value) {
    const { profile } = this.state;
    this.setState({
      profile: {
        ...profile,
        [name]: value
      }
    })
  }
  async saveChanges() {
    const { profile } = this.state;
    if (profile.avatar && profile.first_name && profile.last_name && profile.address && profile.phone) {
      const { user } = this.props
      this.setState({ spinner: true })

      let new_avatar = null;
      if (profile.avatar && profile.avatar.uri) {
        try {
          const reference = storage().ref(`users/avatar/${user.uid}.png`);
          const resp_image = await reference.putFile(profile.avatar.uri);
          new_avatar = await reference.getDownloadURL()
        } catch {
          err => {
            console.log("err", err)
          }
        }
      }
      const profile_doc = firestore().collection('users').doc(user.uid)
      profile_doc.update({
        ...profile,
        avatar: new_avatar ? new_avatar : profile.avatar,
        name: (profile.first_name || '') + ' ' + (profile.last_name || '')
      })
        .then((res) => {
          this.setState({ spinner: false })
          MessageBarManager.showAlert({
            title: '',
            message: I18n.t('Successfully saved'),
            alertType: 'success'
          });
          profile_doc.get().then(res => {
            console.log("upated profile:", res.data())
            this.props.updateUserProfile(res.data())
          })
        })
    } else {
      alert(I18n.t('Please fill out this form'))
    }
  }
  render() {
    const { avatar, first_name, last_name, name, address, phone, } = this.state.profile
    return (
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}>
        <View style={styles.Cotainer}>

          {/* //================================ StatusBar ======================================// */}

          <StatusBar barStyle="dark-content" hidden={false} backgroundColor={colors.AppDarkGreenColor} translucent={false} />
          {/* //================================ AppHeader ======================================// */}

          <View style={styles.headerCotainer}>
            <AppHeader
              headerHeight="100%"
              onLeftIconPress={() => this.props.navigation.goBack()}
              leftIconPath={images.headerLeftBack}
              lefticonSize={wp(5)}
              title={I18n.t('My Profile')}
              bgColor={colors.AppGreenColor}
              onRightIconPress={() => this.props.navigation.navigate("EditProfile")}
            />
          </View>
          {/* //================================ Main Container ======================================// */}

          <View style={styles.mainCotainer}>
            <View style={styles.uperfieldsContainer}>

              {/* //================================ Add Profile Pic ======================================// */}

              <TouchableOpacity style={styles.addPicContainer}
                onPress={() => {
                  this.selectPhoto()
                }}>
                {avatar ? (
                  <View>
                    <Image
                      source={avatar && avatar.uri ? avatar : { uri: avatar }}
                      style={[styles.imageStylesTag, { resizeMode: 'cover' }]}
                    />
                    {/* <Image source={images.ic_add_image}
                      style={[styles.imageStylesTag, { position: 'absolute', left: 0, top: 0, opacity: 0.2 }]}
                    /> */}
                  </View>
                ) : (
                    <Image source={images.ic_add_image}
                      style={styles.imageStylesTag}
                    />
                  )}
              </TouchableOpacity>
              {/* //================================ AppInput Container ======================================// */}

              <View style={styles.titleContainer}>
                <AppInput
                  height={hp(6)}
                  placeholder={I18n.t('First Name')}
                  width={'100%'}
                  colortextInput={colors.black}
                  placeholderTextColor={colors.placeholder_text_color}
                  backgroundColor={colors.white}
                  borderRadius={wp(8)}
                  borderWidth={1}
                  borderColor={colors.AppGreenColor}
                  value={first_name}
                  onChangeText={value => this.updateFormField('first_name', value)}
                />

              </View>
              <View style={styles.titleContainer}>
                <AppInput
                  height={hp(6)}
                  placeholder={I18n.t("Last Name")}
                  width={'100%'}
                  colortextInput={colors.black}
                  placeholderTextColor={colors.placeholder_text_color}
                  backgroundColor={colors.white}
                  borderRadius={wp(8)}
                  borderWidth={1}
                  borderColor={colors.AppGreenColor}
                  value={last_name}
                  onChangeText={value => this.updateFormField('last_name', value)}
                />

              </View>
              {/* <View style={styles.titleContainer}>
              <AppInput
                height={hp(6)}
                placeholder={"Email Address"}
                width={'100%'}
                colortextInput={colors.black}
                placeholderTextColor={colors.placeholder_text_color}
                backgroundColor={colors.white}
                borderRadius={wp(8)}
                borderWidth={1}
                borderColor={colors.AppGreenColor}
              />

            </View> */}
              <View style={styles.titleContainer}>
                <AppInput
                  height={hp(6)}
                  placeholder={I18n.t("Address")}
                  width={'100%'}
                  colortextInput={colors.black}
                  placeholderTextColor={colors.placeholder_text_color}
                  backgroundColor={colors.white}
                  borderRadius={wp(8)}
                  borderWidth={1}
                  borderColor={colors.AppGreenColor}
                  rightIconPath={images.ic_marker}
                  tintColor={colors.AppGreenColor}
                  marginLeft={'9%'}
                  value={address}
                  onChangeText={value => this.updateFormField('address', value)}
                />

              </View>
              <View style={styles.titleContainer}>
                <AppInput
                  height={hp(6)}
                  placeholder={I18n.t("Phone Number")}
                  width={'100%'}
                  colortextInput={colors.black}
                  placeholderTextColor={colors.placeholder_text_color}
                  backgroundColor={colors.white}
                  borderRadius={wp(8)}
                  borderWidth={1}
                  borderColor={colors.AppGreenColor}
                  value={phone}
                  onChangeText={value => {
                    if (value && value.length > 10) return
                    this.updateFormField('phone', value)
                  }}
                  keyboardType='numeric'
                />

              </View>
            </View>
            {/* //================================ Button ======================================// */}

            <View style={styles.buttonView}>
              <Button
                height={hp(8)}
                width={'80%'}
                style={styles.buttonStyles}
                title={I18n.t('Save')}
                titleColor={colors.appBlue}
                bgColor={colors.AppGreenColor}
                titleStyle={[styles.titleStyles]}
                onPress={() => {
                  this.saveChanges()
                }}
              />
            </View>
          </View>
          <Spinner
            visible={this.state.spinner}
            textContent={I18n.t('Updating')}
            textStyle={styles.spinnerTextStyle}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  profile: state.user.profile
})

const mapDispatchToProps = {
  updateUser,
  updateUserProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)