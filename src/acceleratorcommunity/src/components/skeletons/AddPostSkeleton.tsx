import React from 'react';
import style from './../../assets/addPost.module.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function AddPostSkeleton(props: any) {
  const postSke = (
    <div style={{ marginBottom: '30px' }}>
      <div className={style.addPostHead}>
        <Skeleton circle={true} className='mb-2' height={28} width={28}/>
        <Skeleton height={18} className='mb-2'/>
        <Skeleton height={18} className='mb-2'/>
      </div>
      <div className='mb-3'>
        <Skeleton className='mb-2' height={80}/>
        <Skeleton height={20} width={100 + '%'}/>
        <Skeleton height={20} width={100 + '%'}/>
        <Skeleton height={20} width={100 + '%'}/>
        <Skeleton height={20} width={100 + '%'}/>
        <Skeleton height={20} width={100 + '%'}/>
        <Skeleton height={20} width={100 + '%'}/>
        <Skeleton height={20} width={100 + '%'}/>
      </div>
      <div className={style.addPostFooter}>
        <Skeleton height={18} width={100 + '%'}/>
        <Skeleton height={18} width={100 + '%'}/>
        <Skeleton height={18} width={100 + '%'}/>
      </div>
    </div>
  );

  let skeArr = [] as any;
  for (let i = 0; i < props?.count; i++) {
    skeArr.push(postSke);
  }

  return skeArr;
}

export default AddPostSkeleton;
