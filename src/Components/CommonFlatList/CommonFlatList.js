import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, SafeAreaView, TouchableOpacity, Modal, Platform, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import images from '../../Assets/Images/images';
import colors from '../../Assets/Colors/colors';
import I18n from "../../i18n";

export default class Loops extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        const { product, onEdit, onDelete, onClose } = this.props
        return (
            <TouchableOpacity style={[styles.container, product?.taken ? { backgroundColor: '#DDD' } : {}]} onPress={() => {
                if (product?.taken) {
                    alert(I18n.t('This item is already taken'))
                    return
                }
                this.props.onPress()
            }}>
                <View style={styles.leftViewImage}>
                    <Image style={styles.image} source={{ uri: this.props.image }} />
                </View>
                <View style={styles.rightViewInfo}>
                    <View style={styles.innerLeftInfoView}>
                        <View style={styles.infoViewInner}>
                            <Text style={styles.title}>{this.props.title}</Text>
                            <Text style={styles.price}>{this.props.price} </Text>
                            {
                                product?.taken ? <Text style={[styles.title, { fontSize: 10, paddingTop: 0, color: 'red' }]}>{I18n.t('Status_Taken')}</Text> : null
                            }
                            <Text style={styles.postedText}>{this.props.dayTime}</Text>
                        </View>
                        <View style={styles.innerRightInfoView}>
                            <Text style={{ fontSize: 13, color: 'grey' }}>{this.props.ml}</Text>
                            {this.props.isIcons ?
                                <View style={{ paddingTop: 0 }}>
                                    <TouchableOpacity onPress={() => onEdit && onEdit()}>
                                        <Image style={styles.iconHeart} source={images.ic_edit} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ marginTop: 10 }} onPress={() => onDelete && onDelete()}>
                                        <Image style={[styles.icon]} source={images.ic_trash} />
                                    </TouchableOpacity>
                                </View>
                                : null
                            }
                        </View>
                    </View>
                    <View style={styles.innerMiddleTextView}>
                        <Text style={{ fontSize: 13, color: colors.input_text_color }}>{this.props.description}</Text>
                    </View>
                    <View style={styles.innerBottomTextView}>
                        <View style={styles.viewBottomInfo}>
                            <Image style={styles.iconMarker} source={images.ic_marker} />
                            <Text style={{ fontSize: 12, paddingLeft: '2%', flex: 1 }}>{this.props.location}</Text>
                        </View>
                    </View>
                </View>
                {
                    onClose &&
                    <TouchableOpacity
                        style={{ position: 'absolute', top: 10, right: 10 }}
                        onPress={() => {
                            onClose()
                        }}>
                        <Image source={require('../../Assets/Images/images/ic_close_tag.png')} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                }
            </TouchableOpacity>
            // </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        //height: hp(25),
        width: wp(90),
        backgroundColor: colors.white,
        marginTop: hp(2),
        borderRadius: 7,
        // alignItems:'center',
        flexDirection: 'row'
    },
    leftViewImage: {
        flexDirection: 'row',
        height: '100%',
        width: '40%',
        // backgroundColor:'orange',
        borderBottomLeftRadius: 7,
        borderTopLeftRadius: 7,
    },
    image: {
        height: '100%',
        width: '96%',
        resizeMode: 'cover',
        borderTopLeftRadius: 7,
        borderBottomLeftRadius: 7
    },
    rightViewInfo: {
        width: '60%',
        // backgroundColor:'green',
        borderTopRightRadius: 7,
        borderBottomRightRadius: 7,
        // paddingLeft: '4%',
    },
    innerLeftInfoView: {
        flexDirection: 'row',
        width: '100%',
        // backgroundColor:'grey',
    },
    innerRightInfoView: {
        width: '30%',
        // backgroundColor:'gold',
        alignItems: 'center',
        paddingTop: 10,
    },
    innerMiddleTextView: {
        width: '100%',
        // backgroundColor:'blue',
        // paddingHorizontal:'2%',
        // justifyContent:'center',
        paddingLeft: '2%',
        paddingRight: '3%'
    },
    innerBottomTextView: {
        width: '100%',
        // backgroundColor:'pink',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        tintColor: "red"
    },
    iconHeart: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        tintColor: colors.grey
    },
    iconMarker: {
        height: 18,
        width: 18,
        resizeMode: 'contain',
        tintColor: colors.AppGreenColor
    },
    infoViewInner: {
        width: '70%',
        // backgroundColor:'red',
        paddingLeft: '2%'
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        paddingTop: 10
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.AppGreenColor,
        paddingVertical: 5
    },
    postedText: {
        fontSize: 13,
        color: colors.input_text_color,
        paddingVertical: 5,
    },
    viewBottomInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10
    }
});

