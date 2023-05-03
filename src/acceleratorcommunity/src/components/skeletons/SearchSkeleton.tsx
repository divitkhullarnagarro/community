import React from 'react';
// import style from './../../assets/addPost.module.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from '../../assets/searchFilterContainer.module.css';

export const SearchSkeleton = (props: any) => {
  const postSke = (
    <div style={{ marginBottom: '30px' }}>
      <div className={styles.skeletonHead}>
        <Skeleton circle={true} height={60} width={60} />
        <Skeleton height={80} width={850} />
      </div>
    </div>
  );

  let skeArr = [] as any;
  for (let i = 0; i < props?.count; i++) {
    skeArr.push(postSke);
  }

  return skeArr;
};

export const SearchSkeletonForUser = (props: any) => {
  const postSke = (
    <div className={styles.skeletonContainer}>
      <div className={styles.skeletonHead}>
        <Skeleton circle={true} height={60} width={60} />
        <div>
          <Skeleton height={10} width={150} />
          <Skeleton height={10} width={150} />
        </div>
      </div>
      <div>
        <Skeleton height={30} width={120} />
      </div>
    </div>
  );

  let skeArr = [] as any;
  for (let i = 0; i < props?.count; i++) {
    skeArr.push(postSke);
  }

  return skeArr;
};

export const SearchSkeletonForEvents = (props: any) => {
  const postSke = (
    <div className={styles.skeletonContainer}>
      <div className={styles.skeletonHead}>
        <Skeleton circle={false} height={200} width={200} />
        <div>
          <Skeleton height={10} width={300} />
          <Skeleton height={10} width={50} />
          <Skeleton height={10} width={500} />
          <Skeleton height={10} width={500} />
          <Skeleton height={10} width={500} />
          <Skeleton height={10} width={100} />
        </div>
      </div>
      <div>
        <Skeleton height={5} width={15} />
      </div>
    </div>
  );

  let skeArr = [] as any;
  for (let i = 0; i < props?.count; i++) {
    skeArr.push(postSke);
  }

  return skeArr;
};


export const GenericSkeletonForSearch = (props: any) => {
    const postSke = (
      <div className={styles.skeletonContainer}>
        <div className={styles.skeletonHead}>
          <Skeleton circle={false} height={150} width={150} />
          <div>
            <Skeleton height={10} width={300} />
            <Skeleton height={10} width={50} />
            <Skeleton height={10} width={500} />
            <Skeleton height={10} width={500} />
            <Skeleton height={10} width={500} />
          </div>
        </div>
      </div>
    );
  
    let skeArr = [] as any;
    for (let i = 0; i < props?.count; i++) {
      skeArr.push(postSke);
    }
  
    return skeArr;
  };
  