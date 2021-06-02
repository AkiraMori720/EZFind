import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import I18n, {LANGUAGES} from "../../i18n";
import CheckBox from "../CheckBox/CheckBox";



export default function SettingLang({ language, onPressOk, onPressCancel }){

    const [ lang, setLang ] = useState(language);

    return (
        <View style={styles.mainContainer}>
            <View style={styles.modalContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{I18n.t('Select Language')}</Text>
                </View>
                <View>
                    {
                        LANGUAGES.map(l => {
                            return (<View style={styles.langItem}>
                                <CheckBox
                                    value={l.value === lang}
                                    checkTitle={l.label}
                                    style={{width: 24, height: 24}}
                                    onChange={(value) => {
                                        if (value) setLang(l.value);
                                    }}
                                >
                                </CheckBox>
                            </View>);
                        })
                    }
                </View>
                <View style={styles.buttonViewContainer}>
                    <View style={styles.okViewContainer}>
                        <TouchableOpacity onPress={() => onPressOk(lang)}>
                            <Text style={styles.AgreeTextStyleContainer}>
                                {I18n.t('OK')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.CancelViewContainer}>
                        <TouchableOpacity onPress={onPressCancel}>
                            <Text style={styles.AgreeTextStyleContainer}>
                                {I18n.t('CLOSE')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },
    modalContainer: {
        width: '80%', justifyContent: "center", alignItems: "center", paddingTop: wp(3),
        paddingHorizontal: wp(3),
        backgroundColor: "white",
        //borderRadius: 8
    },
    titleContainer: {
        marginTop: 8,
        marginBottom: 24
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    langItem: {
        marginVertical: 8
    },
    buttonViewContainer: {
        height: wp(15),
        width: '90%',
        flexDirection: "row",
    },
    CancelViewContainer: {
        height: '100%',
        width: '30%',
        justifyContent: "center",
        alignItems: "center",
        alignSelf: 'center',
        alignContent: 'center',

    },
    okViewContainer: {
        height: '100%',
        width: '70%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 4,

    }
});

