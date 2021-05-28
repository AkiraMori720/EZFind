import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from "../../Assets/Colors/colors";
import images from "../../Assets/Images/images";

export default class CheckBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            radioButtonChecked: props.value
        }
    }
    componentWillReceiveProps(nextprops) {
        if (this.props.value != nextprops.value) {
            this.setState({ radioButtonChecked: nextprops.value })
        }
    }
    onRadioPress() {
        const { onChange } = this.props
        if (this.state.radioButtonChecked) {
            this.setState({ radioButtonChecked: false })
            onChange && onChange(false)
        } else {
            this.setState({ radioButtonChecked: true })
            onChange && onChange(true)
        }
    }

    render() {
        return (
            <View style={styles.mainContainer} >
                <View style={styles.container}>

                    <TouchableOpacity onPress={() => this.onRadioPress()} style={styles.touchViewRadio}>
                        {this.state.radioButtonChecked && <Image style={styles.img} source={images.icn_check_box} />}
                    </TouchableOpacity>

                    <View>
                        <Text style={styles.text}>{this.props.checkTitle}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        // justifyContent: 'center',
        // alignItems:'center',
        // backgroundColor:'green',
        // flex:1,

    },
    text: {
        // fontFamily:'Montserrat-Regular',
        fontSize: 14,
        color: colors.black,
        fontWeight: 'bold'

    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: '#fff',
        // height:hp(10),
        // width:wp(10),
    },
    touchViewRadio: {
        height: wp(5),
        width: wp(5),
        backgroundColor: colors.white,
        // borderRadius:wp(10),
        borderWidth: wp(0.5),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wp(2),
        borderRadius: 5,
        borderColor: colors.AppGreenColor,
    },
    innerTouchViewRadio: {
        backgroundColor: 'red',
        width: '80%',
        height: '80%',
        borderRadius: wp(5),
        margin: 1,
    },
    img: {
        resizeMode: 'contain',
        height: hp(3),
        width: wp(3),
        // tintColor:'green',
    }



});


