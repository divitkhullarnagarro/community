import React from 'react';
import styles from '../assets/events.module.css';
import { modifyHtml } from 'assets/helpers/helperFunctions';
import parser from 'html-react-parser';

const Blog = (props: any) => {
  return (
    <>
      {props?.fromALL ? <div className={styles.typeHeading}>Blog</div> : ''}
      <div className={styles.parentContainer}>
        <div className={styles.imgAndContentContainer}>
          <img src={props?.blog?.imageUrl} alt="eventImg" />
          <div className={styles.content}>
            <div className={styles.eventHeading}>
              {parser(
                modifyHtml(
                  props?.blog?.heading.length > 800
                    ? props?.blog?.heading.slice(0, 800)
                    : props?.blog?.heading
                )
              )}
            </div>
            <div className={styles.eventDescription}>
              {parser(
                modifyHtml(
                  props?.blog?.description.length > 800
                    ? props?.blog?.description.slice(0, 800)
                    : props?.blog?.description
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
