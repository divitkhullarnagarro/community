import React from 'react';
import Blog from './Blog';
import styles from '../assets/searchFilterContainer.module.css';
import { SearchSkeletonForUser } from './skeletons/SearchSkeleton';

const BlogContainer = (props: any) => {
  return (
    <div className={styles.parentContainer}>
      <div className={styles.generalcontainer}>
        {props?.success ? (
          <SearchSkeletonForUser count={5} />
        ) : props?.searchedData?.length > 0 ? (
          props?.searchedData?.map((data: any) => {
            return data?.sourceAsMap?.postType === 'BLOG_POST' ? (
              <Blog blog={data?.sourceAsMap?.blog} />
            ) : (
              ''
            );
          })
        ) : (
          'No Blogs Found'
        )}
      </div>
    </div>
  );
};

export default BlogContainer;
