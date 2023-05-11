import { useContext } from 'react';
import WebContext from 'src/Context/WebContext';
import styles from '../assets/events.module.css';
import darkModeCss from '../assets/darkTheme.module.css';
import { modifyHtml } from 'assets/helpers/helperFunctions';
import parser from 'html-react-parser';

const ImageConatiner = (props: any) => {
  console.log('qqqqqqqqqqqqqqqqqqq', props?.events?.mediaInfoList[0]?.url);
  const id = props?.events?.id;
  const { darkMode } = { ...useContext(WebContext) };

  return (
    <a  href={`/post/${id}`} className={styles.link} target="_blank">
      {props?.fromALL ? <div className={`${styles.typeHeading} ${darkMode && darkModeCss.text_green}`}>Post</div> : ''}
      <div className={`${styles.parentContainer} ${darkMode && darkModeCss.grey_1}`}>
        <div className={styles.imgAndContentContainer}>
          <img src={props?.events?.mediaInfoList[0]?.url} alt="eventImg" />
          <div className={styles.content}>
            {parser(modifyHtml(props?.events?.description))}
            <div className={`${styles.eventDescription} ${darkMode && darkModeCss.text_light}`}></div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default ImageConatiner;
