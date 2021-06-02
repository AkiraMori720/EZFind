//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen';
import { StatusBar, View, TouchableOpacity, Image, Text } from 'react-native';
import MapView, { Marker, Callout, Circle } from 'react-native-maps';
import React from 'react';

//================================ Local Imported Files ======================================//
import AppHeader from '../../Components/AppHeader/AppHeader';
import AppInput from '../../Components/AppInput/AppInput';
import images from '../../Assets/Images/images';
import colors from '../../Assets/Colors/colors';
import styles from './Styles';
import { connect } from 'react-redux'
import firestore from '@react-native-firebase/firestore';
import { calcCrow } from '../../utils/utils'
import { getDistance } from 'geolib';
import Loops from '../../Components/CommonFlatList/CommonFlatList';
import moment from 'moment'
import I18n from "../../i18n";

const Radius = 5; //km
const pin_radius = 0.4; //0.25mile

class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fromFind: this.props.route.params.fromFind,
      leftImage: "",
      onPressLeftImage: "",
      loading: false,
      shopping_items: [],
      selProduct: null
    }
  }
  componentDidMount() {
    this.createSubscriber(this.props)
  }
  componentWillUnmount() {
    this.subscriber && this.subscriber()
  }
  createSubscriber(props) {
    this.setState({ loading: true })
    this.subscriber && this.subscriber()
    this.subscriber = firestore()
      .collection('shopping_items')
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot && querySnapshot.forEach(documentSnapshot => {
          const data = documentSnapshot.data()
          let shopping = {
            ...data,
            key: documentSnapshot.id,
          }
          if (this.props.location && shopping.location) {
            const { latitude, longitude } = this.props.location
            const distance = calcCrow(latitude, longitude, shopping.location.latitude, shopping.location.longitude)
            if (distance <= Radius) {
              items.push(shopping)
            }
          }
        });
        this.setState({
          shopping_items: items,
          loading: false
        })
      });
  }
  //================================ Component Will Receive Props ======================================//

  UNSAFE_componentWillReceiveProps(nextProps) {

    if (this.props !== nextProps) {
      this.setState({
        fromFind: nextProps.route.params.fromFind
      })
    }
  }


  render() {
    const { location } = this.props
    const { shopping_items, selProduct } = this.state

    return (
      <View style={styles.mainCotainer}>

        {/* //================================ StatusBar ======================================// */}
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor={colors.AppDarkGreenColor} translucent={false} />

        {/* //================================ Header ======================================// */}
        <View style={styles.headerCotainer}>
          <AppHeader
            headerHeight="100%"
            onLeftIconPress={this.state.fromFind ? () => this.props.navigation.goBack() : () => this.props.navigation.openDrawer()}
            leftIconPath={this.state.fromFind ? images.headerLeftBack : images.ic_hamburger_menu}
            lefticonSize={wp(5)}
            title={I18n.t('Items Near Me')}
            bgColor={colors.AppGreenColor}
          />
        </View>

        {/* //================================ Map View ======================================// */}
        <View style={styles.mapView}>
          <MapView
            style={styles.mapStyles}
            initialRegion={{
              latitude: location ? location.latitude : 37.78825,
              longitude: location ? location.longitude : -122.4324,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
            onPress={(event) => {
              const coordinates = event.nativeEvent.coordinate;
              shopping_items.map(zone => {
                const { photo, location: { latitude, longitude } } = zone
                const distance = getDistance(
                  { latitude: coordinates.latitude, longitude: coordinates.longitude },
                  { latitude: latitude, longitude: longitude }
                );
                if (distance <= pin_radius * 1000) {
                  this.setState({ selProduct: zone })
                } //else this.setState({ selProduct: null })
              })
            }}
          >

            {/* //================================ Markers ======================================// */}
            {
              shopping_items.map(item => {
                const { photo, location: { latitude, longitude } } = item
                const image_url = photo && photo.length > 0 ? photo[0] : ''

                return (
                  <>
                    <Circle
                      key={'circle' + item.key}
                      center={{
                        latitude: latitude,
                        longitude: longitude,
                      }}
                      radius={pin_radius * 1000}
                      zIndex={999}
                      strokeWidth={1}
                      strokeColor={'#0CB40Caa'}
                      fillColor={'#0CB40C66'}
                    />
                    {/*
                    <Marker
                      key={'marker' + item.key}
                      coordinate={{
                        latitude: latitude,
                        longitude: longitude,
                      }}
                      zIndex={999}
                      pinColor={'#0CB40C'}
                      onPress={()=>{
                        this.setState({ selProduct: item })
                      }}
                    ></Marker>
                    */}
                  </>
                )
                // return (
                //   <Marker
                //     key={item.key}
                //     coordinate={{
                //       latitude: latitude,
                //       longitude: longitude,
                //     }}
                //   >
                //     <Image source={images.map_marker} style={styles.markerStyles} />
                //     <Callout onPress={() => {
                //       this.props.navigation.navigate('ProductScreen', { product: item })
                //     }}>
                //       <View style={{ minWidth: 100, margin: 10 }}>
                //         <Text style={{ fontSize: 20, color: 'black' }}>{item.title}</Text>
                //         <Text style={{ fontSize: 15, color: colors.AppGreenColor }}>{item.price && item.price > 0 ? `$${item.price}` :  I18n.t('Free')}</Text>
                //         <Text style={{ fontSize: 12, color: 'gray' }}>{item.description}</Text>
                //       </View>
                //     </Callout>
                //   </Marker>
                // )
              })
            }
            {
              location &&
              <Marker
                coordinate={location}
                zIndex={999999}
                pinColor={'#DC0202'}
              />
            }
            {/* {
              location &&
              <Circle
                zIndex={99999}
                center={location}
                radius={pin_radius * 1000}
                strokeWidth={1}
                strokeColor={'#DC020288'}
                fillColor={'#DC020222'}
              />
            } */}
          </MapView>
          {
            selProduct &&
            <View style={{ position: 'absolute', bottom: 30, left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }}>
              <Loops
                product={selProduct}
                image={selProduct.photo && selProduct.photo.length > 0 ? selProduct.photo[0] : ''}
                title={selProduct.title}
                price={selProduct.price && selProduct.price > 0 ? `$${selProduct.price}` : I18n.t('Free')}
                dayTime={I18n.t('Posted') + `${moment(selProduct.createdat).fromNow()}`}
                ml={selProduct.ml}
                description={selProduct.description}
                location={selProduct.location && selProduct.location.address}
                onPress={() => this.props.navigation.navigate('ProductScreen', { product: selProduct })}
                onClose={() => this.setState({ selProduct: null })}
              />
            </View>
          }
          {/* //================================ Search Container ======================================// */}
          {/* <View style={styles.searchContainerLeft}>
            <AppInput
              paddingLeft={'2%'}
              height={hp(6)}
              placeholder={I18n.t('Location')}
              width={'92%'}
              colortextInput={colors.black}
              placeholderTextColor={colors.placeholder_text_color}
              marginBottom={wp(3)}
              marginTop={4}
              borderRadius={wp(7)}
              backgroundColor={colors.AppInputGray}
              leftIconPath={images.ic_search}

            />
          </View> */}
          {/* //================================ Bottom Buttons ======================================// */}
          {/* <View style={styles.bottomButton}>

            <View style={styles.leftButton}>
              <TouchableOpacity style={styles.leftAddButton}>
                <Image source={images.ic_add}
                  style={styles.imageStylesAdd}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.leftSubButton}>
                <Image source={images.Sub_pic}
                  style={styles.imageStylesSub}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.rightButton}>
              <View style={styles.rightButtonGps}>
                <Image source={images.gps}
                  style={styles.imageStylesTag}
                />
              </View>
            </TouchableOpacity>
          </View> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen)