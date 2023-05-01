import React from 'react';
import User from './User';
import SideSearchFilter from './sideSearchFilter';
import styles from '../assets/searchFilterContainer.module.css';

const SearchUserContainer = () => {
  return (
    <div className={styles.parentContainer} >
      <SideSearchFilter />
      <div className={styles.generalcontainer}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ].map(() => {
          return <User />;
        })}
      </div>
    </div>
  );
};

export default SearchUserContainer;
