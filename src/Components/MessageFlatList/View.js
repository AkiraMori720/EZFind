import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class MessagesLink extends React.Component {

    render() {
        return (
            <TouchableOpacity style={styles.mainContainer} onPress={this.props.onPress}>
                <View style={styles.container}>
                    <View style={styles.containerLogo}>
                        <Image style={this.props.leftImage ? styles.img : styles.imgavatar} source={this.props.leftImage ? { uri: this.props.leftImage } : require('../../Assets/Images/images/profilePic.png')} />
                        <Text style={styles.text}>{this.props.title}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <View>
                            {this.props.badge != null && this.props.badge > 0 ? <View style={styles.badge}><Text style={styles.badgeLabel}>{this.props.badge}</Text></View> : null}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        marginHorizontal: wp(2),
        paddingVertical: hp(1.5),
    },
    container: {
        backgroundColor: "#fff",
        paddingHorizontal: wp(3),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: hp(8),
        borderRadius: 5,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        elevation: 5
        // borderWidth:wp(0.1),
        // marginBottom:hp(0.5),
        // paddingBottom:wp(2),
    },
    containerLogo: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    img: {
        height: hp(5),
        width: hp(5),
        resizeMode: 'cover',
        borderRadius: hp(5)
        // tintColor:'#87202C',
    },
    imgavatar: {
        height: hp(5),
        width: hp(5),
        resizeMode: 'contain',
        borderRadius: hp(5)
    },
    text: {
        textAlign: 'center',
        marginStart: wp(2),
        color: 'black',
    },
    badge: {
        fontSize: wp(3),
        backgroundColor: 'red',
        width: wp(6),
        height: wp(6),
        borderRadius: wp(10),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    badgeLabel: {
        fontSize: wp(3),
        color: 'white'
    }
});


