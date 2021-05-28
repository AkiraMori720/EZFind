import React from 'react';
import {
    View,
    StyleSheet,
    Animated,
    Platform,
    UIManager,
    TouchableOpacity,
    Text,
    Image
} from 'react-native';
import axios from 'axios';
import Events from 'react-native-simple-events';
import MapView, { Circle } from 'react-native-maps';
import AutoCompleteInput from './AutoCompleteInput';
import AppHeader from "../../../../../Components/AppHeader/AppHeader";
import images from "../../../../../Assets/Images/images";
import colors from '../../../../../Assets/Colors/colors'
const PLACE_DETAIL_URL =
    'https://maps.googleapis.com/maps/api/place/details/json';
const DEFAULT_DELTA = { latitudeDelta: 0.015, longitudeDelta: 0.0121 };

export default class LocationView extends React.Component {
    static defaultProps = {
        markerColor: 'black',
        actionText: 'DONE',
        onLocationSelect: () => ({}),
        debounceDuration: 300,
        components: [],
        timeout: 15000,
        maximumAge: Infinity,
        enableHighAccuracy: true,
    };

    constructor(props) {
        super(props);
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental &&
                UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    componentDidMount() {
        Events.listen(
            'InputBlur',
            this.constructor.displayName,
            this._onTextBlur,
        );
        Events.listen(
            'InputFocus',
            this.constructor.displayName,
            this._onTextFocus,
        );
        Events.listen(
            'PlaceSelected',
            this.constructor.displayName,
            this._onPlaceSelected,
        );
    }

    componentWillUnmount() {
        Events.rm('InputBlur', this.constructor.displayName);
        Events.rm('InputFocus', this.constructor.displayName);
        Events.rm('PlaceSelected', this.constructor.displayName);
    }

    state = {
        inputScale: new Animated.Value(1),
        inFocus: false,
        region: {
            ...DEFAULT_DELTA,
            ...this.props.initialLocation,
        },
    };

    _animateInput = () => {
        Animated.timing(this.state.inputScale, {
            toValue: this.state.inFocus ? 1.2 : 1,
            duration: 300,
        }).start();
    };

    _onMapRegionChange = region => {
        this._setRegion(region, false);
        if (this.state.inFocus) {
            this._input.blur();
        }
    };

    _onMapRegionChangeComplete = region => {
        this._input.fetchAddressForLocation(region);
    };

    _onTextFocus = () => {
        this.state.inFocus = true;
        this._animateInput();
    };

    _onTextBlur = () => {
        this.state.inFocus = false;
        this._animateInput();
    };

    _setRegion = (region, animate = true) => {
        this.state.region = { ...this.state.region, ...region };
        if (animate) this._map.animateToRegion(this.state.region);
    };

    _onPlaceSelected = placeId => {
        this._input.blur();
        axios
            .get(
                `${PLACE_DETAIL_URL}?key=${this.props.apiKey
                }&placeid=${placeId}`,
            )
            .then(({ data }) => {
                let region = (({ lat, lng }) => ({
                    latitude: lat,
                    longitude: lng,
                }))(data.result.geometry.location);
                this._setRegion(region);
                this.setState({ placeDetails: data.result });
            });
    };


    render() {
        let { inputScale } = this.state;
        return (
            <>
                <View style={{ flex: 0.1, }}>
                    <AppHeader
                        leftIconPath={images.headerLeftBack}
                        title={this.props.isEdit ? 'Edit Delivery Address' : 'New Delivery Address'}
                        onLeftIconPress={() => this.props.navigation.goBack()}
                        rightText='Done'
                        onRightIconPress={() => {
                            const data = this._input.getAddress();
                            if (data && data.json) {
                                const street = data.json.street;
                                if (street && street.includes(' ')) {
                                    const splitStreet = street.split(' ');
                                    if (!isNaN(splitStreet[0]))
                                        data.json.street = `${splitStreet.slice(
                                            1,
                                        )} ${splitStreet[0]}`;
                                }
                            }
                            this.props.onLocationSelect({
                                ...this.state.region,
                                address: data?.json ? (data.json.region || '') + (data?.json.state ? `, ${data?.json.state}` : '') + (data?.json.zip ? `, ${data?.json.zip}` : '') : '',
                                placeDetails: this.state.placeDetails,
                                json: data && data.json,
                            });
                        }}
                        bgColor={colors.AppGreenColor}
                    />
                </View>
                <View style={styles.container}>

                    <MapView
                        ref={mapView => (this._map = mapView)}
                        style={styles.mapView}
                        region={this.state.region}
                        showsMyLocationButton={false}
                        showsUserLocation={false}
                        onPress={({ nativeEvent }) =>
                            this._setRegion(nativeEvent.coordinate)
                        }
                        onRegionChange={this._onMapRegionChange}
                        onRegionChangeComplete={this._onMapRegionChangeComplete}
                    >
                    </MapView>
                    <Image source={images.ic_location_pin} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                    <View style={styles.fullWidthContainer}>
                        <AutoCompleteInput
                            ref={input => (this._input = input)}
                            apiKey={this.props.apiKey}
                            style={[
                                styles.input,
                                { transform: [{ scale: inputScale }] },
                            ]}
                            debounceDuration={this.props.debounceDuration}
                            components={this.props.components}
                        />
                    </View>
                    {this.props.children}
                </View >
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapView: {
        ...StyleSheet.absoluteFillObject,
    },
    fullWidthContainer: {
        position: 'absolute',
        width: '100%',
        top: 80,
        alignItems: 'center',
    },
    input: {
        width: '80%',
        padding: 5,
    },
    currentLocBtn: {
        backgroundColor: '#000',
        padding: 5,
        borderRadius: 5,
        position: 'absolute',
        bottom: 70,
        right: 10,
    },
    actionButton: {
        backgroundColor: 'blue',
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        paddingVertical: 15,
    },
    actionText: {
        fontSize: 18,
        color: 'white',
        letterSpacing: 2,
        textAlign: 'center',
    },
});
