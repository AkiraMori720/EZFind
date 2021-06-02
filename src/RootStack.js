
//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { Text, Image, View, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import * as React from 'react';
import auth from '@react-native-firebase/auth';
import { updateUser, updateUserProfile } from './reducers/user'
import { store } from '../App'
import { CommonActions } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
//================================ Local Imported Files ======================================//

import NewPassword from './Screens/AuthScreens/LoginScreens/EnterNewPasswordScreen/View';
import ResetPassword from './Screens/AuthScreens/LoginScreens/ResetPasswordScreen/View';
import SignupWith from './Screens/AuthScreens/SignupScreens/SignupWithScreen/View';
import TermsAndCondtions from './Screens/SettingScreens/TermConditionScreen/View';
import SignUpScreen from './Screens/AuthScreens/SignupScreens/SignupScreen/View';
import LoginScreen from './Screens/AuthScreens/LoginScreens/LoginScreen/View';
import SendFeedback from './Screens/SettingScreens/SendFeedBackScreen/View';
import SettingsScreen from './Screens/SettingScreens/SettingScreen/View';
import PrivacyScreen from './Screens/SettingScreens/PrivacyScreen/View';
import SettingsModel from './Components/SettingModel/SettingModel';
import Loops from './Components/CommonFlatList/CommonFlatList';
import MessagesScreen from './Screens/MessagesScreen/View';
import ProfileScreen from './Screens/MyProfileScreen/View';
import FavoriteScreen from './Screens/FavoriteScreen/View';
import EditProfile from './Screens/EditProfileScreen/View';
import ProductScreen from './Screens/ProductScreen/View';
import ListingScreen from './Screens/ListingScreen/View';
import OnBoarding from './Screens/OnBoardingScreen/View';
import SearchFilters from './Screens/SearchFilters/View';
import SplashScreen from './Screens/SplashScreen/View';
import PostItem from './Screens/PostItemScreen/View';
import ChatScreen from './Screens/ChatScreen/View';
import EZScreen from './Screens/EZFindScreen/View';
import MapScreen from './Screens/MapScreen/View';
import ProductMapScreen from './Screens/ProductMapScreen/View'
import styles from './Components/MyNav/styles'
import images from './Assets/Images/images';
import colors from './Assets/Colors/colors';
import NewAddress from './Screens/NewAddress/NewAddress'
import MyStore from './Screens/MyStore/View'
import PostItemEdit from './Screens/PostItemEdit/View'
import I18n from "./i18n";
import AsyncStorage from "@react-native-community/async-storage";

//================================ Drawer Function ======================================//
function CustomDrawerContent(props) {
    const { user, profile } = store.getState().user
    return (

        <View {...props} style={styles.drawerMainContainer}>
            <View style={styles.userInfoContainer}>
                <TouchableOpacity style={styles.userImageContainer} onPress={() => {
                    props.navigation.closeDrawer()
                    props.navigation.navigate('EditProfile')
                }}>
                    <Image source={{ uri: profile && profile.avatar || '' }} style={styles.userProfileImage} />
                </TouchableOpacity>
                {
                    profile && profile.name ?
                        <TouchableOpacity style={styles.userTextContainer} onPress={() => {
                            props.navigation.closeDrawer()
                            props.navigation.navigate('EditProfile')
                        }}>
                            <Text style={styles.userNameText}>Hi, {profile.name}</Text>
                        </TouchableOpacity> : null
                }
            </View>
            <ScrollView contentContainerStyle={styles.drawerItemsContainer} >

                <DrawerItem
                    style={styles.drawerItemStyles}
                    label={() => <Text style={styles.drawerItemLabelText} >{I18n.t("Marketplace")}</Text>}
                    icon={() => <Image source={images.ic_social_feed} style={styles.drawerItemImage} />}
                    onPress={() => props.navigation.navigate('EZScreen')} />
                {
                    //profile && profile.type == 'seller' &&
                    <DrawerItem
                        style={styles.drawerItemStyles}
                        label={() => <Text style={styles.drawerItemLabelText} >{I18n.t("My Items")}</Text>}
                        icon={() => <Image source={images.ic_transaction} style={styles.drawerItemImage} />}
                        onPress={() => props.navigation.navigate('MyStore')} />
                }
                <DrawerItem
                    style={styles.drawerItemStyles}
                    label={() => <Text style={styles.drawerItemLabelText} >{I18n.t("Favorites")}</Text>}
                    icon={() => <Image source={images.ic_heart} style={styles.drawerItemImage} />}
                    onPress={() => props.navigation.navigate('FavoriteScreen')} />

                <DrawerItem
                    style={styles.drawerItemStyles}
                    label={() => <Text style={styles.drawerItemLabelText} >{I18n.t("Map")}</Text>}
                    icon={() => <Image source={images.ic_map} style={styles.drawerItemImage} />}
                    onPress={() => props.navigation.navigate('MapScreen', { fromFind: false })} />

                <DrawerItem
                    style={styles.drawerItemStyles}
                    label={() => <Text style={styles.drawerItemLabelText} >{I18n.t("Messages")}</Text>}
                    icon={() => <Image source={images.ic_email} style={styles.drawerItemImage} />}
                    onPress={() => props.navigation.navigate('MessagesScreen')} />


                <DrawerItem
                    style={styles.drawerItemStyles}
                    label={() => <Text style={styles.drawerItemLabelText} >{I18n.t("Settings")}</Text>}
                    icon={() => <Image source={images.ic_settings} style={styles.drawerItemImage} />}
                    onPress={() => props.navigation.navigate('SettingsScreen')} />

                {/* <DrawerItem
                    style={[styles.drawerItemStyles, { marginTop: wp(5) }]}
                    label={() => <Text style={styles.drawerItemLabelText} >{`Switch to ${profile && profile.type == 'buyer' ? 'Seller' : 'Buyer'} Account`}</Text>}
                    icon={() => <Image source={images.ic_switch_to_buyer} style={styles.drawerItemImage}
                    />}
                    onPress={() => {
                        props.navigation.closeDrawer()
                        const profile_doc = firestore().collection('users').doc(user.uid)
                        profile_doc.update({
                            type: profile && profile.type == 'buyer' ? 'seller' : 'buyer'
                        })
                            .then((res) => {
                                profile_doc.get().then(res => {
                                    console.log("upated profile:", res.data())
                                    store.dispatch(updateUserProfile(res.data()))
                                })
                            })
                    }}
                /> */}

                <DrawerItem style={[styles.drawerItemStylesLogin, { backgroundColor: colors.AppRedColor, marginTop: wp(5) }]}
                    label={() => <Text style={[styles.drawerItemLabelText, { color: colors.bright_red, fontWeight: 'bold' }]}>{I18n.t("Logout")}</Text>}
                    icon={() => <Image source={images.ic_logout_settings} style={[styles.drawerItemImage, { tintColor: colors.bright_red }]} />}
                    onPress={() => {
                        Alert.alert(
                            I18n.t("Logout"),
                            I18n.t("Are you sure to logout"),
                            [
                                {
                                    text: I18n.t("Cancel"),
                                    onPress: () => console.log("Cancel Pressed"),
                                    style: "cancel"
                                },
                                {
                                    text: I18n.t("OK"), onPress: () => {

                                        try {
                                            auth()
                                                .signOut()
                                                .then(async () => {
                                                    await AsyncStorage.removeItem('language');
                                                    store.dispatch(updateUser())
                                                    props.navigation.dispatch(
                                                        CommonActions.reset({
                                                            index: 1,
                                                            routes: [
                                                                { name: 'SignupWith' },
                                                                {
                                                                    name: 'LoginScreen',
                                                                },
                                                            ],
                                                        })
                                                    );
                                                    console.log('User signed out!')
                                                }).catch(e => {
                                                    store.dispatch(updateUser())
                                                });
                                        } catch (e) {
                                            store.dispatch(updateUser())
                                            return
                                        }
                                    }
                                }
                            ],
                            { cancelable: false }
                        );




                    }} />

            </ScrollView>

        </View>

    );
}



//================================ Drawer Navigator ======================================//

const Drawer = createDrawerNavigator();
function drawerNav() {
    return (
        <Drawer.Navigator
            initialRouteName="EZScreen"
            drawerContent={props => CustomDrawerContent(props)}>
            <Drawer.Screen name="EZScreen" component={EZScreen} />
            <Drawer.Screen name="MyStore" component={MyStore} />
            <Drawer.Screen name="FavoriteScreen" component={FavoriteScreen} />
            <Drawer.Screen name="MessagesScreen" component={MessagesScreen} />
            <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
            <Drawer.Screen name="MapScreen" component={MapScreen} />
        </Drawer.Navigator>
    );
}

//================================ Root Stack ======================================//

const RootStack = createStackNavigator();
export default function myStack() {
    return (
        <NavigationContainer>
            <RootStack.Navigator
                initialRouteName={'splashScreen'}
                headerMode={'none'}
                screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }} >
                <RootStack.Screen name="TermsAndCondtions" component={TermsAndCondtions} />
                <RootStack.Screen name="PrivacyScreen" component={PrivacyScreen} />
                <RootStack.Screen name="ResetPassword" component={ResetPassword} />
                <RootStack.Screen name="SearchFilters" component={SearchFilters} />
                <RootStack.Screen name="ProductScreen" component={ProductScreen} />
                <RootStack.Screen name="ProfileScreen" component={ProfileScreen} />
                <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
                <RootStack.Screen name="SendFeedback" component={SendFeedback} />
                <RootStack.Screen name="splashScreen" component={SplashScreen} />
                <RootStack.Screen name="LoginScreen" component={LoginScreen} />
                <RootStack.Screen name="NewPassword" component={NewPassword} />
                <RootStack.Screen name="EditProfile" component={EditProfile} />
                <RootStack.Screen name="Listing" component={ListingScreen} />
                <RootStack.Screen name="ChatScreen" component={ChatScreen} />
                <RootStack.Screen name="OnBoarding" component={OnBoarding} />
                <RootStack.Screen name="SignupWith" component={SignupWith} />
                <RootStack.Screen name="PostItem" component={PostItem} />
                <RootStack.Screen name="PostItemEdit" component={PostItemEdit} />
                <RootStack.Screen name="NewAddress" component={NewAddress} />
                <RootStack.Screen name="drawer" component={drawerNav} />
                <RootStack.Screen name="SettingsModel" component={SettingsModel} />
                <RootStack.Screen name="Loops" component={Loops} />
                <Drawer.Screen name="ProductMapScreen" component={ProductMapScreen} />
            </RootStack.Navigator>
        </NavigationContainer>
    );
}

