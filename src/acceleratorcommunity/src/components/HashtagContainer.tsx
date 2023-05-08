import React from 'react';
import { SearchSkeletonForUser } from './skeletons/SearchSkeleton';
import styles from '../assets/searchFilterContainer.module.css';
import Hashtag from './Hashtag';

const HashtagContainer = (props: any) => {
  return (
    <div className={styles.parentContainer}>
      <div className={styles.generalcontainer}>
        {props?.success ? (
          <SearchSkeletonForUser count={5} />
        ) : (
          <div>
            <Hashtag searchedData={props?.searchedData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HashtagContainer;
