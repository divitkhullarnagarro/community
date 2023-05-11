import React from 'react';
import styles from '../assets/events.module.css';
import { modifyHtml } from 'assets/helpers/helperFunctions';
import parser from 'html-react-parser';

const Blog = (props: any) => {
  const id = props?.blog?.id;
  return (
    <a href={`/post/${props?.id}`} className={styles.link} target="_blank">
      {props?.fromALL ? <div className={styles.typeHeading}>Blog</div> : ''}
      <div className={styles.parentContainer}>
        <div className={styles.imgAndContentContainer}>
          {props?.fromALL ? '' : <img src={props?.blog?.imageUrl} alt="eventImg" />}
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
                  props?.blog?.description.length > 800 ? (
                    <div>
                      {props?.events?.description.slice(0, 800)}
                      <a href={`/post/${props?.id}`} className={styles.link} target="_blank">
                        {' '}
                        <span className={styles.link}>...See More</span>
                      </a>
                    </div>
                  ) : (
                    props?.blog?.description
                  )
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default Blog;
