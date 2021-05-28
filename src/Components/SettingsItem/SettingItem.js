import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../Assets/Colors/colors';
import { ThemeConsumer } from 'react-native-elements';

class SettingsItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      IsEnabled: false,
    };
  }
  toggleSwitch = () => {
    this.setState({ isEnabled: true });
  };
  render() {

    let flexDirection = this.props.flexDirection || 'column';
    let leftIconSize = this.props.leftIconSize;
    let leftIconBorderRadius = this.props.leftIconBorderRadius;
    let rightIconSize = this.props.rightIconSize;
    let secondIconSIze = this.secondIconSIze;
    let rightIconColor = this.props.rightIconColor || colors.grey;
    let bottomBorderWidth = this.props.borderWidth;
    let bottomBorderColor = this.props.bottomBorderColor;

    let upperTextColor = this.props.upperTextColor;
    let lowerTextColor = this.props.lowerTextColor;

    let leftIconImage = this.props.leftIconImage;
    let arrowImage = this.props.arrowImage;
    let switchItem = this.props.switchItem;
    let rightSecondIconImageTop = this.props.rightSecondIconImageTop;
    let rightSecondIconImageBottom = this.props.rightSecondIconImageBottom;

    let leftIconColor = this.props.leftIconColor || colors.AppGreenColor;
    let textColor = this.props.textColor || colors.black;

    let backgroundColor = this.props.backgroundColor || colors.white;
    let height = this.props.height || hp(12);

    let upperText = this.props.upperText || 'empty';
    let lowerText = this.props.lowerText;

    return (
      // <View style={styles.mainContainer}>

      <TouchableOpacity
        onPress={this.props.onPress}
        style={[
          styles.container,
          { backgroundColor: backgroundColor, height: height },
        ]}>
        <View style={styles.leftIconContainer}>
          <Image
            // source={images.ic_play}
            style={[
              styles.leftIconStyle,
              {
                height: leftIconSize,
                width: leftIconSize,
                tintColor: leftIconColor,
              },
            ]}
            source={leftIconImage}
          />
        </View>

        <View style={styles.centerTextContainer}>
          <Text style={[styles.textStyleUpper, { color: textColor }]}>
            {upperText}
          </Text>
          {/*<Text style={styles.textStylelower}>{lowerText}</Text>*/}
        </View>
        <View style={styles.rightIconContainer}>
          {this.props.arrowImage ? (
            <Image
              // source={images.ic_play}
              style={[
                styles.leftIconStyle,
                {
                  height: rightIconSize,
                  width: rightIconSize,
                  tintColor: rightIconColor,
                },
              ]}
              source={arrowImage}
            />
          ) : null}
          {this.props.toggleSwitchButton ? (
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={this.state.IsEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={this.toggleSwitch}
              value={this.state.IsEnabled}
            />
          ) : null}

        </View>
      </TouchableOpacity>
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: colors.white
  },

  container: {
    height: hp(5),
    width: '100%',
    backgroundColor: colors.white,
    // backgroundColor: 'rgba(255, 255, 255, 0.5)',
    flexDirection: 'row',
    marginVertical: wp(0.6),
    borderRadius: wp(8),
    borderColor: colors.AppGreenColor,
    borderWidth: 1,
    // paddingHorizontal:wp(3),
    // borderBottomWidth:wp(0.5),
    // borderBottomColor:colors.grey,
    marginTop: wp(1),
  },
  leftIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.15,
    // backgroundColor:colors.gold,
  },
  centerTextContainer: {
    justifyContent: 'center',
    flex: 0.7,
    paddingLeft: wp(2),
    // backgroundColor: "red"
  },
  rightIconContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: wp(3),
    flex: 0.15,

    // backgroundColor: colors.blue,
  },
  leftIconStyle: {
    height: wp(10),
    width: wp(10),
    resizeMode: 'contain',
    tintColor: colors.AppPinkColor,
  },
  rightIconStyle: {
    height: wp(10),
    width: wp(10),
    resizeMode: 'contain',
  },

  textStyleUpper: {
    fontSize: wp(4),
    color: colors.black,
  },
  textStylelower: {
    fontSize: wp(3.5),
    color: colors.white,
  },
  firstIconContainer: {
    flex: 1,
    // backgroundColor:colors.bright_red,
    alignItems: 'center',
  },
  secondIconConatiner: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor:colors.dark_grey,
  },
});

export default SettingsItem;
