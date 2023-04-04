import React, { useState, useEffect } from 'react';
import { Toast } from 'react-bootstrap';
import styles from '../assets/toastnotification.module.css';

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
          <strong className="mr-auto">{props?.success ? 'SUCCESS' : 'ERROR'} </strong>
        </Toast.Header>
        <Toast.Body className={styles.toastBody}>{props?.message}</Toast.Body>
      </Toast>
    </div>
  );
}

export default ToastNotification;
