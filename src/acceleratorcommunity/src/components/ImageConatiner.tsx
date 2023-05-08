import React from 'react';
import styles from '../assets/events.module.css';
import { modifyHtml } from 'assets/helpers/helperFunctions';
import parser from 'html-react-parser';

const ImageConatiner = (props: any) => {
  console.log('qqqqqqqqqqqqqqqqqqq', props?.events?.mediaInfoList[0]?.url);
  return (
    <>
      {props?.fromALL ? <div className={styles.typeHeading}>Post</div> : ''}
      <div className={styles.parentContainer}>
        <div className={styles.imgAndContentContainer}>
          <img src={props?.events?.mediaInfoList[0]?.url} alt="eventImg" />
          <div className={styles.content}>
            {parser(modifyHtml(props?.events?.description))}
            <div className={styles.eventDescription}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageConatiner;
