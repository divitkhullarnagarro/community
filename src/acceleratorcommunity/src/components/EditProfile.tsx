import { Field, NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import styles from '../assets/editprofile.module.css';
import Profile from '../assets/images/profile.png';
import Button from 'react-bootstrap/Button';
import ProfileCover from '../assets/images/ProfileCover.jpg';

type HeaderProfileProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const EditProfile = (props: HeaderProfileProps): JSX.Element => {
  console.log('EditProfile', props);
  return (
    <div style={{ background: `url(${ProfileCover})` }}>
      <div className={styles.headerWrapper}>
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <div className={styles.profileImage}>
              <NextImage field={Profile} editable={true} height={100} width={100} />
            </div>
            <div className={styles.profileInfoSection}>
              <div className={styles.name}>John Doe</div>
              <div className={styles.followers}>
                <div>Followers - 100</div>
                <div>|</div>
                <div>Following - 100</div>
              </div>
            </div>
          </div>
          <Button className={styles.editProfileBtn} variant="primary">
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
