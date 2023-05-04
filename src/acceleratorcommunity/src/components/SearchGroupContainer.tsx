import React from 'react';
import SearchGroupResult from './SearchGroupResult';
import styles from '../assets/searchFilterContainer.module.css';
import { SearchSkeleton } from './skeletons/SearchSkeleton';

const SearchGroupContainer = (props: any) => {
  return (
    <div className={styles.generalcontainer}>
      {props?.success ? (
        <SearchSkeleton count={5} />
      ) : (
        [1, 2, 3, 4, 5].map(() => {
          return <SearchGroupResult />;
        })
      )}
    </div>
  );
};

export default SearchGroupContainer;
