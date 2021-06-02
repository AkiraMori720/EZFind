
//================================ React Native Imported Files ======================================//

import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import React from 'react';
import ActionSheet from 'react-native-action-sheet';
import { connect } from 'react-redux'
import Spinner from 'react-native-loading-spinner-overlay';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment'
//================================ Local Imported Files ======================================//

import Dropdown from '../../Components/ModelDropDown/ModelDropDown';
import AppHeader from '../../Components/AppHeader/AppHeader';
import AppInput from '../../Components/AppInput/AppInput';
import CheckBox from '../../Components/CheckBox/CheckBox';
import Button from '../../Components/Button/Button';
import images from '../../Assets/Images/images';
import colors from '../../Assets/Colors/colors';
import styles from './Styles';
import ImagePicker from 'react-native-image-crop-picker';
import I18n from "../../i18n";

var MessageBarManager = require('react-native-message-bar').MessageBarManager;

class PostItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            subcategories: [],
            validations: [],
            isFree: true,

            title: null,
            category: null,
            subcategory: null,
            description: null,
            location: null,
            price: null,
            photo: [],
        };
    }
    componentDidMount() {
        this.filters_subscriber = firestore()
            .collection('filters')
            .onSnapshot((querySnapshot) => {
                const filters = [];
                querySnapshot && querySnapshot.forEach(documentSnapshot => {
                    filters.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });
                this.setState({ filters })
            });
        this.categories_subscriber = firestore()
            .collection('categories')
            .onSnapshot((querySnapshot) => {
                const categories = [];
                querySnapshot && querySnapshot.forEach(documentSnapshot => {
                    categories.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });
                this.setState({ categories })
            });
    }
    componentWillUnmount() {
        this.filters_subscriber && this.filters_subscriber()
        this.categories_subscriber && this.categories_subscriber()
        this.subcategories_subscriber && this.subcategories_subscriber()
    }
    selectPhoto = () => {
        ActionSheet.showActionSheetWithOptions(
            {
                options: [
                    I18n.t('Take_Photo'),
                    I18n.t('Choose_From_Library'),
                    I18n.t('Cancel')
                ],
                cancelButtonIndex: 2,
                destructiveButtonIndex: 0,
                tintColor: 'black',
            },
            index => {
                switch (index) {
                    case 0: {
                        ImagePicker.openCamera({
                            width: 300,
                            height: 300,
                            cropping: false,
                            multiple: false,
                            mediaType: 'photo',
                            //cropperCircleOverlay: true,
                        }).then(image => {
                            this.setState({
                                photo: [...this.state.photo, {
                                    uri: image.path,
                                    width: image.width,
                                    height: image.height,
                                    mime: image.mime,
                                }]
                            });
                        })
                        break;
                    }
                    case 1: {
                        ImagePicker.openPicker({
                            width: 300,
                            height: 300,
                            cropping: false,
                            //cropperCircleOverlay: true,
                            multiple: false,
                            mediaType: 'photo',
                        }).then(image => {
                            console.log("#image", image)
                            this.setState({
                                photo: [...this.state.photo, {
                                    uri: image.path,
                                    width: image.width,
                                    height: image.height,
                                    mime: image.mime,
                                }]
                            });
                        });
                        break;
                    }
                }
            },
        );

    };
    selectCategory(category) {
        this.setState({ category, collapsed_cate: false, subcategory: null })
        this.subcategories_subscriber && this.subcategories_subscriber()
        this.subcategories_subscriber = firestore()
            .collection(`categories/${category.key}/subcategories`)
            .onSnapshot((querySnapshot) => {
                const subcategories = [];
                querySnapshot && querySnapshot.forEach(documentSnapshot => {
                    subcategories.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });
                this.setState({ subcategory: null, subcategories })
            });
    }
    onValidate() {
        const { title, price, category, subcategory, description, location, photo } = this.state
        let validations = []
        if (title == null || title.length <= 0) {
            validations.push('title')
        }
        if (category == null) {
            validations.push('category')
        }
        if (subcategory == null) {
            validations.push('subcategory')
        }
        if (location == null || location.length <= 0) {
            validations.push('location')
        }
        if (description == null || description.length <= 0) {
            validations.push('description')
        }
        if (photo.length <= 0) {
            validations.push('photo')
        }
        this.setState({ validations })
        return validations
    }
    onPreview() {
        this.setState({ validations: [] })
        const validations = this.onValidate()
        if (validations.length > 0) {
            return
        }
        const { title, price, category, subcategory, description, location, photo } = this.state
        var self = this;
        this.setState({ spinner: true })
        Promise.all(photo.map(async (image, index) => {
            try {
                const reference = storage().ref(`shoppingItems/${Date.now() + index}.png`);
                const resp_image = await reference.putFile(image.uri);
                return await reference.getDownloadURL()
            } catch {
                err => {
                    return null
                }
            }
        })).then(images => {
            return firestore()
                .collection('shopping_items')
                .add({
                    title,
                    price,
                    description,
                    location,
                    photo: images.filter(item => item != null),
                    category: category.key,
                    subcategory: subcategory.key,
                    createdat: Date.now(),
                    createdby: this.props.user.uid,
                    categoryName: category.name,
                    subcategoryName: subcategory.name,
                })
                .then(() => {
                    self.setState({ spinner: false }, () => {
                        setTimeout(() => {
                            MessageBarManager.showAlert({
                                title: '',
                                message: I18n.t('Successfully created'),
                                alertType: 'success'
                            });
                            self.props.navigation.goBack()
                        }, 100)
                    })
                });
        }).catch(err => {
            console.log("err", err)
            alert(JSON.stringify(err))
            this.setState({ spinner: false })
        })
    }
    onSelectFilterOption(source, key, value) {
        let filter = source
        if (filter[key]) {
            filter[key] = [...filter[key], value]
        } else filter[key] = [value]
        this.setState({ filter })
    }
    selectLocation(location) {
        this.setState({ location })
    }
    render() {
        const { categories, subcategories, title, price, category, subcategory, description, location, photo, validations, isFree } = this.state

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
                        title={I18n.t('Post Item')}
                        bgColor={colors.AppGreenColor}
                    />
                </View>
                {/* //================================ Bottom Container ======================================// */}

                <View style={styles.bottomContainer}>

                    {/* //================================ ScrollView ======================================// */}

                    <ScrollView showsVerticalScrollIndicator={false}>

                        {/* //================================ AppInput ======================================// */}

                        <View style={styles.uperfieldsContainer}>
                            <View style={styles.titleContainer}>
                                <AppInput
                                    height={hp(6)}
                                    placeholder={I18n.t('Name')}
                                    width={'100%'}
                                    colortextInput={colors.black}
                                    placeholderTextColor={colors.placeholder_text_color}
                                    backgroundColor={colors.white}
                                    borderRadius={wp(8)}
                                    borderWidth={1}
                                    borderColor={validations.includes('title') ? 'red' : colors.AppGreenColor}
                                    value={title}
                                    onChangeText={value => this.setState({ title: value })}
                                />

                            </View>
                            <View style={styles.categoryDropDownCotainer}>
                                <TouchableOpacity style={{
                                    borderRadius: wp(8),
                                    borderWidth: 1,
                                    borderColor: validations.includes('category') ? 'red' : colors.AppGreenColor,
                                    height: hp(6),
                                    backgroundColor: colors.white,
                                    width: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'flex-start'
                                }}
                                    onPress={() => {
                                        ActionSheet.showActionSheetWithOptions(
                                            {
                                                options: categories.map(item => item.name),
                                                tintColor: 'black',
                                            },
                                            index => {
                                                index != null &&
                                                    this.selectCategory(categories[index])
                                            },
                                        );
                                    }}>
                                    {/* //================================ Dropdown ======================================// */}
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '92%', alignItems: 'center', alignSelf: 'center' }}>
                                        {
                                            category ?
                                                <Text style={[styles.dropdownButtonText, { color: 'black' }]}>{category.name}</Text> :
                                                <Text style={[styles.dropdownButtonText, { color: colors.placeholder_text_color }]}>{I18n.t('Category')}</Text>
                                        }
                                        <Image source={images.ic_down} style={{ resizeMode: 'contain', width: 15, height: 15, tintColor: colors.AppGreenColor }} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.categoryDropDownCotainer}>
                                <TouchableOpacity style={{
                                    borderRadius: wp(8),
                                    borderWidth: 1,
                                    borderColor: validations.includes('subcategory') ? 'red' : colors.AppGreenColor,
                                    height: hp(6),
                                    backgroundColor: colors.white,
                                    width: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'flex-start'
                                }}
                                    onPress={() => {
                                        if (subcategories && subcategories.length > 0) {
                                            ActionSheet.showActionSheetWithOptions(
                                                {
                                                    options: subcategories.map(item => item.name),
                                                    tintColor: 'black',
                                                },
                                                index => {
                                                    index != null &&
                                                        this.setState({ subcategory: subcategories[index] })
                                                },
                                            );
                                        } else alert(I18n.t("No subcategories"))
                                    }}>
                                    {/* //================================ Dropdown ======================================// */}
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '92%', alignItems: 'center', alignSelf: 'center' }}>
                                        {
                                            subcategory ?
                                                <Text style={[styles.dropdownButtonText, { color: 'black' }]}>{subcategory.name}</Text> :
                                                <Text style={[styles.dropdownButtonText, { color: colors.placeholder_text_color }]}>{I18n.t('Subcategory')}</Text>
                                        }
                                        <Image source={images.ic_down} style={{ resizeMode: 'contain', width: 15, height: 15, tintColor: colors.AppGreenColor }} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={[styles.locationContainer, { alignItems: 'center' }]} onPress={() => {
                                this.props.navigation.navigate('NewAddress', {
                                    callback: this.selectLocation.bind(this)
                                })
                            }}>
                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <Text style={[{ fontSize: 15, color: location && location.address ? colors.black : colors.placeholder_text_color }]}>{location && location.address ? location.address : I18n.t('Location')}</Text>
                                </View>
                                <Image source={images.ic_marker} style={{ width: 20, height: 20, resizeMode: 'contain', tintColor: colors.AppGreenColor }} />
                            </TouchableOpacity>
                            <View style={styles.DescripationContainer}>
                                <AppInput
                                    height={hp(25)}
                                    placeholder={I18n.t('Description')}
                                    width={'100%'}
                                    colortextInput={colors.black}
                                    placeholderTextColor={colors.placeholder_text_color}
                                    backgroundColor={colors.white}
                                    borderRadius={wp(4)}
                                    borderWidth={1}
                                    borderColor={validations.includes('description') ? 'red' : colors.AppGreenColor}
                                    paddingBottom={hp(16)}
                                    value={description}
                                    onChangeText={value => this.setState({ description: value })}
                                    multiline={true}
                                    numberOfLines={5}
                                />
                            </View>
                            {/* //================================ CheckBox ======================================// */}

                            <View style={styles.checkboxContainer}>
                                <View style={styles.checkboxImage}>

                                    <CheckBox value={isFree} onChange={() => { this.setState({ isFree: !isFree }) }} />

                                </View>
                                <View style={styles.checkboxText}>
                                    <Text style={styles.checkboxTextStyle}>{I18n.t('Free_curbside_pick_up')}</Text>
                                </View>

                            </View>
                            <View style={styles.mainText}>
                                <Text>{I18n.t('Messaging_will_be_disabled')}</Text>

                            </View>

                            {/* //================================ CheckBox And AppInput ======================================// */}

                            <View style={styles.checkboxInputContainer}>
                                <View style={styles.checkboxImage}>
                                    <CheckBox value={!isFree} onChange={() => { this.setState({ isFree: !isFree }) }} />
                                </View>
                                <View style={styles.forSaleText}>
                                    <Text style={styles.checkboxTextStyle}>{I18n.t('For Sale')}</Text>
                                </View>
                                <View style={styles.textInput}>
                                    <AppInput
                                        height={hp(6)}
                                        placeholder={I18n.t('Enter Price')}
                                        width={'100%'}
                                        colortextInput={colors.black}
                                        placeholderTextColor={colors.placeholder_text_color}
                                        backgroundColor={colors.white}
                                        borderRadius={wp(8)}
                                        borderWidth={1}
                                        borderColor={colors.AppGreenColor}
                                        keyboardType="number-pad"
                                        value={price}
                                        onChangeText={value => this.setState({ price: value })}
                                        editable={!isFree}
                                    />
                                </View>

                            </View>
                            <View style={styles.mainText}>
                                <Text>{I18n.t('User_will_be_able_to_message_you_about_this_item')}</Text>

                            </View>
                            {/* //================================ Add Pic ======================================// */}
                            {
                                photo && photo.length > 0 ?
                                    <>
                                        {
                                            photo && photo.map(image => {
                                                return (
                                                    <View key={image.uri} style={styles.addPic}
                                                        onPress={() => {
                                                            this.selectPhoto()
                                                        }}>
                                                        <Image source={image}
                                                            style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, right: 0, bottom: 0, resizeMode: 'contain' }}
                                                        />
                                                        <TouchableOpacity style={styles.removeBtn}
                                                            onPress={() => {
                                                                this.setState({ photo: photo.filter(item => item.uri != image.uri) })
                                                            }}>
                                                            <Image
                                                                source={images.ic_remove}
                                                                style={styles.removeBtnIcon}
                                                            />
                                                        </TouchableOpacity>
                                                    </View>
                                                )
                                            })
                                        }
                                        {/* //================================ Add More Photo ======================================// */}

                                        <TouchableOpacity style={[styles.addMorePic]}
                                            onPress={() => {
                                                this.selectPhoto()
                                            }}>
                                            <Text style={styles.addMorePicStyle}>{I18n.t('Add more photo')}</Text>
                                        </TouchableOpacity>
                                    </> :
                                    <TouchableOpacity style={[styles.addPic, { borderColor: validations.includes('photo') ? 'red' : colors.AppGreenColor }]}
                                        onPress={() => {
                                            this.selectPhoto()
                                        }}>
                                        <View style={styles.addPicStyle}>
                                            <Image source={images.ic_add}
                                                style={styles.imageStylesTag}
                                            />
                                            <Text style={styles.textStyle}>{I18n.t('Add Photo')}</Text>
                                        </View>
                                    </TouchableOpacity>
                            }


                            {/* //================================ At Least one Picture ======================================// */}

                            <View style={styles.textView}>
                                <Text style={styles.picTextStyle}> {I18n.t('Post_must_have_at_least_one_picture')}</Text>

                            </View>
                        </View>

                        {/* //================================ Button ======================================// */}

                        <View style={styles.buttonView}>
                            <Button
                                height={hp(8)}
                                width={'80%'}
                                style={styles.buttonStyles}
                                title={I18n.t('Post Item')}
                                titleColor={colors.appBlue}
                                bgColor={colors.AppGreenColor}
                                titleStyle={[styles.titleStyles]}
                                onPress={() => { this.onPreview() }}
                            />
                        </View>
                    </ScrollView>
                    <Spinner
                        visible={this.state.spinner}
                        textStyle={{ color: 'white' }}
                    />
                </View>
            </View>
        );
    }
}
const mapStateToProps = state => ({
    user: state.user.user,
    profile: state.user.profile,
    location: state.user.location
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(PostItem)

