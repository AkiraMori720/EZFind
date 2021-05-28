import React from 'react';
import { View, StyleSheet, Text, ImageBackground, TouchableOpacity, Image, TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import styles from "./style";
import { connect } from 'react-redux'
import firestore from '@react-native-firebase/firestore';
import LocationView from './LocationView/lib'

var MessageBarManager = require('react-native-message-bar').MessageBarManager;
const DEFAULT_DELTA = { latitudeDelta: 0.115, longitudeDelta: 0.1121 };
const DEFAULT_LOCATION = {
    latitude: 46.9487764,
    longitude: 7.427142,
};

class NewDeliveryAddress extends React.Component {
    constructor(props) {
        super(props)
        const location = props.route.params?.location;
        this.state = {
            loading: false,
            isEdit: location ? true : false,
            location,

            region: location ? { ...DEFAULT_DELTA, latitude: location.latitude, longitude: location.longitude } : {
                ...DEFAULT_DELTA,
                ...DEFAULT_LOCATION,
            },
        }
    }
    addLocation(location) {
        const { isEdit } = this.state
        if (location) {
            if (this.state.loading) return
            this.state.loading = true
            const { user } = this.props
            if (isEdit) {
                const key = this.props.navigation.getParam("key");
                firestore()
                    .collection('users').doc(user.uid).collection('locations').doc(key)
                    .update(location)
                    .then(() => {
                        this.state.loading = false
                        MessageBarManager.showAlert({
                            title: '',
                            message: 'Successfully updated!',
                            alertType: 'success'
                        });
                        this.props.navigation.goBack()
                    });
            }
            else {
                firestore()
                    .collection('users').doc(user.uid).collection('locations')
                    .add(location)
                    .then(() => {
                        this.state.loading = false
                        MessageBarManager.showAlert({
                            title: '',
                            message: 'Successfully added!',
                            alertType: 'success'
                        });
                        this.props.navigation.goBack()
                    });
            }
        }
        else {
            alert('Please fill out this form.')
            return
        }
    }
    render() {
        const { isEdit } = this.state
        const { location } = this.props
        const initLocation = this.props.route.params?.location;
        return (
            <View style={styles.mainContainer}>
                <View style={{ flex: 1 }}>
                    <LocationView
                        apiKey={'AIzaSyD9N8ud_1NGY3KuHhm9kIVMgvTAeOZa8ig'}
                        initialLocation={
                            initLocation ? initLocation : (location ? location : DEFAULT_LOCATION)
                        }
                        onLocationSelect={async location => {
                            //this.addLocation(location)
                            const selectLocation = this.props.route.params?.callback;
                            selectLocation && selectLocation(location)
                            this.props.navigation.goBack()
                        }}
                        isEdit={isEdit}
                        navigation={this.props.navigation}
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user,
    location: state.user.location
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeliveryAddress)