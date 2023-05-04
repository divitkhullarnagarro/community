import React from 'react';
type contextType = {
  firebaseInstance: any;
  requestForNotificationPermission: any;
  deleteTokenFromFirebase: any;
};

const FirebaseContext = React.createContext<contextType | null | undefined>(null);
export default FirebaseContext;
