
//================================ React Native Imported Files ======================================//

import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import { View, FlatList, StatusBar, Text } from 'react-native';
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
        const { carts } = this.props
        this.onSubscribe(carts)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.carts.length != this.props.carts.length) {
            this.onSubscribe(nextProps.carts)
        }
    }
    onSubscribe(carts) {
        if (carts && carts.length > 0) {
            this.subscriber && this.subscriber()
            this.subscriber = firestore()
                .collection('shopping_items')
                .where(firestore.FieldPath.documentId(), 'in', carts.map(item => item.shopping_item_key))
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
        } else this.setState({ mycarts: [], loading: false })
    }
    componentWillUnmount() {
        this.subscriber && this.subscriber()
    }

    constructor(props) {
        super(props);
        this.state = {
            mycarts: [],
            loading: true,
            //================================ FlatList Dummy Data ======================================//
            Data: [
                {
                    id: 1,
                    image: images.ic_tv,
                    title: "Old CRT Panasonic TV",
                    price: "$20",
                    dayTime: "Posted 3 days ago",
                    ml: "0.3 ml",
                    description: "32 inches cathode-raytube type television with noticeable flaws.",
                    location: "Way charleston, NY",
                    isIcons: true

                },
                {
                    id: 2,
                    image: images.ic_tv,
                    title: "Old CRT Panasonic TV",
                    price: "$20",
                    dayTime: "Posted 3 days ago",
                    ml: "0.3 ml",
                    description: "32 inches cathode-raytube type television with noticeable flaws.",
                    location: "Way charleston, NY",
                    isIcons: true

                },
            ]
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
                isIcons={item.isIcons}
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
                        title={'Favorites'}
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

