import React, {Component} from 'react';
import RootStack from './src/RootStack';
import createStore from './src/reducers'
import {Provider} from 'react-redux'
import auth from '@react-native-firebase/auth';
import {updateUser, updateUserProfile} from './src/reducers/user'
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native'
import I18n from "./src/i18n";
import moment from "moment";

var MessageBarAlert = require('react-native-message-bar').MessageBar;
var MessageBarManager = require('react-native-message-bar').MessageBarManager;

export const store = createStore()

export default class App extends Component {
    constructor() {
        super();
        this.initialize = false;
    }
    async componentDidMount() {
        const lang = await AsyncStorage.getItem('language');
        if(lang){
            I18n.locale = lang;
            moment.locale(lang);
        }

        this.subscriber = auth().onAuthStateChanged(async (user) => {
            if (user) {
                if (!this.initialize) {
                    this.initialize = true
                }
                console.log("-----user:", user._user)
                firestore()
                    .collection(`users`)
                    .doc(`${user._user.uid}`)
                    .get()
                    .then((res) => {
                        if (res) {
                            console.log('fetch user profile!', res.data());
                            store.dispatch(updateUserProfile(res.data()))
                        }
                    })
                store.dispatch(updateUser(user._user))
            } else {
                if (!this.initialize) {
                    this.initialize = true
                    store.dispatch(updateUser(null))
                }
            }
        })
        MessageBarManager.registerMessageBar(this.refs.alert);
        this.requestUserPermission()
        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log(
                'Notification caused app to open from background state:',
                remoteMessage.notification,
            );
        });

        // Check whether an initial notification is available
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    console.log(
                        'Notification caused app to open from quit state:',
                        remoteMessage.notification,
                    );

                }
            });
    }
    componentWillUnmount() {
        // Remove the alert located on this master page from the manager
        MessageBarManager.unregisterMessageBar();
    }
    async requestUserPermission() {
        const authStatus = await messaging().requestPermission();
        // const enabled =
        //     authStatus === AuthorizationStatus.AUTHORIZED || authStatus === AuthorizationStatus.PROVISIONAL;

        // if (enabled) {
        //     console.log('Authorization status:', authStatus);
        // }
        await messaging().registerDeviceForRemoteMessages();
        const fcmToken = await messaging().getToken();
        console.log("-----------------fcmToken", fcmToken)
    }
    render() {
        return (
            <Provider store={store}>
                <RootStack />
                <MessageBarAlert ref="alert"
                    titleStyle={{ height: 0 }} viewTopInset={Platform.OS == 'ios' ? 20 : 0} />
            </Provider>
        );
    }
}
