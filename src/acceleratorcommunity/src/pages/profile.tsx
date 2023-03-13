import React from 'react';
import Profile from '../components/Profile';

function profile() {
  let tempVar: any;
  return (
    <Profile
      rendering={tempVar}
      params={tempVar}
      fields={{
        heading: tempVar,
      }}
    />
  );
}

export default profile;
