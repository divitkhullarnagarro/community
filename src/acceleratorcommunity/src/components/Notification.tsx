import { Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import notification from '../assets/images/Notification.jpg';
import { NextImage } from '@sitecore-jss/sitecore-jss-nextjs';

type NotificationProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const Notification = (props: NotificationProps): JSX.Element => {
  console.log('Notification', props);
  return (
    <div className="">
      Notification
      <NextImage className="" field={notification} editable={true} height={20} width={20} />
    </div>
  );
};

export default withDatasourceCheck()<NotificationProps>(Notification);
