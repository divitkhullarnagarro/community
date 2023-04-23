import { ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import notificationCss from '../assets/notification.module.css';
import SocketContext from 'src/Context/SocketContext';
import { useContext, useEffect, useState } from 'react';
import WebContext from 'src/Context/WebContext';
import { Button, Dropdown } from 'react-bootstrap';
import NotificationPerson from '../assets/images/NotificiationPerson.png';
import ToastNotification from './ToastNotification';
import NotificationLike from '../assets/images/NotificationLike.png';
import NotificationComment from '../assets/images/NotificationComment.png';
import NotificationCheck from '../assets/images/NotificationCheck.png';
import NotificationOpen from '../assets/images/NotificationOpen.png';
import NotificationSettings from '../assets/images/NotificationSettings.png';

const NotificationType = {
  LIKE_ON_POST: 'LIKE_ON_POST',
  COMMENT_ON_POST: 'COMMENT_ON_POST',
  REPLY_ON_COMMENT: 'REPLY_ON_COMMENT',
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

type ArticleNotificationType = BaseNotificationType & {
  articleId: string;
};

const Notification = (props: NotificationProps): JSX.Element => {
  const { datasource } = props?.fields?.data;
  const { objectId, setObjectId } = {
    ...useContext(WebContext),
  };

  const { socket } = { ...useContext(SocketContext) };
  const [notificationList, setNotificationList] = useState<ArticleNotificationType[]>([]);

  const [notificationCount, setNotificationCount] = useState(0);
  const [showNotification, setShowNofitication] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>();
  const [toastSuccess, setToastSuccess] = useState(false);

  useEffect(() => {
    if (objectId === '') {
      if (
        typeof localStorage !== 'undefined' &&
        localStorage.getItem('UserToken') != '' &&
        localStorage.getItem('ObjectId') != '' &&
        localStorage.getItem('UserToken') != null
      ) {
        let userId = localStorage.getItem('ObjectId');

        if (userId != null && setObjectId != undefined) {
          setObjectId(userId);
        }
      }
    }
  }, []);

  useEffect(() => {
    setNotificationCount(notificationList?.length);
  }, [notificationList]);

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
        setNotificationList([
          ...notificationList,
          { articleId: data?.articleId, message: data?.message, type: data?.type },
        ]);
        break;
      }
      default: {
        break;
      }
    }
  });

  const simulateNotification = (notificationType: string) => {
    socket?.emit('api@user.com', { notificationType });
  };

  const NotificationBodyHeader = () => {
    return (
      <>
        <div className={notificationCss.notificationHeaderRow}>
          <div className={notificationCss.notificationHeaderLabel}>Notifications</div>
          <Dropdown>
            <Dropdown.Toggle
              variant="secondary"
              className={notificationCss.notificationMoreOptions}
            >
              <button
                style={{
                  border: 'none',
                  backgroundColor: 'white',
                  padding: '0',
                }}
              >
                <img
                  className="postMoreOptionsImage"
                  src="https://cdn-icons-png.flaticon.com/512/463/463292.png"
                  alt="pan"
                />
              </button>
            </Dropdown.Toggle>

            <Dropdown.Menu className={notificationCss.dropdownMoreMenu}>
              <Dropdown.Item>
                <div>
                  <NextImage
                    field={NotificationCheck}
                    editable={true}
                    width={15}
                    height={15}
                    title="Notification"
                  ></NextImage>
                  Mark all as read
                </div>
              </Dropdown.Item>
              <Dropdown.Item>
                <div>
                  <NextImage
                    field={NotificationSettings}
                    editable={true}
                    width={15}
                    height={15}
                    title="Notification"
                  ></NextImage>
                  Notifications settings
                </div>
              </Dropdown.Item>
              <Dropdown.Item>
                <div>
                  <NextImage
                    field={NotificationOpen}
                    editable={true}
                    width={15}
                    height={15}
                    title="Notification"
                  ></NextImage>
                  Open notifications
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className={notificationCss.notificationHeaderAction}>
          <Button className={notificationCss.notificationActionBtn}>All</Button>
          <Button className={notificationCss.notificationActionBtn}>Unread</Button>
        </div>
      </>
    );
  };

  const NotificationRow = (item: ArticleNotificationType) => {
    return (
      <>
        <Dropdown.Item className={notificationCss.dropdownItem}>
          <div className={notificationCss.notificationItem}>
            <div className={notificationCss.notificationIconContainer}>
              <NextImage
                field={NotificationPerson}
                editable={true}
                width={40}
                height={40}
                title="Notification"
              ></NextImage>
              <div className={notificationCss.notificationTypeImage}>
                <NextImage
                  field={
                    item?.type === NotificationType.LIKE_ON_POST
                      ? NotificationLike
                      : NotificationComment
                  }
                  editable={true}
                  width={40}
                  height={40}
                  title="Notification"
                ></NextImage>
              </div>
            </div>
            <div className={notificationCss.notificationMessage}>{item.message}</div>
          </div>
        </Dropdown.Item>
      </>
    );
  };

  return (
    <>
      <div className={notificationCss.container}>
        <Button style={{ marginRight: '20px' }} onClick={() => simulateNotification('like')}>
          Simulate Like
        </Button>
        <Button style={{ marginRight: '20px' }} onClick={() => simulateNotification('comment')}>
          Simulate Comment
        </Button>
        <Button style={{ marginRight: '20px' }} onClick={() => simulateNotification('post')}>
          Simulate ReplyComment
        </Button>
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
                width={28}
                height={28}
                title="Notification"
              ></NextImage>
              {notificationCount > 0 ? (
                <span className={notificationCss.notificationCount}>{notificationCount}</span>
              ) : (
                <></>
              )}
            </button>
          </Dropdown.Toggle>

          <Dropdown.Menu className={notificationCss.dropdownMenu}>
            <Dropdown.Header className={notificationCss.notificationHeader}>
              <NotificationBodyHeader />
            </Dropdown.Header>
            {notificationList?.length > 0 ? (
              notificationList.map((item) => {
                return <NotificationRow {...item} />;
              })
            ) : (
              <span className={notificationCss.noNotifications}>
                You do not have any notifications yet
              </span>
            )}
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
