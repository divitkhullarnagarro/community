import { useContext } from 'react';
import WebContext from 'src/Context/WebContext';
import styles from '../assets/events.module.css';
import darkModeCss from '../assets/darkTheme.module.css';
// import { modifyHtml } from 'assets/helpers/helperFunctions';
// import parser from 'html-react-parser';
import DescriptionForSearch from './helperComponents/DescriptionForSearch';

const ImageConatiner = (props: any) => {
  const id = props?.events?.id;
  const { darkMode } = { ...useContext(WebContext) };

  return (
    <a href={`/post/${id}`} className={styles.link} target="_blank">
      {props?.fromALL ? (
        <div className={`${styles.typeHeading} ${darkMode && darkModeCss.text_green}`}>Post</div>
      ) : (
        ''
      )}
      <div className={`${styles.parentContainer} ${darkMode && darkModeCss.grey_1}`}>
        <div className={styles.imgAndContentContainer}>
          {props?.fromALL ? '' : <img src={props?.events?.mediaInfoList[0]?.url} alt="eventImg" />}
          <div className={styles.content}>
            <div className={`${styles.eventDescription} ${darkMode && darkModeCss.text_light}`}>
              <DescriptionForSearch description={props?.events?.description} />

              {/* {parser(
                modifyHtml(
                  props?.events?.description.length > 1200 ? (
                    <div>
                      {props?.events?.description.slice(0, 1200)}
                      <a href={`/post/${id}`} className={styles.link} target="_blank">
                        {' '}
                        <span className={styles.link}>...See More</span>
                      </a>
                    </div>
                  ) : (
                    props?.events?.description
                  )
                )
              )} */}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default ImageConatiner;
