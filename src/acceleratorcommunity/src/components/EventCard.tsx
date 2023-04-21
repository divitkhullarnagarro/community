import React from 'react';
import eventCard from '../assets/eventCard.module.css';

function EventCard(props: any) {
  const timestamp = props?.date;
  const dateObj = new Date(timestamp);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const monthName = new Date(2000, month - 1).toLocaleString('en-us', { month: 'long' });
  const day = dateObj.getDate();
  const hour = dateObj.getHours();
  const minute = dateObj.getMinutes();
  return (
    <div className={eventCard.ConferenceEventContainer}>
      <div className={eventCard.leftContainer}>
        {' '}
        <div className={eventCard.eventType}>{props?.eventType}</div>
      </div>
      <div className={eventCard.rightContainer}>
        <div className={eventCard.heading}>{props?.heading}</div>
        <div className={eventCard.description}>{props?.description}</div>
        <div className={eventCard.date}>
          <div>
            <span>
              <img
                width="40px"
                src="https://cdn-icons-png.flaticon.com/128/591/591576.png"
                alt="Date"
              />
            </span>
            &nbsp;
            <span>
              {day},&nbsp;
              {monthName}&nbsp;
              {year}
            </span>
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <div>
            <span>
              {' '}
              <img
                width="40px"
                src="https://cdn-icons-png.flaticon.com/512/850/850960.png"
                alt="Time"
              />
            </span>
            &nbsp;
            <span>
              &nbsp;{hour}:{minute == 0 ? '00' : minute}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
