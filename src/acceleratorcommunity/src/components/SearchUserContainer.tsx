import { useContext } from 'react';
import WebContext from 'src/Context/WebContext';
import User from './User';
import styles from '../assets/searchFilterContainer.module.css';
import darkModeCss from '../assets/darkTheme.module.css';
import { SearchSkeletonForUser } from './skeletons/SearchSkeleton';
import style from '../assets/searchFilterContainer.module.css';

const SearchUserContainer = (props: any) => {
  console.log("props?.searchedData",props)
  const { darkMode } = {
    ...useContext(WebContext),
  };
  return (
    <div className={`${styles.parentContainer} ${darkMode && darkModeCss.grey_1}`}>
      <div className={`${styles.generalcontainer} ${darkMode && darkModeCss.grey_3}`}>
        {props?.success ? (
          <SearchSkeletonForUser count={5} />
        ) : (
          <>
            {' '}
            {props?.searchedData.length > 0 ? (
              <div className={styles.hashtagCount}>
                <div className={`${darkMode && darkModeCss.text_active}`}>
                  <img src={'https://cdn-icons-png.flaticon.com/512/149/149071.png'} />
                  Users
                  {/* {props?.query} */}
                </div>
                <div className={`${darkMode && darkModeCss.text_active}`}>
                  <div>We've found {props?.searchedData.length} results</div>
                </div>
              </div>
            ) : (
              ''
            )}
            {props?.searchedData.length > 0 ? (
              props?.searchedData.map((data: any) => {
                return data?.index === 'accelerator-user' ? <User user={data?.sourceAsMap} /> : '';
              })
            ) : (
              <div className={`${style.forNoData} ${darkMode && darkModeCss.text_light}`}>No User Found</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchUserContainer;
