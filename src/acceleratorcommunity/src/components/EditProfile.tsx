import { Field, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import styles from '../assets/editprofile.module.css';
import Profile from '../assets/images/profile.png';
import BannerSitecore from '../assets/images/Banner-Sitecore.png';
import { useRouter } from 'next/router';
import { useState, useContext, useEffect } from 'react';
import WebContext from '../Context/WebContext';
import AxiosRequest from 'src/API/AxiosRequest';
import {
  getFollowersUrl,
  getFollowingUrl,
  getUserUrl,
  joinGroupUrl,
  leaveGroupUrl,
  // updateGroupUrl,
  uploadBannerUrl,
} from 'assets/helpers/constants';
import { Form, Modal } from 'react-bootstrap';
import DotLoader from './DotLoader';
import ToastNotification from './ToastNotification';
import groupIcon from '../assets/images/groupLogo1.jpg';
// import uploadFilesCall from 'src/API/uploadFilesCall';
import Spinner from 'react-bootstrap/Spinner';

type HeaderProfileProps = ComponentProps & {
  fields: {
    data: {
      datasource: {
        changeBackground: {
          jsonValue: Field<string>;
        };
        followers: {
          jsonValue: Field<string>;
        };
        following: {
          jsonValue: Field<string>;
        };
        popupHeading: {
          jsonValue: Field<string>;
        };
        viewProfileButton: {
          jsonValue: Field<string>;
        };
        editProfile: {
          jsonValue: Field<string>;
        };
        emptyList: {
          jsonValue: Field<string>;
        };
        noMoreFollowers: {
          jsonValue: Field<string>;
        };
        noMoreFollowing: {
          jsonValue: Field<string>;
        };
      };
    };
  };
};

const EditProfile = (props: HeaderProfileProps): JSX.Element => {
  // const { userObject, userToken } = {
  const { userObject } = {
    ...useContext(WebContext),
  };
  //get objectId from URL
  const params =
    typeof window !== 'undefined'
      ? new URLSearchParams(window?.location?.search)
      : new URLSearchParams('');
  let objectEmail = params.get('id');
  let groupId = params.get('groupId') as string;

  const router = useRouter();
  const isGroupPage = props?.params?.IsGroupList == '1' ? true : false;

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
  const [groupBanner, setGroupBanner] = useState<string>('');
  const [groupInfo, setGroupInfo] = useState<any>({});
  // const [isGroupBannerUploading, setIsGroupBannerUploading] = useState<any>(false);
  const [joinLeaveLoader, setJoinLeaveLoader] = useState<any>(false);
  const [joinValue, setJoinValue] = useState(groupInfo?.member);
  const [leaveValue, setLeaveValue] = useState(!groupInfo?.member);

  const resetToastState = () => {
    setShowNofitication(!showNotification);
    setToastSuccess(false);
    setToastError(false);
  };

  const onClickJoinButton = async () => {
    setJoinLeaveLoader(true);
    const res: any = await AxiosRequest({
      url: `${joinGroupUrl}${groupId}/join`,
      method: 'PUT',
    });
    if (res.success) {
      setLeaveValue(true);
      setJoinValue(false);
      setJoinLeaveLoader(false);
    } else {
      setToastMessage('Failed to join group. Please try again');
      setToastError(true);
      setShowNofitication(true);
      setJoinLeaveLoader(false);
    }
    console.log('joinGroupCall', res);
  };

  const onLeaveButtonClick = async () => {
    setJoinLeaveLoader(true);
    const res: any = await AxiosRequest({
      url: `${leaveGroupUrl}${groupId}/leave`,
      method: 'PUT',
    });
    if (res.success) {
      setJoinValue(true);
      setLeaveValue(false);
      setJoinLeaveLoader(false);
    } else {
      setToastMessage('Failed to Leave group. Please try again');
      setToastError(true);
      setShowNofitication(true);
      setJoinLeaveLoader(false);
    }
  };

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

  function returnUserImage(e: any) {
    e.target.src = Profile.src;
  }

  //group functionality start
  const getGroupInfo = async (groupId: string) => {
    try {
      const res: any = await AxiosRequest({
        url: `https://accelerator-api-management.azure-api.net/graph-service/api/v1/graph/group/${groupId}`,
        method: 'GET',
      });
      if (res?.data) {
        setGroupInfo(res.data);
        setGroupBanner(res.data.groupBannerUrl);

        setJoinValue(!res?.data?.member);
        setLeaveValue(res.data.member);
      }
      console.log('groupInfo', res);
    } catch (error) {}
  };

  useEffect(() => {
    const isGroupPage = props?.params?.IsGroupList == '1' ? true : false;
    if (isGroupPage) {
    }
    getGroupInfo(groupId);
  }, [groupId]);

  // function changeGroupBannerbuttonHandler() {
  //   if (typeof document !== undefined) {
  //     const buttEle = document.getElementById('changeGroupBannerButton');
  //     buttEle?.click();
  //   }
  // }

  // async function UploadGroupBannerToServer(file: any, type: string) {
  //   return await uploadFilesCall(userToken, file, type).then((response) => {
  //     return response?.data;
  //   });
  // }
  // async function uploadGroupBannerFile(e: any) {
  //   try {
  //     setIsGroupBannerUploading(true);
  //     const files = e.target.files;
  //     const temp = files[0];
  //     const resp = await UploadGroupBannerToServer(temp, 'IMAGE');
  //     if (resp?.data) {
  //       try {
  //         const res: any = await AxiosRequest({
  //           url: `${updateGroupUrl}${groupId}`,
  //           method: 'PUT',
  //           data: { groupBannerUrl: resp?.data },
  //         });
  //         if (res.data) {
  //           setGroupBanner(res?.data?.groupBannerUrl);
  //           setIsGroupBannerUploading(false);
  //           console.log('updatedGroup', res.data);
  //         } else {
  //           setIsGroupBannerUploading(false);
  //           setToastMessage('Failed to Update Background. Please try again');
  //           setToastError(true);
  //           setShowNofitication(true);
  //         }
  //       } catch (error) {
  //         console.log('erroringroupupdate', error);
  //       }
  //     } else {
  //       setIsGroupBannerUploading(false);
  //       setToastMessage('Failed to Update Background. Please try again');
  //       setToastError(true);
  //       setShowNofitication(true);
  //     }

  //     console.log('bannerImageUrl', resp);
  //   } catch (error) {}
  // }
  //group functionality End
  return (
    <div
      style={
        isGroupPage
          ? {
              backgroundImage: `url(${
                groupInfo.groupBannerUrl || groupBanner
                  ? groupBanner || groupInfo.groupBannerUrl
                  : 'https://user-images.githubusercontent.com/160484/173871463-97e30942-dafe-4b91-b158-1ecf3300c540.png'
              })`,
            }
          : isBannerLoaded
          ? {
              backgroundImage: `url(${
                bannerImage != '' && bannerImage ? bannerImage : BannerSitecore.src
              })`,
            }
          : { background: '#F9F9F9' }
      }
      className={isGroupPage ? `${styles.groupHeaderWrapper}` : `${styles.headerWrapper}`}
    >
      {!isBannerLoaded && !isGroupPage ? (
        <span className={styles.dotLoaderBannerPic}>
          <DotLoader />
        </span>
      ) : (
        ''
      )}
      {/* {isGroupBannerUploading ? (
        <span className={styles.dotLoaderBannerPic}>
          <DotLoader />
        </span>
      ) : (
        ''
      )} */}
      <div className={isGroupPage ? `${styles.groupContent}` : `${styles.content}`}>
        <div className={`${styles.leftSection} ${styles.groupLeftSection}`}>
          <div className={styles.profileImage}>
            {isGroupPage ? (
              <img
                src={groupInfo.groupIconUrl ? groupInfo.groupIconUrl : groupIcon.src}
                height={150}
                width={150}
                className={styles.groupPageLogo}
                title={groupInfo.description}
              />
            ) : isProfilePicloaded ? (
              <img
                src={fetchUser?.profilePictureUrl ? fetchUser?.profilePictureUrl : Profile.src}
                height={150}
                width={150}
                onError={(e) => {
                  returnUserImage(e);
                }}
              />
            ) : (
              <div className={styles.dotLoaderProfilePic}>
                <DotLoader />
              </div>
            )}
          </div>
          <div className={styles.profileInfoSection}>
            {isGroupPage ? (
              <div className={styles.groupName} title={groupInfo.description}>
                {groupInfo.groupName}
              </div>
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
                    {fetchUser?.followers_count ? (
                      <>
                        <Text
                          field={
                            props?.fields?.data?.datasource?.followers?.jsonValue
                              ? props?.fields?.data?.datasource?.followers?.jsonValue
                              : {
                                  value: 'Followers',
                                }
                          }
                        />
                        &nbsp;-&nbsp;{fetchUser?.followers_count}
                      </>
                    ) : (
                      <>
                        <Text
                          field={
                            props?.fields?.data?.datasource?.followers?.jsonValue
                              ? props?.fields?.data?.datasource?.followers?.jsonValue
                              : {
                                  value: 'Followers',
                                }
                          }
                        />
                        - 0
                      </>
                    )}
                  </button>
                </div>
                <div>&nbsp;|&nbsp;</div>
                <div>
                  <button
                    className={styles.followersButton}
                    onClick={() => openFollowerFollowingPopup('following')}
                  >
                    {fetchUser?.following_count ? (
                      <>
                        <Text
                          field={
                            props?.fields?.data?.datasource?.following?.jsonValue
                              ? props?.fields?.data?.datasource?.following?.jsonValue
                              : {
                                  value: 'Following',
                                }
                          }
                        />
                        &nbsp;-&nbsp;{fetchUser?.following_count}
                      </>
                    ) : (
                      <>
                        <Text
                          field={
                            props?.fields?.data?.datasource?.following?.jsonValue
                              ? props?.fields?.data?.datasource?.following?.jsonValue
                              : {
                                  value: 'Following',
                                }
                          }
                        />
                        - 0
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
            {!isGroupPage && objectEmail === userObject?.objectId && (
              <button className={styles.editProfileBtn} onClick={() => router.push('/profile')}>
                <Text
                  field={
                    props?.fields?.data?.datasource?.editProfile?.jsonValue
                      ? props?.fields?.data?.datasource?.editProfile?.jsonValue
                      : {
                          value: 'Edit Profile',
                        }
                  }
                />
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
            <Text
              field={
                props?.fields?.data?.datasource?.changeBackground?.jsonValue
                  ? props?.fields?.data?.datasource?.changeBackground?.jsonValue
                  : {
                      value: 'Change Background',
                    }
              }
            />
          </button>
        )}

        {isGroupPage && (
          <div className={`d-flex flex-column ${styles.buttonGroup}`}>
            {/* {isGroupPage && userObject.objectId === groupInfo?.createdBy?.objectId && (
              <button
                className={styles.editGroupBannerBtn}
                onClick={() => {
                  changeGroupBannerbuttonHandler();
                }}
              >
                <Text
                  field={
                    props?.fields?.data?.datasource?.changeBackground?.jsonValue
                      ? props?.fields?.data?.datasource?.changeBackground?.jsonValue
                      : {
                          value: 'Change Background',
                        }
                  }
                />
              </button>
            )} */}
            {joinValue && (
              <button className={`btn  ${styles.joinButton}`} onClick={onClickJoinButton}>
                {!joinLeaveLoader ? (
                  <>
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
                  </>
                ) : (
                  <>
                    &nbsp;
                    <Spinner style={{ width: '15px', height: '15px' }} animation="border" />{' '}
                  </>
                )}
              </button>
            )}
            {leaveValue && (
              <button className={`btn  ${styles.leaveButton}`} onClick={onLeaveButtonClick}>
                {!joinLeaveLoader ? (
                  <>
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
                  </>
                ) : (
                  <>
                    &nbsp;
                    <Spinner style={{ width: '15px', height: '15px' }} animation="border" />{' '}
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
      <Form>
        <Form.Group>
          <Form.Control
            style={{ display: 'none' }}
            onChange={(e) => uploadMultipleFiles(e)}
            type="file"
            placeholder="Post Text"
            accept="image/*"
            id="clickmebutton"
          />
        </Form.Group>
      </Form>
      {/* <Form>
        <Form.Group>
          <Form.Control
            style={{ display: 'none' }}
            onChange={(e) => uploadGroupBannerFile(e)}
            type="file"
            placeholder="Post Text"
            accept="image/*"
            id="changeGroupBannerButton"
          />
        </Form.Group>
      </Form> */}
      <Modal
        className={styles.followersPopup}
        size={'lg'}
        show={show}
        onHide={() => setShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <Text
              field={
                props?.fields?.data?.datasource?.popupHeading?.jsonValue
                  ? props?.fields?.data?.datasource?.popupHeading?.jsonValue
                  : {
                      value: 'People',
                    }
              }
            />
          </Modal.Title>
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
                <Text
                  field={
                    props?.fields?.data?.datasource?.followers?.jsonValue
                      ? props?.fields?.data?.datasource?.followers?.jsonValue
                      : {
                          value: 'Followers',
                        }
                  }
                />
              </button>
              <button
                className={
                  followerFollowingSwitch
                    ? styles.popupButtonInActiveState
                    : styles.popupButtonActiveState
                }
                onClick={() => setFollowerFollowingSwitch(false)}
              >
                <Text
                  field={
                    props?.fields?.data?.datasource?.following?.jsonValue
                      ? props?.fields?.data?.datasource?.following?.jsonValue
                      : {
                          value: 'Following',
                        }
                  }
                />
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
                              <div className={styles.userImage}>
                                <img
                                  width="100%"
                                  height="100%"
                                  src={
                                    follower.profilePictureUrl
                                      ? follower.profilePictureUrl
                                      : Profile.src
                                  }
                                  alt="alt"
                                  onError={(e) => {
                                    returnUserImage(e);
                                  }}
                                />
                              </div>
                              <div className={styles.userName}>
                                {follower.firstName}&nbsp;{follower.lastName}
                              </div>
                              <div className={styles.seeProfileButton}>
                                <span>
                                  <Text
                                    field={
                                      props?.fields?.data?.datasource?.viewProfileButton?.jsonValue
                                        ? props?.fields?.data?.datasource?.viewProfileButton
                                            ?.jsonValue
                                        : {
                                            value: 'See Profile',
                                          }
                                    }
                                  />
                                </span>
                              </div>
                            </div>
                          </button>
                        );
                      })
                    ) : (
                      <span style={{ position: 'absolute', top: '50%', left: '40%' }}>
                        <Text
                          field={
                            props?.fields?.data?.datasource?.emptyList?.jsonValue
                              ? props?.fields?.data?.datasource?.emptyList?.jsonValue
                              : {
                                  value: 'Nothing to Show Here !',
                                }
                          }
                        />
                      </span>
                    )}
                    {noMoreFollowers && followerFollowingSwitch ? (
                      <div
                        style={{ position: 'absolute', top: '96%', left: '33%', fontSize: '12px' }}
                      >
                        <Text
                          field={
                            props?.fields?.data?.datasource?.noMoreFollowers?.jsonValue
                              ? props?.fields?.data?.datasource?.noMoreFollowers?.jsonValue
                              : {
                                  value: ' No More Followers',
                                }
                          }
                        />
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
                            <div className={styles.userImage}>
                              <img
                                width="100%"
                                height="100%"
                                src={
                                  follow.profilePictureUrl ? follow.profilePictureUrl : Profile.src
                                }
                                alt="alt"
                                onError={(e) => {
                                  returnUserImage(e);
                                }}
                              />
                            </div>
                            <div className={styles.userName}>
                              {follow.firstName}&nbsp;{follow.lastName}
                            </div>
                            <div className={styles.seeProfileButton}>
                              <span>
                                <Text
                                  field={
                                    props?.fields?.data?.datasource?.viewProfileButton?.jsonValue
                                      ? props?.fields?.data?.datasource?.viewProfileButton
                                          ?.jsonValue
                                      : {
                                          value: 'See Profile',
                                        }
                                  }
                                />
                              </span>
                            </div>
                          </div>
                        </button>
                      );
                    })
                  ) : (
                    <span style={{ position: 'absolute', top: '50%', left: '40%' }}>
                      <Text
                        field={
                          props?.fields?.data?.datasource?.emptyList?.jsonValue
                            ? props?.fields?.data?.datasource?.emptyList?.jsonValue
                            : {
                                value: 'Nothing to Show Here !',
                              }
                        }
                      />
                    </span>
                  )}
                  {noMoreFollowing && !followerFollowingSwitch ? (
                    <div
                      style={{ position: 'absolute', top: '96%', left: '33%', fontSize: '12px' }}
                    >
                      <Text
                        field={
                          props?.fields?.data?.datasource?.noMoreFollowing?.jsonValue
                            ? props?.fields?.data?.datasource?.noMoreFollowing?.jsonValue
                            : {
                                value: '  No More Followings',
                              }
                        }
                      />
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
