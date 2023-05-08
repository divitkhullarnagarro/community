import React from 'react';
// import SearchGroupResult from './SearchGroupResult';
import styles from '../assets/searchFilterContainer.module.css';
// import { SearchSkeleton } from './skeletons/SearchSkeleton';

const SearchGroupContainer = (props: any) => {
  console.log(props?.searchedData)
  return (
    
    <div className={styles.generalcontainer}>
      {/* {props?.success ? (
        <SearchSkeleton count={5} />
      ) : (
        props?.searchedData.length > 0 ?  [1, 2, 3, 4, 5].map(() => {
          return <SearchGroupResult />;
        }):"No Group Found"
      )} */}
      No Group Found
    </div>
  );
};

export default SearchGroupContainer;
