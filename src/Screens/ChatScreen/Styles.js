//================================ React Native Imported Files ======================================//

import { StyleSheet, Dimensions } from "react-native";
//================================ Local Imported Files ======================================//

import colors from '../../Assets/Colors/colors';
const { height } = Dimensions.get('window')

const styles = StyleSheet.create({

    mainContainer:
    {
        flex: 1,
    },
    headerView:
    {
        backgroundColor: colors.appDarkBlue,
        height: height * 0.08
    },
    uperView: {
        flex: 0.9,
        backgroundColor: colors.white,
    },
});
export default styles;