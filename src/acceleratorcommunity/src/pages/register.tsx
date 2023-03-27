import Register from 'components/Register';
import React from 'react';

function forgotPassword() {
  let tempVar: any;
  return (
    <Register
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
