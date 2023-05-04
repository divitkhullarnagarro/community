import React from 'react';
import eventCard from '../assets/eventCard.module.css';

function EventCard(props: any) {
  const timestamp = props?.date;
  const dateObj = new Date(timestamp);
  const weekdayIndex = dateObj.getDay();
  const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const weekday = weekdays[weekdayIndex];
  // const tempDate = new Date(timestamp * 1000);
  // tempDate.setUTCHours(0, 0, 0, 0);
  // const weekday = format(tempDate, 'EEEE');
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const monthName = new Date(2000, month - 1).toLocaleString('en-us', { month: 'long' });
  const day = dateObj.getDate();
  const time = dateObj.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  return (
    <div className={eventCard.ConferenceEventContainer}>
      <div className={eventCard.leftContainer} style={{ backgroundImage: `url(${props?.url})` }}>
        {' '}
        <div className={eventCard.eventType}>{props?.eventType}</div>
      </div>
      <div className={eventCard.rightContainer}>
        <div className={eventCard.date}>
          &nbsp;
          {weekday},&nbsp;{day}&nbsp;
          {monthName}&nbsp;
          {year}
          &nbsp;<span>AT</span>&nbsp;
          {time}
        </div>
        <div className={eventCard.heading}>{props?.heading}</div>
        <div className={eventCard.description}>{props?.description}</div>
        {/* <button className={eventCard.interestedButton}>Interested</button> */}
      </div>
    </div>
  );
}

export default EventCard;
