
//================================ React Native Imported Files ======================================//

import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import { View, Text, Image, TouchableOpacity, FlatList, StatusBar, ActivityIndicator, PermissionsAndroid, InteractionManager, ScrollView } from 'react-native';
import React from 'react';

//================================ Local Imported Files ======================================//
import ImageList from '../../Components/CategoryFlatList/CategoryFlatList';
import AppHeader from '../../Components/AppHeader/AppHeader';
import images from '../../Assets/Images/images';
import colors from '../../Assets/Colors/colors';
import styles from './Styles';
import firestore from '@react-native-firebase/firestore';
import { connect } from 'react-redux'
import Geolocation from 'react-native-geolocation-service';
import { setLocation } from '../../reducers/user'
var MessageBarManager = require('react-native-message-bar').MessageBarManager;

class EZScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            categories: [],
            subcategories: [],
            selCategory: null,
            pageIndex: 0
        };
    }
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            setTimeout(() => {
                this.requestLocation();
            }, 50)
        })
        this.subscriber = firestore()
            .collection('categories')
            .onSnapshot((querySnapshot) => {
                const categories = [];
                querySnapshot && querySnapshot.forEach(documentSnapshot => {
                    categories.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });
                this.setState({ categories, loading: false })
            });
    }
    componentWillUnmount() {
        this?.subscriber && this.subscriber()
    }
    async requestLocation() {
        if (Platform.OS == 'android') {
            const granted = await PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
            if (granted) {
                console.log('You can use the ACCESS_FINE_LOCATION');
                this.getLocation();
            } else {
                try {
                    const allowed = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    );
                    if (allowed === PermissionsAndroid.RESULTS.GRANTED) {
                        console.log('You can use the location');
                        this.getLocation();
                    } else {
                        console.log('location permission denied');
                        alert('location permission denied');
                    }
                } catch (err) {
                    console.warn(err);
                }
            }
        } else {
            Geolocation.requestAuthorization('whenInUse');
            Geolocation.setRNConfiguration({
                skipPermissionRequests: false,
                authorizationLevel: 'whenInUse',
            });
            this.getLocation();
        }
    }
    getLocation() {
        Geolocation.getCurrentPosition(
            async position => {
                console.log(position);
                if (position.coords) {
                    this.props.setLocation(position.coords)
                }
            },
            error => {
                // See error code charts below.
                console.log('error:', error.code, error.message);
            },
            { timeout: 15000 },
        );
    }
    //================================ FlatList Function ======================================//
    menuItem(item, parent) {
        return (
            <ImageList
                image={item.image_url}
                title={item.name}
                onPress={() => {
                    if (parent) {
                        this.setState({ loading: true })
                        this.subscriber = firestore()
                            .collection('categories')
                            .doc(item.key)
                            .collection('subcategories')
                            .get()
                            .then((querySnapshot) => {
                                const subcategories = [];
                                querySnapshot && querySnapshot.forEach(documentSnapshot => {
                                    subcategories.push({
                                        ...documentSnapshot.data(),
                                        key: documentSnapshot.id,
                                    });
                                });
                                this.setState({ selCategory: item, subcategories, loading: false, pageIndex: 1 })
                            });
                    } else {
                        this.props.navigation.navigate("Listing", { subcategory: item, category: this.state.selCategory, subcategories: this.state.subcategories })
                    }
                }}
            />
        )
    }
    renderCategory() {
        const nav = this.props.navigation;
        const { loading, categories } = this.state;
        const { user, profile } = this.props
        return (
            <View style={[styles.bottomContainer, { flex: 0.9 }]}>
                <Text style={styles.checkboxTextStyle}>{'Categories'}</Text>
                <View style={styles.flatListContainer}>
                    <FlatList
                        numColumns={2}
                        contentContainerStyle={{ paddingBottom: 50 }}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        horizontal={false}
                        data={categories}
                        renderItem={({ item }) => this.menuItem(item, true)}
                        keyExtractor={item => item.key + ''}
                    />
                </View>
            </View>
        );
    }
    renderSubcategory() {
        const nav = this.props.navigation;
        const { loading, subcategories, selCategory } = this.state;
        const { user, profile } = this.props
        return (
            <View style={[styles.bottomContainer, { flex: 0.9 }]}>
                <TouchableOpacity style={{ paddingHorizontal: 5, paddingTop: 15 }} onPress={() => {
                    this.setState({ pageIndex: 0 })
                }}
                >
                    <Image source={require('../../Assets/Images/images/ic_back.png')} style={{ width: 25, height: 25, resizeMode: 'contain', tintColor: colors.AppGreenColor }} />
                </TouchableOpacity>

                <Text style={styles.checkboxTextStyle}>{selCategory?.name}</Text>
                <View style={styles.flatListContainer}>
                    {
                        subcategories && subcategories.length > 0 ?
                            <FlatList
                                numColumns={2}
                                contentContainerStyle={{ paddingBottom: 80 }}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                                horizontal={false}
                                data={subcategories}
                                renderItem={({ item }) => this.menuItem(item)}
                                keyExtractor={item => item.key + ''}
                            /> : <Text style={{ fontSize: 15, color: 'gray', textAlign: 'center', marginTop: 10 }}>No item</Text>
                    }
                </View>
            </View>
        );
    }
    render() {
        const nav = this.props.navigation;
        const { loading, categories, pageIndex } = this.state;
        const { user, profile } = this.props
        return (
            <View style={styles.mainContainer}>
                {/* //================================ StatusBar ======================================// */}
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor={colors.AppDarkGreenColor} translucent={false} />

                {/* //================================ Header ======================================// */}
                <View style={styles.headerCotainer}>
                    <AppHeader
                        headerHeight="100%"
                        onLeftIconPress={() => this.props.navigation.openDrawer()}
                        leftIconPath={images.ic_hamburger_menu}
                        lefticonSize={wp(5)}
                        title={'EZ Find'}
                        bgColor={colors.AppGreenColor}
                        rightIconOnePath={images.ic_map}
                        onRightIconPress={() => this.props.navigation.navigate('MapScreen', { fromFind: true })}

                    />
                </View>

                {/* //================================ Bottom Container======================================// */}
                {
                    loading ? <ActivityIndicator color="black" style={{ alignSelf: "center", marginTop: 20 }} /> :
                        <>
                            {
                                pageIndex == 0 ? this.renderCategory() : this.renderSubcategory()
                            }
                        </>
                }
                {
                    //profile && profile.type == 'seller' &&
                    <View style={styles.addContainer}>

                        {/* //================================ Post Button ======================================// */}
                        <TouchableOpacity style={styles.addButtonStyleContainer} onPress={() => {
                            if (profile.avatar && profile.first_name && profile.last_name && profile.address && profile.phone) {
                                this.props.navigation.navigate('PostItem')
                            } else {
                                MessageBarManager.showAlert({
                                    title: '',
                                    message: 'All Profile Details Required to post items in the app',
                                    alertType: 'warning'
                                });
                                this.props.navigation.navigate('ProfileScreen')
                            }
                        }}>
                            <Image source={images.ic_add}
                                style={styles.imageStylesTag}
                            />

                        </TouchableOpacity>
                    </View>
                }
            </View>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user,
    profile: state.user.profile
})

const mapDispatchToProps = {
    setLocation
}

export default connect(mapStateToProps, mapDispatchToProps)(EZScreen)