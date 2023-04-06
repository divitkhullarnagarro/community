import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import WebContext from '../Context/WebContext';
import styles from '../assets/blockeduser.module.css';
import BlockUserImage from '../assets/images/BlockUser.jpg';
import { NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import { Button, Dropdown, Modal } from 'react-bootstrap';
import MoreOptionsImage from '../assets/images/MoreOptions.jpg';
import BlockedUserPreviewImage from '../assets/images/BlockedUserPreviewImage.png';

function BlockedUser() {
  const { userToken, objectId, userObject } = {
    ...useContext(WebContext),
  };

  userToken;
  objectId;
  userObject;

  const arr = [1, 2, 3, 4, 5, 6, 7];

  const router = useRouter();
  router;
  const [showBlockUserPopUp, setShowBlockUserPopUp] = useState(false);
  const [blockUserName, setBlockUserName] = useState<string>('');

  const BlockUserPopup = () => {
    return (
      <>
        <Modal
          className={styles.blockedUserModalContent}
          show={showBlockUserPopUp}
          onHide={() => setShowBlockUserPopUp(false)}
          backdrop="static"
          keyboard={false}
          centered
          scrollable={true}
        >
          <div>
            <Modal.Header closeButton>
              <Modal.Title className={styles.blockedUserModalHeader}>{'Unblock User'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div
                className={styles.blockedUserModalBody}
              >{`Do you want to unblock ${blockUserName} ?`}</div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                className={styles.footerBtn}
                variant="secondary"
                onClick={() => {
                  setShowBlockUserPopUp(false);
                }}
              >
                Cancel
              </Button>
              <Button className={styles.footerBtn} variant="secondary">
                Block
              </Button>
            </Modal.Footer>
          </div>
        </Modal>
      </>
    );
  };

  const BlockedUserRow = () => {
    return (
      <div className={styles.blockedUserwrapper}>
        <div className={styles.blockedUserRow}>
          <div style={{ display: 'flex' }}>
            <img
              className={styles.blockedUserImage}
              src="https://cdn-icons-png.flaticon.com/512/1144/1144811.png"
              alt="User-Pic"
            ></img>
            <div style={{ marginLeft: '20px', fontWeight: 'bold', marginTop: '15px' }}>
              Rohit Kumar
            </div>
          </div>

          <Dropdown>
            <Dropdown.Toggle variant="secondary" className={styles.blockedUserDropdownBtn}>
              <button
                style={{
                  border: 'none',
                  backgroundColor: 'white',
                  padding: '0',
                  width: '30px',
                }}
              >
                <NextImage
                  className="postMoreOptionsImage"
                  field={MoreOptionsImage}
                  editable={true}
                />
              </button>
            </Dropdown.Toggle>

            <Dropdown.Menu className={styles.blockedUsersDropdownMenu}>
              <Dropdown.Item
                className={styles.blockedUsersDropdownMenuItem}
                onClick={() => {
                  setBlockUserName('Rohit kumar');
                  setShowBlockUserPopUp(true);
                }}
              >
                <div className={styles.overlayItem}>
                  <div className={styles.dropdownImage}>
                    <NextImage field={BlockUserImage} editable={true} />
                  </div>
                  <div className={styles.reportContainerBtn}>Unblock user</div>
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    );
  };

  return (
    <>
      <div>
        <Button variant="secondary">Back</Button>
        <div className={styles.blockedUsersSideNav}>
          <div className={styles.sideNavHeader}>Blocked Users List</div>
          <hr />

          {arr.length == 0 ? (
            <div className={styles.noBlockedUsers}>You haven't blocked anyone</div>
          ) : (
            arr.map(() => {
              return <BlockedUserRow />;
            })
          )}
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.blockedUserPreviewImage}>
            <NextImage field={BlockedUserPreviewImage} editable={true} />
          </div>
          Select people's name to preview their profile.
        </div>
      </div>
      {<BlockUserPopup />}
    </>
  );
}

export default BlockedUser;
