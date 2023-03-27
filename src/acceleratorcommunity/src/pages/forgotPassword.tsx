import ForgotPassword from 'components/ForgotPassword';
import React, { useState } from 'react';
import Cryptr from 'cryptr';
// import CryptoJS from 'crypto-js';
function forgotPassword() {
  // const [encrptedData, setEncrptedData] = useState('');
  // const [decrptedData, setDecrptedData] = useState('');

  // const secretPass = 'XkhZG4fW2t2W';

  // const encryptData = () => {
  //   const data = CryptoJS.AES.encrypt(JSON.stringify('asdf'), secretPass).toString();

  //   setEncrptedData(data);
  // };

  // const decryptData = () => {
  //   const bytes = CryptoJS.AES.decrypt(encrptedData, secretPass);
  //   console.log('CryptoJS.enc.Utf8', CryptoJS.enc.Utf8);
  //   const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  //   setDecrptedData(data);
  // };

  // encryptData();
  // decryptData();

  // console.log('decrptedData:', decrptedData, 'encrptedData:', encrptedData);
  // const cryptr = new Cryptr('ReallySecretKey');

  // const encryptedString = cryptr.encrypt('Popcorn');
  // const decryptedString = cryptr.decrypt(encryptedString);
  // console.log('encryptedString', encryptedString);
  // console.log('decryptedString', decryptedString);

  let tempVar: any;
  return (
    <ForgotPassword
      rendering={tempVar}
      params={tempVar}
      fields={{
        heading: tempVar,
      }}
    />
  );
}

export default forgotPassword;
