import React from 'react';
import User from './User';
import styles from '../assets/searchFilterContainer.module.css';
import { SearchSkeletonForUser } from './skeletons/SearchSkeleton';

const SearchUserContainer = (props: any) => {
  return (
    <div className={styles.parentContainer}>
      <div className={styles.generalcontainer}>
        {props?.success ? (
          <SearchSkeletonForUser count={5} />
        ) : (
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => {
            return <User />;
          })
        )}
      </div>
    </div>
  );
};

export default SearchUserContainer;
