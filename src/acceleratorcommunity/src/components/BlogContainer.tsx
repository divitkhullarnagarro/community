import { useContext } from 'react';
import WebContext from 'src/Context/WebContext';
import Blog from './Blog';
import styles from '../assets/searchFilterContainer.module.css';
import darkModeCss from '../assets/darkTheme.module.css';
import { SearchSkeletonForUser } from './skeletons/SearchSkeleton';

const BlogContainer = (props: any) => {
  const { darkMode } = { ...useContext(WebContext) };
  return (
    <div className={`${styles.parentContainer} ${darkMode && darkModeCss.grey_1}`}>
      <div className={`${styles.generalcontainer} ${darkMode && darkModeCss.grey_3}`}>
        {props?.success ? (
          <SearchSkeletonForUser count={5} />
        ) : (
          <div>
            {props?.searchedData?.length > 0 ? (
              props?.searchedData?.map((data: any) => {
                return data?.sourceAsMap?.postType === 'BLOG_POST' ? ( 
                
                  <Blog id={data?.id} blog={data?.sourceAsMap?.blog} />
                ) : (
                  ''
                );
              })
            ) : (
              <div className={`${styles.forNoData} ${darkMode && darkModeCss.text_light}`}>No Blog Found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogContainer;
