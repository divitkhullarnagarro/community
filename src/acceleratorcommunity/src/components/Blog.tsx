import React from 'react';
import styles from '../assets/events.module.css';
import { modifyHtml } from 'assets/helpers/helperFunctions';
import parser from 'html-react-parser';

const Blog = (props: any) => {
  console.log("===============",props)
  return (
    <>
      <div className={styles.parentContainer}>
        <div className={styles.imgAndContentContainer}>
          <img src={props?.blog?.imageUrl} alt="eventImg" />
          <div className={styles.content}>
            <div className={styles.eventHeading}>{props?.blog?.heading}</div>
            <div className={styles.eventDescription}>
              {parser(modifyHtml(props?.blog?.description))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
