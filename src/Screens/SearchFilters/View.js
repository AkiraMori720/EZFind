
//================================ React Native Imported Files ======================================//

import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import { View, Text, StatusBar } from 'react-native';
import React from 'react';

//================================ Local Imported Files ======================================//

import AppHeader from '../../Components/AppHeader/AppHeader';
import CheckBox from '../../Components/CheckBox/CheckBox';
import Button from '../../Components/Button/Button';
import images from '../../Assets/Images/images';
import colors from '../../Assets/Colors/colors';

import styles from './Styles';
import { connect } from 'react-redux'
import { setFilters } from '../../reducers/filter'
import I18n from "../../i18n";

class SearchFilters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortby: props.sortby,
            filterby: props.filterby,
        };
    }

    render() {
        const { sortby, filterby } = this.state
        return (
            <View style={styles.mainContainer}>
                {/* //================================ StatusBar ======================================// */}

                <StatusBar barStyle="dark-content" hidden={false} backgroundColor={colors.AppDarkGreenColor} translucent={false} />
                <View style={styles.headerCotainer}>
                    {/* //================================ Header ======================================// */}
                    <AppHeader
                        headerHeight="100%"
                        onLeftIconPress={() => this.props.navigation.goBack()}
                        leftIconPath={images.headerLeftBack}
                        lefticonSize={wp(5)}
                        title={I18n.t('Search Filters')}
                        bgColor={colors.AppGreenColor}
                    />
                </View>
                {/* //================================ Bottom Container ======================================// */}

                <View style={styles.bottomContainer}>
                    <View style={styles.uperfieldsContainer}>

                        {/* //================================ CheckBoxs ======================================// */}

                        <Text style={styles.checkboxTextStyle}>{I18n.t('Sort By')}:</Text>
                        <View style={styles.checkboxText}>
                            <View style={styles.checkboxImage}>

                                <CheckBox value={sortby == 'nearest'} onChange={value => {
                                    this.setState({ sortby: value ? 'nearest' : null })
                                }} />

                            </View>
                            <View style={styles.forSaleText}>
                                <Text style={styles.checkboxTextStyle}>{I18n.t('Nearest Me')}</Text>
                            </View>
                        </View>
                        <View style={styles.checkboxText}>
                            <View style={styles.checkboxImage}>

                                <CheckBox value={sortby == 'recent'} onChange={value => {
                                    this.setState({ sortby: value ? 'recent' : null })
                                }} />

                            </View>
                            <View style={styles.forSaleText}>
                                <Text style={styles.checkboxTextStyle}>{I18n.t('Posted Recently')}</Text>
                            </View>
                        </View>
                        <View style={styles.checkboxText}>
                            <View style={styles.checkboxImage}>

                                <CheckBox value={sortby == 'tolow'} onChange={value => {
                                    this.setState({ sortby: value ? 'tolow' : null })
                                }} />

                            </View>
                            <View style={styles.forSaleText}>
                                <Text style={styles.checkboxTextStyle}>{I18n.t('Price High to Low')}</Text>
                            </View>
                        </View>
                        <View style={styles.checkboxText}>
                            <View style={styles.checkboxImage}>

                                <CheckBox value={sortby == 'tohigh'} onChange={value => {
                                    this.setState({ sortby: value ? 'tohigh' : null })
                                }} />

                            </View>
                            <View style={styles.forSaleText}>
                                <Text style={styles.checkboxTextStyle}>{I18n.t('Price Low to High')}</Text>
                            </View>
                        </View>
                        <Text style={styles.checkboxTextStyle}>{I18n.t('Filter By')}:</Text>
                        <View style={styles.checkboxText}>
                            <View style={styles.checkboxImage}>

                                <CheckBox value={filterby == 'free'} onChange={value => {
                                    this.setState({ filterby: value ? 'free' : null })
                                }} />

                            </View>
                            <View style={styles.forSaleText}>
                                <Text style={styles.checkboxTextStyle}>{I18n.t('Show Free Items Only')}</Text>
                            </View>
                        </View>
                        <View style={styles.checkboxText}>
                            <View style={styles.checkboxImage}>

                                <CheckBox value={filterby == 'nofree'} onChange={value => {
                                    this.setState({ filterby: value ? 'nofree' : null })
                                }} />

                            </View>
                            <View style={styles.forSaleText}>
                                <Text style={styles.checkboxTextStyle}>{I18n.t('Show Free for Sale Only')}</Text>
                            </View>
                        </View>
                    </View>
                    {/* //================================ Button ======================================// */}

                    <View style={styles.buttonView}>
                        <Button
                            height={hp(8)}
                            width={'80%'}
                            style={styles.buttonStyles}
                            title={I18n.t('Apply')}
                            titleColor={colors.appBlue}
                            bgColor={colors.AppGreenColor}
                            titleStyle={[styles.titleStyles]}
                            onPress={() => {
                                this.props.setFilters(sortby, filterby)
                                this.props.navigation.goBack()
                            }}
                        />
                    </View>
                </View>
            </View>
        );
    }
}
const mapStateToProps = state => ({
    sortby: state.filter.sortby,
    filterby: state.filter.filterby,
})

const mapDispatchToProps = {
    setFilters
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFilters)
