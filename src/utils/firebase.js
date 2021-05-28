
import firestore from '@react-native-firebase/firestore';

export const sendPushNotification = async (user_uid, title, body) => {
    if (user_uid) {
        firestore()
            .collection(`users`)
            .doc(`${user_uid}`)
            .get()
            .then((doc) => {
                if (doc) {
                    const user_data = doc.data()
                    const fcm_token = user_data && user_data.fcm_token
                    if (fcm_token) {
                        firestore()
                            .collection('notifications')
                            .add({
                                fcm_token, title, body
                            })
                            .then(() => {
                                
                            });
                    }
                }
            })
    }
}