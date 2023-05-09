import React from 'react';
import User from './User';
import styles from '../assets/searchFilterContainer.module.css';
import { SearchSkeletonForUser } from './skeletons/SearchSkeleton';

const SearchUserContainer = (props: any) => {
  console.log("props?.searchedData",props)
  return (
    <div className={styles.parentContainer}>
      <div className={styles.generalcontainer}>
        {props?.success ? (
          <SearchSkeletonForUser count={5} />
        ) : (
          props?.searchedData.length > 0 ? props?.searchedData.map((data: any) => {
            return data?.index === 'accelerator-user' ? <User user={data?.sourceAsMap} /> :"";
          }):"No user Found"
        )}
      </div>
    </div>
  );
};

export default SearchUserContainer;
