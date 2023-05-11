import React from 'react';
import styles from '../assets/events.module.css';
import { modifyHtml } from 'assets/helpers/helperFunctions';
import parser from 'html-react-parser';

const ImageConatiner = (props: any) => {
  console.log('qqqqqqqqqqqqqqqqqqq', props?.events);
  const id = props?.events?.id;

  return (
    <a href={`/post/${id}`} className={styles.link} target="_blank">
      {props?.fromALL ? <div className={styles.typeHeading}>Post</div> : ''}
      <div className={styles.parentContainer}>
        <div className={styles.imgAndContentContainer}>
          {props?.fromALL ? '' : <img src={props?.events?.mediaInfoList[0]?.url} alt="eventImg" />}
          <div className={styles.content}>
            <div className={styles.eventDescription}>
              {console.log("props?.events?.description",props?.events?.description)}
              {parser(
                modifyHtml(
                  props?.events?.description.length > 1200 ? (
                    <div>
                      {props?.events?.description.slice(0, 1200)}
                      <a href={`/post/${id}`} className={styles.link} target="_blank">
                        {' '}
                        <span className={styles.link}>...See More</span>
                      </a>
                    </div>
                  ) : (
                    props?.events?.description
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

export default ImageConatiner;
