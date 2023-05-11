import { useContext } from 'react';
import WebContext from 'src/Context/WebContext';
import { SearchSkeletonForUser } from './skeletons/SearchSkeleton';
import styles from '../assets/searchFilterContainer.module.css';
import darkModeCss from '../assets/darkTheme.module.css';
import Hashtag from './Hashtag';

const HashtagContainer = (props: any) => {
  const { darkMode } = {
    ...useContext(WebContext),
  };
  return (
    <div className={`${styles.parentContainer} ${darkMode && darkModeCss.grey_1}`}>
      <div className={`${styles.generalcontainer} ${darkMode && darkModeCss.grey_3}`}>
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
