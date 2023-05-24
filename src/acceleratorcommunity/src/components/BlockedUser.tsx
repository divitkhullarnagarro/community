import React, { useContext, useEffect, useState } from 'react';
import WebContext from '../Context/WebContext';
import styles from '../assets/blockeduser.module.css';
import { Field, NextImage, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { Modal, Spinner } from 'react-bootstrap';
import moreLogo from '../assets/images/moreLogo.svg';
// import Email from '../assets/images/EmailIcon.jpg';
import { useRouter } from 'next/router';
// import Profile from '../assets/images/profile.png';
import BlockedUserPreviewImage from '../assets/images/BlockedUserPreviewImage.png';
import { unBlockUserCall, getBlockedUserList } from 'src/API/blockUnblockUserCall';
import ToastNotification from './ToastNotification';
import Image from 'next/image';
import unBlockLogo from '../assets/images/UnblockUser.svg';
import darkModeCss from '../assets/darkTheme.module.css';
type blockedUserFields = {
  firstName: string;
  lastName: string;
  objectId: string;
};

type blockedUserProps = {
  showInProfilePage: boolean;
  heading: { jsonValue: Field<string> };
};

function BlockedUser(props: blockedUserProps) {
  const { userToken, setUserToken, darkMode } = {
    ...useContext(WebContext),
  };

  // const SideNavHeaderLabel = 'Blocked Users List';
  const NoUsersBlockedLabel = "You haven't blocked anyone";
  const FetchingUsersLabel = 'Fetching blocked users...';
  const PreviewUserProfileLabel = 'List of blocked members...';

  const UnblockingUserEffectListLabel = [
    'See your posts on the timeline',
    'Tag you',
    'Invite you to events or groups',
    'Message you',
    'Add you as a friend',
  ];

  const router = useRouter();
  const [showBlockUserPopUp, setShowBlockUserPopUp] = useState(false);
  // const [showPreviewImage, setShowPreviewImage] = useState(true);
  const [isSelectedMoreOption, setIsSelectedMoreOption] = useState('');
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
              <div className={styles.unblockUserName}>
                <strong>{` ${blockedUserDetails?.firstName} ${blockedUserDetails?.lastName} `}</strong>
                will be able to :
                <ul>
                  {UnblockingUserEffectListLabel.map((item) => {
                    return <li>{item}</li>;
                  })}
                </ul>
              </div>
              <div className={styles.unblockUserContition}>
                If you have read the conditions and are okay with it, Proceed with :
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                className={styles.unblockCancelBtn}
                onClick={() => {
                  setShowBlockUserPopUp(false);
                }}
              >
                Cancel
              </button>
              <button className={styles.unBlockConfirm} onClick={() => onUserUnblocked()}>
                Confirm
                {showSpinner ? (
                  <Spinner style={{ marginLeft: '5px', width: '20px', height: '20px' }} />
                ) : (
                  <></>
                )}
              </button>
            </Modal.Footer>
          </div>
        </Modal>
      </>
    );
  };

  // const getBlockedUserProfile = (user: blockedUserFields) => {
  //   setBlockedUserDetails(user);
  //   setShowPreviewImage(false);
  // };

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
    // setShowPreviewImage(true);
  };

  const BlockedUserRow = (user: blockedUserFields) => {
    return (
      <>
        <div className={styles.blockedUserwrapper}>
          <div className={styles.blockedUserRow}>
            {/* <Button className={styles.buttonRow} onClick={() => getBlockedUserProfile(user)}> */}
            <div className={styles.leftContainer}>
              <img
                className={styles.blockedUserImage}
                src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                alt="User-Pic"
              ></img>

              <div className={styles.blockedUserName}>{`${user.firstName} ${user.lastName}`}</div>
            </div>
            <div>
              <Image
                src={moreLogo}
                className={styles.groupListMoreLogo}
                onClick={() => {
                  if (isSelectedMoreOption == user.objectId) {
                    setIsSelectedMoreOption('');
                  } else {
                    setIsSelectedMoreOption(user.objectId);
                  }
                }}
              />
              {isSelectedMoreOption == user.objectId && (
                <div
                  className={styles.moreOptionList}
                  onClick={() => {
                    setIsSelectedMoreOption(user.objectId);
                  }}
                  // onMouseLeave={() => {
                  //   setIsSelectedMoreOption(-1);
                  // }}
                >
                  <button
                    className={styles.moreOptionButton}
                    onClick={() => {
                      setBlockedUserDetails(user);
                      setShowBlockUserPopUp(true);
                    }}
                  >
                    <div style={{ marginTop: '3px' }}>
                      <Image
                        src={unBlockLogo}
                        // className={styles.moreOptionButton}
                        height={17}
                        width={17}
                      />
                    </div>
                    Unblock user
                  </button>
                </div>
              )}
            </div>
            {/* </Button> */}

            {/* <Dropdown>
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
            </Dropdown> */}
          </div>
        </div>
      </>
    );
  };

  // const BlockedUserPreviewProfile = () => {
  //   return (
  //     <div>
  //       <div className={styles.headerWrapper}>
  //         <div className={styles.content}>
  //           <div className={styles.leftSection}>
  //             <div className={styles.profileImage}>
  //               <NextImage
  //                 style={{ borderRadius: '50px' }}
  //                 field={Profile}
  //                 editable={true}
  //                 height={180}
  //                 width={180}
  //               />
  //             </div>
  //           </div>
  //           <div className={styles.profileInfoSection}>
  //             <div className={styles.blockedUserDetailItem}>
  //               <div
  //                 className={styles.userName}
  //               >{`${blockedUserDetails?.firstName} ${blockedUserDetails?.lastName}`}</div>
  //               <div className={styles.userEmail}>
  //                 <NextImage field={Email} editable={true} height={15} width={35} />
  //                 <div className={styles.name}>{`${blockedUserDetails?.objectId}`}</div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //       <div className={styles.DetailsContainer}>
  //         <div className={styles.rightContainerItem}>
  //           <div className={styles.unblockedConditions}>
  //             <div>
  //               <strong>{` ${blockedUserDetails?.firstName} ${blockedUserDetails?.lastName} `}</strong>
  //               will be able to :
  //             </div>

  //             <ul>
  //               {UnblockingUserEffectListLabel.map((item) => {
  //                 return <li>{item}</li>;
  //               })}
  //             </ul>
  //           </div>
  //           <div className={styles.unblockFooter}>
  //             If you have read the conditions and are okay with it, Proceed with :
  //             <Button
  //               className={styles.unblockBtn}
  //               onClick={() => {
  //                 setShowBlockUserPopUp(true);
  //               }}
  //               variant="primary"
  //             >
  //               Unblock
  //             </Button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <>
      {/* <Button className={styles.backBtn} onClick={() => router.push('/')}>
        Back
      </Button> */}
      <div className={`${styles.blockedUsercontainer} ${darkMode ? darkModeCss.grey_3 : ''}`}>
        <div className={`${styles.left_column} ${darkMode ? darkModeCss.grey_3 : ''}`}>
          <div className={`${styles.blockedUsersSideNav} ${darkMode ? darkModeCss.grey_3 : ''}`}>
            <div
              className={
                props?.showInProfilePage
                  ? `${styles.sideNavHeaderForProfile} ${darkMode ? darkModeCss.text_light : ''}`
                  : `${styles.sideNavHeader} ${darkMode ? darkModeCss.text_light : ''}`
              }
            >
              <Text
                field={
                  props?.heading?.jsonValue
                    ? props?.heading?.jsonValue
                    : {
                        value: 'Blocked Users Lists',
                      }
                }
              />
            </div>
            <hr />
            {blockedUserList?.length == 0 ? (
              <div
                className={`${styles.alignItemsCenter} ${darkMode ? darkModeCss.text_light : ''}`}
              >
                {NoUsersBlockedLabel}
              </div>
            ) : showFetchingUsers ? (
              <div
                className={`${styles.alignItemsCenter} ${darkMode ? darkModeCss.text_light : ''}`}
              >
                {FetchingUsersLabel}
              </div>
            ) : (
              blockedUserList?.map((item) => {
                return <BlockedUserRow {...item} />;
              })
            )}
          </div>
        </div>
        <div className={styles.right_column}>
          <div
            className={
              props?.showInProfilePage ? styles.rightContainerForProfilePage : styles.rightContainer
            }
          >
            <div className={`${styles.emptyProfileWrapper} ${darkMode ? darkModeCss.grey_3 : ''}`}>
              <div className={styles.blockedUserPreviewImage}>
                <NextImage field={BlockedUserPreviewImage} editable={true} width={60} height={60} />
              </div>
              <div
                className={`${styles.blockedUserPreviewImage} ${
                  darkMode ? darkModeCss.text_light : ''
                }`}
              >
                {PreviewUserProfileLabel}
              </div>
            </div>
            {/* {showPreviewImage ? (
              
            ) : (
              <BlockedUserPreviewProfile />
            )} */}
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
