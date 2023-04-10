import React, { useContext, useEffect, useState } from 'react';
import WebContext from '../Context/WebContext';
import styles from '../assets/blockeduser.module.css';
import BlockUserImage from '../assets/images/BlockUser.jpg';
import { NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import { Button, Dropdown, Modal, Spinner } from 'react-bootstrap';
import MoreOptionsImage from '../assets/images/MoreOptions.jpg';
import Email from '../assets/images/EmailIcon.jpg';
import { useRouter } from 'next/router';
import Profile from '../assets/images/profile.png';
import BlockedUserPreviewImage from '../assets/images/BlockedUserPreviewImage.png';
import { unBlockUserCall, getBlockedUserList } from 'src/API/blockUnblockUserCall';
import ToastNotification from './ToastNotification';

type blockedUserFields = {
  firstName: string;
  lastName: string;
  objectId: string;
};

function BlockedUser() {
  const { userToken, setUserToken } = {
    ...useContext(WebContext),
  };

  const router = useRouter();
  const [showBlockUserPopUp, setShowBlockUserPopUp] = useState(false);
  const [showPreviewImage, setShowPreviewImage] = useState(true);
  const [blockedUserDetails, setBlockedUserDetails] = useState<blockedUserFields>();
  const [blockedUserList, setBlockedUserList] = useState<blockedUserFields[]>();
  const [showFetchingUsers, setShowFetchingUsers] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showNotification, setShowNofitication] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>();
  const [toastSuccess, setToastSuccess] = useState(false);
  const [toastError, setToastError] = useState(false);

  useEffect(() => {
    if (userToken === undefined || userToken === '') {
      if (
        typeof localStorage !== 'undefined' &&
        localStorage.getItem('UserToken') != '' &&
        localStorage.getItem('UserToken') != null
      ) {
        let token = localStorage.getItem('UserToken');
        if (token != null && setUserToken != undefined) {
          setUserToken(token);
        }
      } else router.push('/login');
    }
  }, []);

  useEffect(() => {
    if (userToken != '' && userToken != undefined) {
      getAllBlockedUsers(userToken);
    }
  }, [userToken]);

  const getAllBlockedUsers = async (userToken: string | undefined) => {
    setShowFetchingUsers(true);
    let response = await getBlockedUserList(userToken);
    if (response?.success) {
      setBlockedUserList(response?.data);
    }
    setShowFetchingUsers(false);
  };

  const resetToastState = () => {
    setShowNofitication(!showNotification);
    setToastSuccess(false);
    setToastError(false);
  };

  const BlockUserPopup = () => {
    return (
      <>
        <Modal
          className={styles.blockedUserModalContent}
          show={showBlockUserPopUp}
          onHide={() => setShowBlockUserPopUp(false)}
          backdrop="static"
          keyboard={false}
          centered
          scrollable={true}
        >
          <div>
            <Modal.Header closeButton>
              <Modal.Title className={styles.blockedUserModalHeader}>{'Unblock User'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div
                className={styles.blockedUserModalBody}
              >{`Do you want to unblock ${blockedUserDetails?.firstName} ${blockedUserDetails?.lastName} ?`}</div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                className={styles.footerBtn}
                variant="secondary"
                onClick={() => {
                  setShowBlockUserPopUp(false);
                }}
              >
                Cancel
              </Button>
              <Button
                className={styles.footerBtn}
                variant="secondary"
                onClick={() => onUserUnblocked()}
              >
                Unblock
                {showSpinner ? (
                  <Spinner style={{ marginLeft: '5px', width: '30px', height: '30px' }} />
                ) : (
                  <></>
                )}
              </Button>
            </Modal.Footer>
          </div>
        </Modal>
      </>
    );
  };

  const getBlockedUserProfile = (user: blockedUserFields) => {
    setBlockedUserDetails(user);
    setShowPreviewImage(false);
  };

  const onUserUnblocked = async () => {
    setShowSpinner(true);
    let response = await unBlockUserCall(userToken, blockedUserDetails?.objectId);
    if (response) {
      if (response?.success) {
        setToastSuccess(true);
        setToastMessage(response?.data);
      } else {
        setToastError(true);
        setToastMessage(response?.errorCode);
      }
      setShowNofitication(true);
      setShowSpinner(false);
      getAllBlockedUsers(userToken);
    }
    setShowBlockUserPopUp(false);
    setShowPreviewImage(true);
  };

  const BlockedUserRow = (user: blockedUserFields) => {
    return (
      <>
        <div className={styles.blockedUserwrapper}>
          <div className={styles.blockedUserRow}>
            <Button className={styles.buttonRow} onClick={() => getBlockedUserProfile(user)}>
              <div className={styles.leftContainer}>
                <img
                  className={styles.blockedUserImage}
                  src="https://cdn-icons-png.flaticon.com/512/1144/1144811.png"
                  alt="User-Pic"
                ></img>
                <div className={styles.blockedUserName}>{`${user.firstName} ${user.lastName}`}</div>
              </div>
            </Button>

            <Dropdown>
              <Dropdown.Toggle variant="secondary" className={styles.blockedUserDropdownBtn}>
                <button className={styles.moreOptions}>
                  <NextImage
                    className="postMoreOptionsImage"
                    field={MoreOptionsImage}
                    editable={true}
                  />
                </button>
              </Dropdown.Toggle>

              <Dropdown.Menu className={styles.blockedUsersDropdownMenu}>
                <Dropdown.Item
                  className={styles.blockedUsersDropdownMenuItem}
                  onClick={() => {
                    setBlockedUserDetails(user);
                    setShowBlockUserPopUp(true);
                  }}
                >
                  <div className={styles.overlayItem}>
                    <div className={styles.dropdownImage}>
                      <NextImage field={BlockUserImage} editable={true} />
                    </div>
                    <div className={styles.reportContainerBtn}>Unblock user</div>
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </>
    );
  };

  const BlockedUserPreviewProfile = () => {
    return (
      <div>
        <div className={styles.headerWrapper}>
          <div className={styles.content}>
            <div className={styles.leftSection}>
              <div className={styles.profileImage}>
                <NextImage
                  style={{ borderRadius: '30px' }}
                  field={Profile}
                  editable={true}
                  height={180}
                  width={180}
                />
              </div>
            </div>
            <div className={styles.profileInfoSection}>
              <div className={styles.blockedUserDetailItem}>
                <div
                  className={styles.userName}
                >{`${blockedUserDetails?.firstName} ${blockedUserDetails?.lastName}`}</div>
                <div className={styles.userEmail}>
                  <NextImage field={Email} editable={true} height={20} width={40} />
                  <div className={styles.name}>{`${blockedUserDetails?.objectId}`}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.DetailsContainer}>
          <div className={styles.rightContainerItem}>
            <div>
              <strong>{` ${blockedUserDetails?.firstName} ${blockedUserDetails?.lastName} `}</strong>
              will be able to :
            </div>
            <ul>
              <li>Add you as a friend</li>
              <li>See your posts on the timeline</li>
              <li>Invite you to groups</li>
            </ul>
            <div className={styles.unblockFooter}>
              Do you really want to unblock
              {` ${blockedUserDetails?.firstName} ${blockedUserDetails?.lastName} ?`}
              <Button
                className={styles.unblockBtn}
                onClick={() => {
                  setShowBlockUserPopUp(true);
                }}
                variant="primary"
              >
                Unblock
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Button className={styles.backBtn} onClick={() => router.push('/')}>
        Back
      </Button>
      <div className={styles.blockedUsercontainer}>
        <div className={styles.left_column}>
          <div className={styles.blockedUsersSideNav}>
            <div className={styles.sideNavHeader}>Blocked Users List</div>
            <hr />
            {blockedUserList?.length == 0 ? (
              <div className={styles.noBlockedUsers}>You haven't blocked anyone</div>
            ) : showFetchingUsers ? (
              <div className={styles.alignItemsCenter}>Fetching blocked users...</div>
            ) : (
              blockedUserList?.map((item) => {
                return <BlockedUserRow {...item} />;
              })
            )}
          </div>
        </div>
        <div className={styles.right_column}>
          <div className={styles.rightContainer}>
            {showPreviewImage ? (
              <div className={styles.emptyProfileWrapper}>
                <div className={styles.blockedUserPreviewImage}>
                  <NextImage field={BlockedUserPreviewImage} editable={true} />
                </div>
                Select people's name to preview their profile.
              </div>
            ) : (
              <BlockedUserPreviewProfile />
            )}
          </div>
        </div>
      </div>
      {<BlockUserPopup />}
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

export default BlockedUser;
