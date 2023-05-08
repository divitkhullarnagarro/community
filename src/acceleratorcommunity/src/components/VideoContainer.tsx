import React from 'react';
import styles from '../assets/events.module.css';
import { modifyHtml } from 'assets/helpers/helperFunctions';
import parser from 'html-react-parser';

const VideoContainer = (props: any) => {
  console.log('videooooooooooooooooooooooooooooooo', props?.events?.mediaInfoList[0]?.url);
  return (
    <>
      <div className={styles.parentContainer}>
        <div className={styles.imgAndContentContainer}>
          <video  className={styles.video} controls>  
            <source
              style={{ height: '5%', width: '55%' }}
              src={props?.events?.mediaInfoList[0]?.url}
              type="video/mp4"
            />
          </video>
          <div className={styles.content}>
            {parser(modifyHtml(props?.events?.description))}
            <div className={styles.eventDescription}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoContainer;
