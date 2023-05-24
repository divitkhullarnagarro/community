import { useContext } from 'react';
import WebContext from 'src/Context/WebContext';
import styles from '../assets/events.module.css';
import darkModeCss from '../assets/darkTheme.module.css';
// import { modifyHtml } from 'assets/helpers/helperFunctions';
// import parser from 'html-react-parser';
import DescriptionForSearch from './helperComponents/DescriptionForSearch';

const VideoContainer = (props: any) => {
  const id = props?.events?.id;
  const { darkMode } = {
    ...useContext(WebContext),
  };

  return (
    <a href={`/post?postId=${id}`} className={styles.link} target="_blank">
      {props?.fromALL ? (
        <div className={`${styles.typeHeading} ${darkMode && darkModeCss.text_green}`}>Post</div>
      ) : (
        ''
      )}
      <div className={`${styles.parentContainer} ${darkMode && darkModeCss.grey_1}`}>
        <div className={styles.imgAndContentContainer}>
          {props?.fromALL ? (
            ''
          ) : (
            <video className={styles.video} controls>
              <source
                style={{ height: '5%', width: '55%' }}
                src={props?.events?.mediaInfoList[0]?.url}
                type="video/mp4"
              />
            </video>
          )}
          <div className={styles.content}>
            <DescriptionForSearch fromSitecore={false} description={props?.events?.description} />
            {/* {parser(
              modifyHtml(
                props?.events?.description.length > 1000 ? (
                  <div>
                    {' '}
                    {props?.events?.description.slice(0, 1000)}{' '}
                    <div>
                      {props?.events?.description?.description.slice(0, 1000)}

                      <a href={`/post/${id}`} className={styles.link} target="_blank">
                        {' '}
                        <span className={styles.link}>...See More</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  props?.events?.description
                )
              )
            )} */}
          </div>
        </div>
      </div>
    </a>
  );
};

export default VideoContainer;
