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
        ) : (
          <div>
            {props?.searchedData.length > 0 ? (
              <div className={styles.hashtagCount}>
                <div>
                  {/* <img src={'https://cdn-icons-png.flaticon.com/512/149/149071.png'} /> */}
                  Blogs
                  {/* {props?.query} */}
                </div>
                <div>
                  <div>We've found {props?.searchedData.length} results</div>
                </div>
              </div>
            ) : (
              ''
            )}
            {props?.searchedData?.length > 0 ? (
              props?.searchedData?.map((data: any) => {
                return data?.sourceAsMap?.postType === 'BLOG_POST' ? ( 
                
                  <Blog id={data?.id} blog={data?.sourceAsMap?.blog} />
                ) : (
                  ''
                );
              })
            ) : (
              <div className={styles.forNoData}>No Blog Found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogContainer;
