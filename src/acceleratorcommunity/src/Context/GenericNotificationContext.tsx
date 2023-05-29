import React from 'react';

type contextType = {
  showNotification: boolean;
  setShowNotification: React.Dispatch<React.SetStateAction<boolean>>;
  success: boolean;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
};

// Create the initial context value
const initialContextValue: contextType = {
  showNotification: false,
  success: false,
  error: false,
  message: '',
  setShowNotification: () => {},
  setSuccess: () => {},
  setError: () => {},
  setMessage: () => {},
};

const GenericNotificationContext = React.createContext<contextType>(initialContextValue);

export default GenericNotificationContext;
