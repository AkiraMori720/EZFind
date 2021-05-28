
//================================ React Native Imported Files ======================================//

import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import { View, Text, StatusBar, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import React from 'react';

//================================ Local Imported Files ======================================//

import Loops from '../../Components/CommonFlatList/CommonFlatList';
import AppHeader from '../../Components/AppHeader/AppHeader';
import AppInput from '../../Components/AppInput/AppInput';
import images from '../../Assets/Images/images';
import colors from '../../Assets/Colors/colors';
import styles from './Styles';

import firestore from '@react-native-firebase/firestore';
import { connect } from 'react-redux'
import moment from 'moment'
import { calcCrow } from '../../utils/utils'
import { clear } from '../../reducers/filter'

class ListingScreen extends React.Component {
    constructor(props) {
        super(props);
        const subcategory = props.route.params?.subcategory
        const category = props.route.params?.category
        const subcategories = props.route.params?.subcategories
        this.state = {
            category,
            subcategory,
            subcategories: subcategories ? subcategories : [],
            loading: true,
            shopping_items: [],
            keyword: null,
        };
        props.clear()
    }
    componentWillReceiveProps(nextprops) {
        if (nextprops.min != this.props.min || nextprops.max != this.props.max || JSON.stringify(nextprops.options) != this.props.options) {
            this.createSubscriber(nextprops)
        }
    }
    componentDidMount() {
        this.createSubscriber(this.props)
    }
    componentWillUnmount() {
        this.subscriber && this.subscriber()
    }
    createSubscriber(props) {
        const { subcategory, subcategories, category } = this.state
        if (subcategory && subcategory.key && subcategory.name) {
            const subname = String(subcategory.name).toLocaleLowerCase()
            this.setState({ loading: true })
            this.subscriber && this.subscriber()
            this.subscriber = firestore()
                .collection('shopping_items')
                .where(subname == 'all' ? 'category' : 'subcategory', '==', subname == 'all' ? category.key : subcategory.key)
                .onSnapshot((querySnapshot) => {
                    const items = [];
                    let users = []
                    querySnapshot && querySnapshot.forEach(documentSnapshot => {
                        let shopping = {
                            ...documentSnapshot.data(),
                            key: documentSnapshot.id,
                        }
                        if (shopping) {
                            if (!users.includes(shopping.createdby))
                                users.push(shopping.createdby)
                            items.push(shopping)
                        }
                    });
                    this.setState({
                        shopping_items: items,
                        loading: false
                    })
                });
        } else this.setState({ loading: false })
    }
    //================================ FlatList Function ======================================//
    menuItem(item) {
        if (this.state.keyword && this.state.keyword.length > 0) {
            const regex = new RegExp(`${this.state.keyword.trim()}`, 'i')
            const match = item.title && item.title.search(regex) >= 0
            if (!match) return null
        }
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
            />
        )
    }
    sortBy(datasource, sortby) {
        const { location } = this.props
        if (sortby == 'nearest' && location) {
            return datasource.sort((a, b) => {
                const { latitude, longitude } = location
                const distance1 = calcCrow(latitude, longitude, a.location.latitude, a.location.longitude)
                const distance2 = calcCrow(latitude, longitude, b.location.latitude, b.location.longitude)
                return distance1 - distance2
            })
        }
        if (sortby == 'recent') {
            return datasource.sort((a, b) => b.createdat - a.createdat)
        }
        if (sortby == 'tolow') {
            return datasource.sort((a, b) => {
                const _a = a.price ? a.price : 0
                const _b = b.price ? b.price : 0
                return _b - _a
            })
        }
        if (sortby == 'tohigh') {
            return datasource.sort((a, b) => {
                const _a = a.price ? a.price : 0
                const _b = b.price ? b.price : 0
                return _a - _b
            })
        }
        return datasource.sort((a, b) => {
            return b.createdat-a.createdat
        })
    }
    filterBy(datasource, filterby) {
        if (filterby == 'free') {
            return datasource.filter(item => item.price == null || item.price == 0)
        }
        if (filterby == 'nofree') {
            return datasource.filter(item => item.price && item.price > 0)
        }
        return datasource
    }
    render() {
        const { category, subcategory, loading, shopping_items } = this.state
        const { sortby, filterby } = this.props
        let datasource = this.sortBy(shopping_items, sortby)
        datasource = this.filterBy(datasource, filterby)
        console.log("#", shopping_items)
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
                        title={'Listing'}
                        bgColor={colors.AppGreenColor}
                    />
                </View>

                {/* //================================ Search Container ======================================// */}
                <View style={styles.searchContainer}>

                    {/* //================================ AppInput ======================================// */}
                    <View style={styles.searchContainerLeft}>
                        <AppInput
                            paddingLeft={'2%'}
                            height={hp(6)}
                            placeholder={'Search  item'}
                            width={'92%'}
                            colortextInput={colors.black}
                            // paddingLeft={wp(5)}
                            placeholderTextColor={colors.grey1}
                            marginBottom={wp(3)}
                            marginTop={4}
                            borderRadius={wp(7)}
                            backgroundColor={colors.AppInputGray}
                            leftIconPath={images.ic_search}
                            value={this.state.keyword}
                            onChangeText={value => this.setState({ keyword: value })}
                        />
                    </View>

                    {/* //================================ Search Filter Button ======================================// */}
                    <TouchableOpacity style={styles.searchContainerRight} onPress={() => this.props.navigation.navigate('SearchFilters')}>
                        <Image source={images.ic_sort}
                            style={styles.imageStylesTag}
                        />
                    </TouchableOpacity>

                </View>
                <Text style={styles.textStyle}>{subcategory && subcategory.name}</Text>

                {/* //================================ FlatList ======================================// */}
                <View style={styles.bottomContainer}>
                    {
                        loading ? <ActivityIndicator color="black" style={{ alignSelf: "center", marginTop: 10 }} />
                            :
                            <>
                                {
                                    datasource && datasource.length > 0 ?
                                        <FlatList
                                            contentContainerStyle={{ paddingBottom: 50 }}
                                            showsVerticalScrollIndicator={false}
                                            showsHorizontalScrollIndicator={false}
                                            horizontal={false}
                                            data={datasource}
                                            renderItem={({ item }) => this.menuItem(item)}
                                            keyExtractor={item => item.key}
                                        /> :
                                        <Text style={{ fontSize: 12, color: 'gray', marginTop: 10, alignSelf: 'center' }}>No Item</Text>
                                }
                            </>
                    }
                </View>
            </View>
        );
    }
}
const mapStateToProps = state => ({
    sortby: state.filter.sortby,
    filterby: state.filter.filterby,
    location: state.user.location
})

const mapDispatchToProps = {
    clear
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingScreen)