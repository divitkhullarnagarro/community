import React, { useEffect, useState } from 'react';
import WebContext from './WebContext';
import { useRouter } from 'next/router';
import { decryptString } from '../components/HelperFunctions/EncryptDecrypt';

function WebProvider(props: any) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState('');
  const [userRefreshToken, setUserRefreshToken] = useState('');
  const [objectId, setObjectId] = useState('');
  const [userObject, setUserObject] = useState<any>('');

  let router = useRouter();

  useEffect(() => {
    if (userToken == '') {
      let token = localStorage.getItem('UserToken');
      token ? (token = decryptString(token)) : '';
      if (typeof localStorage !== 'undefined' && token != '' && token != null) {
        setUserToken(token);
      } else router.push('/login');
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
      } else router.push('/login');
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
      }}
    >
      {props?.children}
    </WebContext.Provider>
  );
}

export default WebProvider;
