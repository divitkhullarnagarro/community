import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import SocketContext from './SocketContext';

function SocketProvider(props: any) {
  const [socket, setSocket] = useState<any>();
  //console.log('NOTIFICATION_SOCKET_URL', process.env.NOTIFICATION_SOCKET_URL);
  const socketServerUrl = 'http://localhost:5000';
  const [socketEndpoint, setSocketEndpoint] = useState(socketServerUrl);

  useEffect(() => {
    if (!socket) {
      const newSocket = io(socketEndpoint);
      setSocket(newSocket);

      socket?.on('connect', function () {
        console.log('Socket connected');
      });

      return () => {
        newSocket.disconnect();
        setSocket(null);
      };
    }

    return socket;
  }, []);

  return (
    <SocketContext.Provider value={{ socket, setSocket, socketEndpoint, setSocketEndpoint }}>
      {props?.children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
