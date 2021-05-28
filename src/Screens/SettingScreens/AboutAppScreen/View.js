
//================================ React Native Imported Files ======================================//

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, StatusBar, Image, } from 'react-native';
import React from 'react';
//================================ Local Imported Files ======================================//

import AppHeader from '../../../Components/AppHeader/AppHeader';
import Button from '../../../Components/Button/Button';
import colors from '../../../Assets/Colors/colors';
import images from '../../../Assets/Images/images';
import styles from "./Styles";

class AboutApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisibleSetting: false,

        }
        setmodalVisibleSetting = (visible) => {
            this.setState({ modalVisibleSetting: visible });
        };
    }
    render() {
        const { modalVisibleSetting } = this.state;

        return (

            <View style={styles.mainContainer}>
                {/* //================================ StatusBar ======================================// */}
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor={colors.appDarkBlue} translucent={false} />

                {/* //================================ Header ======================================// */}
                <View style={styles.headerView}>

                    <AppHeader
                        headerHeight='100%'
                        title={'ABOUT THE APP'}
                        titleFontSize={wp(5)}
                        leftIconPath={images.headerLeftBack}
                        iconWidth={wp(5)}
                        lefticonSize={wp(5)}
                        onLeftIconPress={() => this.props.navigation.goBack()}

                    />

                </View>

                {/* //================================ Uper View ======================================// */}

                <View style={styles.uperView}>
                    <View style={styles.uperImageView}>
                        <Image
                            style={styles.imageStyles}
                            source={images.logo} />

                    </View>
                    {/* <View style={styles.uperText1View}>
                        <Text style={styles.CopyrightTextStyle}>Version 1.00</Text>

                    </View>
                    <View style={styles.uperText2View}>
                        <Text style={styles.DeveloperTextStyle}>Copyright 2020 - NetworkAgainstCrime.com</Text>

                    </View>
                    <View style={styles.uperText3View}>
                        <Text style={styles.VersionTextStyle}>Developer Name Inc.</Text>

                    </View> */}

                </View>

                {/* //================================ Text ======================================// */}

                <View style={styles.BottomTextView}><Text style={styles.MainTextStyle}>This app lets users to post an item they want to dispose and make it available for people who want to take it. Users of this app gets to re-purpose items by making it available for other people who needs it.</Text></View>

                {/* //================================ Button ======================================// */}

                <View style={styles.BottonView}>
                    <Button
                        height={hp(8)}
                        width={'90%'}
                        style={styles.buttonStyles}
                        title={'CONTACT US'}
                        bgColor={colors.AppRedColor}
                        titleColor={colors.dark_red}
                        titleStyle={[styles.titleStyles]}
                        onPress={() => this.setmodalVisibleSetting(true)}

                    />
                </View>
            </View>
        )
    }
}
export default AboutApp;