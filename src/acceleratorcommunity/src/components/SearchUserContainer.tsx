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
          props?.searchedData.map((data: any) => {
            return data?.index === 'accelerator-user' ? <User user={data?.sourceAsMap} /> :"";
          })
        )}
      </div>
    </div>
  );
};

export default SearchUserContainer;
