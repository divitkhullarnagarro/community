import React, { useState } from 'react';
import WebContext from './WebContext';

function WebProvider(props: any) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState('');
  const [userRefreshToken, setUserRefreshToken] = useState('');

  return (
    <WebContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userToken,
        setUserToken,
        userRefreshToken,
        setUserRefreshToken,
      }}
    >
      {props?.children}
    </WebContext.Provider>
  );
}

export default WebProvider;
