import { useEffect, useState } from 'react';
const io = require('socket.io-client');
import SocketContext from './SocketContext';

function SocketProvider(props: any) {
  const [socket, setSocket] = useState<any>();
  const socketServerUrl = 'wss://elkvm.centralindia.cloudapp.azure.com/';
  const [socketEndpoint, setSocketEndpoint] = useState(socketServerUrl);

  const sslCertificate = `MIIDyzCCArOgAwIBAgIUdka5xh5t/i0QSMVUNIH/t/r0v1EwDQYJKoZIhvcNAQEL
  BQAwdTELMAkGA1UEBhMCQVUxEzARBgNVBAgMClNvbWUtU3RhdGUxITAfBgNVBAoM
  GEludGVybmV0IFdpZGdpdHMgUHR5IEx0ZDEuMCwGA1UEAwwlZWxrdm0uY2VudHJh
  bGluZGlhLmNsb3VkYXBwLmF6dXJlLmNvbTAeFw0yMzA0MjgwNjMwMzFaFw0yNDA0
  MjcwNjMwMzFaMHUxCzAJBgNVBAYTAkFVMRMwEQYDVQQIDApTb21lLVN0YXRlMSEw
  HwYDVQQKDBhJbnRlcm5ldCBXaWRnaXRzIFB0eSBMdGQxLjAsBgNVBAMMJWVsa3Zt
  LmNlbnRyYWxpbmRpYS5jbG91ZGFwcC5henVyZS5jb20wggEiMA0GCSqGSIb3DQEB
  AQUAA4IBDwAwggEKAoIBAQC/voSjQpflV13SN94b4DtXUih+RFzypuDWTcialSAe
  sC3iYP3B19vyCSFLCCy8/ifirfkLkSo6BvS0tafgeQIHz0kULPmdf+wgdOiZCgtW
  qiJNbp40FYS4t0Nv89KdnyGD64N6Iitb0Lng5nSPsXw039QKnsE6povEYodyStBF
  LkgkGDIcjymdw2pWDq0m/E0DhbEv7EN6FxumLfT8Mn8fhuDt48bjYc46T7QTiZBy
  FCemkXRn2mygV2F5lE6lCLVH6HbdVkm8hOlGHqRkmBLE54J4BS5L2G6CcFlS2kgL
  QqhhC/ohI3g0rgxMEGReNIdt9e8dGPL7aSASu6jkynRfAgMBAAGjUzBRMB0GA1Ud
  DgQWBBR1oTpNXybnAbD0G6ZRTzWQ9Y4R2zAfBgNVHSMEGDAWgBR1oTpNXybnAbD0
  G6ZRTzWQ9Y4R2zAPBgNVHRMBAf8EBTADAQH/MA0GCSqGSIb3DQEBCwUAA4IBAQAH
  GegJQfjGO3/+APeW5N/chHXlxPwuNSfDNLmZ9rugURVzaL/Ht5644IAxRlmj0KAS
  zs6Wa12Pv6+IUlZ2lW7mhYBbnkED1ltARl565szEREGI49S0ucWfAauRsxa8HQ6E
  A+CisTJhpssmaBgl2HHlm6YZ68joy7vXUAcqWdVCewFX/jCbfSpeQO5BqaBVAdmI
  NJHnoy8qbrPvRDDoOSe9dsnJUtqhFaihczmiAtq1DV/+d1i5MiYcxYK4QTwMGiaq
  KrzfX7+pPaltg+cR7W4te6RpjiD9q9wy5036SXo5HDHPSTUd+ealKH6mwnGZuv8l
  uyy/ojWjtB8q5a0bU0l3`;

  useEffect(() => {
    if (!socket) {
      const newSocket = io(socketEndpoint, {
        transports: ['websocket'],
        upgrade: false,
        // secure: true,
        rejectUnauthorized: false,
        ca: sslCertificate,
        query: {
          v: '2.0.0',
          // EIO: 3,
        },
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
        setSocket(null);
      };
    }

    return socket;
  }, []);

  useEffect(() => {
    socket?.on('connect', function () {
      console.log('SocketConnected');
    });
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, setSocket, socketEndpoint, setSocketEndpoint }}>
      {props?.children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
