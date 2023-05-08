import { ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import userProfileCss from '../assets/userProfile.module.css';
import WebContext from '../Context/WebContext';
import React, { useContext, useState } from 'react';
import { Button, CloseButton, Dropdown, Modal } from 'react-bootstrap';
import BlockUserImage from '../assets/images/BlockUser.jpg';
import LogoutImage from '../assets/images/Logout.png';
import { useRouter } from 'next/router';
import logoutUserCall from 'src/API/logoutUserCall';
import { getValueFromCookie } from 'assets/helpers/helperFunctions';
import Link from 'next/link';
import FirebaseContext from 'src/Context/FirebaseContext';
import AxiosRequest from 'src/API/AxiosRequest';

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
  const { deleteTokenFromFirebase, getFcmTokenFromLocalStorage } = {
    ...useContext(FirebaseContext),
  };
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
            <Modal.Header className={userProfileCss.logoutModalHeader}>
              <Modal.Title className={userProfileCss.logoutModalTitle}>{'Logout'}</Modal.Title>
              <CloseButton
                variant="default"
                className={userProfileCss.logoutModalClose}
                onClick={() => {
                  setLogoutPopUp(false);
                }}
              ></CloseButton>
            </Modal.Header>
            <Modal.Body>
              <div className={userProfileCss.logoutModalBody}>{`Do you want to logout ?`}</div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                className={userProfileCss.footerBtnCancel}
                variant="default"
                onClick={() => {
                  setLogoutPopUp(false);
                }}
              >
                Cancel
              </Button>
              <Button
                className={userProfileCss.footerBtnDefault}
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

  const unMapFirebaseTokenFromCurrentUser = (fcm_token: string) => {
    AxiosRequest({
      method: 'POST',
      url: `https://accelerator-api-management.azure-api.net/graph-service/api/v1/unmap-uuid?uuid=${fcm_token}`,
    })
      .then((response: any) => {
        console.log('APIResponseFCM', response);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const logOutUser = async () => {
    let response = await logoutUserCall();
    if (
      response?.data?.code == 200 &&
      response?.data?.success &&
      setUserToken != undefined &&
      setIsLoggedIn != undefined
    ) {
      const fcmToken = getFcmTokenFromLocalStorage();
      if (fcmToken) {
        unMapFirebaseTokenFromCurrentUser(fcmToken);
      }
      let token = getValueFromCookie('UserToken');
      if (token != null) {
        document.cookie = `UserToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
      if (typeof localStorage !== 'undefined' && localStorage.getItem('UserToken')) {
        setLogoutPopUp(false);
        localStorage.clear();
        setUserToken('');
        setIsLoggedIn(false);
        router.push('/login');
      }
      deleteTokenFromFirebase();
    }
  };

  return (
    <div className={userProfileCss.userProfileContainer}>
      <Dropdown>
        <Dropdown.Toggle
          variant="secondary"
          id="dropdown-basic"
          className={userProfileCss.userProfileDropdownBtn}
        >
          <NextImage
            field={props.fields.Image.value}
            editable={true}
            width={32}
            height={32}
            title="Profile page"
          />
        </Dropdown.Toggle>

        <Dropdown.Menu className={userProfileCss.userProfileDropdownMenu}>
          <Dropdown.Item className={userProfileCss.userProfileDropdownItem}>
            <Link href={props.fields.LogoURL.value.href} passHref={true}>
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
            </Link>
          </Dropdown.Item>
          <Dropdown.Item className={userProfileCss.userProfileDropdownItem}> 
            <Link href="/profile/blockedusers" passHref={true}>
              <div className={userProfileCss.userProfileOverlayItem}>
                <div className={userProfileCss.userProfileDropdownImage}>
                  <NextImage field={BlockUserImage} editable={true} />
                </div>
                <div className={userProfileCss.userProfileBtn}>Blocked Users</div>
              </div>
            </Link>
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
