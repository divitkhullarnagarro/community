import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import Image from 'next/image';
import { ComponentProps } from 'lib/component-props';
import styles from '../assets/editprofile.module.css';
import Profile from '../assets/images/profile.png';
import BannerSitecore from '../assets/images/Banner-Sitecore.png';
import { useRouter } from 'next/router';
import { useState, useContext, useEffect } from 'react';
import WebContext from '../Context/WebContext';
import groupBackground from '../assets/images/groupBackground.svg';
import groupLogoImg from '../assets/images/groupLogoImg.svg';
import AxiosRequest from 'src/API/AxiosRequest';
import {
  getFollowersUrl,
  getFollowingUrl,
  getUserUrl,
  uploadBannerUrl,
} from 'assets/helpers/constants';
import { Form, Modal } from 'react-bootstrap';
import DotLoader from './DotLoader';
import ToastNotification from './ToastNotification';

type HeaderProfileProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const EditProfile = (props: HeaderProfileProps): JSX.Element => {
  const { userObject } = {
    ...useContext(WebContext),
  };

  const [joinValue, setJoinValue] = useState(true);
  const [leaveValue, setLeaveValue] = useState(false);
  const [fetchUser, setfetchUser] = useState<any>({});
  const [bannerImage, setBannerImage] = useState<any>('');
  const [isBannerLoaded, setIsBannerLoaded] = useState(false);
  const [isProfilePicloaded, setisProfilePicloaded] = useState(false);
  const [followersList, setFollowersList] = useState<any>([]);
  const [followingList, setFollowingList] = useState<any>([]);
  const [followerFollowingSwitch, setFollowerFollowingSwitch] = useState(false);
  const [isfetchchingFollowerlist, setisfetchchingFollowerlist] = useState(false);
  const [followersPageNo, setFollowersPageNo] = useState(0);
  const [followingPageNo, setFollowingPageNo] = useState(0);
  const [showNotification, setShowNofitication] = useState(false);
  const [toastSuccess, setToastSuccess] = useState(false);
  const [toastError, setToastError] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>();
  const resetToastState = () => {
    setShowNofitication(!showNotification);
    setToastSuccess(false);
    setToastError(false);
  };

  const onClickJoinButton = () => {
    setLeaveValue(true);
    setJoinValue(false);
  };

  const onLeaveButtonClick = () => {
    setJoinValue(true);
    setLeaveValue(false);
  };
  const router = useRouter();
  const { groupName } = router.query;
  const isGroupPage = props?.params?.IsGroupList == '1' ? true : false;

  //get objectId from URL
  const params =
    typeof window !== 'undefined'
      ? new URLSearchParams(window?.location?.search)
      : new URLSearchParams('');
  let objectEmail = params.get('id');

  useEffect(() => {
    if (objectEmail && objectEmail != '')
      AxiosRequest({ url: `${getUserUrl}${objectEmail}`, method: 'GET' }).then((response: any) => {
        setisProfilePicloaded(true);
        setIsBannerLoaded(true);
        setfetchUser(response?.data);
      });
  }, [objectEmail]);

  function gotoAnotherUser(objectid: string) {
    setShow(false);
    router.push(`/viewProfile?id=${objectid}`);
    setFollowingList([]);
    setFollowersList([]);
  }

  async function getFollowersFollowing() {
    if (objectEmail && objectEmail != '') {
      await AxiosRequest({
        url: `${getFollowersUrl}?objectId=${objectEmail}&page=${followersPageNo}&size=10`,
        method: 'GET',
      }).then((response: any) => {
        setFollowersList((prev: any) => {
          return [...prev, ...response?.data];
        });
      });

      await AxiosRequest({
        url: `${getFollowingUrl}?objectId=${objectEmail}&page=${followingPageNo}&size=10`,
        method: 'GET',
      }).then((response: any) => {
        setFollowingList((prev: any) => {
          return [...prev, ...response?.data];
        });
      });
      setisfetchchingFollowerlist(false);
    }
  }

  function openFollowerFollowingPopup(key: string) {
    setisfetchchingFollowerlist(true);
    setShow(true);
    getFollowersFollowing();
    key === 'followers' ? setFollowerFollowingSwitch(true) : setFollowerFollowingSwitch(false);
  }

  useEffect(() => {
    fetchUser?.bannerUrl ? setBannerImage(fetchUser.bannerUrl) : '';
    // setisProfilePicloaded(true);
  }, [fetchUser]);

  function clickmebuttonHandler() {
    if (typeof document !== undefined) {
      const buttEle = document.getElementById('clickmebutton');
      buttEle?.click();
    }
  }

  async function UploadFilesToServer(file: any) {
    const formData = new FormData();
    formData.append('multipleFiles', file);
    return await AxiosRequest({
      url: uploadBannerUrl,
      method: 'POST',
      data: formData,
      contentType: 'multipart/form-data',
    })
      .then((response: any) => {
        return response?.data;
      })
      .catch(() => {
        setToastMessage('Something Went Wrong !');
        setToastError(true);
        setShowNofitication(true);
      });
  }

  //Function To Handle Load Image Files
  async function uploadMultipleFiles(e: any) {
    const files = e.target.files;
    const fileArray: any = [];
    for (let i = 0; i < files.length; i++) {
      const temp = files[i];
      const resp = await UploadFilesToServer(temp);
      if (!resp) break;
      fileArray.push(resp);
    }
    if (fileArray.length === files.length) {
      setBannerImage(URL?.createObjectURL(files[0]));
    }
  }

  const [show, setShow] = useState(false);

  //Pagination
  const [ifReachedEndFollowers, setIfReachedEndFollowers] = useState(false);
  const [noMoreFollowers, setNoMoreFollowers] = useState(false);
  const [noMoreFollowing, setNoMoreFollowing] = useState(false);

  const HandleScrollEventFollowers = () => {
    if (
      element?.scrollTop + element?.clientHeight >= element?.scrollHeight &&
      ifReachedEndFollowers == false
    ) {
      setIfReachedEndFollowers(true);
    }
  };

  let element: any = '';
  if (typeof document !== 'undefined') {
    element = document?.querySelector('#PopupListContainer');

    element?.addEventListener('scroll', HandleScrollEventFollowers);
  }

  async function LoadMoreFollowersFollowing() {
    followerFollowingSwitch
      ? !noMoreFollowers &&
        (await AxiosRequest({
          url: `${getFollowersUrl}?objectId=${objectEmail}&page=${followersPageNo + 1}&size=10`,
          method: 'GET',
        }).then((response: any) => {
          if (response?.data.length > 0) {
            setFollowersList((prev: any) => {
              return [...prev, ...response?.data];
            });
            setFollowersPageNo((prev) => {
              return prev + 1;
            });
          } else {
            setNoMoreFollowers(true);
          }
        }))
      : !noMoreFollowing &&
        (await AxiosRequest({
          url: `${getFollowingUrl}?objectId=${objectEmail}&page=${followingPageNo + 1}&size=10`,
          method: 'GET',
        }).then((response: any) => {
          if (response?.data.length > 0) {
            setFollowingList((prev: any) => {
              return [...prev, ...response?.data];
            });
            setFollowingPageNo((prev) => {
              return prev + 1;
            });
          } else {
            setNoMoreFollowing(true);
          }
        }));

    setTimeout(() => {
      setIfReachedEndFollowers(false);
    }, 100);
  }

  useEffect(() => {
    if (ifReachedEndFollowers == true) {
      LoadMoreFollowersFollowing();
    }
  }, [ifReachedEndFollowers]);

  return (
    <div
      style={
        isGroupPage
          ? { backgroundImage: `url(${groupBackground.src})` }
          : isBannerLoaded
          ? {
              backgroundImage: `url(${
                bannerImage != '' && bannerImage ? bannerImage : BannerSitecore.src
              })`,
            }
          : { background: '#F9F9F9' }
      }
      className={isGroupPage ? `${styles.groupHeaderWrapper}` : `${styles.headerWrapper}`}
      // style={{ marginBottom: '10px' }}
    >
      {!isBannerLoaded ? (
        <span className={styles.dotLoaderBannerPic}>
          <DotLoader />
        </span>
      ) : (
        ''
      )}
      <div className={isGroupPage ? `${styles.groupContent}` : `${styles.content}`}>
        <div className={styles.leftSection}>
          <div className={styles.profileImage}>
            {isGroupPage ? (
              <Image src={groupLogoImg} height={100} width={110} className={styles.groupPageLogo} />
            ) : isProfilePicloaded ? (
              <img
                src={fetchUser?.profilePictureUrl ? fetchUser?.profilePictureUrl : Profile.src}
                height={150}
                width={150}
              />
            ) : (
              <div className={styles.dotLoaderProfilePic}>
                <DotLoader />
              </div>
            )}
          </div>
          <div className={styles.profileInfoSection}>
            {isGroupPage ? (
              <div className={styles.groupName}>{groupName}</div>
            ) : (
              <div className={styles.name}>
                {userObject ? `${fetchUser?.firstName} ${fetchUser?.lastName}` : 'John Doe'}
              </div>
            )}

            {!isGroupPage && (
              <div className={styles.followers}>
                <div>
                  <button
                    className={styles.followersButton}
                    onClick={() => openFollowerFollowingPopup('followers')}
                  >
                    {fetchUser?.followers_count
                      ? `Followers - ${fetchUser?.followers_count}`
                      : 'Followers - 0'}
                  </button>
                </div>
                <div>&nbsp;|&nbsp;</div>
                <div>
                  <button
                    className={styles.followersButton}
                    onClick={() => openFollowerFollowingPopup('following')}
                  >
                    {fetchUser?.following_count
                      ? `Following - ${fetchUser?.following_count}`
                      : 'Following - 0'}
                  </button>
                </div>
              </div>
            )}
            {!isGroupPage && objectEmail === userObject?.objectId && (
              <button className={styles.editProfileBtn} onClick={() => router.push('/profile')}>
                Edit Profile
              </button>
            )}
          </div>
        </div>
        {!isGroupPage && objectEmail === userObject?.objectId && (
          <button
            className={styles.editBannerBtn}
            onClick={() => {
              clickmebuttonHandler();
            }}
          >
            Change Background
          </button>
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
      <Form>
        <Form.Group
        // className="mb-3"
        >
          <Form.Control
            style={{ display: 'none' }}
            // value={bannerImage}
            onChange={(e) => uploadMultipleFiles(e)}
            type="file"
            placeholder="Post Text"
            accept="image/*"
            id="clickmebutton"
          />
        </Form.Group>
      </Form>
      <Modal
        className={styles.followersPopup}
        size={'lg'}
        show={show}
        onHide={() => setShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>People</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.popupMainContainer}>
            <div className={styles.popupButtonContainer}>
              <button
                className={
                  followerFollowingSwitch
                    ? styles.popupButtonActiveState
                    : styles.popupButtonInActiveState
                }
                onClick={() => setFollowerFollowingSwitch(true)}
                style={{ marginRight: '15px' }}
              >
                Followers
              </button>
              <button
                className={
                  followerFollowingSwitch
                    ? styles.popupButtonInActiveState
                    : styles.popupButtonActiveState
                }
                onClick={() => setFollowerFollowingSwitch(false)}
              >
                Following
              </button>
            </div>
            <div className={styles.popupListContainer} id="PopupListContainer">
              {followerFollowingSwitch ? (
                isfetchchingFollowerlist ? (
                  <div style={{ position: 'relative', top: '50%' }}>
                    <DotLoader />
                  </div>
                ) : (
                  <div className={styles.followersFollowingContainer}>
                    {followersList.length > 0 ? (
                      followersList.map((follower: any, index: any) => {
                        return (
                          <button
                            key={index}
                            style={{ border: 'none', background: 'none', padding: '0' }}
                            onClick={() => gotoAnotherUser(follower?.objectId)}
                          >
                            <div className={styles.userCard}>
                              <div
                                className={styles.userImage}
                                style={{
                                  backgroundImage: `url(${
                                    follower.profilePictureUrl
                                      ? follower.profilePictureUrl
                                      : Profile.src
                                  })`,
                                }}
                              ></div>
                              <div className={styles.userName}>
                                {follower.firstName}&nbsp;{follower.lastName}
                              </div>
                              <div className={styles.seeProfileButton}>
                                <span>See profile</span>
                              </div>
                            </div>
                          </button>
                        );
                      })
                    ) : (
                      <span style={{ position: 'absolute', top: '50%', left: '40%' }}>
                        Nothing to Show Here !
                      </span>
                    )}
                    {noMoreFollowers && followerFollowingSwitch ? (
                      <div
                        style={{ position: 'absolute', top: '96%', left: '33%', fontSize: '12px' }}
                      >
                        No More Followers{' '}
                        <img
                          style={{ marginLeft: '10px' }}
                          width="20px"
                          src="https://cdn-icons-png.flaticon.com/512/927/927567.png"
                          alt="smile"
                        ></img>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                )
              ) : isfetchchingFollowerlist ? (
                <div style={{ position: 'relative', top: '50%' }}>
                  <DotLoader />
                </div>
              ) : (
                <div className={styles.followersFollowingContainer}>
                  {followingList.length > 0 ? (
                    followingList.map((follow: any, index: any) => {
                      return (
                        <button
                          key={index}
                          style={{ border: 'none', background: 'none', padding: '0' }}
                          onClick={() => gotoAnotherUser(follow?.objectId)}
                        >
                          <div className={styles.userCard}>
                            <div
                              className={styles.userImage}
                              style={{
                                backgroundImage: `url(${
                                  follow.profilePictureUrl ? follow.profilePictureUrl : Profile.src
                                })`,
                              }}
                            ></div>
                            <div className={styles.userName}>
                              {follow.firstName}&nbsp;{follow.lastName}
                            </div>
                            <div className={styles.seeProfileButton}>
                              <span>See profile</span>
                            </div>
                          </div>
                        </button>
                      );
                    })
                  ) : (
                    <span style={{ position: 'absolute', top: '50%', left: '40%' }}>
                      Nothing to Show Here !
                    </span>
                  )}
                  {noMoreFollowing && !followerFollowingSwitch ? (
                    <div
                      style={{ position: 'absolute', top: '96%', left: '33%', fontSize: '12px' }}
                    >
                      No More Followings{' '}
                      <img
                        style={{ marginLeft: '10px' }}
                        width="20px"
                        src="https://cdn-icons-png.flaticon.com/512/927/927567.png"
                        alt="smile"
                      ></img>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {showNotification && (
        <ToastNotification
          showNotification={showNotification}
          success={toastSuccess}
          error={toastError}
          message={toastMessage}
          handleCallback={resetToastState}
        />
      )}
    </div>
  );
};

export default EditProfile;
