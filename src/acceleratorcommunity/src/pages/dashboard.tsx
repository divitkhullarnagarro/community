import React from 'react';
import Dashboard from '../components/Dashboard';
import AddPost from '../components/AddPost';

function dashboard() {
  let tempVar: any;

  return (
    <>
      <Dashboard />
      <AddPost
        rendering={tempVar}
        params={tempVar}
        fields={{
          heading: tempVar,
        }}
      />
    </>
  );
}

export default dashboard;
