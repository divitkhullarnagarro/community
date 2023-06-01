import followCall, { UnfollowCall } from 'src/API/followUnfollowCall';
import styles from '../assets/searchUser.module.css';
// import darkModeCss from '../assets/darkTheme.module.css';
import { useContext, useState } from 'react';
import WebContext from 'src/Context/WebContext';
import { Button, Modal, CloseButton } from 'react-bootstrap';
import style from '../assets/events.module.css';
import darkModeCss from '../assets/darkTheme.module.css';

const User = (props: any) => {
  // console.log('users', props);
  const { userToken, setUserToken, objectId, darkMode } = { ...useContext(WebContext) };

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
    <a href={`/viewProfile?id=${props?.user?.objectId}`} className={style.link} target="_blank">
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
    </a>
  );
};

export default User;
