import followCall, { UnfollowCall } from 'src/API/followUnfollowCall';
import styles from '../assets/searchUser.module.css';
import { useContext, useState } from 'react';
import WebContext from 'src/Context/WebContext';
import { Button, Modal } from 'react-bootstrap';
const User = (props: any) => {
  console.log('users', props);
  const { userToken, setUserToken, objectId } = { ...useContext(WebContext) };

  const [followButtonText, setButtonText] = useState(props?.buttonText ?? 'Follow');
  const [showForm1, setShowForm] = useState(false);
  const handleClose1 = () => setShowForm(false);

  const changeText = (text: string) => setButtonText(text);
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
            <Button className={styles.btnClass} onClick={(e) => onUnfollow(e)}>
              Unfollow
              {/* {showSpinner ? <Spinner style={{ marginLeft: '10px', height: '30px' }} /> : <></>} */}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  const onFollow = async (e: any) => {
    e.preventDefault();
    setTokenFromLocalStorage();
    let response = await followCall(props?.user?.objectId, userToken);
    if (response?.success) {
      changeText(props?.buttonText ?? 'Following');
    }
  };

  const onUnfollow = async (e: any) => {
    e.preventDefault();
    modalConfirmationDialog();
    setTokenFromLocalStorage();
    let response = await UnfollowCall(props?.user?.objectId, userToken);
    if (response?.success) {
      changeText('Follow');
    }
    setShowForm(false);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.userInfo}>
          <div className={styles.userImage}>
            <img src={props?.user?.profilePictureUrl} />
          </div>
          <div>
            <div>{props?.user?.firstName + ' ' + props?.user?.lastName}</div>
          </div>
        </div>
        <div>
          {props?.user?.objectId !== objectId ? (
            <button
              onClick={followButtonText === 'Follow' ? onFollow : onUnfollow}
              className={styles.btn}
            >
              {followButtonText}
            </button>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
};

export default User;
