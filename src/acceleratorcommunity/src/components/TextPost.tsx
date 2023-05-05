import React from 'react';
import styles from '../assets/events.module.css';
import { modifyHtml } from 'assets/helpers/helperFunctions';
import parser from 'html-react-parser';


const TextPost = (props: any) => {
  console.log('qqqqqqqqqqqqqqqqqqq', props?.events?.mediaInfoList[0]?.url);


  return (
    <>
      <div className={styles.parentContainer}>
        <div className={styles.imgAndContentContainer}>
          <div className={styles.content}>
            <div className={styles.eventDescription}>
              {parser(modifyHtml(props?.events?.description))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TextPost;
