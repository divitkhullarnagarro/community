import React, { useContext, useState } from 'react';
import WebContext from '../Context/WebContext';
import styles from '../assets/followunfollowbutton.module.css';
import followCall, { UnfollowCall } from 'src/API/followUnfollowCall';
import { Button, CloseButton, Modal } from 'react-bootstrap';
import darkModeCss from '../assets/darkTheme.module.css';

type FollowUnfollowButtonProps = {
  userName?: string;
  buttonText?: string;
};

const FollowUnfollowButton = (props: FollowUnfollowButtonProps): JSX.Element => {
  const { userToken, setUserToken, darkMode } = { ...useContext(WebContext) };
  // console.log(isLoggedIn);

  // state variables
  const [showForm1, setShowForm] = useState(false);
  const handleClose1 = () => setShowForm(false);
  const [followButtonText, setButtonText] = useState(props?.buttonText ?? 'Follow');
  const changeText = (text: string) => setButtonText(text);

  const modalConfirmationDialog = () => {
    return (
      <>
        <Modal show={showForm1} onHide={handleClose1} className={`modalContent ${darkMode ? darkModeCss.darkModeModal : ''}`}>
          <Modal.Header className={`modalHeader ${darkMode ? darkModeCss.grey_3 : ''}`}>
            <Modal.Title className={`modalTitle ${darkMode ? darkModeCss.text_green : ''}`}>Unfollow Confirmation</Modal.Title>
            <CloseButton
              variant="default"
              className={`modalClose ${darkMode ? darkModeCss.invertFilter : ''}`}
              onClick={handleClose1}
            ></CloseButton>
          </Modal.Header>
          <Modal.Body className={`${darkMode ? darkModeCss.grey_3 : ''} ${darkMode ? darkModeCss.test_grey_4 : ''}`}>Are you sure you want to unfollow this person?</Modal.Body>
          <Modal.Footer className={`${darkMode ? darkModeCss.grey_3 : ''} ${darkMode ? darkModeCss.test_grey_4 : ''}`}>
            <Button className='footerBtnCancel'
                variant="default" onClick={handleClose1}>
              Cancel
            </Button>
            <Button className='footerBtnDefault'
                variant="secondary" onClick={(e) => onUnfollow(e)}>
              Unfollow
              {/* {showSpinner ? <Spinner style={{ marginLeft: '10px', height: '30px' }} /> : <></>} */}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  const setTokenFromLocalStorage = () => {
    if (userToken === undefined || userToken === '') {
      if (
        typeof localStorage !== 'undefined' &&
        localStorage.getItem('UserToken') != '' &&
        localStorage.getItem('UserToken') != null
      ) {
        let token = localStorage.getItem('UserToken');
        if (token != null && setUserToken != undefined) {
          setUserToken(token);
        }
      }
    }
  };

  const onFollow = async (e: any) => {
    e.preventDefault();
    setTokenFromLocalStorage();
    let response = await followCall(props?.userName, userToken);
    if (response?.success) {
      changeText(props?.buttonText ?? 'Following');
    }
  };

  const showConfirmationPopup = (e: any) => {
    e.preventDefault();
    setShowForm(true);
  };

  const onUnfollow = async (e: any) => {
    e.preventDefault();
    modalConfirmationDialog();
    setTokenFromLocalStorage();
    let response = await UnfollowCall(props?.userName, userToken);
    if (response?.success) {
      changeText('Follow');
    }
    setShowForm(false);
  };

  if (followButtonText == 'Follow') {
    return (
      <div>
        <button type="button" className={styles.followButton} onClick={(e) => onFollow(e)}>
          {followButtonText}
        </button>
      </div>
    );
  } else if (followButtonText == 'Following' || followButtonText == 'Unfollow') {
    return (
      <div>
        <button
          type="button"
          className={styles.followingButton}
          onClick={(e) => showConfirmationPopup(e)}
        >
          {followButtonText}
        </button>
        {modalConfirmationDialog()}
      </div>
    );
  } else {
    return (
      <div>
        <button
          type="button"
          className={styles.followButton}
          onClick={() => (window.location.href = '/login')}
        >
          Follow
        </button>
      </div>
    );
  }
};

export default FollowUnfollowButton;
