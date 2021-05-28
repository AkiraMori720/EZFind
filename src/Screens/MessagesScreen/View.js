//================================ React Native Imported Files ======================================//
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { View, FlatList, StatusBar, ActivityIndicator, Text } from 'react-native';
import React from 'react';
import { connect } from 'react-redux'
import firestore from '@react-native-firebase/firestore';
import { setChannels } from '../../reducers/user'

//================================ Local Imported Files ======================================//

import MessagesFlatList from '../../Components/MessageFlatList/View';
import AppHeader from '../../Components/AppHeader/AppHeader';
import colors from '../../Assets/Colors/colors';
import images from '../../Assets/Images/images';
import styles from './Styles';

class MessagesScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      channels: [],
      loading: false,

    };
  }

  componentDidMount() {
    const { user } = this.props
    this.createSubscriber(user.uid)
  }
  componentWillUnmount() {
    this.subscriber && this.subscriber()
  }
  componentWillReceiveProps(nextprops) {
    if (nextprops.user && nextprops.user != this.props.user) {
      this.createSubscriber(nextprops.user.uid)
    }
  }
  createSubscriber(uid) {
    this.setState({ loading: true })
    this.subscriber && this.subscriber()
    this.subscriber = firestore()
      .collection('channel')
      .where("users", "array-contains-any", [uid])
      .onSnapshot((querySnapshot) => {
        let promiseAll = []
        querySnapshot && querySnapshot.forEach(documentSnapshot => {
          const channel = {
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          }
          let other_userid = channel.creator?.uid == uid ? channel.acceptor?.uid : channel.creator?.uid
          promiseAll.push(firestore().collection('users').doc(other_userid).get().then((userSnapshot => {
            return {
              ...channel,
              channel_info: {
                ...userSnapshot.data(),
                uid: other_userid
              }
            }
          })))
        });
        Promise.all(promiseAll).then(channels => {
          console.log("#channels", channels)
          this.setState({ channels, loading: false })
          this.props.setChannels(channels)
        })
      });
  }
  onNavigate(item, channel_info) {
    this.props.navigation.navigate('ChatScreen', { channel: item, channel_info })
  }
  
  //================================ Render List ======================================//
  messageList(item) {
    const { user } = this.props
    if (user) {
      return (
        <MessagesFlatList
          leftImage={item.channel_info.avatar}
          title={item.channel_info.name || 'Unknown'}
          badge={item.unread && item.unread[user.uid]}
          onPress={() => this.onNavigate(item, item.channel_info)}
        />
      );
    } return null
  }

  render() {
    const nav = this.props.navigation;
    const { channels, loading } = this.state;
    return (
      <View style={styles.mainContainer}>

        {/* //================================ StatusBar ======================================// */}

        <StatusBar barStyle="dark-content" hidden={false} backgroundColor={colors.AppDarkGreenColor} translucent={false} />

        {/* //================================ Header ======================================// */}

        <View style={styles.headerView}>
          <AppHeader
            headerHeight="100%"
            onLeftIconPress={() => this.props.navigation.openDrawer()}
            leftIconPath={images.ic_hamburger_menu}
            lefticonSize={wp(5)}
            title={'Messages'}
            bgColor={colors.AppGreenColor}
          />
        </View>
        {/* //================================ FlatList ======================================// */}

        <View style={styles.container}>
          {loading ? <ActivityIndicator color="black" style={{ alignSelf: "center" }} /> :
            <>
              {
                channels && channels.length > 0 ?
                  <FlatList
                    keyExtractor={item => item.key + ''}
                    data={channels}
                    renderItem={({ item }) => this.messageList(item)}
                  /> : <Text style={{ fontSize: 14, color: 'gray', marginTop: 10, alignSelf: 'center' }}>No channels</Text>
              }
            </>
          }
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user.user,
  profile: state.user.profile
})

const mapDispatchToProps = {
  setChannels
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesScreen)
