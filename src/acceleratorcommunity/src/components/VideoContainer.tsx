import { useContext } from 'react';
import WebContext from 'src/Context/WebContext';
import styles from '../assets/events.module.css';
import darkModeCss from '../assets/darkTheme.module.css';
import { modifyHtml } from 'assets/helpers/helperFunctions';
import parser from 'html-react-parser';

const VideoContainer = (props: any) => {
  console.log('videooooooooooooooooooooooooooooooo', props?.events?.mediaInfoList[0]?.url);
  const id = props?.events?.id;
  const { darkMode } = {
    ...useContext(WebContext),
  };

  return (
    <a href={`/post/${id}`} className={styles.link} target="_blank">
      {props?.fromALL ? <div className={`${styles.typeHeading} ${darkMode && darkModeCss.text_green}`}>Post</div> : ''}
      <div className={`${styles.parentContainer} ${darkMode && darkModeCss.grey_1}`}>
        <div className={styles.imgAndContentContainer}>
          <video className={styles.video} controls>
            <source
              style={{ height: '5%', width: '55%' }}
              src={props?.events?.mediaInfoList[0]?.url}
              type="video/mp4"
            />
          </video>
          <div className={styles.content}>
            {parser(modifyHtml(props?.events?.description))}
          </div>
        </div>
      </div>
    </a>
  );
};

export default VideoContainer;
