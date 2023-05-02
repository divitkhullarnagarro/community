import React from 'react';
import styles from '../assets/searchFilterContainer.module.css';
import SearchedJournal from './SearchedJournal';

const JournalContainer = () => {
  return (
    <div className={styles.parentContainer}>
      <div className={styles.generalcontainer}>
        {[1, 2, 3, 4, 5].map(() => {
          return <SearchedJournal />;
        })}
      </div>
    </div>
  );
};

export default JournalContainer;
