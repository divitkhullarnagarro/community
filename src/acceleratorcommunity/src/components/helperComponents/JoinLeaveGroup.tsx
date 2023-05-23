import Image from 'next/image';
import React, { useState } from 'react';
import joined from './../../assets/images/joined.png';
import join from './../../assets/images/join.png';
import AxiosRequest from 'src/API/AxiosRequest';
import { joinGroupUrl } from 'assets/helpers/constants';
import ToastNotification from './../ToastNotification';

function JoinLeaveGroup({ ele }: any) {
  const [isJoined, setIsJoined] = useState(ele.member);
  const [toastSuccess, setToastSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>();
  const [showNotification, setShowNofitication] = useState(false);
  const [toastError, setToastError] = useState(false);

  const joinGroupClick = async (groupId: string, groupName: string) => {
    setIsJoined(true);
    const res: any = await AxiosRequest({
      url: `${joinGroupUrl}${groupId}/join`,
      method: 'PUT',
    });
    if (res.success) {
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
          onClick={() => joinGroupClick(ele.id, ele.groupName)}
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
