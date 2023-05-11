import { useContext } from 'react';
import WebContext from 'src/Context/WebContext';
import styles from '../assets/events.module.css';
import darkModeCss from '../assets/darkTheme.module.css';
import { modifyHtml } from 'assets/helpers/helperFunctions';
import parser from 'html-react-parser';

const TextPost = (props: any) => {

  console.log("props",props)
  const { darkMode } = { ...useContext(WebContext) };

  return (
    <a  href={`/post/${props?.events?.id}`} className={styles.link} target="_blank">
      {props?.fromALL ? <div className={styles.typeHeading}>Post</div> : ''}
      <div className={`${styles.parentContainer} ${darkMode && darkModeCss.grey_1}`}>
        <div className={styles.imgAndContentContainer}>
          <div className={styles.content}>
            <div className={`${styles.eventDescription} ${darkMode && darkModeCss.text_light}`}>
              {parser(modifyHtml(props?.events?.description))}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default TextPost;
