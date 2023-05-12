import { useContext } from 'react';
import WebContext from 'src/Context/WebContext';
import styles from '../assets/events.module.css';
import darkModeCss from '../assets/darkTheme.module.css';
import { modifyHtml } from 'assets/helpers/helperFunctions';
import parser from 'html-react-parser';
import DescriptionForSearch from './helperComponents/DescriptionForSearch';

const Blog = (props: any) => {
  const { darkMode } = { ...useContext(WebContext) };

  return (
    <a href={`/post/${props?.id}`} className={styles.link} target="_blank">
      {props?.fromALL ? <div className={`${styles.typeHeading} ${darkMode && darkModeCss.text_green}`}>Blog</div> : ''}
      <div className={`${styles.parentContainer} ${darkMode && darkModeCss.grey_1}`}>
        <div className={styles.imgAndContentContainer}>
          {props?.fromALL ? '' : <img src={props?.blog?.imageUrl} alt="eventImg" />}
          <div className={styles.content}>
            <div className={`${styles.eventHeading} ${darkMode && darkModeCss.text_green}`}>
              {parser(
                modifyHtml(
                  props?.blog?.heading.length > 1500
                    ? props?.blog?.heading.slice(0, 1500)
                    : props?.blog?.heading
                )
              )}
            </div>
            <div className={`${styles.eventDescription} ${darkMode && darkModeCss.text_light}`}>
              <DescriptionForSearch  description={props?.blog?.description}/>
              {/* {parser(
                modifyHtml(
                  props?.blog?.description.length > 2000 ? (
                    <div>
                      {props?.events?.description.slice(0, 2000)}
                      <a href={`/post/${props?.id}`} className={styles.link} target="_blank">
                        {' '}
                        <span className={styles.link}>...See More</span>
                      </a>
                    </div>
                  ) : (
                    props?.blog?.description
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

export default Blog;
