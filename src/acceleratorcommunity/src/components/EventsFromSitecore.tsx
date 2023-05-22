import React from 'react';
import styles from '../assets/searchNews.module.css';
import WebContext from 'src/Context/WebContext';
import { useContext } from 'react';
import darkModeCss from '../assets/darkTheme.module.css';
// import eventImg from '../assets/images/event.png';
import DescriptionForSearch from './helperComponents/DescriptionForSearch';

const EventsFromSitecore = (props: any) => {
  const { darkMode } = { ...useContext(WebContext) };

  const data = props?.journal;

  const splitDate = (date: string) => {
    var parts = date.split(' ');
    return parts[0];
  };

  return (
    <>
      {props?.fromALL ? (
        <div className={`${styles.typeHeading} ${darkMode && darkModeCss.text_green}`}>Event</div>
      ) : (
        ''
      )}
      <div  className={`${styles.container} ${darkMode && darkModeCss.grey_1}`}>
        {props?.fromALL ? (
          ''
        ) : (
          <div className={styles.imgContainer}>
            <img src={data?.Image} alt="sitecoreEvent" />
          </div>
        )}
        <div className={styles.contentContainer}>
          <div className={`${styles.containerHeading}  ${darkMode && darkModeCss.text_light}`}>
            {data?.Title}
          </div>
          <div className={`${styles.containerTime}  ${darkMode && darkModeCss.text_light}`}>
          {splitDate(data?.Date)}
          </div>
          <div className={`${styles.containerDescription}  ${darkMode && darkModeCss.text_light}`}>
            <DescriptionForSearch description={data?.ShortDescription} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EventsFromSitecore;
