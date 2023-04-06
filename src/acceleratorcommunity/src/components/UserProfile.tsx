import { ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import userProfileCss from '../assets/userProfile.module.css';
import WebContext from '../Context/WebContext';
import React, { useContext, useState } from 'react';
import { Button, Dropdown, Modal, Spinner } from 'react-bootstrap';
import BlockUserImage from '../assets/images/BlockUser.jpg';
import LogoutImage from '../assets/images/Logout.png';
import { useRouter } from 'next/router';
import logoutUserCall from 'src/API/logoutUserCall';

type UserProfileProps = ComponentProps & {
  fields: {
    Image: ImageField;
    LogoURL: {
      value: {
        href: string;
      };
    };
  };
};

const UserProfile = (props: UserProfileProps): JSX.Element => {
  const { setIsLoggedIn, setUserToken } = { ...useContext(WebContext) };
  console.log('profile', props);
  const router = useRouter();

  const [showLogoutPopUp, setLogoutPopUp] = useState(false);

  const LogoutPopup = () => {
    return (
      <>
        <Modal
          className={userProfileCss.logoutModalContent}
          show={showLogoutPopUp}
          onHide={() => setLogoutPopUp(false)}
          backdrop="static"
          keyboard={false}
          centered
          scrollable={true}
        >
          <div>
            <Modal.Header closeButton>
              <Modal.Title className={userProfileCss.logoutModalHeader}>{'Logout'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className={userProfileCss.logoutModalBody}>{`Do you want to logout ?`}</div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                className={userProfileCss.footerBtn}
                variant="secondary"
                onClick={() => {
                  setLogoutPopUp(false);
                }}
              >
                Cancel
              </Button>
              <Button
                className={userProfileCss.footerBtn}
                variant="secondary"
                onClick={() => {
                  logOutUser();
                }}
              >
                Logout
              </Button>
            </Modal.Footer>
          </div>
        </Modal>
      </>
    );
  };

  const logOutUser = async () => {
    let response = await logoutUserCall();
    if (
      response?.data?.code == 200 &&
      response?.data?.success &&
      setUserToken != undefined &&
      setIsLoggedIn != undefined
    ) {
      if (typeof localStorage !== 'undefined' && localStorage.getItem('UserToken')) {
        setLogoutPopUp(false);
        localStorage.clear();
        setUserToken('');
        setIsLoggedIn(false);
        router.push('/login');
      }
    }
  };

  return (
    <div className={userProfileCss.userProfileContainer}>
      <Dropdown>
        <Dropdown.Toggle
          variant="secondary"
          id="dropdown-basic"
          className={userProfileCss.userProfileDropdownBtn}
          style={{ backgroundColor: 'white', border: 'none', width: '70px' }}
        >
          <button
            style={{
              border: 'none',
              backgroundColor: 'white',
              padding: '0',
            }}
          >
            <NextImage
              field={props.fields.Image.value}
              editable={true}
              width={30}
              height={30}
              title="Profile page"
            />
          </button>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            className={userProfileCss.userProfileDropdownItem}
            href={props.fields.LogoURL.value.href}
          >
            <div className={userProfileCss.userProfileOverlayItem}>
              <div className={userProfileCss.userProfileDropdownImage}>
                <NextImage
                  field={props.fields.Image.value}
                  editable={true}
                  width={30}
                  height={30}
                  title="Profile page"
                />
              </div>
              <div className={userProfileCss.userProfileBtn}> Edit Profile</div>
            </div>
          </Dropdown.Item>
          <Dropdown.Item
            className={userProfileCss.userProfileDropdownItem}
            href="/profile/blockedusers"
          >
            <div className={userProfileCss.userProfileOverlayItem}>
              <div className={userProfileCss.userProfileDropdownImage}>
                <NextImage field={BlockUserImage} editable={true} />
              </div>
              <div className={userProfileCss.userProfileBtn}>Blocked Users</div>
            </div>
          </Dropdown.Item>
          <Dropdown.Item
            className={userProfileCss.userProfileDropdownItem}
            onClick={() => setLogoutPopUp(true)}
          >
            <div className={userProfileCss.userProfileOverlayItem}>
              <div className={userProfileCss.userProfileDropdownImage}>
                <NextImage field={LogoutImage} editable={true} />
              </div>
              <div className={userProfileCss.userProfileBtn}>Logout</div>
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {<LogoutPopup />}
    </div>
  );
};

export default UserProfile;
