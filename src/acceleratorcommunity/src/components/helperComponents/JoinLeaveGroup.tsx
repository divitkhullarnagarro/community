import Image from 'next/image';
import React, { useContext, useState } from 'react';
import joined from './../../assets/images/joined.png';
import join from './../../assets/images/join.png';
import AxiosRequest from 'src/API/AxiosRequest';
import { joinGroupUrl } from 'assets/helpers/constants';
import ToastNotification from './../ToastNotification';
import WebContext from 'src/Context/WebContext';

function JoinLeaveGroup({ groupName, member, id }: any) {
  const { setWantRerender, wantRerender } = {
    ...useContext(WebContext),
  };

  const [isJoined, setIsJoined] = useState(member);
  const [toastSuccess, setToastSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>();
  const [showNotification, setShowNofitication] = useState(false);
  const [toastError, setToastError] = useState(false);
  // const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  // console.log(ignored);
  console.log('inside joinleavegroup', groupName, member);
  // useEffect(() => {
  //   console.log('inside joinleavegroup', 'useeffect');
  //   forceUpdate();
  // }, [wantRerender]);

  const joinGroupClick = async (groupId: string, groupName: string) => {
    setIsJoined(true);
    const res: any = await AxiosRequest({
      url: `${joinGroupUrl}${groupId}/join`,
      method: 'PUT',
    });
    if (res.success) {
      setWantRerender && setWantRerender(!wantRerender);
      setIsJoined(true);
      setToastSuccess(true);
      setToastMessage(`Joined ${groupName}`);
      setShowNofitication(true);
    } else {
      setIsJoined(false);
      setToastError(true);
      setToastMessage('Failed to join Group');
      setShowNofitication(true);
    }
    console.log('joinGroupCall', res);
  };
  const resetToastState = () => {
    setShowNofitication(!showNotification);
    setToastSuccess(false);
    setToastError(false);
  };
  return (
    <>
      {isJoined ? (
        <Image src={joined.src} height={30} width={30} title="Joined" />
      ) : (
        <Image
          src={join.src}
          height={30}
          width={30}
          title="Join Group"
          onClick={() => joinGroupClick(id, groupName)}
        />
      )}
      {showNotification && (
        <ToastNotification
          showNotification={showNotification}
          success={toastSuccess}
          error={toastError}
          message={toastMessage}
          handleCallback={resetToastState}
        />
      )}
    </>
  );
}

export default JoinLeaveGroup;
