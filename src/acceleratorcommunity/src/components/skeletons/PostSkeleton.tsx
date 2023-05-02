import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function PostSkeleton(props: any) {
  const postSke = (
    <div style={{ marginTop: '10px !important' }}>
      <div>
        <Skeleton height={40} width={40} circle={true} />
      </div>
      <div style={{ marginTop: '12px' }}>
        <Skeleton height={50} count={3} />
      </div>
    </div>
  );

  let skeArr = [] as any;
  for (let i = 0; i < props?.count; i++) {
    skeArr.push(postSke);
  }

  return skeArr;
}

export default PostSkeleton;
