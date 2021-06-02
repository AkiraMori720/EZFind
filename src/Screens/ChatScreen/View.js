//================================ React Native Imported Files ======================================//

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { GiftedChat } from 'react-native-gifted-chat'
import { View, StatusBar, ActivityIndicator, Keyboard } from 'react-native';
import React from 'react';

//================================ Local Imported Files ======================================//

import AppHeader from '../../Components/AppHeader/AppHeader';
import colors from '../../Assets/Colors/colors';
import images from '../../Assets/Images/images';
import styles from "./Styles";

import { connect } from 'react-redux'
import firestore from '@react-native-firebase/firestore';
import { sendPushNotification } from '../../utils/firebase'
import I18n from "../../i18n";

class ChatScreen extends React.Component {

    constructor(props) {
        super(props);
        const channel_info = props.route.params?.channel_info
        const channel = props.route.params?.channel
        this.state = {
            channel_info,
            channel,
            messages: [],
        }
        const latest_channel = props.channels.find(item => item.key == channel.key)
        if (latest_channel) {
            firestore()
                .collection('channel')
                .doc(latest_channel.key)
                .update({
                    unread: {
                        ...latest_channel.unread,
                        [props.user.uid]: 0
                    }
                })
                .then((res) => {

                })
        }
    }
    componentDidMount() {
        const { channel } = this.state
        this.messagesListener = firestore()
            .collection('channel')
            .doc(channel.key)
            .collection('messages')
            .orderBy('createdAt', 'desc')
            .onSnapshot(querySnapshot => {
                const messages = querySnapshot.docs.map(doc => {
                    const firebaseData = doc.data();
                    const data = {
                        _id: doc.id,
                        text: '',
                        createdAt: new Date().getTime(),
                        ...firebaseData
                    };

                    if (!firebaseData.system) {
                        data.user = {
                            ...firebaseData.user,
                            name: firebaseData.user.email
                        };
                    }

                    return data;
                });
                this.setState({ messages })
            });
    }
    componentWillUnmount() {
        this.messagesListener && this.messagesListener()
    }
    async onSend(messages = []) {
        Keyboard.dismiss()
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
        const text = messages[0].text;
        const { channel, channel_info } = this.state
        const { user, profile } = this.props
        firestore()
            .collection('channel')
            .doc(channel.key)
            .collection('messages')
            .add({
                text,
                createdAt: new Date().getTime(),
                user: {
                    _id: user.uid,
                    name: profile.name || profile.email,
                    avatar: profile.avatar
                }
            });
        sendPushNotification(channel_info.uid, 'New Message', text)
        const latest_channel = this.props.channels.find(item => item.key == channel.key)
        if (latest_channel) {
            console.log("------latest_channel", channel_info)
            const unread_count = latest_channel.unread && latest_channel.unread[channel_info.uid] ? latest_channel.unread[channel_info.uid] : 0
            firestore()
                .collection('channel')
                .doc(latest_channel.key)
                .update({
                    unread: {
                        ...latest_channel.unread,
                        [channel_info.uid]: unread_count + 1
                    }
                })
                .then((res) => {

                })
        }
    }
    renderLoading() {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size='large' color='#6646ee' />
            </View>
        );
    }

    render() {
        const { channel_info } = this.state
        const { user } = this.props
        return (

            <View style={styles.mainContainer}>

                {/* //================================ StatusBar ======================================// */}
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor={colors.AppRedColor} translucent={false} />

                {/* //================================ Header ======================================// */}
                <View style={styles.headerView}>

                    <AppHeader
                        headerHeight="100%"
                        onLeftIconPress={() => this.props.navigation.goBack()}
                        leftIconPath={images.headerLeftBack}
                        lefticonSize={wp(5)}
                        title={channel_info && channel_info.name || I18n.t('Unknown')}
                        bgColor={colors.AppGreenColor}
                    //rightIconOnePath={images.threeDots}
                    //rightIconSize={20}
                    />

                </View>
                {/* //================================ Gifted Chat View ======================================// */}

                <GiftedChat
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: user && user.uid,
                    }}
                    scrollToBottom
                    renderLoading={() => this.renderLoading()}
                    isLoadingEarlier={true}
                />
            </View>
        )
    }
}
const mapStateToProps = state => ({
    user: state.user.user,
    profile: state.user.profile,
    channels: state.user.channels
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen)