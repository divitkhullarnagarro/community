import { useContext } from 'react';
import WebContext from 'src/Context/WebContext';
import styles from '../assets/searchNews.module.css';
// import eventImg from '../assets/images/event.png';
import darkModeCss from '../assets/darkTheme.module.css';

// import { modifyHtml } from 'assets/helpers/helperFunctions';
// import parser from 'html-react-parser';
import DescriptionForSearch from './helperComponents/DescriptionForSearch';

const SearchedJournal = (props: any) => {
  // const id = props?.events?.id;
  const { darkMode } = { ...useContext(WebContext) };
  const data = props?.journal;
  return (
    <>
      {props?.fromALL ? (
        <div className={`${styles.typeHeading} ${darkMode && darkModeCss.text_green}`}>Journal</div>
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
            {data?.Date}
          </div>
          <div className={`${styles.containerDescription}  ${darkMode && darkModeCss.text_light}`}>
            <DescriptionForSearch description={data?.ShortDescription}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchedJournal;
