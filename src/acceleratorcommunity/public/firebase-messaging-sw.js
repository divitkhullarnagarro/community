// importScripts('https://www.gstatic.com/firebasejs/9.20.0/firebase-app-compat.js');
// importScripts('https://www.gstatic.com/firebasejs/9.20.0/firebase-messaging-compat.js');

// const firebaseConfig = {
//   apiKey: 'AIzaSyAnkIhfUD9aa1Z16Vwg9bc6ahl41-LGkI4',
//   authDomain: 'communitysolutions-6fddd.firebaseapp.com',
//   projectId: 'communitysolutions-6fddd',
//   storageBucket: 'communitysolutions-6fddd.appspot.com',
//   messagingSenderId: '406524379007',
//   appId: '1:406524379007:web:9a6d855994239965b6644a',
//   measurementId: 'G-NQM90DJLL6',
// };

// firebase.initializeApp(firebaseConfig);
// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: payload.notification.image,
//   };
//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// messaging.onMessage((payload) => {
//   console.log('[firebase-messaging-sw.js] Received message ', payload);
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: payload.notification.image,
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

self.addEventListener('push', (event) => {
  const data = event?.data?.json();
  const jsonObjectData = JSON.parse(data?.notification?.body ?? '{}');
  self.registration.showNotification(data?.notification?.title, {
    body: jsonObjectData?.message,
    data: {
      message: jsonObjectData,
    },
  });
});

self.addEventListener('notificationclick', (event) => {
  console.log('notificationclick', event);
  event.notification.close();
  if (
    event?.notification?.data?.message?.type === 'LIKE_ON_POST' ||
    event?.notification?.data?.message?.type === 'COMMENT_ON_POST' ||
    event?.notification?.data?.message?.type === 'REPLY_ON_COMMENT'
  ) {
    event.waitUntil(clients.openWindow(`/post/${event?.notification?.data?.message?.articleId}`));
  } else if (event?.notification?.data?.message?.type === 'FOLLOW_BY_USER') {
    event.waitUntil(
      clients.openWindow(`/viewProfile?id=${event?.notification?.data?.message?.articleId}`)
    );
  }
});
