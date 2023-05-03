import { getMessaging, getToken } from 'firebase/messaging';
import firebase, { initializeApp } from 'firebase/app';
import { decryptString, encryptString } from 'assets/helpers/EncryptDecrypt';
import firebaseConfig, { vapidKey } from 'src/firebase/FirebaseConfig';

const firebaseCloudMessaging = {
  getFcmTokenFromLocalStorage: () => {
    const tokenInLocalForage = localStorage.getItem('fcm_token');
    if (tokenInLocalForage !== null) {
      let decryptedToken = decryptString(tokenInLocalForage);
      return decryptedToken;
    }
    return null;
  },
  init: async () => {
    if (!firebase?.getApp('communitySolutionFirebaseInstance')) {
      const app = initializeApp(firebaseConfig, 'communitySolutionFirebaseInstance');

      try {
        if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
          const fcmToken = firebaseCloudMessaging.getFcmTokenFromLocalStorage();
          if (fcmToken != null) {
            return fcmToken;
          }

          const messaging = getMessaging(app);
          const status = await Notification.requestPermission();
          if (status && status === 'granted') {
            const fcm_token = await getToken(messaging, {
              vapidKey: vapidKey,
            });

            if (fcm_token) {
              let encryptedFcmToken = encryptString(fcm_token);
              localStorage.setItem('fcm_token', encryptedFcmToken);
              return fcm_token;
            }
          } else if (status && status === 'denied') {
            alert('You denied for the notification');
          }
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    }

    return null;
  },
};

export default firebaseCloudMessaging;
