import { ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import userProfileCss from '../assets/userProfile.module.css';
// import profile from '../assets/images/profile.png';
import Link from 'next/link';
import { Url } from 'url';

type UserProfileProps = ComponentProps & {
  fields: {
    Image:ImageField;
    LogoURL:Url;
  };

};

const UserProfile = (props: UserProfileProps): JSX.Element => {
  console.log('profile', props);
  return(
    <div className={userProfileCss.container}>
      <Link href={props.fields.LogoURL}  >
      {/* <Link href="/#"> */}
        <NextImage
          field={props.fields.Image.value}
          // field={profile}
          editable={true}
          width={30}
          height={30}
          title="Profile page"
        />
        </Link>
      </div>
  );
};

export default UserProfile;
