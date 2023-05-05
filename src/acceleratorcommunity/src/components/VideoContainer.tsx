import React from 'react';
import styles from '../assets/events.module.css';
import { modifyHtml } from 'assets/helpers/helperFunctions';
import parser from 'html-react-parser'; 


const VideoContainer = (props: any) => {
    console.log("videooooooooooooooooooooooooooooooo",props?.mediaInfoList?.mediaInfoList)
  return (
    <>
      <div className={styles.parentContainer}>
        <div className={styles.imgAndContentContainer}>
          <video controls id="video" preload="metadata">
            {/* <source src={props?.mediaInfoList[0]?.url} type="video/mp4" /> */}
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
