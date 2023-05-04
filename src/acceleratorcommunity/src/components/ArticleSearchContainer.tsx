import React from 'react';
import styles from '../assets/searchFilterContainer.module.css';
import SearchNews from './SearchNews';
import { GenericSkeletonForSearch } from './skeletons/SearchSkeleton';

const ArticleSearchContainer = (props: any) => {
  return (
    <div className={styles.generalcontainer}>
      {props?.success ? (
        <GenericSkeletonForSearch count={5} />
      ) : (
        [1, 2, 3, 4, 5].map(() => {
          return <SearchNews />;
        })
      )}
    </div>
  );
};

export default ArticleSearchContainer;
