import React, { useState } from 'react';
import GenericNotification from './GenericNotificationContext';
import ToastNotification from 'components/ToastNotification';

function WebProvider(props: any) {
  const [showNotification, setShowNotification] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  const handleCallback = () => {
    setShowNotification(!showNotification);
    setSuccess(false);
    setError(false);
  };

  return (
    <GenericNotification.Provider
      value={{
        showNotification,
        setShowNotification,
        success,
        setSuccess,
        error,
        setError,
        message,
        setMessage,
      }}
    >
      {showNotification && (
        <ToastNotification
          showNotification={showNotification}
          success={success}
          error={error}
          message={message}
          handleCallback={handleCallback}
        />
      )}
      {props?.children}
    </GenericNotification.Provider>
  );
}

export default WebProvider;
