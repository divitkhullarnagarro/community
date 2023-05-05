import React from 'react';
import styles from '../assets/events.module.css';

const Event = (props: any) => {
  const data =  props?.events?.event;
  return (
    <>
      <div className={styles.parentContainer}>
        <div className={styles.imgAndContentContainer}>
          <img src="https://chinchincelebration.com/wp-content/uploads/2019/08/product-launch-events-min.png" alt="eventImg" />
          <div className={styles.content}>
            <div className={styles.eventHeading}>{data?.title}</div>
            <div className={styles.timeContainer}>
              <div className={styles.eventTime}>{data?.eventDate}</div>
              {/* <div className={styles.eventTime}>to</div> */}
              {/* <div className={styles.eventTime}>{props?.getFormatedDate(event?.endDate)}</div> */}
            </div>
            <div className={styles.eventDescription}>{data?.description}</div>
          </div>
        </div>
        {/* <div className="actonContainer">anmol</div> */}
      </div>
    </>
  );
};

export default Event;
