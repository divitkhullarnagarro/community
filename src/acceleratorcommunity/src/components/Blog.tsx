import { useContext } from 'react';
import WebContext from 'src/Context/WebContext';
import styles from '../assets/events.module.css';
import darkModeCss from '../assets/darkTheme.module.css';
import { modifyHtml } from 'assets/helpers/helperFunctions';
import parser from 'html-react-parser';

const Blog = (props: any) => {
  console.log("===============",props)
  const { darkMode } = { ...useContext(WebContext) };
  return (
    <>
      <div className={`${styles.parentContainer} ${darkMode && darkModeCss.grey_1}`}>
        <div className={styles.imgAndContentContainer}>
          <img src={props?.blog?.imageUrl} alt="eventImg" />
          <div className={styles.content}>
            <div className={`${styles.eventHeading} ${darkMode && darkModeCss.text_green}`}>{props?.blog?.heading}</div>
            <div className={`${styles.eventDescription} ${darkMode && darkModeCss.text_light}`}>
              {parser(modifyHtml(props?.blog?.description))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
