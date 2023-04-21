import React from 'react';

type contextType = {
  socket: any;
  setSocket: React.Dispatch<React.SetStateAction<any>>;
  socketEndpoint: any;
  setSocketEndpoint: React.Dispatch<React.SetStateAction<any>>;
};

const SocketContext = React.createContext<contextType | null | undefined>(null);
export default SocketContext;
