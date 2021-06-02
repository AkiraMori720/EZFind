
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
import I18n from "../../../i18n";

class AboutApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisibleSetting: false,

        }
        this.setmodalVisibleSetting = (visible) => {
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
                        title={I18n.t('ABOUT THE APP')}
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

                <View style={styles.BottomTextView}><Text style={styles.MainTextStyle}>{I18n.t('This_app_lets_users_to_post_an_item')}</Text></View>

                {/* //================================ Button ======================================// */}

                <View style={styles.BottonView}>
                    <Button
                        height={hp(8)}
                        width={'90%'}
                        style={styles.buttonStyles}
                        title={I18n.t('CONTACT US')}
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