import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, Platform, TouchableOpacity, Linking } from 'react-native';

import styles from './styles'
import { Rating, AirbnbRating } from 'react-native-ratings';
import I18n from "../../i18n";
class RateApp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            dummyText: I18n.t('If_you_love_our_app_we_would_appreciate_you'),

        }
    }

    render() {
        return (

            <View style={styles.mainContainer}>



                <View style={styles.container}>

                    <View style={styles.topTitle}>
                        <Text style={styles.textRateApp}>
                            {I18n.t('Rate App')}
                        </Text>
                    </View>
                    <View style={styles.textDescriptionContainer}>
                        <Text style={styles.textDescription}>{this.state.dummyText}</Text>
                    </View>

                    <View style={styles.ratingContainer}>
                        <AirbnbRating
                            count={5}
                            reviewSize={0}
                            defaultRating={5}
                            size={30}
                            ratingColor='gold'
                            showRating={false}
                        />
                    </View>
                    {/*<View style={styles.line}></View>*/}

                    <View style={styles.bottomButtons}>

                        <TouchableOpacity style={styles.rateNowContainer}
                            onPress={() => {
                                Linking.openURL(Platform.OS == 'ios' ? 'https://apps.apple.com/us/app/ez-find/id1524643683' : 'https://play.google.com/store/apps/details?id=com.brainyapps.ezfind')
                            }}>
                            <Text style={styles.submitBurron}>{I18n.t('RATE APP')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.props.onPressLater}
                            style={styles.laterContainer}>
                            <Text style={styles.submitBurron}>{I18n.t('LATER')}</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        )
    }
}

export default RateApp;
