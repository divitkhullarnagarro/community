import React, { useState } from 'react';
import WebContext from './WebContext';

function WebProvider(props: any) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState('');
  const [userRefreshToken, setUserRefreshToken] = useState('');
  const [objectId, setObjectId] = useState('');
  const [userObject, setUserObject] = useState<any>('');

  return (
    <WebContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userToken,
        setUserToken,
        userRefreshToken,
        setUserRefreshToken,
        objectId,
        setObjectId,
        userObject,
        setUserObject,
      }}
    >
      {props?.children}
    </WebContext.Provider>
  );
}

export default WebProvider;
