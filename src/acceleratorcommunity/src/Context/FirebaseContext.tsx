import React from 'react';
type contextType = {
  firebaseInstance: any;
  getFcmTokenFromLocalStorage: any;
  requestForNotificationPermission: any;
  deleteTokenFromFirebase: any;
  checkAndRegsiterServiceWorker: any;
};

const FirebaseContext = React.createContext<contextType | null | undefined>(null);
export default FirebaseContext;
