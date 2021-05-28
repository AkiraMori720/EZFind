
//================================ React Native Imported Files ======================================//

import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import { View, FlatList, StatusBar, Text, Alert } from 'react-native';
import React from 'react';

//================================ Local Imported Files ======================================//
import Loops from '../../Components/CommonFlatList/CommonFlatList';
import AppHeader from '../../Components/AppHeader/AppHeader';
import images from '../../Assets/Images/images';
import colors from '../../Assets/Colors/colors';
import styles from './Styles';

import { connect } from 'react-redux'
import firestore from '@react-native-firebase/firestore';
import moment from 'moment'

var MessageBarManager = require('react-native-message-bar').MessageBarManager;

class FavoriteScreen extends React.Component {
    componentDidMount() {
        this.onSubscribe()
    }
    onSubscribe() {
        this.subscriber && this.subscriber()
        this.subscriber = firestore()
            .collection('shopping_items')
            .where('createdby', '==', this.props.user.uid)
            .onSnapshot((querySnapshot) => {
                const mycarts = [];
                querySnapshot && querySnapshot.forEach(documentSnapshot => {
                    mycarts.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });
                this.setState({
                    mycarts,
                    loading: false
                })
            });
    }
    componentWillUnmount() {
        this.subscriber && this.subscriber()
    }

    constructor(props) {
        super(props);
        this.state = {
            mycarts: [],
            loading: true,
        };
    }

    //================================ FlatList Function ======================================//
    menuItem(item) {
        return (
            <Loops
                product={item}
                image={item.photo && item.photo.length > 0 ? item.photo[0] : ''}
                title={item.title}
                price={item.price && item.price > 0 ? `$${item.price}` : 'Free'}
                dayTime={`Posted ${moment(item.createdat).fromNow()}`}
                ml={item.ml}
                description={item.description}
                location={item.location && item.location.address}
                onPress={() => this.props.navigation.navigate('ProductScreen', { product: item })}
                isIcons={item.taken ? false : true}
                onEdit={() => {
                    this.props.navigation.navigate('PostItemEdit', { data: item })
                }}
                onDelete={() => {
                    Alert.alert(
                        'Confirm',
                        `Are you sure to delete?`,
                        [
                            { text: 'Cancel', onPress: () => { }, style: 'cancel' },
                            {
                                text: 'Ok', onPress: () => {
                                    firestore()
                                        .collection('shopping_items').doc(item.key)
                                        .delete()
                                        .then(() => {
                                            MessageBarManager.showAlert({
                                                title: '',
                                                message: 'Successfully deleted!',
                                                alertType: 'success'
                                            });
                                        });
                                }
                            }
                        ], { cancelable: true }
                    )
                }}
            />
        )
    }
    render() {
        const nav = this.props.navigation;
        const { mycarts, loading } = this.state
        const { user, carts } = this.props
        console.log("====mycarts", mycarts)
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
                        title={'My Items'}
                        bgColor={colors.AppGreenColor}
                    />
                </View>

                {/* //================================ FlatList ======================================// */}
                <View style={styles.bottomContainer}>
                    {
                        mycarts && mycarts.length > 0 ?
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                horizontal={false}
                                data={mycarts}
                                renderItem={({ item }) => this.menuItem(item)}
                                keyExtractor={item => item.key}
                            /> :
                            <Text style={{ fontSize: 12, marginTop: 10, color: 'gray', alignSelf: 'center' }}>No items</Text>
                    }
                </View>
            </View>
        );
    }
}
const mapStateToProps = state => ({
    user: state.user.user,
    profile: state.user.profile,
    carts: state.user.carts
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteScreen)

