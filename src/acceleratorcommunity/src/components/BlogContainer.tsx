import React from 'react';
import Blog from './Blog';
import styles from '../assets/searchFilterContainer.module.css';

const BlogContainer = (props: any) => {
  return (
    <div className={styles.parentContainer}>
      <div className={styles.filterContainer}>
        {props?.searchedData?.map((data: any) => {
          return data?.sourceAsMap?.postType === 'BLOG_POST' ? <Blog blog={data?.sourceAsMap?.blog} /> : '';
        })}
      </div>
    </div>
  );
};

export default BlogContainer;
