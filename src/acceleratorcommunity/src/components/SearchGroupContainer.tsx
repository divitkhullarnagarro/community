import { useContext } from 'react';
// import SearchGroupResult from './SearchGroupResult';
import WebContext from 'src/Context/WebContext';
import styles from '../assets/searchFilterContainer.module.css';
// import { SearchSkeleton } from './skeletons/SearchSkeleton';
import darkModeCss from '../assets/darkTheme.module.css';

const SearchGroupContainer = (props: any) => {
  // console.log(props?.searchedData)
  props;
  const { darkMode } = {
    ...useContext(WebContext),
  };
  return (
    <div className={styles.generalcontainer}>
      {/* {props?.success ? (
        <SearchSkeleton count={5} />
      ) : (
        props?.searchedData.length > 0 ?  [1, 2, 3, 4, 5].map(() => {
          return <SearchGroupResult />;
        }):"No Group Found"
      )} */}

      <div className={`${styles.forNoData} ${darkMode && darkModeCss.text_light}`}>
        No Groups Found
      </div>
    </div>
  );
};

export default SearchGroupContainer;
