import { getMessaging, getToken } from 'firebase/messaging';
import firebase, { FirebaseOptions, initializeApp } from 'firebase/app';

const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyAnkIhfUD9aa1Z16Vwg9bc6ahl41-LGkI4',
  authDomain: 'communitysolutions-6fddd.firebaseapp.com',
  projectId: 'communitysolutions-6fddd',
  storageBucket: 'communitysolutions-6fddd.appspot.com',
  messagingSenderId: '406524379007',
  appId: '1:406524379007:web:9a6d855994239965b6644a',
  measurementId: 'G-NQM90DJLL6',
};

const vapidKey =
  'BL0pq49qQNfLTAEJnp5MkpRVta5RceJwwnbVYx_xFG5wXmf2iw5Zee26z36QBF66UPo5KOUINnQrs55ac5Ml_9g';

const firebaseCloudMessaging = {
  init: async () => {
    if (!firebase?.getApp('communitySolutionFirebaseInstance')) {
      const app = initializeApp(firebaseConfig, 'communitySolutionFirebaseInstance');
      try {
        if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
          const messaging = getMessaging(app);
          const status = await Notification.requestPermission();
          if (status && status === 'granted') {
            const fcm_token = await getToken(messaging, {
              vapidKey: vapidKey,
            });

            return fcm_token;
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
