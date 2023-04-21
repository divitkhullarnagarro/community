import { Field, NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import Image from 'next/image';
import { ComponentProps } from 'lib/component-props';
import styles from '../assets/editprofile.module.css';
import Profile from '../assets/images/profile.png';
import Button from 'react-bootstrap/Button';
import ProfileCover from '../assets/images/ProfileCover.jpg';
import { useRouter } from 'next/router';
import { useState } from 'react';
import groupBackground from '../assets/images/groupBackground.svg';
import groupLogoImg from '../assets/images/groupLogoImg.svg';
type HeaderProfileProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const EditProfile = (props: HeaderProfileProps): JSX.Element => {
  const [joinValue, setJoinValue] = useState(true);
  const [leaveValue, setLeaveValue] = useState(false);

  const onClickJoinButton = () => {
    setLeaveValue(true);
    setJoinValue(false);
  };

  const onLeaveButtonClick = () => {
    setJoinValue(true);
    setLeaveValue(false);
  };
  console.log('EditProfile', props);
  const router = useRouter();
  const { groupName } = router.query;
  const isGroupPage = props?.params?.IsGroupList == '1' ? true : false;
  // console.log('EditProfile props', props.params.IsGroupList, isGroupPage);

  return (
    <div
      style={
        isGroupPage
          ? { background: `url(${groupBackground.src})` }
          : { background: `url(${ProfileCover.src})` }
      }
    >
      <div className={isGroupPage ? `${styles.groupHeaderWrapper}` : `${styles.headerWrapper}`}>
        <div className={isGroupPage ? `${styles.groupContent}` : `${styles.content}`}>
          <div className={styles.leftSection}>
            <div className={styles.profileImage}>
              {isGroupPage ? (
                <Image
                  src={groupLogoImg}
                  height={100}
                  width={110}
                  className={styles.groupPageLogo}
                />
              ) : (
                <NextImage field={Profile} editable={true} height={100} width={100} />
              )}
            </div>
            <div className={styles.profileInfoSection}>
              {isGroupPage ? (
                <div className={styles.groupName}>{groupName}</div>
              ) : (
                <div className={styles.name}>John Deo</div>
              )}

              {!isGroupPage && (
                <div className={styles.followers}>
                  <div>Followers - 100</div>
                  <div>|</div>
                  <div>Following - 100</div>
                </div>
              )}
            </div>
          </div>
          {!isGroupPage && (
            <Button
              className={styles.editProfileBtn}
              onClick={() => router.push('/profile')}
              variant="primary"
            >
              Edit Profile
            </Button>
          )}
          {isGroupPage && (
            <>
              {joinValue && (
                <button className={`btn  ${styles.joinButton}`} onClick={onClickJoinButton}>
                  <svg
                    style={{ color: 'blue' }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g>
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" />{' '}
                    </g>
                  </svg>
                  &nbsp; Join
                </button>
              )}
              {leaveValue && (
                <button className={`btn  ${styles.leaveButton}`} onClick={onLeaveButtonClick}>
                  <svg
                    style={{ color: 'red' }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 12-4-4m4 4-4 4m4-4H9m5 9a9 9 0 1 1 0-18"
                      fill="red"
                    ></path>
                  </svg>
                  &nbsp; Leave
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
