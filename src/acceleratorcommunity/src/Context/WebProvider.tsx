import React, { useEffect, useState } from 'react';
import WebContext from './WebContext';
// import { useRouter } from 'next/router';
import { decryptString, encryptString } from '../assets/helpers/EncryptDecrypt';

function WebProvider(props: any) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState('');
  const [userRefreshToken, setUserRefreshToken] = useState('');
  const [objectId, setObjectId] = useState('');
  const [userObject, setUserObject] = useState<any>('');
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // let router = useRouter();

  useEffect(() => {
    if (userToken == '') {
      let token = localStorage.getItem('UserToken');
      token ? (token = decryptString(token)) : '';
      if (typeof localStorage !== 'undefined' && token != '' && token != null) {
        setUserToken(token);
      }
      //  else router.push('/login');
    }
  }, []);

  useEffect(() => {
    if (userToken == '') {
      let obj = localStorage.getItem('UserObject') as any;
      if (typeof localStorage !== 'undefined' && obj != '' && obj != null) {
        obj = decryptString(obj);
        obj = JSON.parse(obj);
        let objId = obj?.objectId;
        setObjectId(objId);
        setUserObject(obj);
      }
      // else router.push('/login');
    }
  }, []);

  useEffect(() => {
    if (localStorage && localStorage?.getItem('theme')) {
      let themeValue = localStorage.getItem('theme') as any;
      setDarkMode(JSON.parse(decryptString(themeValue)).darkTheme);
    } else {
      localStorage.setItem('theme', encryptString(JSON.stringify({ darkTheme: darkMode })));
    }
  }, []);

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
        darkMode,
        setDarkMode,
      }}
    >
      {props?.children}
    </WebContext.Provider>
  );
}

export default WebProvider;
