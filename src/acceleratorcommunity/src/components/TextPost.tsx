import React from 'react';
import styles from '../assets/events.module.css';
import { modifyHtml } from 'assets/helpers/helperFunctions';
import parser from 'html-react-parser';

const TextPost = (props: any) => {
  return (
    <>
      {props?.fromALL ? <div className={styles.typeHeading}>Post</div> : ''}
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
