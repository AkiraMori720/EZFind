//================================ React Native Imported Files ======================================//

import { ImageBackground, StatusBar } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
//================================ Local Imported Files ======================================//


import Colors from '../../Assets/Colors/colors';
import images from '../../Assets/Images/images';
import styles from './Styles';
import { connect } from 'react-redux'

class SplashScreen extends React.Component {

    //================================ component Did Mount ======================================//

    componentDidMount() {
        setTimeout(async () => {
            try {
                if (this.props.user) {
                    this.props.navigation.navigate('drawer')
                } else {
                    const value = await AsyncStorage.getItem('welcome')
                    if (value !== null) {
                        this.props.navigation.navigate('SignupWith')
                    } else this.props.navigation.navigate('OnBoarding');
                }
            } catch (e) {
                // error reading value
            }
        }, 1500);
    }
    render() {
        return (

            <ImageBackground style={styles.mainCotainer} source={images.splash}>
                {/* //================================ StatusBar ======================================// */}
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor={Colors.AppDarkGreenColor} translucent={false} />
            </ImageBackground>
        )
    }
}
const mapStateToProps = state => ({
    user: state.user.user,
    profile: state.user.profile
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)