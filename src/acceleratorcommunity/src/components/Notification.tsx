import { ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import notificationCss from '../assets/notification.module.css';
import SocketContext from 'src/Context/SocketContext';
import { useContext, useEffect, useState } from 'react';
import WebContext from 'src/Context/WebContext';
import { Button, Dropdown } from 'react-bootstrap';
import ToastNotification from './ToastNotification';
import NotificationLike from '../assets/images/NotificationLike.png';
import NotificationComment from '../assets/images/comment1.png';
import ThemeSwitcher from './ThemeSwitcher';
import FirebaseContext from 'src/Context/FirebaseContext';
import AxiosRequest from 'src/API/AxiosRequest';
import { calculateTimeDifference } from 'assets/helpers/helperFunctions';
import darkModeCss from '../assets/darkTheme.module.css';
import Profile from '../assets/images/ProfilePic.jpeg';

const NotificationType = {
  LIKE_ON_POST: 'LIKE_ON_POST',
  COMMENT_ON_POST: 'COMMENT_ON_POST',
  REPLY_ON_COMMENT: 'REPLY_ON_COMMENT',
  POST_AN_ARTICLE_PEER: 'POST_AN_ARTICLE_PEER',
  FOLLOW_BY_USER: 'FOLLOW_BY_USER',
};

type NotificationProps = ComponentProps & {
  fields: {
    data: {
      datasource: DataSource;
    };
  };
};

type DataSource = {
  image: {
    jsonValue: ImageField;
  };
};

type BaseNotificationType = {
  type: string;
  message: string;
};

type NotificationType = BaseNotificationType & {
  id?: string;
  articleId?: string;
  sourceAuthorId?: string;
  notificationContent?: string;
  read?: boolean;
  createdOn?: number;
};

type NotificationContentType = {
  articleId: string;
  message: string;
  type: string;
};

enum NotificationTabs {
  All = 'all',
  Unread = 'unread',
}

type UserProfilePicMapping = {
  objectId: string;
  profileUrl: string;
};

const Notification = (props: NotificationProps): JSX.Element => {
  const { datasource } = props?.fields?.data;
  const {
    objectId,
    darkMode,
    userNotificationList,
    setUserNotificationList,
    isFirebaseTokenMapped,
    setIsFirebaseTokenMapped,
  } = {
    ...useContext(WebContext),
  };

  const { socket } = { ...useContext(SocketContext) };
  const [notificationList, setNotificationList] = useState<NotificationType[]>([]);
  const [notificationAllList, setNotificationAllList] = useState<NotificationType[]>([]);
  const [realTimeNotificationList, setRealTimeNotificationList] = useState<NotificationType[]>([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [showNotification, setShowNofitication] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>();
  const [toastSuccess, setToastSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState(NotificationTabs.All);
  const [usersProfileUrl, setUsersProfileUrl] = useState<Set<UserProfilePicMapping>>(new Set());

  const { requestForNotificationPermission, checkAndRegsiterServiceWorker } = {
    ...useContext(FirebaseContext),
  };

  let tempUsersProfileIds = new Set();

  const addUsersProfileUrlMapping = (obj: any) => {
    if (obj !== undefined && obj?.objectId !== undefined) {
      setUsersProfileUrl((prevSet) => {
        const newSet = new Set(prevSet);
        newSet.add(obj);
        return newSet;
      });
    }
  };

  const getProfileImage = (userObjectId: string | undefined) => {
    if (userObjectId !== undefined && !tempUsersProfileIds.has(userObjectId)) {
      tempUsersProfileIds.add(userObjectId);
      AxiosRequest({
        method: 'GET',
        url: `https://accelerator-api-management.azure-api.net/user-service/api/v1/users/${userObjectId}`,
      })
        .then((response: any) => {
          addUsersProfileUrlMapping({
            objectId: response?.data?.objectId,
            profileUrl: response?.data?.profilePictureUrl,
          });
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  };

  const mapFirebaseTokenToCurrentUser = (fcm_token: string) => {
    if (!isFirebaseTokenMapped) {
      AxiosRequest({
        method: 'POST',
        url: `https://accelerator-api-management.azure-api.net/graph-service/api/v1/map-uuid?uuid=${fcm_token}`,
      })
        .then((response: any) => {
          if (response?.success) {
            if (setIsFirebaseTokenMapped !== undefined) {
              setIsFirebaseTokenMapped(true);
            }
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  };

  const getNotificationList = () => {
    if (
      userNotificationList === null ||
      userNotificationList === undefined ||
      userNotificationList?.length === 0
    ) {
      AxiosRequest({
        method: 'GET',
        url: `https://accelerator-api-management.azure-api.net/notification-service/api/v1/get-notification`,
      })
        .then((response: any) => {
          if (response) {
            if (setUserNotificationList !== undefined) setUserNotificationList(response?.data);
            setNotificationList(response?.data);
            setNotificationAllList(response?.data);
            response?.data?.forEach((item: any) => {
              getProfileImage(item?.sourceAuthorId);
            });
          } else {
            // setToastError(true);
            // setToastMessage(
            //   res?.data?.errorMessages[0]
            //     ? res?.data?.errorMessages[0]
            //     : 'Something Went Wrong. Please Try Again'
            // );
            // setShowNofitication(true);
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    } else {
      setNotificationList(userNotificationList);
      setNotificationAllList(userNotificationList);
    }
  };

  const markNotificationAsRead = (item: NotificationType) => {
    if (item && item?.id !== undefined && !item?.read) {
      AxiosRequest({
        method: 'PUT',
        url: `https://accelerator-api-management.azure-api.net/notification-service/api/v1/viewed-notification?id=${item?.id}`,
      })
        .then((response: any) => {
          if (response?.success) {
            setNotificationAllList((notificationAllList) =>
              notificationAllList.map((notificationItem: NotificationType) =>
                notificationItem?.id === item?.id
                  ? { ...notificationItem, read: true }
                  : notificationItem
              )
            );

            if (setUserNotificationList != undefined) {
              setUserNotificationList((notificationAllList: any) =>
                notificationAllList.map((notificationItem: NotificationType) =>
                  notificationItem?.id === item?.id
                    ? { ...notificationItem, read: true }
                    : notificationItem
                )
              );
            }
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    requestForNotificationPermission().then((data: any) => {
      checkAndRegsiterServiceWorker();
      mapFirebaseTokenToCurrentUser(data);
    });
  }, []);

  useEffect(() => {
    getNotificationList();
  }, []);

  useEffect(() => {
    if (notificationList !== undefined && notificationList?.length > 0) {
      setNotificationCount(
        notificationList?.filter((item) => !item.read)?.length + realTimeNotificationList?.length
      );
    }
  }, [notificationList, realTimeNotificationList]);

  useEffect(() => {
    filterTabData(activeTab);
  }, [notificationAllList]);

  const resetToastState = () => {
    setShowNofitication(!showNotification);
    setToastSuccess(false);
  };

  socket?.on(objectId, (data: any) => {
    switch (data?.type) {
      case NotificationType.LIKE_ON_POST:
      case NotificationType.COMMENT_ON_POST:
      case NotificationType.REPLY_ON_COMMENT: {
        setToastSuccess(true);
        setShowNofitication(true);
        setToastMessage('You have new notification');

        if (realTimeNotificationList?.length > 0) {
          setRealTimeNotificationList([
            ...realTimeNotificationList,
            { articleId: data?.articleId, message: data?.message, type: data?.type },
          ]);
        } else {
          setRealTimeNotificationList([
            { articleId: data?.articleId, message: data?.message, type: data?.type },
          ]);
        }

        break;
      }
      case NotificationType.POST_AN_ARTICLE_PEER:
      case NotificationType.FOLLOW_BY_USER: {
        setToastSuccess(true);
        setShowNofitication(true);
        setToastMessage('You have new notification');

        if (realTimeNotificationList?.length > 0) {
          setRealTimeNotificationList([
            ...realTimeNotificationList,
            { articleId: '', message: data?.message, type: data?.type },
          ]);
        } else {
          setRealTimeNotificationList([
            { articleId: '', message: data?.message, type: data?.type },
          ]);
        }

        break;
      }
      default: {
        break;
      }
    }
  });

  const filterTabData = (notificationTab: NotificationTabs) => {
    if (notificationTab === NotificationTabs.Unread) {
      setActiveTab(NotificationTabs.Unread);
      setNotificationList(notificationAllList?.filter((item) => !item.read));
    } else {
      setActiveTab(NotificationTabs.All);
      setNotificationList(notificationAllList);
    }
  };

  const NotificationBodyHeader = () => {
    return (
      <>
        <div className={notificationCss.notificationHeaderRow}>
          <div
            className={`${notificationCss.notificationHeaderLabel} ${
              darkMode ? darkModeCss.text_green : ''
            }`}
          >
            Notifications
          </div>
        </div>
        <div className={notificationCss.notificationHeaderAction}>
          <Button
            onClick={() => filterTabData(NotificationTabs.All)}
            className={`${notificationCss.notificationActionBtn} ${
              activeTab === NotificationTabs.All ? notificationCss.notificationActionActiveBtn : ''
            }`}
          >
            All
          </Button>
          <Button
            onClick={() => filterTabData(NotificationTabs.Unread)}
            className={`${notificationCss.notificationActionBtn} ${
              activeTab === NotificationTabs.Unread
                ? notificationCss.notificationActionActiveBtn
                : ''
            }`}
          >
            Unread
          </Button>
        </div>
      </>
    );
  };

  const showViewPostDropdownAction = (notificationItem: NotificationType) => {
    const notificationContent: NotificationContentType = JSON.parse(
      notificationItem?.notificationContent ?? '{}'
    );
    if (
      (notificationItem?.type !== undefined &&
        notificationItem?.type !== NotificationType.POST_AN_ARTICLE_PEER &&
        notificationItem?.type !== NotificationType.FOLLOW_BY_USER) ||
      (notificationContent?.type != undefined &&
        notificationContent?.type !== NotificationType.POST_AN_ARTICLE_PEER &&
        notificationContent?.type !== NotificationType.FOLLOW_BY_USER)
    ) {
      return true;
    }
    return false;
  };

  const showViewUserProfileDropdownAction = (notificationItem: NotificationType) => {
    const notificationContent: NotificationContentType = JSON.parse(
      notificationItem?.notificationContent ?? '{}'
    );
    if (
      (notificationItem?.type !== undefined &&
        notificationItem?.type === NotificationType.FOLLOW_BY_USER) ||
      (notificationContent?.type != undefined &&
        notificationContent?.type === NotificationType.FOLLOW_BY_USER)
    ) {
      return true;
    }
    return false;
  };

  const getDestinationUrlForNotificationItem = (item: NotificationType) => {
    let destinationUrl = '';
    const notificationContent: NotificationContentType = JSON.parse(
      item?.notificationContent ?? '{}'
    );
    if (showViewPostDropdownAction(item)) {
      destinationUrl = `/post?postId=${notificationContent?.articleId ?? item?.articleId}`;
    } else if (showViewUserProfileDropdownAction(item)) {
      destinationUrl = `/viewProfile?id=${notificationContent?.articleId ?? item?.articleId}`;
    }

    return destinationUrl;
  };

  function returnUserImage(e: any) {
    e.target.src = Profile.src;
  }

  const NotificationRow = (item: NotificationType) => {
    const notificationContent: NotificationContentType = JSON.parse(
      item?.notificationContent ?? '{}'
    );

    const result = Array.from(usersProfileUrl)
      .filter((tempItem: any) => tempItem?.objectId === item?.sourceAuthorId)
      ?.find((tempItemSelect: any) => tempItemSelect);
    return (
      <div style={{ display: 'flex' }}>
        <Dropdown.Item
          href={getDestinationUrlForNotificationItem(item)}
          target="_blank"
          className={notificationCss.dropdownItem}
          onClick={() => markNotificationAsRead(item)}
        >
          <div className={notificationCss.notificationItem}>
            <div className={notificationCss.notificationIconContainer}>
              <img
                className={notificationCss.imgProfileNotification}
                src={result?.profileUrl ?? Profile.src}
                height={55}
                width={55}
                onError={(e) => {
                  returnUserImage(e);
                }}
              />
              <div className={notificationCss.notificationTypeImage}>
                <NextImage
                  field={
                    notificationContent?.type != undefined && notificationContent?.type != null
                      ? notificationContent?.type === NotificationType.LIKE_ON_POST
                        ? NotificationLike
                        : NotificationComment
                      : item?.type === NotificationType.LIKE_ON_POST
                      ? NotificationLike
                      : NotificationComment
                  }
                  editable={true}
                  width={23}
                  height={23}
                  title="Notification"
                ></NextImage>
              </div>
            </div>
            <div
              className={`${notificationCss.notificationMessage} ${
                !item?.read ? notificationCss.text_bold : ''
              } `}
            >
              <div
                className={`${notificationCss.notificationAuthor} ${
                  darkMode ? (!item?.read ? darkModeCss.text_green : darkModeCss.text_light) : ''
                }`}
              >
                {item?.message ?? notificationContent?.message}
              </div>
              <div
                className={`${notificationCss.notificationCreatedOn} ${
                  darkMode ? darkModeCss.text_light : ''
                }`}
              >
                {item?.createdOn != 0 &&
                item?.createdOn &&
                item?.createdOn != undefined &&
                item?.createdOn != null
                  ? calculateTimeDifference(item?.createdOn)
                  : 'Just now'}
              </div>
            </div>
          </div>
        </Dropdown.Item>
      </div>
    );
  };

  return (
    <>
      <div>
        <ThemeSwitcher />
      </div>
      <div className={`${notificationCss.container}`}>
        <Dropdown className={notificationCss.dropdownContainer}>
          <Dropdown.Toggle
            variant="secondary"
            className={notificationCss.notificationDropdownToggle}
          >
            <button className={notificationCss.notificationHeaderIconContainer}>
              <NextImage
                className={notificationCss.notificationIcon}
                field={datasource?.image?.jsonValue?.value}
                editable={true}
                width={16}
                height={16}
                title="Notification"
              ></NextImage>
              {notificationCount > 0 ? (
                <span className={notificationCss.notificationCount}>{notificationCount}</span>
              ) : (
                <></>
              )}
            </button>
          </Dropdown.Toggle>

          <Dropdown.Menu
            className={`${notificationCss.dropdownMenu} ${darkMode ? darkModeCss.grey_3 : ''}`}
          >
            <Dropdown.Header className={notificationCss.notificationHeader}>
              <NotificationBodyHeader />
            </Dropdown.Header>
            <div className={notificationCss.realTimeNotificationContainer}>
              {realTimeNotificationList?.length > 0 ? (
                <>
                  <div
                    className={`${notificationCss.notificationTypeHeader} ${
                      darkMode ? darkModeCss.text_light : ''
                    }`}
                  >
                    New
                  </div>
                  {realTimeNotificationList.map((item) => {
                    return <NotificationRow {...item} />;
                  })}
                </>
              ) : (
                <></>
              )}
            </div>

            <div className={notificationCss.earlierNotificationContainer}>
              <div
                className={`${notificationCss.notificationTypeHeader} ${
                  darkMode ? darkModeCss.text_light : ''
                }`}
              >
                Earlier
              </div>
              {notificationList?.length > 0 ? (
                notificationList.map((item) => {
                  return <NotificationRow {...item} />;
                })
              ) : (
                <span className={notificationCss.noNotifications}>
                  You do not have any notifications yet
                </span>
              )}
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {showNotification && (
        <ToastNotification
          showNotification={showNotification}
          success={toastSuccess}
          message={toastMessage}
          handleCallback={resetToastState}
        />
      )}
    </>
  );
};

export default Notification;
