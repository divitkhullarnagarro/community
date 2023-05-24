import React from 'react';
import styles from '../assets/searchNews.module.css';
import WebContext from 'src/Context/WebContext';
import { useContext } from 'react';
import darkModeCss from '../assets/darkTheme.module.css';
// import style from '../assets/searchFilterContainer.module.css';
import config from '../temp/config';

// import eventImg from '../assets/images/event.png';
import DescriptionForSearch from './helperComponents/DescriptionForSearch';

const SearchNews = (props: any) => {
  const { darkMode } = { ...useContext(WebContext) };

  const data = props?.journal;

  return (
    <>
      {props?.fromALL ? (
        <div className={`${styles.typeHeading} ${darkMode && darkModeCss.text_green}`}>
          {props?.index ? 'Case Study' : 'News'}
        </div>
      ) : (
        ''
      )}
      <div className={`${styles.container} ${darkMode && darkModeCss.grey_1}`}>
        {props?.fromALL ? (
          ''
        ) : (
          <div className={styles.imgContainer}>
            <img src={config?.sitecoreApiHost + data?.Image} alt="Article Image" />
          </div>
        )}
        <div className={styles.contentContainer}>
          <div className={`${styles.containerHeading}  ${darkMode && darkModeCss.text_light}`}>
            {data?.Title}
          </div>
          <div className={`${styles.containerTime}  ${darkMode && darkModeCss.text_light}`}>
            {data?.Date}
          </div>
          <div className={`${styles.containerDescription}  ${darkMode && darkModeCss.text_light}`}>
            <DescriptionForSearch fromSitecore={true} description={data?.ShortDescription} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchNews;
