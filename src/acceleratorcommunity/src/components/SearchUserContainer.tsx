import { useContext } from 'react';
import WebContext from 'src/Context/WebContext';
import User from './User';
import styles from '../assets/searchFilterContainer.module.css';
import darkModeCss from '../assets/darkTheme.module.css';
import { SearchSkeletonForUser } from './skeletons/SearchSkeleton';

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
          props?.searchedData.length > 0 ? props?.searchedData.map((data: any) => {
            return data?.index === 'accelerator-user' ? <User user={data?.sourceAsMap} /> :"";
          }):"No user Found"
        )}
      </div>
    </div>
  );
};

export default SearchUserContainer;
