import React from 'react';
import styles from '../assets/searchFilterContainer.module.css';
import eventImg from '../assets/images/event.png';
import Event from './Event';

const EventSearchContainer = () => {
  const Events = [
    {
      eventImg: eventImg,
      title: 'Event1',
      description: 'This is an event1',
      startDate: '01:10:2023',
      endDate: '02:10:2023',
    },
    {
      eventImg: eventImg,
      title: 'Event2',
      description: 'This is an event2',
      startDate: '01:10:2023',
      endDate: '02:10:2023',
    },
    {
      eventImg: eventImg,
      title: 'Event3',
      description: 'This is an event3',
      startDate: '01:10:2023',
      endDate: '02:10:2023',
    },
    {
      eventImg: eventImg,
      title: 'Event4',
      description: 'This is an event4',
      startDate: '01:10:2023',
      endDate: '02:10:2023',
    },
    {
      eventImg: eventImg,
      title: 'Event5',
      description: 'This is an event5',
      startDate: '01:10:2023',
      endDate: '02:10:2023',
    },
    {
      eventImg: eventImg,
      title: 'Event6',
      description: 'This is an event6',
      startDate: '01:10:2023',
      endDate: '02:10:2023',
    },
    {
      eventImg: eventImg,
      title: 'Event7',
      description: 'This is an event7',
      startDate: '01:10:2023',
      endDate: '02:10:2023',
    },
    {
      eventImg: eventImg,
      title: 'Event8',
      description: 'This is an event8',
      startDate: '01:10:2023',
      endDate: '02:10:2023',
    },
    {
      eventImg: eventImg,
      title: 'Event9',
      description: 'This is an event9',
      startDate: '01:10:2023',
      endDate: '02:10:2023',
    },
    {
      eventImg: eventImg,
      title: 'Event10',
      description: 'This is an event10',
      startDate: '01:10:2023',
      endDate: '02:10:2023',
    },
  ];

  return (
    <div className={styles.parentContainer}>
      <div className={styles.generalcontainer}>
        <Event events={Events} />
      </div>
    </div>
  );
};

export default EventSearchContainer;
