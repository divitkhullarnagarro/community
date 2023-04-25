import React from 'react';
import styles from '../assets/dotloader.module.css';
const DotLoader = () => {
  return (
    <>
      <div className={styles.dotpulse}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
};

export default DotLoader;
