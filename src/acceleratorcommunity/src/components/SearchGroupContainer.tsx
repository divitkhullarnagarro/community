import React from 'react';
// import SearchGroupResult from './SearchGroupResult';
import styles from '../assets/searchFilterContainer.module.css';
// import { SearchSkeleton } from './skeletons/SearchSkeleton';

const SearchGroupContainer = (props: any) => {
  console.log(props)
  return (
    <div className={styles.generalcontainer}>
      {/* {props?.success ? (
        <SearchSkeleton count={5} />
      ) : (
        [1, 2, 3, 4, 5].map(() => {
          return <SearchGroupResult />;
        })
      )} */}
      No data found
    </div>
  );
};

export default SearchGroupContainer;
