import React from 'react';
import AllSearchResult from './AllSearchResult';
import { SearchSkeletonForUser } from './skeletons/SearchSkeleton';
import styles from '../assets/searchFilterContainer.module.css';

const SearchALLConatiner = (props: any) => {
  return (
    <div className={styles.parentContainer}>
      <div className={styles.generalcontainer}>
        {props?.success ? (
          <SearchSkeletonForUser count={5} />
        ) : (
          <div>
            <AllSearchResult  searchedData={props?.searchedData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchALLConatiner;
