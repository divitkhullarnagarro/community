import React from 'react';
import Login from '../components/Login';

function login() {
  let tempVar: any;
  return (
    <>
      <Login
        rendering={tempVar}
        params={tempVar}
        fields={{
          heading: tempVar,
        }}
      />
    </>
  );
}

export default login;
