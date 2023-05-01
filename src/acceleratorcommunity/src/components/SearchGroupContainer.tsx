import React from 'react';
import SearchGroupResult from './SearchGroupResult';
import styles from '../assets/searchFilterContainer.module.css'

const SearchGroupContainer = () => {
  return (
    <div className={styles.generalcontainer} >
      {[1, 2, 3, 4, 5].map(() => {
        return <SearchGroupResult />;
      })}
    </div>
  );
};

export default SearchGroupContainer;
