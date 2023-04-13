import React, { useContext, useState } from 'react';
import WebContext from '../Context/WebContext';
import styles from '../assets/followunfollowbutton.module.css';
import followCall, { UnfollowCall } from 'src/API/followUnfollowCall';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Spinner } from 'react-bootstrap';

const FollowUnfollowButton = (props: any): JSX.Element => {
  const { isLoggedIn, userToken, setUserToken } = { ...useContext(WebContext) };
  console.log(isLoggedIn);
  const [showSpinner, setShowSpinner] = useState(false);
  // state variables
  const [showForm1, setShowForm] = useState(false);
  const handleClose1 = () => setShowForm(false);
  const [followButtonText, setButtonText] = useState('Follow');
  const changeText = (text: string) => setButtonText(text);

  const modalConfirmationDialog = () => {
    return (
      <>
        <Modal show={showForm1} onHide={handleClose1}>
          <Modal.Header closeButton>
            <Modal.Title>Unfollow Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to unfollow this person?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose1}>
              Cancel
            </Button>
            <Button variant="primary" onClick={(e) => onUnfollow(e)}>
              Unfollow
              {showSpinner ? <Spinner style={{ marginLeft: '10px', height: '30px' }} /> : <></>}
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
    setShowSpinner(true);
    e.preventDefault();
    setTokenFromLocalStorage();
    let response = await followCall(props?.userName, userToken);
    if (response?.success) {
      changeText('Following');
    }
    setShowSpinner(false);
  };

  const showConfirmationPopup = (e: any) => {
    e.preventDefault();
    setShowForm(true);
  };

  const onUnfollow = async (e: any) => {
    setShowSpinner(true);
    e.preventDefault();
    modalConfirmationDialog();
    setTokenFromLocalStorage();
    let response = await UnfollowCall(props?.userName, userToken);
    if (response?.success) {
      changeText('Follow');
    }
    setShowSpinner(false);
    setShowForm(false);
  };

  if (followButtonText == 'Follow') {
    return (
      <div>
        <button type="button" className={styles.followButton} onClick={(e) => onFollow(e)}>
          {followButtonText}
          {showSpinner ? <Spinner style={{ marginLeft: '10px', height: '10px' }} /> : <></>}
        </button>
      </div>
    );
  } else if (followButtonText == 'Following') {
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
