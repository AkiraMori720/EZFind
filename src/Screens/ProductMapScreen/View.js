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

const Radius = 5; //km
const pin_radius = 0.4; //0.25mile

class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    const product = props.route.params?.product
    this.state = {
      product
    }
  }

  render() {
    const { product } = this.state
    const { photo, location: { latitude, longitude } } = product

    return (
      <View style={styles.mainCotainer}>

        {/* //================================ StatusBar ======================================// */}
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor={colors.AppDarkGreenColor} translucent={false} />

        {/* //================================ Header ======================================// */}
        <View style={styles.headerCotainer}>
          <AppHeader
            headerHeight="100%"
            onLeftIconPress={()=>this.props.navigation.goBack()}
            leftIconPath={images.headerLeftBack}
            lefticonSize={wp(5)}
            title={'Product'}
            bgColor={colors.AppGreenColor}
          />
        </View>

        {/* //================================ Map View ======================================// */}
        <View style={styles.mapView}>
          <MapView
            style={styles.mapStyles}
            initialRegion={{
              latitude: product.location ? product.location.latitude : 37.78825,
              longitude: product.location ? product.location.longitude : -122.4324,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          >

            {
              product.location &&
              <Circle
                center={product.location}
                radius={pin_radius * 1000}
                strokeWidth={1}
                strokeColor={'#DC020288'}
                fillColor={'#DC020222'}
              />
            }
          </MapView>
          {
            product &&
            <View style={{ position: 'absolute', bottom: 30, left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }}>
              <Loops
                product={product}
                image={product.photo && product.photo.length > 0 ? product.photo[0] : ''}
                title={product.title}
                price={product.price && product.price > 0 ? `$${product.price}` : 'Free'}
                dayTime={`Posted ${moment(product.createdat).fromNow()}`}
                ml={product.ml}
                description={product.description}
                location={product.location && product.location.address}
                onPress={() => { }}
              />
            </View>
          }
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