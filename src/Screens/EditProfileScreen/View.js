
//================================ React Native Imported Files ======================================//

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Text, Image, StatusBar, View } from 'react-native';
import React from 'react';

//================================ Local Imported Files ======================================//


import AppHeader from '../../Components/AppHeader/AppHeader';
import colors from '../../Assets/Colors/colors';
import images from '../../Assets/Images/images';
import styles from './Styles';
import { connect } from 'react-redux'

class UserProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    const { profile } = this.props
    return (
      <View style={styles.Cotainer}>
        {/* //================================ StatusBar ======================================// */}
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor={colors.AppRedColor} translucent={false} />
        {/* //================================ Header ======================================// */}
        <View style={styles.headerCotainer}>
          <AppHeader
            headerHeight="100%"
            onLeftIconPress={() => this.props.navigation.goBack()}
            leftIconPath={images.headerLeftBack}
            lefticonSize={wp(5)}
            title={'User Profile'}
            bgColor={colors.AppGreenColor}
            rightIconOnePath={images.ic_edit} ProfileScreen
            rightIconSize={20}
            onRightIconPress={() => this.props.navigation.navigate('ProfileScreen')}
          />
        </View>
        <View style={styles.mainCotainer}>
          {/* //================================ uper Profile ======================================// */}
          <View style={styles.uperprofileCotainer}>
            <View style={styles.addPicContainer}>
              <Image source={{ uri: profile && profile.avatar || '' }}
                style={styles.imageStylesTag}
              />
            </View>
            <View style={styles.titleCotainer}>
              <Text style={styles.titleStyleCotainer}>{profile && profile.name}</Text>
            </View>
            <View style={styles.addressCotainer}>
              <View style={styles.addressPicCotainer}>
                <Image source={images.ic_email}
                  style={styles.markerImageStyles}
                />
              </View>
              <View style={styles.addressTextCotainer}>
                <Text style={styles.addressTextStyleCotainer}>{profile && profile.uid}</Text>
              </View>
            </View>
            {
              profile && profile.address ?
                <View style={styles.addressCotainer}>
                  <View style={styles.addressPicCotainer}>
                    <Image source={images.ic_marker}
                      style={styles.markerImageStyles}
                    />
                  </View>
                  <View style={styles.addressTextCotainer}>
                    <Text style={styles.addressTextStyleCotainer}>{profile && profile.address}</Text>
                  </View>
                </View> : null
            }
            {
              profile && profile.phone ?
                <View style={styles.phoneCotainer}>
                  <View style={styles.phonePicCotainer}>
                    <Image source={images.ic_phone}
                      style={styles.markerImageStyles}
                    />
                  </View>
                  <View style={styles.phoneTextCotainer}>
                    <Text style={styles.addressTextStyleCotainer}>{profile && profile.phone}</Text>
                  </View>
                </View> : null
            }
          </View>
        </View>
      </View>
    )
  }
}
const mapStateToProps = state => ({
  user: state.user.user,
  profile: state.user.profile
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileScreen)