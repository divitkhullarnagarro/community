import React, { useState, useEffect } from 'react';
import { Toast } from 'react-bootstrap';
import styles from '../assets/toastnotification.module.css';
import TickImage from '../assets/images/tick.png';
import { NextImage } from '@sitecore-jss/sitecore-jss-nextjs';

function ToastNotification(props: any) {
  const [showToastNotification, setShowToastNotification] = useState(props?.showNotification);
  const toggleToast = () => {
    setShowToastNotification(!showToastNotification);
    props?.handleCallback();
  };

  useEffect(() => {
    const popupTimer = setTimeout(() => {
      toggleToast();
    }, 2000);
    return () => {
      clearTimeout(popupTimer);
    };
  }, [showToastNotification]);

  return (
    <div>
      <Toast className={styles.toastContainer} show={showToastNotification} onClose={toggleToast}>
        <Toast.Header
          className={
            props?.success
              ? `${styles['toastHeader']} ${styles['success']}`
              : `${styles['toastHeader']} ${styles['error']}`
          }
        >
          <div className={styles.tickImage}>
            <NextImage field={TickImage} width={20} height={20} />
          </div>
          <div className={styles.toastHeaderContent}>
            <strong className={styles.toastStatus}>{props?.success ? 'SUCCESS' : 'ERROR'} </strong>
            <div className={styles.toastMessage}>{props?.message}</div>
          </div>
        </Toast.Header>
      </Toast>
    </div>
  );
}

export default ToastNotification;
