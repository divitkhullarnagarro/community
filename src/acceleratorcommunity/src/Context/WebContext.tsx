import React from 'react';

type contextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  userToken: string;
  setUserToken: React.Dispatch<React.SetStateAction<string>>;
  userRefreshToken: string;
  setUserRefreshToken: React.Dispatch<React.SetStateAction<string>>;
  objectId: string;
  setObjectId: React.Dispatch<React.SetStateAction<string>>;
  userObject: any;
  setUserObject: React.Dispatch<React.SetStateAction<any>>;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  wantRerender: boolean;
  setWantRerender: React.Dispatch<React.SetStateAction<boolean>>;
  allPeersList: any;
  setAllPeersList: React.Dispatch<React.SetStateAction<any>>;
  userNotificationList: any;
  setUserNotificationList: React.Dispatch<React.SetStateAction<any>>;
  isFirebaseTokenMapped: boolean;
  setIsFirebaseTokenMapped: React.Dispatch<React.SetStateAction<boolean>>;
};
const WebContext = React.createContext<contextType | null | undefined>(null);

export default WebContext;
