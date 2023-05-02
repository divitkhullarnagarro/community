import React from 'react';
import styles from '../assets/searchNews.module.css';
import eventImg from '../assets/images/event.png';

const SearchNews = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img src={eventImg.src} />
      </div>
      <div className={styles.contentContainer} >
        <div className={styles.containerHeading}>Hello world | Hello world</div>
        <div className={styles.containerTime}>
        Today 6:00 PM IST
        </div>
        <div className={styles.containerDescription}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil reiciendis libero,
          alias temporibus perspiciatis aliquam explicabo quaerat facilis possimus. Amet tenetur
          molestias, in cum omnis perspiciatis culpa accusantium praesentium?
        </div>
      </div>
    </div>
  );
};

export default SearchNews;
