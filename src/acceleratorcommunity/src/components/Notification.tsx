import {   ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
// import notification from '../assets/images/notificationIcon.png';
import { NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import notificationCss from '../assets/notification.module.css';

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

const Notification = (props: NotificationProps): JSX.Element => {
  const { datasource } = props?.fields?.data;
  console.log('Notification', props);

  // Temporary notification count 
  // const NotificationCount = 12;
  return(
    <div className={notificationCss.container}>
        <NextImage
          field={datasource?.image?.jsonValue?.value}
          // field={notification}
          editable={true}
          // width={30}
          // height={30}
        />
        {/* Notification Count  */}
        {/* <span className={notificationCss.badge}>{NotificationCount}</span> */}
      </div>
  );
  };

export default Notification;
