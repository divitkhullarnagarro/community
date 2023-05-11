import { useContext } from 'react';
import WebContext from 'src/Context/WebContext';
import styles from '../assets/events.module.css';
import darkModeCss from '../assets/darkTheme.module.css';

const Event = (props: any) => {
  const data = props?.events?.event;
  const id = props?.events?.id;
  console.log('++++++++++++++++++++', data);
  const splitDateOnly = (date: any) => {
    const dateOnly = date?.split('T')[0];
    return dateOnly;
  };
  const splitTimeOnly = (date: any) => {
    const timeOnly = date?.split('T')[1];
    return timeOnly;
  };
  const { darkMode } = { ...useContext(WebContext) };
  return (
    <a href={`/post/${id}`} className={styles.link} target="_blank">
      {props?.fromALL ? <div className={`${styles.typeHeading} ${darkMode && darkModeCss.text_green}`}>Event</div> : ''}
      <div className={`${styles.parentContainer} ${darkMode && darkModeCss.grey_1}`}>
        <div className={styles.imgAndContentContainer}>
          <img
            src="https://chinchincelebration.com/wp-content/uploads/2019/08/product-launch-events-min.png"
            alt="eventImg"
          />
          <div className={styles.content}>
            <div className={`${styles.eventHeading} ${darkMode && darkModeCss.text_green}`}>{data?.title}</div>
            <div className={styles.timeContainer}>
              <div className={`${styles.eventTime} ${darkMode && darkModeCss.text_green}`}>
                {splitDateOnly(data?.eventDate) + ' ' + splitTimeOnly(data?.eventDate)}
              </div>
            </div>
            <div className={`${styles.eventDescription} ${darkMode && darkModeCss.text_light}`}>{data?.description}</div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default Event;
