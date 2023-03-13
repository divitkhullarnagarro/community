import React from 'react';
import Register from '../components/Register';

function register() {
  let tempVar: any;
  return (
    <>
      <Register
        rendering={tempVar}
        params={tempVar}
        fields={{
          heading: tempVar,
        }}
      />
    </>
  );
}

export default register;
