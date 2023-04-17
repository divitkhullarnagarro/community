import { Field, NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import styles from '../assets/editprofile.module.css';
import Profile from '../assets/images/profile.png';
import Button from 'react-bootstrap/Button';
import ProfileCover from '../assets/images/ProfileCover.jpg';
import { useRouter } from 'next/router';
import { CheckboxField } from './graphql/GraphQL-ConnectedDemo.dynamic.graphql';
type HeaderProfileProps = ComponentProps & {
  fields: {
    heading: Field<string>;
    isFullList: CheckboxField;
  };
};

const EditProfile = (props: HeaderProfileProps): JSX.Element => {
  console.log('EditProfile', props);
  const { IsGroupList } = props?.params;
  const router = useRouter();
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
              {IsGroupList ? (
                ''
              ) : (
                <div className={styles.followers}>
                  <div>Followers - 100</div>
                  <div>|</div>
                  <div>Following - 100</div>
                </div>
              )}
            </div>
          </div>
          {IsGroupList ? (
            <Button
              className={styles.joinedGroupBtn}
              // onClick={() => router.push('/profile')}
              variant="primary"
            >
              <span>Joined</span>
            </Button>
          ) : (
            <Button
              className={styles.editProfileBtn}
              onClick={() => router.push('/profile')}
              variant="primary"
            >
              Edit Profile
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
