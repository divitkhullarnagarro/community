import React, { useState } from 'react';
import FirebaseContext from './FirebaseContext';
import firebase, { FirebaseApp, initializeApp } from 'firebase/app';
import firebaseConfig, { vapidKey } from 'src/firebase/FirebaseConfig';
import { decryptString, encryptString } from 'assets/helpers/EncryptDecrypt';
import { deleteToken, getMessaging, getToken, isSupported } from 'firebase/messaging';

const FirebaseProvider = (props: any) => {
  const [firebaseInstance, setFirebaseInstance] = useState<FirebaseApp>();

  const getFcmTokenFromLocalStorage = () => {
    const tokenInLocalForage = localStorage.getItem('fcm_token');
    if (tokenInLocalForage !== null) {
      let decryptedToken = decryptString(tokenInLocalForage);
      return decryptedToken;
    }
    return null;
  };

  const requestForNotificationPermission = async () => {
    if (!firebase?.getApp('communitySolutionFirebaseInstance')) {
      const app = initializeApp(firebaseConfig, 'communitySolutionFirebaseInstance');
      setFirebaseInstance(app);
      try {
        if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
          const fcmToken = getFcmTokenFromLocalStorage();
          if (fcmToken != null) {
            return fcmToken;
          }

          const status = await Notification.requestPermission();
          if (status && status === 'granted') {
            const isSupportedBrowser = await isSupported();
            if (isSupportedBrowser) {
              const messaging = getMessaging(app);
              const fcm_token = await getToken(messaging, {
                vapidKey: vapidKey,
              });

              if (fcm_token) {
                let encryptedFcmToken = encryptString(fcm_token);
                localStorage.setItem('fcm_token', encryptedFcmToken);
                return fcm_token;
              }
            }
          } else if (status && status === 'denied') {
            //alert('You denied for the notification');
          }
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    }

    return null;
  };

  const checkAndRegsiterServiceWorker = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .getRegistration('../firebase-messaging-sw.js')
        .then((registration) => {
          if (registration) {
            console.log('Service worker is registered and active');
          } else {
            registerServiceWorker();
          }
        })
        .catch((error) => {
          console.error('Error checking service worker registration:', error);
        });
    }
  };

  const registerServiceWorker = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('../firebase-messaging-sw.js', {
          scope: '/',
        })
        .then(function (registration) {
          console.log('Registration successful, scope is:', registration.scope);
        })
        .catch(function (err) {
          console.log('Service worker registration failed, error:', err);
        });
    }
  };

  const deleteTokenFromFirebase = async () => {
    if (!firebase) {
      const messaging = getMessaging(firebaseInstance);
      const isTokenDeleted = await deleteToken(messaging);
      return isTokenDeleted;
    }
    return false;
  };

  return (
    <FirebaseContext.Provider
      value={{
        firebaseInstance,
        requestForNotificationPermission,
        deleteTokenFromFirebase,
        checkAndRegsiterServiceWorker,
      }}
    >
      {props?.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
