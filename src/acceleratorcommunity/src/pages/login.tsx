import Login from 'components/Login';
import React from 'react';

function forgotPassword() {
  let tempVar: any;
  return (
    <Login
      rendering={tempVar}
      params={tempVar}
      fields={{
        data: {
          datasource: tempVar,
        },
      }}
    />
  );
}

export default forgotPassword;
