import React, { useContext } from 'react';
import styles from '../assets/searchFilterContainer.module.css';
import SearchNews from './SearchNews';
import { GenericSkeletonForSearch } from './skeletons/SearchSkeleton';
import darkModeCss from '../assets/darkTheme.module.css';
import WebContext from 'src/Context/WebContext';

const CaseStudySearchContainer = (props: any) => {
  // console.log('====================', props);
  const { darkMode } = {
    ...useContext(WebContext),
  };
  return (
    <div
      className={`${styles.generalcontainer} ${darkMode && darkModeCss.grey_3} ${
        darkMode && darkModeCss.text_light
      }`}
    >
      {props?.success ? (
        <GenericSkeletonForSearch count={5} />
      ) : props?.searchedData?.length > 0 ? (
        props?.searchedData?.map((data: any) => {
          return <SearchNews journal={data?.sourceAsMap} />;
        })
      ) : (
        <div className={styles.forNoData}>No Case study found</div>
      )}
    </div>
  );
};

export default CaseStudySearchContainer;
