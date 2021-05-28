import React from 'react';
import { View, StyleSheet, Text, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../Assets/Colors/colors';

export default class ImageList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} style={styles.mainView}>
                <View style={styles.overlay}>
                    <Image source={{ uri: this.props.image }}
                        style={styles.image} />
                    <Text style={styles.textStyle} >{this.props.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    mainView: {
        height: hp(13),
        width: wp(40),
        // marginVertical:wp(2),
        // marginRight:wp(3),
        margin: wp(2),
        borderRadius: wp(3),
        justifyContent: 'center',
        alignItems: 'center'
        // backgroundColor: "pink"
    },
    container: {
        overflow: 'hidden',
        borderRadius: wp(3)
    },
    image: {
        resizeMode: 'contain',
        height: hp(11),
        width: wp(38),
        position: 'absolute',
        left: hp(1),
        top: wp(1)
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        // backgroundColor: '#F5F5F5',
        height: hp(13),
        width: wp(40),
        borderRadius: wp(3),
        // marginHorizontal:wp(20),
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        // justifyContent: 'center',
        // alignItems: 'center',
        fontSize: wp(4),
        color: "#FFFFFF",
        fontWeight: 'bold',
        marginHorizontal: 5,
        textAlign: 'center'
    },
    balanceContainer: {
    }
});