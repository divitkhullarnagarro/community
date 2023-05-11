import React from 'react';
import styles from '../assets/events.module.css';

const Event = (props: any) => {
  const data = props?.events?.event;
  const id = props?.events?.id;
  const splitDateOnly = (date: any) => {
    const dateOnly = date?.split('T')[0];
    return dateOnly;
  };
  const splitTimeOnly = (date: any) => {
    const timeOnly = date?.split('T')[1];
    return timeOnly;
  };
  const getTwoLines = (data: string) => {
    console.log('data', data);
  };
  const EventImage: any = {
    Seminar:
      'https://higherlogicdownload.s3.amazonaws.com/APSNET/UploadedImages/tAiEB79vTYq1gz2UEGu1_IMG_2866-L.jpg',
    Conference: 'https://th.bing.com/th/id/OIP.IXdC6XgETCp5RaM3iQCb6QHaE8?pid=ImgDet&rs=1',
    Announcement: 'https://th.bing.com/th/id/OIP.zPaWJzUBQwbXDjhCtCtI1gHaE8?pid=ImgDet&rs=1',
    'Launch Event': 'https://live.staticflickr.com/808/39724254630_e9cdcb8e77_b.jpg',
    Celebration: 'https://th.bing.com/th/id/OIP.E1RiHHXMHUcq0L0KvprXfQHaEn?pid=ImgDet&rs=1',
  };

  return (
    <a href={`/post/${id}`} className={styles.link} target="_blank">
      {props?.fromALL ? <div className={styles.typeHeading}>Event</div> : ''}
      <div className={styles.parentContainer}>
        <div className={styles.imgAndContentContainer}>
          {props?.fromALL ? '' : <img src={EventImage[data?.eventType]} alt="eventImg" />}
          <div className={props?.fromALL ? styles.content : styles.eventContent}>
            <div className={styles.eventHeading}>{data?.title}</div>
            <div className={styles.timeContainer}>
              <div className={styles.eventTime}>
                {splitDateOnly(data?.eventDate) + ' ' + splitTimeOnly(data?.eventDate)}
              </div>
            </div>
            <div className={styles.eventDescription}>
              {data?.description.length > 300 ? (
                <div>
                  {data?.description.slice(0, 300)}
                  <a href={`/post/${id}`} className={styles.link} target="_blank">
                    ...See More
                  </a>
                </div>
              ) : (
                data?.description
              )}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default Event;
