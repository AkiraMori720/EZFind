//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen';
import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    headerCotainer: {
        flex: 0.1,
    },
    bottomContainer: {
        flex: 0.9,
        paddingHorizontal: wp(5)

    },
});
export default Styles;
