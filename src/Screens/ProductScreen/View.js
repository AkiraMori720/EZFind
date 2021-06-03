
//================================ React Native Imported Files ======================================//

import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import { View, Text, Image, Platform, ImageBackground, StatusBar, TouchableOpacity, Alert, Dimensions } from 'react-native';
import React from 'react';

//================================ Local Imported Files ======================================//
import AppHeader from '../../Components/AppHeader/AppHeader';
import Button from '../../Components/Button/Button';
import images from '../../Assets/Images/images';
import colors from '../../Assets/Colors/colors';
import styles from './Styles';

import firestore from '@react-native-firebase/firestore';
import { connect } from 'react-redux'
import Spinner from 'react-native-loading-spinner-overlay';
import { sendPushNotification } from '../../utils/firebase'
import Overlay from 'react-native-modal-overlay';
import I18n from "../../i18n";
import {calcCrow} from "../../utils/utils";
var MessageBarManager = require('react-native-message-bar').MessageBarManager;
const { width, height } = Dimensions.get('window')

const nearRadius = 100; //feet

class ProductScreen extends React.Component {
    constructor(props) {
        super(props);
        const product = props.route.params?.product
        const uid = product && product.createdby
        this.state = {
            product,
            uid,
            profile: null,
            spinner: false,
            photoIndex: 0,
            modalShow: false,
            imageIndex: 0,
            isNear: false
        };
    }
    componentDidMount() {
        if (this.state.uid) {
            firestore()
                .collection('users')
                .doc(this.state.uid)
                .get()
                .then((querySnapshot) => {
                    this.setState({ profile: querySnapshot.data() })
                });
        }
        if(this.state.product && this.state.product.location && this.props.location){
            const { latitude, longitude } = this.props.location;
            const distance = calcCrow(latitude, longitude, this.state.product.location.latitude, this.state.product.location.longitude) * 5280;

            if(distance < nearRadius){
                this.setState({isNear: true});
            }
        }
    }

    createChannel() {
        const { user, profile } = this.props
        const target_profile = this.state.profile
        const target_uid = this.state.uid
        this.setState({ spinner: true })
        firestore()
            .collection('channel')
            .where("users", "array-contains-any", [user.uid])
            .get()
            .then((querySnapshot) => {
                let matches_channel = 0;
                let keys = []
                querySnapshot && querySnapshot.forEach(documentSnapshot => {
                    const doc = documentSnapshot.data()
                    const find_target = doc && doc.users && doc.users.length > 0 ? doc.users.find(item => item == target_uid) : null
                    if (find_target) {
                        keys.push({
                            ...doc,
                            key: documentSnapshot.id
                        })
                        matches_channel++
                    }
                });
                if (matches_channel <= 0) {
                    firestore()
                        .collection('channel')
                        .add({
                            users: [user.uid, target_uid],
                            creator: {
                                ...profile,
                                uid: user.uid,
                            },
                            acceptor: {
                                ...target_profile,
                                uid: target_uid,
                            }
                        })
                        .then((res) => {
                            if (res) {
                                res.get().then(doc => {
                                    const item = {
                                        ...doc.data(),
                                        key: doc.id
                                    }
                                    let other_userid = item.creator?.uid == user.uid ? item.acceptor?.uid : item.creator?.uid
                                    firestore().collection('users').doc(other_userid).get().then(userSnapshot => {
                                        const channel_info = {
                                            ...userSnapshot.data(),
                                            uid: other_userid
                                        }
                                        this.setState({ spinner: false })
                                        this.props.navigation.navigate('ChatScreen', { channel: { ...item, channel_info }, channel_info })
                                    })
                                })
                            } else {
                                this.setState({ spinner: false })
                                this.props.navigation.navigate('MessagesScreen')
                            }
                        })
                } else {
                    const item = keys[0]
                    let other_userid = item.creator?.uid == user.uid ? item.acceptor?.uid : item.creator?.uid
                    firestore().collection('users').doc(other_userid).get().then(userSnapshot => {
                        const channel_info = {
                            ...userSnapshot.data(),
                            uid: other_userid
                        }
                        this.setState({ spinner: false })
                        this.props.navigation.navigate('ChatScreen', { channel: { ...item, channel_info }, channel_info })
                    })
                }
            })
    }
    addCart(favorite_obj) {
        const { user } = this.props
        const { product } = this.state
        this.setState({ spinner: true })
        var self = this;
        if (favorite_obj) {
            firestore()
                .collection('users').doc(user.uid).collection('carts').doc(favorite_obj.key)
                .delete()
                .then(() => {
                    self.setState({ spinner: false }, () => {
                        setTimeout(() => {
                            MessageBarManager.showAlert({
                                title: '',
                                message: I18n.t('Successfully removed'),
                                alertType: 'success'
                            });
                            self.props.navigation.goBack()
                        }, 10)
                    })
                });
        }
        else {
            firestore()
                .collection('users').doc(user.uid).collection('carts')
                .add({
                    shopping_item_key: product.key
                })
                .then(() => {
                    self.setState({ spinner: false }, () => {
                        setTimeout(() => {
                            MessageBarManager.showAlert({
                                title: '',
                                message: I18n.t('Successfully added'),
                                alertType: 'success'
                            });
                            self.props.navigation.goBack()
                        }, 10)
                    })
                });
        }
    }
    render() {
        const { product, photoIndex, isNear } = this.state

        const photo = product && product.photo.length > photoIndex ? product.photo[photoIndex] : ''
        const { carts, user } = this.props
        const isFavorite = carts.find(item => product && item.shopping_item_key == product.key)

        return (
            <View style={styles.mainContainer}>
                {/* //================================ StatusBar ======================================// */}

                <StatusBar barStyle="dark-content" hidden={false} backgroundColor={colors.AppDarkGreenColor} translucent={false} />
                {/* //================================ Header ======================================// */}

                <View style={styles.headerCotainer}>
                    <AppHeader
                        headerHeight="100%"
                        onLeftIconPress={() => this.props.navigation.goBack()}
                        leftIconPath={images.headerLeftBack}
                        lefticonSize={wp(5)}
                        title={product && product.title}
                        bgColor={colors.AppGreenColor}
                        rightIconTwoPath={user.uid != this.state.uid ? images.ic_messages : null}
                        rightIconOnePath={isFavorite ? images.ic_heart_active : images.ic_heart}
                        onRightIconPress={() => {
                            this.addCart(isFavorite)
                        }}
                        onRightIconTwoPress={() => {
                            if (user.uid != this.state.uid) this.createChannel()
                        }}
                    />
                </View>
                {/* //================================ Main Data Container ======================================// */}

                <View style={styles.mainDataContainer}>
                    <ImageBackground key={photoIndex + ''} style={styles.backgroundImageContainer} source={{ uri: photo }}>
                        <TouchableOpacity style={{ flex: 1, justifyContent: 'space-between' }}
                            onPress={() => {
                                if (product && product.photo) {
                                    this.setState({ modalShow: true, imageIndex: 0 })
                                }
                            }}>
                            <View style={styles.photoTag}>
                                <TouchableOpacity style={styles.photoTagNumber}
                                    onPress={() => {
                                        if (product && product.photo) {
                                            if (photoIndex >= product.photo.length - 1) {
                                                this.setState({ photoIndex: 0 })
                                            } else this.setState({ photoIndex: photoIndex + 1 })
                                        }
                                    }}>
                                    <Image source={images.ic_photos}
                                        style={styles.imageStylesTag}
                                    />
                                    <Text style={styles.textStyle}>{`${photoIndex + 1} of ${product && product.photo.length} Photos`}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.maintitleStyle}>
                                {/* //================================ Product Name ======================================// */}

                                <View style={styles.maintitleText}>
                                    <Text style={styles.maintitleTextStyle}>{product && product.title}</Text>
                                    <Text style={styles.subtitleTextStyle}>{I18n.t('Category')}: {product && product.categoryName} -> {product && product.subcategoryName}</Text>
                                </View>
                                {/* //================================ Price Tag ======================================// */}

                                <View style={styles.priceText}>
                                    <Text style={styles.priceTextStyle}>{product && product.price && product.price > 0 ? `$${product.price}` : I18n.t('Free')}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </ImageBackground>
                    {/* //================================ Description ======================================// */}

                    <View style={styles.bottomContainer}>

                        <View style={styles.descrpitionContainer}>
                            <Text style={styles.descrpitionStyleContainer}>{I18n.t('Description')}</Text>
                        </View>
                        <View style={styles.SubDescrpitionContainer}>
                            <Text style={styles.SubDescrpitionStyleContainer}>{product && product.description}</Text>
                        </View>
                        <TouchableOpacity style={styles.locationContainer}
                            onPress={() => {
                                this.props.navigation.navigate('ProductMapScreen', { product })
                            }}>
                            <Image style={styles.iconMarker} source={images.ic_marker} />
                            <Text style={{ fontSize: 12, paddingLeft: '2%' }}>{product && product.location && product.location.address}</Text>
                        </TouchableOpacity>


                    </View>
                    {/* //================================ Button ======================================// */}
                    {
                        (user.uid != this.state.uid) && (product.taken != user.uid) && isNear &&
                        <View style={styles.buttonContainer}>
                            <Button
                                height={hp(8)}
                                width={'80%'}
                                style={styles.buttonStyles}
                                title={I18n.t('Taken')}
                                bgColor={colors.AppGreenColor}
                                titleColor={colors.dark_red}
                                titleStyle={[styles.titleStyles]}
                                onPress={() => {
                                    Alert.alert(
                                        I18n.t('Confirm'),
                                        I18n.t('Are you sure to take'),
                                        [
                                            { text: I18n.t('No'), onPress: () => { }, style: 'cancel' },
                                            {
                                                text: I18n.t('Yes'), onPress: () => {
                                                    this.setState({ spinner: true })
                                                    const profile_doc = firestore().collection('shopping_items').doc(product.key)
                                                    profile_doc.update({
                                                        taken: user.uid
                                                    }).then((res) => {
                                                        this.setState({ spinner: false })
                                                        MessageBarManager.showAlert({
                                                            title: '',
                                                            message: I18n.t('Successfully taken'),
                                                            alertType: 'success'
                                                        });
                                                        sendPushNotification(product.createdby, product.title, I18n.t('Your item is taken'))
                                                        this.props.navigation.goBack()
                                                    })
                                                }
                                            }
                                        ], { cancelable: true }
                                    )
                                }}
                            />
                        </View>
                    }
                    {
                        (user.uid == this.state.uid) && product.taken && !product.closed &&
                        <View style={styles.buttonContainer}>
                            <Button
                                height={hp(8)}
                                width={'80%'}
                                style={styles.buttonStyles}
                                title={I18n.t('Confirm Pick-up')}
                                bgColor={colors.AppGreenColor}
                                titleColor={colors.dark_red}
                                titleStyle={[styles.titleStyles]}
                                onPress={() => {
                                    Alert.alert(
                                        I18n.t('Confirm'),
                                        I18n.t(`Are you sure`),
                                        [
                                            { text: I18n.t('No'), onPress: () => { }, style: 'cancel' },
                                            {
                                                text: I18n.t('Yes'), onPress: () => {
                                                    this.setState({ spinner: true })
                                                    const profile_doc = firestore().collection('shopping_items').doc(product.key)
                                                    profile_doc.update({
                                                        taken: user.uid,
                                                        closed: true
                                                    }).then((res) => {
                                                        this.setState({ spinner: false })
                                                        MessageBarManager.showAlert({
                                                            title: '',
                                                            message: I18n.t('Successfully confirm'),
                                                            alertType: 'success'
                                                        });
                                                        //sendPushNotification(product.createdby, product.title, 'Your item is taken!')
                                                        this.props.navigation.goBack()
                                                    })
                                                }
                                            }
                                        ], { cancelable: true }
                                    )
                                }}
                            />
                        </View>
                    }
                </View>
                <Overlay visible={this.state.modalShow} closeOnTouchOutside animationType="zoomIn"
                    containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 1)', padding: 0, flex: 1, justifyContent: 'center', alignItems: "center" }}
                    childrenWrapperStyle={{ backgroundColor: 'rgba(0, 0, 0, 0)', padding: 0, justifyContent: 'center' }}
                    onClose={() => this.setState({ modalShow: false })}
                    supportedOrientations={['portrait', 'landscape']}>
                    <Image
                        style={{ width, height, resizeMode: 'contain' }}
                        source={{ uri: product?.photo && product.photo[this.state.imageIndex] }}
                    />
                    <TouchableOpacity style={{ position: 'absolute', top: Platform.OS == 'ios' ? 50 : 20, left: 20, paddingVertical: 10 }} onPress={() => {
                        this.setState({ modalShow: false, })
                    }}
                    >
                        <Image source={require('../../Assets/Images/images/ic_back.png')} style={{ width: 25, height: 25, resizeMode: 'contain', tintColor: 'white' }} />
                    </TouchableOpacity>
                    {
                        product && product.photo && product.photo.length > 1 &&
                        <View style={{ position: 'absolute', bottom: 50, flexDirection: 'row' }}>
                            <TouchableOpacity
                                key={'left' + this.state.imageIndex}
                                onPress={() => {
                                    if (product && product.photo) {
                                        if (this.state.imageIndex > 0) {
                                            this.setState({ imageIndex: this.state.imageIndex - 1 })
                                        } else this.setState({ imageIndex: 0 })
                                    }
                                }}
                                style={{ marginRight: 50, opacity: this.state.imageIndex == 0 ? 0 : 1 }}
                            >
                                <Image source={require('../../Assets/Images/images/ic_left_angle.png')} style={{ width: 25, height: 25, resizeMode: 'contain', tintColor: 'white' }} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                key={'right' + this.state.imageIndex}
                                onPress={() => {
                                    if (product && product.photo) {
                                        if (this.state.imageIndex >= product.photo.length - 1) {
                                            //this.setState({ imageIndex: 0 })
                                        } else this.setState({ imageIndex: this.state.imageIndex + 1 })
                                    }
                                }}
                                style={{ opacity: this.state.imageIndex >= (product.photo.length - 1) ? 0 : 1 }}
                            >
                                <Image source={require('../../Assets/Images/images/ic_right_angle.png')} style={{ width: 25, height: 25, resizeMode: 'contain', tintColor: 'white' }} />
                            </TouchableOpacity>
                        </View>
                    }
                </Overlay>
                <Spinner
                    visible={this.state.spinner}
                    textStyle={{ color: 'white' }}
                />
            </View>
        );
    }
}
const mapStateToProps = state => ({
    user: state.user.user,
    profile: state.user.profile,
    carts: state.user.carts,
    location: state.user.location
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ProductScreen)
