importScripts('https://www.gstatic.com/firebasejs/9.20.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.20.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: 'AIzaSyAnkIhfUD9aa1Z16Vwg9bc6ahl41-LGkI4',
  authDomain: 'communitysolutions-6fddd.firebaseapp.com',
  projectId: 'communitysolutions-6fddd',
  storageBucket: 'communitysolutions-6fddd.appspot.com',
  messagingSenderId: '406524379007',
  appId: '1:406524379007:web:9a6d855994239965b6644a',
  measurementId: 'G-NQM90DJLL6',
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// messaging.onMessage((payload) => {
//   console.log('[firebase-messaging-sw.js] Received message ', payload);
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: payload.notification.image,
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
