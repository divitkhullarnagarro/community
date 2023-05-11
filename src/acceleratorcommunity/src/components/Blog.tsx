import { useContext } from 'react';
import WebContext from 'src/Context/WebContext';
import styles from '../assets/events.module.css';
import darkModeCss from '../assets/darkTheme.module.css';
import { modifyHtml } from 'assets/helpers/helperFunctions';
import parser from 'html-react-parser';

const Blog = (props: any) => {
  const { darkMode } = { ...useContext(WebContext) };

  return (
    <a href={`/post/${props?.id}`} className={styles.link} target="_blank">
      {props?.fromALL ? <div className={styles.typeHeading}>Blog</div> : ''}
      <div className={`${styles.parentContainer} ${darkMode && darkModeCss.grey_1}`}>
        <div className={styles.imgAndContentContainer}>
          {props?.fromALL ? '' : <img src={props?.blog?.imageUrl} alt="eventImg" />}
          <div className={styles.content}>
            <div className={`${styles.eventHeading} ${darkMode && darkModeCss.text_green}`}>
              {parser(
                modifyHtml(
                  props?.blog?.heading.length > 900
                    ? props?.blog?.heading.slice(0, 900)
                    : props?.blog?.heading
                )
              )}
            </div>
            <div className={`${styles.eventDescription} ${darkMode && darkModeCss.text_light}`}>
              {parser(
                modifyHtml(
                  props?.blog?.description.length > 900 ? (
                    <div>
                      {props?.events?.description.slice(0, 900)}
                      <a href={`/post/${props?.id}`} className={styles.link} target="_blank">
                        {' '}
                        <span className={styles.link}>...See More</span>
                      </a>
                    </div>
                  ) : (
                    props?.blog?.description
                  )
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default Blog;
