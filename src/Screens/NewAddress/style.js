import {StyleSheet} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    mainContainer: {
        flex:1,
        backgroundColor: '#F3F3F3'
    },
    InnerContainer: {
        height: hp(23),
        // backgroundColor:'green',
        justifyContent: 'center',
        alignItems:'center',
    },
    container: {
        height: hp(37),
        // backgroundColor:'red',
        // justifyContent: 'center',
        alignItems:'center',
    },
    containerView:{
        height: hp(39.5),
        width:wp(88),
        backgroundColor:'#fff',
        alignItems:'center',
        marginTop:hp(2),
    },
    text: {
        fontSize:wp(3),
        fontWeight:'bold',
        color: '#871E2C',
        paddingVertical:wp(4.5),
    },
    viewBtn :{
        marginTop:hp(15),
        justifyContent:'center',
    },
    viewInput: {
        height:hp(6),
        width:wp(80),
        backgroundColor:'#F0F0F0',
        paddingLeft:wp(4),
        borderWidth:wp(0.1),
        borderColor:'#F0F0F0',
        borderRadius:wp(0.5),
        marginTop: hp(2)
    },
    mapViewContainer: {
        height:hp(45),
        // backgroundColor:'green',
        width:wp(88),
        justifyContent:'center',
        alignItems:'center',
    },
    mapView: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    img: {
        height:hp(47),
        width:wp(88),
        resizeMode:'cover',
    },
    input:{
        paddingVertical: wp(3.5)
    }

});


export default styles;