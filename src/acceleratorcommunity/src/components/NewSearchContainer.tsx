import React from 'react';
import styles from '../assets/searchFilterContainer.module.css';
import SearchNews from './SearchNews';

const NewSearchContainer = () => {
  return (
    <div className={styles.generalcontainer}>
      {[1, 2, 3, 4, 5].map(() => {
        return <SearchNews />;
      })}
    </div>
  );
};

export default NewSearchContainer;
