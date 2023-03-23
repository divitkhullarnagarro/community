import { Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { NextImage } from '@sitecore-jss/sitecore-jss-nextjs';

type UserProfileProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const UserProfile = (props: UserProfileProps): JSX.Element => {
  console.log('profile', props);
  return (
    <div className="">
      Profile
      <NextImage className="" field="" editable={true} height={20} width={20} />
    </div>
  );
};

export default withDatasourceCheck()<UserProfileProps>(UserProfile);
