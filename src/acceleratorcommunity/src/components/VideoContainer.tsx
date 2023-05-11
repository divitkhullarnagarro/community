import React from 'react';
import styles from '../assets/events.module.css';
import { modifyHtml } from 'assets/helpers/helperFunctions';
import parser from 'html-react-parser';

const VideoContainer = (props: any) => {
  console.log('videooooooooooooooooooooooooooooooo', props?.events?.mediaInfoList[0]?.url);
  const id = props?.events?.id;

  return (
    <a href={`/post/${id}`} className={styles.link} target="_blank">
      {props?.fromALL ? <div className={styles.typeHeading}>Post</div> : ''}
      <div className={styles.parentContainer}>
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
            {parser(
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
            )}
          </div>
        </div>
      </div>
    </a>
  );
};

export default VideoContainer;
