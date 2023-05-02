import { Field, NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { ReactElement, useContext, useEffect, useRef, useState } from 'react';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import Form from 'react-bootstrap/Form';
import WebContext from '../Context/WebContext';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import likePostCall from '../API/likePostCall';
import getAllPostsCall from '../API/getAllPostsCall';
import Spinner from 'react-bootstrap/Spinner';
import getPostByIdCall from '../API/getPostByIdCall';
import addPostCall from '../API/addPostCall';
import addPostCommentCall from 'src/API/addPostCommentCall';
import Link from 'next/link';
import ShowShareCss from '../assets/ShowShare.module.css';
import linkedin from '../assets/images/linkedin.png';
import twitter from '../assets/images/twitter.png';
import whatsapp from '../assets/images/whatsapp.png';
import facebook from '../assets/images/facebook.svg';
import { Dropdown, Modal } from 'react-bootstrap';
import { ReportPostOptionsTypeLabel, ReportUserOptionsTypeLabel } from 'assets/helpers/enums';
import styles from '../assets/addPost.module.css';
import reportPostImage from '../assets/images/flag-icon.svg';
import bookmarkImage from '../assets/images/bookmark-outline.svg';
import copylink from '../assets/images/copylink.svg';
import reportPostCall from 'src/API/reportPostCall';
import uploadFilesCall from 'src/API/uploadFilesCall';
import ToastNotification from './ToastNotification';
import getCommentsCall from 'src/API/getCommentsCall';
import getCommentsReplyCall from 'src/API/getCommentsReplyCall';
import postCommentReplyCall from 'src/API/postCommentReplyCall';
import downVote from '../assets/images/dislikeIcon.svg';
import CreateModalPopup from './helperComponents/CreateModalPopup';
import AxiosRequest from 'src/API/AxiosRequest';
import { editCommentUrl, voteInPollUrl } from '../assets/helpers/constants';
import videoIcon from '../assets/images/AddVideo_icon.svg';
import pollIcon from '../assets/images/CreatePoll_icon.svg';
import addBlogIcon from '../assets/images/AddBlogPost_icon.svg';
import createEventIcon from '../assets/images/CreateEventPost_icon.svg';

// Rich Text Editor Files Import Start
import { EditorState, convertToRaw } from 'draft-js';
import { EditorProps } from 'react-draft-wysiwyg';
import parser from 'html-react-parser';
import dynamic from 'next/dynamic';
import draftToHtml from 'draftjs-to-html';
import { toolbar } from 'assets/helpers/constants';
import allPeersCall from 'src/API/getPeers';
import { modifyHtml } from 'assets/helpers/helperFunctions';
const Editor = dynamic<EditorProps>(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), {
  ssr: false,
});
// Rich Text Editor Files Import End

import Deleteimage from '../assets/images/deleteImg.png';
import BlockUserImage from '../assets/images/BlockUser.jpg';
import React from 'react';
// import upVoteCall from 'src/API/upVote';
// import downVoteCall from 'src/API/downVote';
import getAllDownVotesCall from 'src/API/getAllDownVotesCall';
import getAllUpVotesCall from 'src/API/getAllUpVotes';
import Profile from '../assets/images/profile.png';
import addPostCss from '../assets/addPosts.module.css';
import blockUserCall from 'src/API/blockUnblockUserCall';
import user from '../assets/images/user.png';
// import location from '../assets/images/Location.png';
import image from '../assets/images/Vector.png';
import pin from '../assets/images/Vectorpin.png';
// import smile from '../assets/images/Vectorsmile.png';
import like from '../assets/images/like.png';
import comment from '../assets/images/comment.png';
import share from '../assets/images/share.png';
import greylikeimage from '../assets/images/greylikeimage.svg';
import EventCard from './EventCard';
import PollCard from './PollCard';
import deletePostCall from 'src/API/deletePostCall';
import deleteCommentCall from 'src/API/deleteCommentCall';
// import articleIcon from '../assets/images/ArticleIcon.svg';
// import PollCard from './PollCard';
import reportUserCall from 'src/API/reportUserCall';
import { useRouter } from 'next/router';
import PostSkeleton from './skeletons/PostSkeleton';

type AddPostProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

type BlockUserFields = {
  objectId: string;
  firstName: string;
  lastName: string;
};

const AddPost = (props: AddPostProps | any): JSX.Element => {
  const { userToken, objectId, userObject } = {
    ...useContext(WebContext),
  };

  interface ItemImage {
    [key: string]: string;
  }

  const EventImage: ItemImage = {
    Seminar:
      'https://higherlogicdownload.s3.amazonaws.com/APSNET/UploadedImages/tAiEB79vTYq1gz2UEGu1_IMG_2866-L.jpg',
    Conference: 'https://th.bing.com/th/id/OIP.IXdC6XgETCp5RaM3iQCb6QHaE8?pid=ImgDet&rs=1',
    Announcement: 'https://th.bing.com/th/id/OIP.zPaWJzUBQwbXDjhCtCtI1gHaE8?pid=ImgDet&rs=1',
    'Launch Event': 'https://live.staticflickr.com/808/39724254630_e9cdcb8e77_b.jpg',
    Celebration: 'https://th.bing.com/th/id/OIP.E1RiHHXMHUcq0L0KvprXfQHaEn?pid=ImgDet&rs=1',
  };

  const [showForm1, setShowForm1] = useState(false);
  let myPostArray: ReactElement<any, any>[] = [];
  let [posts, setPosts] = useState(myPostArray);

  let [postText, setPostText] = useState('');

  const [file, setFile] = useState([]);
  const [docs, setDocs] = useState([]);
  const [videoLink, setVideoLink] = useState([]);
  let [eventPost, setEventPost] = useState<any>('');
  const [pollPost, setPollPost] = useState<any>('');

  let [myAnotherArr, setMyAnotherArr] = useState<any>([]);
  let [postPageNum, setPostPageNum] = useState(0);
  let [ifReachedEnd, setIfReachedEnd] = useState(false);
  let [ifNoMoreData, setIfNoMoreData] = useState(false);
  let [allUpVotes, setAllUpVotes] = useState([]);
  let [allDownVote, setAllDownVote] = useState([]);
  let [showUp, setShowup] = useState('up');
  let [showDeletePostPopup, setShowDeletePostPopup] = useState(false);
  let [showDeleteCommentPopup, setShowDeleteCommentPopup] = useState(false);

  let [modalForData, setModalForData] = useState(false);

  // let [allReactions, setAllReactions] = useState([]);

  let [showEvent, setShowEvent] = useState(false);
  let [eventType, setEventType] = useState('Select Event Type');

  let [disableAddImage, setDisableAddImage] = useState(false);
  let [disableAddVideo, setDisableAddVideo] = useState(false);
  let [disableAddDoc, setDisableAddDoc] = useState(false);
  let [disableAddEvent, setDisableAddevent] = useState(false);
  let [disableAddPoll, setDisableAddPoll] = useState(false);
  let [globalPostType, setGlobalPostType] = useState('TEXT_POST');

  let [pageRoute, setPageroute] = useState('/viewProfile');
  const router = useRouter();
  useEffect(() => {
    setPageroute(router.asPath);
  }, []);

  console.log('CURRENTPATH', pageRoute);

  useEffect(() => {
    if (file.length || docs.length || videoLink.length || eventPost != '' || pollPost != '') {
      if (file.length) {
        setDisableAddVideo(true);
        setDisableAddDoc(true);
        setDisableAddevent(true);
        setDisableAddPoll(true);
        setGlobalPostType('IMAGE');
      } else if (docs.length) {
        setDisableAddImage(true);
        setDisableAddVideo(true);
        setDisableAddevent(true);
        setDisableAddPoll(true);
        setGlobalPostType('DOC');
      } else if (videoLink.length) {
        setDisableAddImage(true);
        setDisableAddDoc(true);
        setDisableAddevent(true);
        setDisableAddPoll(true);
        setGlobalPostType('VIDEO');
      } else if (eventPost != '') {
        setDisableAddImage(true);
        setDisableAddVideo(true);
        setDisableAddDoc(true);
        setDisableAddevent(true);
        setDisableAddPoll(true);
        setGlobalPostType('EVENT');
      } else if (pollPost != '') {
        setDisableAddImage(true);
        setDisableAddVideo(true);
        setDisableAddDoc(true);
        setDisableAddevent(true);
        setDisableAddPoll(true);
        setGlobalPostType('POLL');
      }
    } else {
      setDisableAddImage(false);
      setDisableAddVideo(false);
      setDisableAddDoc(false);
      setDisableAddevent(false);
      setDisableAddPoll(false);
      setGlobalPostType('TEXT_POST');
    }
  }, [videoLink, file, docs, eventPost, pollPost]);

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [addedPeers, setAddedPeers] = useState<string[]>([] as string[]);
  const [mentionUserData, setMentionUserData] = useState<
    {
      text: string;
      value: string;
      url: string;
    }[]
  >([] as { text: string; value: string; url: string }[]);
  // const currentCount = editorState.getCurrentContent().getPlainText().length;

  useEffect(() => {
    const rawEditorContent = convertToRaw(editorState.getCurrentContent());
    console.log('vicky rawEditorContent', rawEditorContent);
    const entityMap = rawEditorContent.entityMap;
    Object.values(entityMap).map((entity) => {
      console.log('mention user', entity.data.value, rawEditorContent, entityMap, entity);
    });
  }, [editorState]);

  const getAllPears = async () => {
    const res = await allPeersCall(userToken);
    const data = res.data.data;
    const userData = data.map((ele: any) => {
      return {
        text: ele.firstName + ' ' + ele.lastName,
        value: ele.firstName + ' ' + ele.lastName,
        url: '/profile/' + ele.objectId,
        objectId: ele.objectId,
      };
    });
    // console.log('getAllPears', userData);
    setMentionUserData(userData);
  };
  useEffect(() => {
    getAllPears();

    // console.log('getAllPears', getAllPears());
  }, []);

  useEffect(() => {
    const rawEditorContent = convertToRaw(editorState.getCurrentContent());
    console.log('vicky rawEditorContent', rawEditorContent);
    const entityMap = rawEditorContent.entityMap;
    const addedPeerList = new Set<string>();
    Object.values(entityMap).map((entity) => {
      // console.log('mention', entity.data.value, rawEditorContent, entityMap);
      if (entity?.data?.url?.substring(0, 8) === '/profile') {
        addedPeerList.add(entity?.data?.url?.substring(9, entity?.data?.url?.length));
      }
    });
    const addedpeersList = [...addedPeerList.values()];
    setAddedPeers(addedpeersList);
    // console.log('mention', [...addedPeerList.values()]);
  }, [editorState]);

  const onEditorStateChangeHandler = (e: any) => {
    setEditorState(e);
    setPostTextValue(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };
  // console.log('mention', addedPeers);

  // useEffect(() => {
  //   if (userToken == '' && !isExpEditorActive) {
  //     if (
  //       typeof localStorage !== 'undefined' &&
  //       localStorage.getItem('UserToken') != '' &&
  //       localStorage.getItem('UserToken') != null
  //     ) {
  //       let token = localStorage.getItem('UserToken');
  //       if (token != null && setUserToken != undefined) {
  //         setUserToken(token);
  //       }
  //     } else router.push('/login');
  //   }
  // }, []);

  // useEffect(() => {
  //   getUserCall(userToken, objectId).then((response) => {
  //     if (setUserObject != undefined) {
  //       setUserObject(response?.data?.data);
  //     }
  //   });
  // }, []);

  console.log('USEROBJECT', userObject);

  useEffect(() => {
    postStructCreate();
  }, [myAnotherArr]);

  useEffect(() => {
    if (userToken != '' && userToken != undefined) {
      getAllPostsCall(userToken, postPageNum).then((response: any) => {
        let newArr = response?.data?.data;
        newArr?.map((post: any) => {
          post.isOpenComment = false;
          post.comments = [];
          post.showShare = false;
          post.isLoadingComments = false;
          if (post.postMeasures == null || post.postMeasures == 'undefined') {
            post.postMeasures = {
              commentCount: 0,
              likeCount: 0,
            };
          }
        });
        setMyAnotherArr(newArr);
      });
    }
  }, [userToken]);

  useEffect(() => {
    if (ifNoMoreData == true) {
      if (typeof document !== 'undefined') {
        element = document?.querySelector('#PostFeedList');

        element?.removeEventListener('scroll', HandleScrollEvent);
      }
    }
  }, [ifNoMoreData]);

  useEffect(() => {
    if (ifReachedEnd == true) {
      LoadMorePosts();
    }
  }, [ifReachedEnd]);

  const [showReportPopUp, setShowReportPopUp] = useState(false);
  const [reportPostId, setReportPostId] = useState('');
  const [reportPostType, setReportPostType] = useState('');
  const [showNotification, setShowNofitication] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>();
  const [toastSuccess, setToastSuccess] = useState(false);
  const [toastError, setToastError] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showBlockUserPopUp, setShowBlockUserPopUp] = useState(false);
  const [selectedBlockUserItem, setSelectedBlockUserItem] = useState<BlockUserFields>();
  const [showReportUserPopUp, setShowReportUserPopUp] = useState(false);

  const ReportUserPopup = () => {
    const reportTypeList = Object.values(ReportUserOptionsTypeLabel);
    return (
      <>
        <Modal
          className={styles.reportPostModalContent}
          show={showReportUserPopUp}
          onHide={() => setShowReportUserPopUp(false)}
          backdrop="static"
          keyboard={false}
          centered
          scrollable={true}
        >
          <div>
            <Modal.Header closeButton>
              <Modal.Title className={styles.reportPostModalHeader}>
                {props?.fields?.data?.datasource?.reportPostTitle?.jsonValue?.value ?? 'Report'}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className={styles.reportPostModalBody}>
                {props?.fields?.data?.datasource?.reportPostHeader?.jsonValue?.value ??
                  'Why are you reporting?'}
              </div>
              <Form ref={formRef} style={{ fontSize: '15px', margin: '5px' }}>
                {reportTypeList.map((item, index) => {
                  return (
                    <div key={index} className={styles.reportItem}>
                      {item}
                      <Form.Check
                        type="radio"
                        name="radioGroup"
                        value={item}
                        onChange={(e) => handleSelectChange(e)}
                        defaultChecked={index == 0 ? true : false}
                        aria-label="radio 1"
                      ></Form.Check>
                    </div>
                  );
                })}
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                className={styles.footerBtn}
                variant="secondary"
                onClick={() => setShowReportUserPopUp(false)}
              >
                Cancel
              </Button>
              <Button className={styles.footerBtn} variant="secondary" onClick={onUserReported}>
                Report
                {showSpinner ? (
                  <Spinner style={{ marginLeft: '5px', width: '30px', height: '30px' }} />
                ) : (
                  <></>
                )}
              </Button>
            </Modal.Footer>
          </div>
        </Modal>
      </>
    );
  };

  const onUserReported = async () => {
    setShowSpinner(true);
    let reportReason = '';
    if (formRef.current != null) {
      reportReason = (
        formRef.current.querySelector('input[name="radioGroup"]:checked') as HTMLInputElement
      )?.value;
    }
    let response = await reportUserCall(selectedBlockUserItem?.objectId, reportReason, userToken);
    if (response) {
      if (response?.success) {
        setToastSuccess(true);
        setToastMessage(response?.data);
      } else {
        setToastError(true);
        setToastMessage(response?.errorCode);
      }
      setShowNofitication(true);
    }
    setShowReportUserPopUp(false);
    setShowSpinner(false);
  };

  const onUserBlocked = async () => {
    setShowSpinner(true);
    let response = await blockUserCall(userToken, selectedBlockUserItem?.objectId);
    if (response) {
      if (response?.success) {
        setToastSuccess(true);
        setToastMessage(response?.data);
      } else {
        setToastError(true);
        setToastMessage(response?.errorCode);
      }
      setShowNofitication(true);
    }
    setShowBlockUserPopUp(false);
    setShowSpinner(false);
  };

  // const handleUpvote = (commentId: string) => {
  //   upVoteCall(userToken, commentId);
  // };
  // const handleDownvote = (commentId: string) => {
  //   downVoteCall(userToken, commentId);
  // };
  const BlockUserPopup = () => {
    return (
      <>
        <Modal
          className={styles.reportPostModalContent}
          show={showBlockUserPopUp}
          onHide={() => setShowBlockUserPopUp(false)}
          backdrop="static"
          keyboard={false}
          centered
          scrollable={true}
        >
          <div>
            <Modal.Header closeButton>
              <Modal.Title className={styles.reportPostModalHeader}>{'Block User'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div
                className={styles.reportPostModalBody}
              >{`Do you want to block ${selectedBlockUserItem?.firstName} ${selectedBlockUserItem?.lastName} ?`}</div>
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
              <Button className={styles.footerBtn} variant="secondary" onClick={onUserBlocked}>
                Block
                {showSpinner ? (
                  <Spinner style={{ marginLeft: '5px', width: '30px', height: '30px' }} />
                ) : (
                  <></>
                )}
              </Button>
            </Modal.Footer>
          </div>
        </Modal>
      </>
    );
  };

  async function copyTextToClipboard(postId: string) {
    let postUrl = window.location.origin + '/post/' + postId;
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(postUrl);
    } else {
      return document.execCommand('copy', true, postUrl);
    }
  }

  const copyPostLinkToClipboard = (postId: string) => {
    copyTextToClipboard(postId)
      .then(() => {
        setToastSuccess(true);
        setToastMessage('Post url copied to clipboard');
        setShowNofitication(true);
      })
      .catch((err) => {
        setToastError(true);
        setToastMessage(err?.message ?? 'Something went wrong');
        setShowNofitication(true);
        console.log(err);
      });
  };

  const showReportPostPopup = () => {
    setShowReportPopUp(true);
  };

  const handleClose = () => {
    setShowReportPopUp(false);
  };

  const handleSelectChange = (event: any) => {
    console.log(event);
  };

  const ReportPostPopup = () => {
    const reportTypeList = Object.values(ReportPostOptionsTypeLabel);
    return (
      <>
        <Modal
          className={styles.reportPostModalContent}
          show={showReportPopUp}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered
          scrollable={true}
        >
          <div>
            <Modal.Header closeButton>
              <Modal.Title className={styles.reportPostModalHeader}>
                {props?.fields?.data?.datasource?.reportPostTitle?.jsonValue?.value ?? 'Report'}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className={styles.reportPostModalBody}>
                {props?.fields?.data?.datasource?.reportPostHeader?.jsonValue?.value ??
                  'Why are you reporting this?'}
              </div>
              <Form ref={formRef} style={{ fontSize: '15px', margin: '5px' }}>
                {reportTypeList.map((item, index) => {
                  return (
                    <div key={index} className={styles.reportItem}>
                      {item}
                      <Form.Check
                        type="radio"
                        name="radioGroup"
                        value={item}
                        onChange={(e) => handleSelectChange(e)}
                        defaultChecked={index == 0 ? true : false}
                        aria-label="radio 1"
                      ></Form.Check>
                    </div>
                  );
                })}
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button className={styles.footerBtn} variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button className={styles.footerBtn} variant="secondary" onClick={onPostReported}>
                Report
                {showSpinner ? (
                  <Spinner style={{ marginLeft: '5px', width: '30px', height: '30px' }} />
                ) : (
                  <></>
                )}
              </Button>
            </Modal.Footer>
          </div>
        </Modal>
      </>
    );
  };

  const resetToastState = () => {
    setShowNofitication(!showNotification);
    setToastSuccess(false);
    setToastError(false);
  };

  const onPostReported = async () => {
    setShowSpinner(true);
    let reportReason = '';
    if (formRef.current != null) {
      reportReason = (
        formRef.current.querySelector('input[name="radioGroup"]:checked') as HTMLInputElement
      )?.value;
    }

    let response = await reportPostCall(reportPostId, reportPostType, reportReason, userToken);
    if (response) {
      if (response?.success) {
        setToastSuccess(true);
        setToastMessage(response?.data);
      } else {
        setToastError(true);
        setToastMessage(response?.errorCode);
      }
      setShowNofitication(true);
      setShowReportPopUp(false);
      setShowSpinner(false);
    }
  };

  function LoadMorePosts() {
    setPostPageNum((prev) => {
      return prev + 1;
    });
    getAllPostsCall(userToken, postPageNum + 1).then((response: any) => {
      if (response?.data?.data?.length != 0 && response?.data?.data?.length) {
        let newArr = response?.data?.data;
        newArr?.map((post: any) => {
          post.isOpenComment = false;
          post.comments = [];
          post.showShare = false;
          if (post.postMeasures === null || post.postMeasures == 'undefined') {
            post.postMeasures = {
              commentCount: 0,
              likeCount: 0,
            };
          }
        });
        setMyAnotherArr((prevState: any[]) => {
          return [...prevState, ...newArr];
        });
      } else {
        setIfNoMoreData(true);
        setPostPageNum((prev) => {
          return prev - 1;
        });
      }
      setIfReachedEnd(false);
    });
  }

  async function setPostImageValue(e: any) {
    uploadMultipleFiles(e);
  }

  function setPostDocValue(e: any) {
    uploadMultipleDocs(e);
  }

  function setPostVideoValue(e: any) {
    e.preventDefault();
    uploadVideo(e);
  }

  function setPostTextValue(e: any) {
    setPostText(e);
  }

  function generateUniqueId() {
    const timestamp = Date.now();
    const random = Math.random() * Math.pow(10, 18);
    return `${timestamp}-${random}`;
  }

  //Function To Handle Likes
  function LikePost(id: any) {
    let locArr = myAnotherArr;
    let ifLikedAlready = false;
    let modPost = locArr.map((post: any) => {
      if (post.id == id) {
        if (post.isLikedByUser) {
          ifLikedAlready = true;
          return post;
        } else {
          post.isLikedByUser = true;
          if (typeof post?.postMeasures?.likeCount === 'number') {
            post.postMeasures.likeCount = (post.postMeasures.likeCount ?? 0) + 1;
          } else {
            post.postMeasures.likeCount = (post.postMeasures.likeCount ?? 0) + 1;
          }
          return post;
        }
      } else {
        return post;
      }
    });
    setMyAnotherArr(() => {
      return modPost;
    });
    if (!ifLikedAlready) {
      likePostCall(userToken, id).then((response) => {
        if (response?.data?.success == true) {
          let locArr = myAnotherArr;
          let modPost = locArr.map((post: any) => {
            if (post.id == id) {
              post.isLikedByUser = true;
              if (typeof post?.postMeasures?.likeCount === 'number') {
                post.postMeasures.likeCount = (post.postMeasures.likeCount ?? 0) + 1;
              } else {
                post.postMeasures.likeCount = (post.postMeasures.likeCount ?? 0) + 1;
              }
              return post;
            } else {
              return post;
            }
          });
          setMyAnotherArr(() => {
            return modPost;
          });
        }
      });
    }
  }
  console.log('ALLPOSTS', myAnotherArr);

  //Function To Handle Open Comments Tray
  function setOpenComments(id: string, show: boolean) {
    let locArr = myAnotherArr;
    let modPost = locArr.map((post: any) => {
      if (post.id == id) {
        post.isOpenComment = show;
        return post;
      } else {
        return post;
      }
    });
    setMyAnotherArr(() => {
      return modPost;
    });
    // loadComments(id);
  }
  function handleShowShare(id: string, val: any) {
    let locArr = myAnotherArr;
    let modPost = locArr.map((post: any) => {
      if (post.id == id) {
        post.showShare = val;

        return post;
      } else {
        return post;
      }
    });
    setMyAnotherArr(() => {
      return modPost;
    });
  }

  //Function To Handle Post Comments
  async function postComments(id: string, e: any) {
    e.preventDefault();

    const commStr = e.target[0].value;
    e.currentTarget.reset();
    let uniqId = generateUniqueId();
    const timestamp = new Date().getTime();
    let obj = {
      id: uniqId,
      createdBy: { ...userObject },
      text: commStr,
      replies: [],
      isOpenReply: false,
      createdOn: timestamp,
      isRespPending: true,
      isLoadingReplies: false,
      isEditOn: false,
    };
    setMyAnotherArr((prevState: any) => {
      const updatedPosts = prevState.map((post: any) => {
        if (post.id === id) {
          const updatedComments = [obj, ...post.comments];
          if (typeof post?.postMeasures?.commentCount === 'number') {
            post.postMeasures.commentCount = (post.postMeasures.commentCount ?? 0) + 1;
          } else {
            post.postMeasures.commentCount = (post.postMeasures.commentCount ?? 0) + 1;
          }
          return { ...post, comments: updatedComments };
        } else {
          return post;
        }
      });
      return updatedPosts;
    });
    let resp = await addPostCommentCall(userToken, id, commStr);
    if (!resp?.data?.data) {
      deleteCommentFromPost(id, uniqId);
    }
    setMyAnotherArr((prevPosts: any) => {
      return prevPosts.map((post: any) => {
        if (post?.id === id) {
          const updatedComments = post.comments.map((comment: any) => {
            if (comment.id === uniqId) {
              return {
                ...comment,
                id: resp?.data?.data,
                isRespPending: false,
              };
            }
            return comment;
          });
          return {
            ...post,
            comments: updatedComments,
          };
        }
        return post;
      });
    });
  }

  const getAllupVotesAndDownVotes = (comeendId: string) => {
    Promise.all([
      getAllUpVotesCall(userToken, comeendId),
      getAllDownVotesCall(userToken, comeendId),
    ])
      .then((response) => {
        console.log(response);
        setAllUpVotes(response[0]?.data?.data);
        setAllDownVote(response[1]?.data?.data);
        setModalForData(true);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  // useEffect(()=>{

  // },[allDownVote,allDownVote])

  function deleteCommentFromPost(postId: string, commentId: string) {
    setMyAnotherArr((prevPosts: any) => {
      return prevPosts.map((post: any) => {
        if (typeof post?.postMeasures?.commentCount === 'number') {
          post.postMeasures.commentCount = (post.postMeasures.commentCount ?? 0) - 1;
        } else {
          post.postMeasures.commentCount = (post.postMeasures.commentCount ?? 0) - 1;
        }
        if (post?.id === postId) {
          const updatedComments = post.comments.filter((comment: any) => {
            if (comment.id === commentId && comment.isDeleted !== true) {
              return false;
            }
            return true;
          });
          return {
            ...post,
            comments: updatedComments,
          };
        }
        return post;
      });
    });
  }

  function deleteReplyFromComment(postId: string, commentId: string, replyId: string) {
    setMyAnotherArr((prevPosts: any) => {
      return prevPosts.map((post: any) => {
        if (post?.id === postId) {
          const updatedComments = post.comments.map((comment: any) => {
            if (comment.id === commentId) {
              const updatedReplies = comment.replies.filter((reply: any) => {
                if (reply.id === replyId && reply.isDeleted !== true) {
                  return false;
                }
                return true;
              });
              const updatedComment = {
                ...comment,
                replies: updatedReplies,
              };
              return updatedComment;
            }
            return comment;
          });
          return {
            ...post,
            comments: updatedComments,
          };
        }
        return post;
      });
    });
  }

  let [deletePostId, setDeletePostId] = useState('');
  let [deleteCommentId, setDeleteCommentId] = useState<any>('');

  //For Comment
  const confirmationForDeleteComment = (id: any) => {
    setDeleteCommentId('');
    setShowDeleteCommentPopup(false);
    deleteCommentByApi(id);
  };

  //Delete Comment Call
  async function deleteCommentByApi(id: any) {
    let resp: any = '';
    if (id.replyId) {
      resp = await deleteCommentCall(userToken, id?.replyId);
    } else {
      resp = await deleteCommentCall(userToken, id?.commentId);
    }
    if (resp?.data?.success === true) {
      if (id?.replyId) {
        deleteReplyFromComment(id?.postId, id?.commentId, id?.replyId);
        setShowNofitication(true);
        setToastSuccess(true);
        setToastMessage('Reply Deleted Successfully !');
      } else {
        deleteCommentFromPost(id?.postId, id?.commentId);
        setShowNofitication(true);
        setToastSuccess(true);
        setToastMessage('Comment Deleted Successfully !');
      }
    }
  }

  //For Post
  const confirmationForDelete = (id: any) => {
    setDeletePostId('');
    setShowDeletePostPopup(false);
    deletePostByApi(id);
  };

  //Delete Post Call
  async function deletePostByApi(id: any) {
    let resp = await deletePostCall(userToken, id);
    if (resp?.data?.success === true) {
      deletePostById(id);
      setShowNofitication(true);
      setToastSuccess(true);
      setToastMessage('Post Deleted Successfully !');
    }
  }

  //Edit Comment Open
  function commentEditOn(postId: any, commentId: any, show: boolean) {
    setMyAnotherArr((prevPosts: any) => {
      return prevPosts.map((post: any) => {
        if (post?.id === postId) {
          const updatedComments = post?.comments?.map((comment: any) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                isEditOn: show,
              };
            }
            return comment;
          });
          return {
            ...post,
            comments: updatedComments,
          };
        }
        return post;
      });
    });
  }

  //Edit Update Reply Open
  function replyEditOn(postId: any, commentId: any, replyId: any, show: boolean) {
    setMyAnotherArr((prevPosts: any) => {
      return prevPosts.map((post: any) => {
        if (post?.id === postId) {
          const updatedComments = post?.comments?.map((comment: any) => {
            if (comment.id === commentId) {
              const updatedReplies = comment?.replies?.map((reply: any) => {
                if (replyId === reply?.id) {
                  return {
                    ...reply,
                    isEditOn: show,
                  };
                }
                return reply;
              });
              return {
                ...comment,
                replies: updatedReplies,
              };
            }
            return comment;
          });
          return {
            ...post,
            comments: updatedComments,
          };
        }
        return post;
      });
    });
  }

  //Edit Reply
  async function editReply(event: any, postId: any, commentId: any, replyId: any) {
    event.preventDefault();
    let editReply = event?.target[0].value;
    replyEditOn(postId, commentId, replyId, false);
    updateReply(postId, commentId, replyId, editReply);
    await AxiosRequest({
      method: 'PUT',
      url: editCommentUrl,
      data: { id: replyId, text: editReply },
    });
  }

  //Update Reply with edited text
  function updateReply(postId: any, commentId: any, replyId: any, updatedString: any) {
    setMyAnotherArr((prevPosts: any) => {
      return prevPosts.map((post: any) => {
        if (post?.id === postId) {
          const updatedComments = post?.comments?.map((comment: any) => {
            if (comment.id === commentId) {
              const updatedReplies = comment?.replies?.map((reply: any) => {
                if (reply.id === replyId) {
                  return {
                    ...reply,
                    text: updatedString,
                  };
                }
                return reply;
              });
              return {
                ...comment,
                replies: updatedReplies,
              };
            }
            return comment;
          });
          return {
            ...post,
            comments: updatedComments,
          };
        }
        return post;
      });
    });
  }

  //Edit Update Comment Open
  function updateComment(postId: any, commentId: any, updatedString: any) {
    setMyAnotherArr((prevPosts: any) => {
      return prevPosts.map((post: any) => {
        if (post?.id === postId) {
          const updatedComments = post?.comments?.map((comment: any) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                text: updatedString,
              };
            }
            return comment;
          });
          return {
            ...post,
            comments: updatedComments,
          };
        }
        return post;
      });
    });
  }

  //Edit Comment
  async function editComment(event: any, postId: any, commentId: any) {
    event.preventDefault();
    let editComm = event?.target[0].value;
    commentEditOn(postId, commentId, false);
    updateComment(postId, commentId, editComm);
    await AxiosRequest({
      method: 'PUT',
      url: editCommentUrl,
      data: { id: commentId, text: editComm },
    });
  }

  //Function for Voting in a poll
  const voteInAPoll = async (pollId: any, pollOptionId: any) => {
    updatePollPost(pollId, pollOptionId);
    await AxiosRequest({
      method: 'PUT',
      url: `${voteInPollUrl}${pollId}/poll-option/${pollOptionId}`,
    });
  };

  //Function to update with latest data of poll
  function updatePollPost(pollId: any, pollOptionId: any) {
    const updatedPollPosts = myAnotherArr.map((pollPost: any) => {
      if (pollPost?.poll?.id === pollId) {
        const updatedPollOptions = pollPost?.poll?.pollOptions?.map((option: any) => {
          if (option?.id === pollOptionId) {
            const updatedOption = { ...option };
            updatedOption.responseCount = updatedOption.responseCount + 1 || 1;
            return updatedOption;
          } else {
            return option;
          }
        });
        return {
          ...pollPost,
          poll: {
            ...pollPost.poll,
            pollResponseCount: pollPost?.poll?.pollResponseCount
              ? pollPost?.poll?.pollResponseCount + 1
              : 1,
            pollOptions: updatedPollOptions,
            optedPollOptionID: pollOptionId,
          },
        };
      } else {
        return pollPost;
      }
    });
    setMyAnotherArr(updatedPollPosts);
  }

  //Function To Handle Posts Feed and Construct React.jsx using data
  function postStructCreate() {
    let locArr2: ReactElement<any, any>[] = [];
    myAnotherArr?.map((post: any) => {
      locArr2.push(
        <div className="postContainer" key={post?.id}>
          <div className="postHeading">
            <div className="postHeaderLeft">
              <img
                className="postUserImage"
                src={
                  post?.createdBy?.profilePictureUrl
                    ? post?.createdBy?.profilePictureUrl
                    : 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'
                }
                alt="User-Pic"
              ></img>
              <div className="postDetailContainer">
                <h5 className="postOwner">
                  <span>{post?.createdBy?.firstName ? post?.createdBy?.firstName : 'Unknown'}</span>
                  &nbsp;
                  <span>{post?.createdBy?.lastName ? post?.createdBy?.lastName : 'User'}</span>
                </h5>
                <h6 className="postCreateDate">
                  <img
                    width="9px"
                    src="https://cdn-icons-png.flaticon.com/512/2088/2088617.png"
                    alt="post time"
                    style={{ opacity: '0.4', marginRight: '4px' }}
                  ></img>
                  <span>
                    {post?.createdOn != 0 &&
                    post?.createdOn &&
                    post?.createdOn != undefined &&
                    post?.createdOn != null
                      ? calculateTimeDifference(post?.createdOn)
                      : 'Recently'}
                  </span>
                </h6>
              </div>
            </div>
            <div className="postHeaderRight">
              <Dropdown>
                <Dropdown.Toggle
                  variant="secondary"
                  id="dropdown-basic"
                  className={styles.dropdownBtn}
                >
                  <button
                    onClick={() => {
                      setReportPostId(post?.id);
                      setReportPostType(post?.postType);
                    }}
                    style={{
                      border: 'none',
                      backgroundColor: 'white',
                      padding: '0',
                    }}
                  >
                    <img
                      className="postMoreOptionsImage"
                      src="https://cdn-icons-png.flaticon.com/512/463/463292.png"
                      alt="pan"
                    />
                  </button>
                </Dropdown.Toggle>

                <Dropdown.Menu className={styles.dropdownMenu}>
                  <Dropdown.Item className={styles.dropdownItem}>
                    <div className={styles.overlayItem}>
                      <div className={styles.dropdownImage}>
                        <NextImage field={bookmarkImage} editable={true} />
                      </div>
                      <div className={styles.reportContainerBtn}>Save Post</div>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item
                    className={styles.dropdownItem}
                    onClick={() => {
                      copyPostLinkToClipboard(post?.id);
                    }}
                  >
                    <div className={styles.overlayItem}>
                      <div className={styles.dropdownImage}>
                        <NextImage field={copylink} editable={true} />
                      </div>
                      <div className={styles.reportContainerBtn}>Copy link to post</div>
                    </div>
                  </Dropdown.Item>
                  {post?.createdBy?.objectId !== objectId ? (
                    <>
                      <Dropdown.Item
                        className={styles.dropdownItem}
                        onClick={() => {
                          showReportPostPopup();
                        }}
                      >
                        <div className={styles.overlayItem}>
                          <div className={styles.dropdownImage}>
                            <NextImage field={reportPostImage} editable={true} />
                          </div>
                          <div className={styles.reportContainerBtn}>Report Post</div>
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Item
                        className={styles.dropdownItem}
                        onClick={() => {
                          setSelectedBlockUserItem(post?.createdBy);
                          setShowBlockUserPopUp(true);
                        }}
                      >
                        <div className={styles.overlayItem}>
                          <div className={styles.dropdownImage}>
                            <NextImage field={BlockUserImage} editable={true} />
                          </div>
                          <div className={styles.reportContainerBtn}>
                            Block {post?.createdBy?.firstName + ' ' + post?.createdBy?.lastName}
                          </div>
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Item
                        className={styles.dropdownItem}
                        onClick={() => {
                          setSelectedBlockUserItem(post?.createdBy);
                          setShowReportUserPopUp(true);
                        }}
                      >
                        <div className={styles.overlayItem}>
                          <div className={styles.dropdownImage}>
                            <NextImage field={reportPostImage} editable={true} />
                          </div>
                          <div className={styles.reportContainerBtn}>
                            Report {post?.createdBy?.firstName + ' ' + post?.createdBy?.lastName}
                          </div>
                        </div>
                      </Dropdown.Item>
                    </>
                  ) : (
                    ''
                  )}
                  {post?.createdBy?.objectId === objectId ? (
                    <Dropdown.Item
                      className={styles.dropdownItem}
                      onClick={() => {
                        setDeletePostId(post?.id);
                        setShowDeletePostPopup(true);
                      }}
                    >
                      <div className={styles.overlayItem}>
                        <div className={styles.dropdownImage}>
                          <NextImage field={Deleteimage} editable={true} />
                        </div>
                        <div className={styles.reportContainerBtn}>Delete Post</div>
                      </div>
                    </Dropdown.Item>
                  ) : (
                    ''
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <div className="postContent">
            <div className="postMedia">
              {post?.mediaList?.map((media: any, num: any) => {
                if (media?.mediaType === 'VIDEO') {
                  return (
                    <div key={num}>
                      <video width="100%" src={media?.url} controls></video>
                    </div>
                  );
                } else if (media?.mediaType === 'DOCUMENT') {
                  return (
                    <div className="docPreviewContainer" key={num}>
                      <span className="openPrevButton">
                        <button
                          onClick={() => openDoc(media?.url)}
                          style={{
                            padding: '5px',
                            borderRadius: '20px',
                            borderColor: 'white',
                          }}
                        >
                          <img
                            width="50px"
                            src="https://cdn-icons-png.flaticon.com/512/2991/2991112.png"
                            alt={num}
                            style={{ margin: '10px' }}
                          ></img>
                          {'DocFile'}
                        </button>
                      </span>
                    </div>
                  );
                } else if (media?.mediaType === 'IMAGE') {
                  return (
                    <div key={num}>
                      <img
                        width="100%"
                        src={media?.url}
                        alt={media?.id}
                        style={{ margin: '0 0 15px 0', objectFit: 'contain' }}
                      ></img>
                    </div>
                  );
                }
                return '';
              })}
            </div>
            {post?.postType === 'EVENT' ? (
              <>
                <div className="postDescription">{parser(modifyHtml(post?.description))}</div>
                <EventCard
                  heading={post?.event?.title}
                  description={post?.event?.description}
                  date={post?.event?.eventDate}
                  eventType={post?.event?.eventType}
                  url={EventImage[post?.event?.eventType]}
                />
              </>
            ) : post?.postType === 'POLL' ? (
              <>
                <div className="postDescription">{parser(modifyHtml(post?.description))}</div>
                <PollCard pollPost={{ poll: post?.poll }} voteInAPoll={voteInAPoll} />
              </>
            ) : post?.postType === 'BLOG_POST' ? (
              <>
                <div className="blogHeading" style={{ fontWeight: 600, fontSize: '50px' }}>
                  {post?.blog?.heading}
                </div>
                <NextImage src={post?.blog?.imageUrl}></NextImage>
                <div className="postDescription">{parser(modifyHtml(post?.blog?.description))}</div>
              </>
            ) : (
              <div className="postDescription">{parser(modifyHtml(post?.description))}</div>
            )}
          </div>

          <div className={styles.postFooterContainer}>
            <div className={styles.likeContainer}>
              <button
                className={styles.likeButton}
                onClick={() => LikePost(post?.id)}
                disabled={post?.isRespPending}
              >
                <NextImage
                  field={post?.isLikedByUser ? like : greylikeimage}
                  editable={true}
                  alt="PostItems"
                  width={18}
                  height={18}
                />
                <span
                  className={styles.likePost}
                  style={post?.isLikedByUser ? { color: '#2e86f9' } : {}}
                >
                  {post?.isLikedByUser ? 'Liked Post' : 'Like Post'}
                </span>
              </button>

              <div className={styles.likeCount}>
                {post?.postMeasures?.likeCount ? post?.postMeasures?.likeCount : '0'}
              </div>
            </div>
            <div className={styles.commentContainer}>
              <button
                className={styles.commentButton}
                onClick={() => setOpenComments(post.id, !post.isOpenComment)}
                aria-controls="anotherCommentsContainer"
                aria-expanded={post?.isOpenComment}
                disabled={post?.isRespPending}
              >
                <NextImage field={comment} editable={true} alt="PostItems" width={18} height={18} />
                <span className={styles.commentPost}>Comment</span>
              </button>
              <div className={styles.commentCount}>
                {post?.postMeasures?.commentCount ? post?.postMeasures?.commentCount : '0'}
              </div>
            </div>

            {/* <div className={styles.shareContainer}>
              <button
                className={styles.shareButton}
                onClick={() => {}}
                aria-controls="anotherCommentsContainer"
                aria-expanded={post?.isOpenComment}
                disabled={post?.isRespPending}
              >
                <NextImage field={share} editable={true} alt="PostItems" width={18} height={18} />
              </button>
              <div className={styles.sharePost}>Share</div>
            </div> */}

            <div className={styles.shareContainer}>
              <Dropdown style={{ alignItems: 'center', display: 'flex' }}>
                <Dropdown.Toggle
                  variant="secondary"
                  id="dropdown-basic"
                  className={ShowShareCss.dropdownBtn}
                >
                  <button
                    onClick={() => handleShowShare(post.id, !post?.showShare)}
                    className={styles.shareButton}
                    disabled={post?.isRespPending}
                  >
                    <img src={share.src} alt="SharePost" />
                    <div className={styles.sharePost}>Share</div>
                  </button>
                </Dropdown.Toggle>

                <Dropdown.Menu className={ShowShareCss.dropdownMenu}>
                  <Dropdown.Item
                    className={ShowShareCss.dropdownItem}
                    target="_blank"
                    href={`${props?.fields?.data?.datasource?.whatsApp?.jsonValue?.value}${process.env.PUBLIC_URL}/post/${post.id}&utm_source=whatsapp&utm_medium=social&utm_term=${post.id}`}
                  >
                    <div className={ShowShareCss.overlayItem}>
                      <div className={ShowShareCss.dropdownImage}>
                        <NextImage
                          className={ShowShareCss.whatsappImage}
                          field={whatsapp}
                          editable={true}
                          width={25}
                          height={25}
                        />
                      </div>
                      <span className={ShowShareCss.targetIcon}>Share on WhatsApp</span>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item
                    className={ShowShareCss.dropdownItem}
                    target="_blank"
                    href={`${props?.fields?.data?.datasource?.twitter?.jsonValue?.value}?url=${process.env.PUBLIC_URL}/post/${post.id}&utm_source=twitter&utm_medium=social&utm_term=${post.id}`}
                  >
                    <div className={ShowShareCss.overlayItem}>
                      <div className={ShowShareCss.dropdownImage}>
                        <NextImage
                          className={ShowShareCss.whatsappImage}
                          field={twitter}
                          editable={true}
                          width={25}
                          height={25}
                        />
                      </div>
                      <span className={ShowShareCss.targetIcon}>Share on Twitter</span>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item
                    className={ShowShareCss.dropdownItem}
                    target="_blank"
                    href={`${props?.fields?.data?.datasource?.linkedIn?.jsonValue?.value}?url=${process.env.PUBLIC_URL}/post/${post.id}&utm_source=linkdeIn&utm_medium=social&utm_term=${post.id}`}
                  >
                    <div className={ShowShareCss.overlayItem}>
                      <div className={ShowShareCss.dropdownImage}>
                        <NextImage
                          className={ShowShareCss.whatsappImage}
                          field={linkedin}
                          editable={true}
                          width={25}
                          height={25}
                        />
                      </div>
                      <span className={ShowShareCss.targetIcon}>Share on LinkedIn</span>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item
                    className={ShowShareCss.dropdownItem}
                    target="_blank"
                    href={`${props?.fields?.data?.datasource?.facebook?.jsonValue?.value}?u=${process.env.PUBLIC_URL}/post/${post.id}&utm_source=facebook&utm_medium=social&utm_term=${post.id}`}
                  >
                    <div className={ShowShareCss.overlayItem}>
                      <div className={ShowShareCss.dropdownImage}>
                        <NextImage
                          className={ShowShareCss.whatsappImage}
                          field={facebook}
                          editable={true}
                          width={25}
                          height={25}
                        />
                      </div>
                      <span className={ShowShareCss.targetIcon}>Share on Facebook</span>
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>

          <Collapse in={post?.isOpenComment}>
            <div id="anotherCommentsContainer" className="loadCommentContainer">
              <Form
                onSubmit={(e) => {
                  postComments(post?.id, e);
                }}
                style={{ border: '1px', borderColor: 'black' }}
              >
                <Form.Group
                  className="mb-2"
                  controlId="comments"
                  style={{ display: 'flex', padding: '5px 15px 0' }}
                >
                  <img
                    className="commentUserImage"
                    src={
                      userObject?.profilePictureUrl
                        ? userObject?.profilePictureUrl
                        : 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'
                    }
                    alt="User-Pic"
                    style={{ marginLeft: '0' }}
                  ></img>
                  <Form.Control
                    // onChange={(e) => setPostCommentValue(e.target.value)}
                    type="text"
                    placeholder="Write a Comment..."
                    required
                    autoFocus
                    style={{ width: '100%', fontSize: '13px', color: '#a5a9ae' }}
                  />
                  <button type="submit" className="postCommentButton">
                    Post
                  </button>
                </Form.Group>
              </Form>
              {post?.comments?.map((comment: any) => {
                return (
                  <>
                    <div className="commentSection">
                      <figure>
                        <img
                          className="commentUserImage"
                          src={
                            comment?.createdBy?.profilePictureUrl
                              ? comment?.createdBy?.profilePictureUrl
                              : 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'
                          }
                          alt="User-Pic"
                          style={{
                            marginLeft: '0',
                          }}
                        ></img>
                      </figure>
                      <div
                        className="commentContainer"
                        id={comment?.id}
                        style={{
                          padding: '10px',
                          backgroundColor: '#F0F0F0',
                          borderRadius: '10px',
                        }}
                      >
                        <h5 className="commentHeadingTop">
                          {comment?.createdBy?.firstName} {comment?.createdBy?.lastName}
                        </h5>
                        {comment?.isEditOn ? (
                          <>
                            <Form
                              style={{ display: 'flex', marginTop: '8px' }}
                              onSubmit={(e) => editComment(e, post?.id, comment?.id)}
                            >
                              <Form.Group style={{ width: '100%' }} controlId="formBasicEmail">
                                <Form.Control type="text" defaultValue={comment?.text} />
                              </Form.Group>
                              <Button
                                style={{
                                  marginLeft: '10px',
                                  backgroundColor: '#47D7AC',
                                  color: 'white',
                                  borderRadius: '5px',
                                  border: 'none',
                                }}
                                variant="primary"
                                type="submit"
                              >
                                Save
                              </Button>
                            </Form>
                            {/* <span>
                              <p className="commentHeading" contentEditable={comment?.isEditOn}>
                                {comment?.text}
                              </p>{' '}
                              <button
                                style={{
                                  border: 'none',
                                  backgroundColor: '#47D7AC',
                                  color: 'white',
                                  borderRadius: '5px',
                                  marginTop: '5px',
                                }}
                              >
                                save
                              </button>
                            </span> */}
                          </>
                        ) : (
                          <p className="commentHeading">{comment?.text}</p>
                        )}
                        <div
                          onClick={() => getAllupVotesAndDownVotes(comment?.id)}
                          className="upvoteDownvoteContainer"
                        >
                          <div className="likecomments">
                            <img
                              className="likecomments"
                              src="https://cdn-icons-png.flaticon.com/512/739/739231.png"
                              alt="Like"
                            />
                          </div>
                          <div className="likecomments">
                            <img className="likecomments" src={downVote.src} alt="Dislike" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div style={{ marginLeft: '55px' }}>
                        {/* <span onClick={() => handleUpvote(comment?.id)}>
                           <img
                              className="likecomments"
                              src={
                                 post?.isLikedByUser
                                 ? 'https://cdn-icons-png.flaticon.com/512/739/739231.png'
                                 : 'https://cdn-icons-png.flaticon.com/512/126/126473.png'
                              }
                              //https://cdn-icons-png.flaticon.com/512/739/739231.png
                              alt="actions"
                           />
                        </span>
                        <span onClick={() => handleDownvote(comment?.id)}>
                           <img
                              width="30px"
                              style={{ margin: '5px' }}
                              className="likecomments"
                              src="https://img.icons8.com/ios/256/thumbs-down.png"
                              alt="downVote"
                           />
                        </span> */}
                        <button
                          onClick={() =>
                            openCommentReplies(post?.id, comment?.id, !comment?.isOpenReply)
                          }
                          aria-controls="repliesContainer"
                          aria-expanded={comment?.isOpenReply}
                          className="commentReply"
                          disabled={comment?.isRespPending}
                          style={comment?.isRespPending ? { opacity: 0.5 } : {}}
                        >
                          Reply
                        </button>
                        <span className="commentPostDate" style={{ fontSize: '12px' }}>
                          {' '}
                          {calculateTimeDifference(comment?.createdOn)}
                        </span>
                        {comment?.createdBy.objectId === objectId && objectId ? (
                          <button
                            disabled={comment?.isRespPending}
                            style={comment?.isRespPending ? { opacity: 0.5 } : {}}
                            onClick={() => {
                              setDeleteCommentId({ postId: post?.id, commentId: comment?.id });
                              setShowDeleteCommentPopup(true);
                            }}
                            className="commentReply"
                          >
                            Delete
                          </button>
                        ) : (
                          ''
                        )}
                        {comment?.createdBy.objectId === objectId && objectId ? (
                          <button
                            disabled={comment?.isRespPending}
                            style={comment?.isRespPending ? { opacity: 0.5 } : {}}
                            onClick={() => {
                              commentEditOn(post?.id, comment?.id, !comment?.isEditOn);
                            }}
                            className="commentReply"
                          >
                            Edit
                          </button>
                        ) : (
                          ''
                        )}
                      </div>
                      <Collapse in={comment?.isOpenReply}>
                        <div style={{ position: 'relative', left: '10%', width: '88%' }}>
                          <Form
                            onSubmit={(e) => {
                              postCommentReply(post?.id, comment?.id, e);
                            }}
                            style={{ border: '1px', borderColor: 'black' }}
                          >
                            <Form.Group
                              controlId="comments"
                              style={{ display: 'flex', padding: '5px 0 15px 15px' }}
                            >
                              <img
                                width="32px"
                                className="commentUserImage"
                                src={
                                  userObject?.profilePictureUrl
                                    ? userObject?.profilePictureUrl
                                    : 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'
                                }
                                alt="User-Pic"
                                style={{ marginLeft: '0' }}
                              ></img>
                              <Form.Control
                                // onChange={(e) => setPostCommentValue(e.target.value)}
                                type="text"
                                placeholder="Write a Reply..."
                                required
                                autoFocus
                                style={{ width: '100%', color: '#a5a9ae', fontSize: '13px' }}
                              />
                              <button type="submit" className="postCommentButton">
                                Reply
                              </button>
                            </Form.Group>
                          </Form>
                          {comment?.replies?.map((reply: any) => {
                            return (
                              <>
                                <div className="commentSection">
                                  <figure>
                                    <img
                                      className="commentUserImage"
                                      src={
                                        reply?.createdBy?.profilePictureUrl
                                          ? reply?.createdBy?.profilePictureUrl
                                          : 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'
                                      }
                                      alt="User-Pic"
                                      style={{
                                        marginLeft: '0',
                                      }}
                                    ></img>
                                  </figure>
                                  <div
                                    id={reply?.id}
                                    style={{
                                      padding: '10px',
                                      backgroundColor: '#F0F0F0',
                                      borderRadius: '10px',
                                    }}
                                    className="commentContainer"
                                  >
                                    <h5 className="commentHeadingTop">
                                      {reply?.createdBy?.firstName} {reply?.createdBy?.lastName}{' '}
                                    </h5>
                                    {reply?.isEditOn ? (
                                      <Form
                                        style={{ display: 'flex', marginTop: '8px' }}
                                        onSubmit={(e) =>
                                          editReply(e, post?.id, comment?.id, reply?.id)
                                        }
                                      >
                                        <Form.Group
                                          style={{ width: '100%' }}
                                          controlId="formBasicEmail"
                                        >
                                          <Form.Control type="text" defaultValue={reply?.text} />
                                        </Form.Group>
                                        <Button
                                          style={{
                                            marginLeft: '10px',
                                            backgroundColor: '#47D7AC',
                                            color: 'white',
                                            borderRadius: '5px',
                                            border: 'none',
                                          }}
                                          variant="primary"
                                          type="submit"
                                        >
                                          Save
                                        </Button>
                                      </Form>
                                    ) : (
                                      <p className="commentHeading">{reply?.text}</p>
                                    )}
                                    <div
                                      onClick={() => getAllupVotesAndDownVotes(reply?.id)}
                                      className="upvoteDownvoteContainer"
                                    >
                                      <div className="likecomments">
                                        <img
                                          className="likecomments"
                                          src="https://cdn-icons-png.flaticon.com/512/739/739231.png"
                                          alt="Like"
                                        />
                                      </div>
                                      <div className="likecomments">
                                        <img
                                          className="likecomments"
                                          src={downVote.src}
                                          alt="Dislike"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div
                                  style={{
                                    marginLeft: '55px',
                                  }}
                                >
                                  {/* <span onClick={() => handleUpvote(reply?.id)}>
                                    <img
                                    style={{ margin: '5px' }}
                                    width="30px"
                                    className="likecomments"
                                    src="https://cdn-icons-png.flaticon.com/512/126/126473.png"
                                    alt="upvote"
                                    />
                                 </span>
                                 <span onClick={() => handleDownvote(reply?.id)}>
                                    <img
                                    width="30px"
                                    style={{ margin: '5px' }}
                                    className="likecomments"
                                    src="https://img.icons8.com/ios/256/thumbs-down.png"
                                    alt="downVote"
                                    />
                                 </span> */}
                                  <button
                                    aria-controls="replyOfReplyContainer"
                                    aria-expanded={reply?.isOpenReplyOfReply}
                                    className="commentReply"
                                    onClick={() =>
                                      openReplyOfReply(
                                        post?.id,
                                        comment?.id,
                                        reply?.id,
                                        !reply?.isOpenReplyOfReply
                                      )
                                    }
                                    disabled={reply?.isRespPending}
                                    style={reply?.isRespPending ? { opacity: 0.5 } : {}}
                                  >
                                    Reply
                                  </button>
                                  <span className="commentPostDate" style={{ fontSize: '12px' }}>
                                    {' '}
                                    {calculateTimeDifference(reply?.createdOn)}
                                  </span>
                                  {comment?.createdBy.objectId === objectId && objectId ? (
                                    <button
                                      disabled={comment?.isRespPending}
                                      onClick={() => {
                                        setDeleteCommentId({
                                          postId: post?.id,
                                          commentId: comment?.id,
                                          replyId: reply?.id,
                                        });
                                        setShowDeleteCommentPopup(true);
                                      }}
                                      className="commentReply"
                                      style={reply?.isRespPending ? { opacity: 0.5 } : {}}
                                    >
                                      Delete
                                    </button>
                                  ) : (
                                    ''
                                  )}
                                  {reply?.createdBy?.objectId === objectId && objectId ? (
                                    <button
                                      disabled={reply?.isRespPending}
                                      style={reply?.isRespPending ? { opacity: 0.5 } : {}}
                                      onClick={() => {
                                        replyEditOn(
                                          post?.id,
                                          comment?.id,
                                          reply?.id,
                                          !reply?.isEditOn
                                        );
                                      }}
                                      className="commentReply"
                                    >
                                      Edit
                                    </button>
                                  ) : (
                                    ''
                                  )}
                                </div>
                                <Collapse in={reply?.isOpenReplyOfReply}>
                                  <div style={{ position: 'relative', left: '10%', width: '88%' }}>
                                    <Form
                                      onSubmit={(e) => {
                                        postCommentReply(post?.id, comment?.id, e);
                                      }}
                                      style={{ border: '1px', borderColor: 'black' }}
                                    >
                                      <Form.Group controlId="comments" style={{ display: 'flex' }}>
                                        <img
                                          width="32px"
                                          className="commentUserImage"
                                          src={
                                            userObject?.profilePictureUrl
                                              ? userObject?.profilePictureUrl
                                              : 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'
                                          }
                                          alt="User-Pic"
                                          style={{ marginLeft: '0' }}
                                        ></img>
                                        <Form.Control
                                          // onChange={(e) => setPostCommentValue(e.target.value)}
                                          type="text"
                                          placeholder="Write a Reply..."
                                          required
                                          autoFocus
                                          style={{
                                            width: '100%',
                                            color: '#a5a9ae',
                                            fontSize: '13px',
                                          }}
                                        />
                                        <button type="submit" className="postCommentButton">
                                          Reply
                                        </button>
                                      </Form.Group>
                                    </Form>
                                  </div>
                                </Collapse>
                              </>
                            );
                          })}
                          {comment?.hasReply ? (
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginBottom: '16px',
                                marginTop: '16px',
                              }}
                            >
                              {comment.isLoadingReplies ? (
                                <Spinner animation="border" />
                              ) : (
                                <button
                                  onClick={() => loadCommentReplies(post?.id, comment?.id)}
                                  className="postCommentButton"
                                  style={{
                                    marginLeft: '0',
                                  }}
                                >
                                  <span>Load Replies...</span>
                                </button>
                              )}
                            </div>
                          ) : (
                            ''
                          )}
                        </div>
                      </Collapse>
                    </div>
                  </>
                );
              })}
              {post?.postMeasures?.commentCount > 0 ? (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  {post.isLoadingComments ? (
                    <Spinner animation="border" />
                  ) : (
                    <button
                      onClick={() => loadComments(post.id)}
                      className="postCommentButton"
                      style={{
                        marginBottom: '16px',
                        marginLeft: '0',
                      }}
                    >
                      <span>Load Comments...</span>
                    </button>
                  )}
                </div>
              ) : (
                ''
              )}
            </div>
          </Collapse>
        </div>
      );
    });
    setPosts(locArr2);
  }

  function openReplyOfReply(postId: string, commentId: string, replyId: string, open: boolean) {
    let locArr = myAnotherArr;
    locArr.map((post: any) => {
      if (post?.id == postId && post.comments?.length > 0) {
        post.comments.map((comment: any) => {
          if (comment?.id == commentId) {
            comment?.replies?.map((reply: any) => {
              if (reply?.id == replyId) {
                reply.isOpenReplyOfReply = open;
                return reply;
              } else {
                return reply;
              }
            });
            return comment;
          } else {
            return comment;
          }
        });
      }
    });
    updateArrayWithLatestdata(locArr);
  }

  function openCommentReplies(postId: string, commentid: any, open: boolean) {
    let locArr = myAnotherArr;
    locArr.map((post: any) => {
      if (post.id === postId && post.comments?.length > 0) {
        post.comments.map((comment: any) => {
          if (comment?.id == commentid) {
            comment.isOpenReply = open;
            return comment;
          } else {
            return comment;
          }
        });
      }
    });
    updateArrayWithLatestdata(locArr);
    // loadCommentReplies(postId, commentid);
  }

  async function postCommentReply(postId: string, commentId: string, e: any) {
    e.preventDefault();
    const commentString = e.target[0].value;
    e.currentTarget.reset();

    let uniqId = generateUniqueId();
    const timestamp = new Date().getTime();
    let replyObj = {
      id: uniqId,
      createdBy: { ...userObject },
      text: commentString,
      hasReply: true,
      isOpenReplyOfReply: false,
      createdOn: timestamp,
      isRespPending: true,
      isEditOn: false,
    };
    setMyAnotherArr((prevState: any) => {
      const updatedPosts = prevState.map((post: any) => {
        if (post.id === postId) {
          const updatedComments = post.comments.map((comment: any) => {
            if (comment.id === commentId) {
              const updatedReplies = [replyObj, ...comment.replies];
              return {
                ...comment,
                replies: updatedReplies,
              };
            } else {
              return comment;
            }
          });
          return { ...post, comments: updatedComments };
        } else {
          return post;
        }
      });
      return updatedPosts;
    });
    let resp = await postCommentReplyCall(userToken, postId, commentId, commentString);
    if (!resp?.data?.data) {
      deleteReplyFromComment(postId, commentId, uniqId);
    }
    setMyAnotherArr((prevPosts: any) => {
      return prevPosts.map((post: any) => {
        if (post.id === postId) {
          const updatedComments = post.comments.map((comment: any) => {
            if (comment.id === commentId) {
              const updatedReplies = comment.replies.map((reply: any) => {
                if (reply.id === uniqId) {
                  return {
                    ...reply,
                    id: resp?.data?.data,
                    isRespPending: false,
                  };
                } else {
                  return reply;
                }
              });
              return {
                ...comment,
                replies: updatedReplies,
              };
            } else {
              return comment;
            }
          });
          return { ...post, comments: updatedComments };
        } else {
          return post;
        }
      });
    });
  }

  function updateArrayWithLatestdata(locArr: any) {
    setMyAnotherArr((prevPosts: any) => {
      return prevPosts.map((post: any, index: number) => {
        if (index < locArr.length) {
          return locArr[index];
        } else {
          return post;
        }
      });
    });
  }

  async function loadCommentReplies(postId: string, id: string) {
    loadingReplies(postId, id, true);
    let resp = await getCommentsReplyCall(userToken, id, 0);
    loadingReplies(postId, id, false);
    let locArr = myAnotherArr;
    resp?.data?.data.map((reply: any) => {
      reply.isOpenReplyOfReply = false;
      reply.isEditOn = false;
    });
    locArr.map((post: any) => {
      if (post.comments?.length > 0) {
        post.comments.map((comment: any) => {
          if (comment?.id == id) {
            comment.replies = resp?.data?.data;
            return comment;
          } else {
            return comment;
          }
        });
      }
    });
    updateArrayWithLatestdata(locArr);
  }

  function loadingComments(id: any, val: boolean) {
    setMyAnotherArr((prevPosts: any) => {
      return prevPosts.map((post: any) => {
        if (post.id === id) {
          return {
            ...post,
            isLoadingComments: val,
          };
        } else {
          return post;
        }
      });
    });
  }

  function loadingReplies(postId: string, commentId: string, val: boolean) {
    setMyAnotherArr((prevPosts: any) => {
      return prevPosts.map((post: any) => {
        if (post.id === postId) {
          const updatedComments = post.comments.map((comment: any) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                isLoadingReplies: val,
              };
            } else {
              return comment;
            }
          });
          return {
            ...post,
            comments: updatedComments,
          };
        } else {
          return post;
        }
      });
    });
  }

  async function loadComments(id: any) {
    loadingComments(id, true);
    let resp = await getCommentsCall(userToken, id, 0);
    loadingComments(id, false);
    let respArr = resp?.data?.data;
    respArr?.map((comment: any) => {
      comment.isOpenReply = false;
      comment.replies = [];
      comment.isLoadingReplies = false;
    });
    let locArr = myAnotherArr;
    locArr.map((post: any) => {
      if (id === post?.id && respArr) {
        let comm = [...respArr];
        post.comments = comm;
        return post;
      }
    });
    updateArrayWithLatestdata(locArr);
  }

  function addLatestCreatedPost(id: string, localId: string) {
    localId;
    getPostByIdCall(userToken, id).then((response) => {
      if (response?.data?.data != undefined) {
        let resp = response?.data?.data;
        setMyAnotherArr((prevPosts: any) => {
          return prevPosts.map((post: any) => {
            if (post?.id === localId) {
              let updatedPoll = null;
              if (post?.postType === 'POLL') {
                let updatedOptions: any[] = [];
                post.poll.pollOptions.forEach((option: any) => {
                  let matchingOption = resp.poll.pollOptions.find(
                    (opt: any) => opt.optionText === option.optionText
                  );
                  if (matchingOption) {
                    updatedOptions.push({ ...option, id: matchingOption.id });
                  } else {
                    updatedOptions.push(option);
                  }
                });
                updatedPoll = { ...post.poll, pollOptions: updatedOptions, id: resp?.poll?.id };
              } else {
                updatedPoll = post.poll;
              }
              return {
                ...post,
                id: resp.id,
                isRespPending: false,
                poll: updatedPoll,
              };
            }
            return post;
          });
        });
      }
    });
  }

  const HandleScrollEvent = () => {
    if (
      element?.scrollTop + element?.clientHeight >= element?.scrollHeight &&
      ifReachedEnd == false
    ) {
      setIfReachedEnd(true);
    }
  };

  let element: any = '';
  if (typeof document !== 'undefined') {
    element = document?.querySelector('#PostFeedList');

    element?.addEventListener('scroll', HandleScrollEvent);
  }

  function calculateTimeDifference(postDate: any) {
    postDate = new Date(postDate);
    // Get current time in milliseconds
    const currentTime = new Date().getTime();

    // Calculate time difference in hours, minutes, and days
    const timeDiffMs = currentTime - postDate.getTime();
    const timeDiffHours = Math.floor(timeDiffMs / (1000 * 60 * 60));
    const timeDiffMinutes = Math.floor(timeDiffMs / (1000 * 60));
    const timeDiffDays = Math.floor(timeDiffMs / (1000 * 60 * 60 * 24));

    // Log the time difference in the appropriate unit
    if (timeDiffHours >= 24) {
      return `${timeDiffDays} ${timeDiffDays > 1 ? 'days' : 'day'} ago`;
    } else if (timeDiffMinutes >= 60) {
      return `${timeDiffHours} ${timeDiffHours > 1 ? 'hours' : 'hour'} ago`;
    } else {
      return `${timeDiffMinutes} ${timeDiffMinutes > 1 ? 'minutes' : 'minute'} ago`;
    }
  }

  //Function To Handle Post Submit
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (postText == '') {
      return;
    }
    // console.log('mention inside api call component', addedPeers);
    const timestamp = new Date().getTime();
    let uniqId = generateUniqueId();
    let obj = {
      data: {
        data: {
          id: uniqId,
          description: postText,
          postType: globalPostType,
          mediaList: [...file, ...docs, ...videoLink],
          postMeasures: {
            likeCount: 0,
            commentCount: 0,
            repostCount: 0,
          },
          createdBy: { ...userObject },
          event: eventPost?.event,
          createdOn: timestamp,
          isLikedByUser: false,
          comments: [],
          isRespPending: true,
          isLoadingComments: false,
          poll: pollPost?.poll,
        },
      },
    };
    setShowForm1(false);
    setMyAnotherArr((prevState: any) => {
      return [obj?.data?.data, ...prevState];
    });
    addPostCall(userToken, {
      description: postText,
      mediaList: [...file, ...docs, ...videoLink],
      taggedPeers: addedPeers,
      type: globalPostType,
      event: eventPost?.event,
      poll: pollPost?.poll,
    }).then((response) => {
      if (response?.data?.data) {
        addLatestCreatedPost(response?.data?.data, uniqId);
        // Empty Post Values
        setFile([]);
        setPostText('');
        setVideoLink([]);
        setDocs([]);
        setEditorState(() => EditorState.createEmpty());
        setEventPost('');
        setPollPost('');
        setGlobalPostType('TEXT_POST');
        setShowForm1(false);
      } else {
        setShowForm1(true);
        setShowNofitication(true);
        setToastError(true);
        setToastMessage('Post Not Created !');
        deletePostById(uniqId);
      }
    });
  };

  function deletePostById(postId: any) {
    setMyAnotherArr((prevPosts: any) => {
      return prevPosts.filter((post: any) => post.id !== postId);
    });
  }

  function clickmebuttonHandler() {
    if (typeof document !== undefined) {
      let buttEle = document.getElementById('clickmebutton');
      buttEle?.click();
    }
  }

  function clickmebuttonHandler2() {
    if (typeof document !== undefined) {
      let buttEle = document.getElementById('clickmebutton2');
      buttEle?.click();
    }
  }

  function clickmebuttonHandler3() {
    if (typeof document !== undefined) {
      let buttEle = document.getElementById('clickmebutton3');
      buttEle?.click();
    }
  }

  async function UploadFilesToServer(file: any, type: string) {
    return await uploadFilesCall(userToken, file, type).then((response) => {
      return response?.data;
    });
  }

  //Function To Handle Load Image Files
  async function uploadMultipleFiles(e: any) {
    const files = e.target.files;
    const fileArray: any = [];
    for (let i = 0; i < files.length; i++) {
      const temp = files[i];
      let resp = await UploadFilesToServer(temp, 'IMAGE');
      if (!resp?.data) break;
      let uniqueId = generateUniqueId();
      fileArray.push({ id: uniqueId, url: resp?.data, mediaType: 'IMAGE', mediaSequence: 0 });
    }
    if (fileArray.length === files.length) {
      setFile(fileArray);
    }
  }
  //Function To Handle Load Doc Files
  async function uploadMultipleDocs(e: any) {
    const files = e.target.files;
    const fileArray: any = [];

    for (let i = 0; i < files.length; i++) {
      let resp = await UploadFilesToServer(files[i], 'DOC');
      if (!resp?.data) break;
      let uniqueId = generateUniqueId();
      fileArray.push({
        id: uniqueId,
        url: resp?.data,
        // name: files[i].name,
        mediaType: 'DOCUMENT',
        mediaSequence: 0,
      });
    }
    if (fileArray.length === files.length) {
      setDocs(fileArray);
    }
  }

  //Function To Handle Load Video Files
  async function uploadVideo(e: any) {
    const files = e.target.files;
    const fileArray: any = [];

    for (let i = 0; i < files?.length; i++) {
      let resp = await UploadFilesToServer(files[i], 'VIDEO');
      if (!resp?.data) break;
      let uniqueId = generateUniqueId();
      fileArray.push({
        id: uniqueId,
        url: resp?.data,
        // name: files[i]?.name,
        mediaType: 'VIDEO',
        mediaSequence: 0,
      });
    }
    if (fileArray?.length === files?.length) {
      setVideoLink(fileArray);
    }
  }

  //Function To Handle Delete Image Files
  function clickCrossImageButton(id: any) {
    setFile(
      file.filter((img: any) => {
        if (img.id != id) {
          return img;
        }
      })
    );

    if (typeof document !== undefined) {
      let buttEle: any = document.getElementById('clickmebutton');
      if (buttEle != null) {
        buttEle.value = '';
      }
    }
  }

  //Function To Handle Delete Doc Files
  function clickCrossDocButton(id: any) {
    setDocs(
      docs.filter((doc: any) => {
        if (doc.id != id) {
          return doc;
        }
      })
    );

    if (typeof document !== undefined) {
      let buttEle: any = document.getElementById('clickmebutton2');
      if (buttEle != null) {
        buttEle.value = '';
      }
    }
  }

  //Function To Handle Delete Video Files
  function clickCrossVideoButton() {
    setVideoLink([]);
    if (typeof document !== undefined) {
      let buttEle: any = document.getElementById('clickmebutton3');
      if (buttEle != null) {
        buttEle.value = '';
      }
    }
  }

  //Function To Handle Open Doc Files in New Window
  function openDoc(base64: string) {
    var base64pdf = base64;

    if (window !== undefined) {
      var pdfWindow = window.open('', '_blank');
      pdfWindow?.document.write(`<iframe width='100%' height='100%' src=${base64pdf}></iframe>`);
    }
  }

  // const handleAll  = ( ) => {

  // }
  const closeModal = () => {
    setModalForData(false);
    setShowup('up');
  };

  // let [modalVoteData, setModalVoteData] = useState(allUpVotes);

  const handleUp = () => {
    setShowup('up');
  };

  const handleDown = () => {
    setShowup('down');
  };
  const ModalForReactions = () => {
    return (
      <Modal
        show={modalForData}
        onHide={closeModal}
        backdrop="static"
        keyboard={false}
        centered
        animation={true}
        scrollable={true}
        className={addPostCss.modal}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: '#283895' }}>Reactions</Modal.Title>
        </Modal.Header>
        <Modal.Body className={addPostCss.modalBody}>
          <div className={addPostCss.btnConatiner}>
            {/* <button
                onClick={handleAll}
                // className={allFilterState ? addPostCss.active : addPostCss.filterBtn}
              >
                ALL
              </button> */}
            <button
              onClick={handleUp}
              className={addPostCss.filterBtn}
              style={{ color: '#000E46' }}
            >
              Up
            </button>
            <button
              onClick={handleDown}
              className={addPostCss.filterBtn}
              style={{ color: '#000E46' }}
            >
              Down
            </button>
          </div>
          {showUp === 'up'
            ? allUpVotes?.map((user: any, id) => {
                return (
                  <div key={id} className={addPostCss.modalUserContainer}>
                    <div className={addPostCss.modalUserDetailContainer}>
                      <img className={addPostCss.userImg} src={Profile.src} />
                      <div>
                        <div>{user?.firstName}</div>
                        <div>{user?.objectId}</div>
                      </div>
                    </div>
                  </div>
                );
              })
            : allDownVote?.map((user: any, id) => {
                return (
                  <div key={id} className={addPostCss.modalUserContainer}>
                    <div className={addPostCss.modalUserDetailContainer}>
                      <img className={addPostCss.userImg} src={Profile.src} />
                      <div>
                        <div>{user?.firstName}</div>
                        <div>{user?.objectId}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="" onClick={closeModal} className="closeButton">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  // const hours = String(now.getHours()).padStart(2, '0');
  // const minutes = String(now.getMinutes()).padStart(2, '0');
  const minDate = `${year}-${month}-${day}`;

  function emptyEvent() {
    setEventPost('');
  }

  function submitEventForm(event: any) {
    event.preventDefault();
    if (eventType === 'Select Event Type') {
      setShowNofitication(true);
      setToastError(true);
      setToastMessage('Please Select Event Type !');
      return;
    }
    const title = event.target[1].value;
    const date = event.target[2].value;
    const time = event.target[3].value;
    const description = event.target[5].value;

    setEventPost({
      event: {
        title: title,
        description: description,
        eventType: eventType,
        eventDate: `${date}T${time}`,
      },
    });
    setShowEvent(false);
    event.currentTarget?.reset();
    setEventType('Select Event Type');
  }

  let [showPollForm, setShowPollForm] = useState(false);
  let option1Id = generateUniqueId();
  let option2Id = generateUniqueId();
  let option1 = {
    id: option1Id,
    name: 1,
    placeholder: 1,
    optionSequence: 0,
    optionText: '',
  };
  let option2 = {
    id: option2Id,
    name: 2,
    placeholder: 2,
    optionSequence: 1,
    optionText: '',
  };
  let [pollFormOptions, setPollFormOptions] = useState<any>([option1, option2]);
  let [pollOptionCount, setPollOptionCount] = useState(2);
  let [isOptionsThreshold, setoptionsThreshold] = useState(false);
  let [isDeleteOptionThreshold, setIsDeleteOptionThreshold] = useState(true);
  let [pollQuestion, setPollQuestion] = useState('');

  function addPollOption() {
    if (pollOptionCount < 4) {
      setPollOptionCount((prevCount) => {
        return prevCount + 1;
      });
      let option = {
        id: option2Id,
        name: pollOptionCount + 1,
        placeholder: pollOptionCount + 1,
        optionText: '',
        optionSequence: pollOptionCount,
      };
      setPollFormOptions((prevState: any) => {
        return [...prevState, option];
      });

      if (pollOptionCount + 1 >= 4) {
        setoptionsThreshold(true);
      }
      setIsDeleteOptionThreshold(false);
    }
  }
  function deleteLastPollOption() {
    if (pollOptionCount > 2) {
      setPollFormOptions((prev: any) => {
        const newOptions = [];
        for (let i = 0; i < prev.length - 1; i++) {
          newOptions.push(prev[i]);
        }
        return newOptions;
      });
      setPollOptionCount((prevCount) => prevCount - 1);
    }
    if (pollOptionCount - 1 < 4) {
      setoptionsThreshold(false);
    }
    setIsDeleteOptionThreshold(pollOptionCount - 1 <= 2);
  }

  function clearPollForm() {
    setPollQuestion('');
    setPollFormOptions([option1, option2]);
    setPollOptionCount(2);
    setIsDeleteOptionThreshold(true);
  }

  function pollOptionUpdate(id: any, e: any) {
    e.preventDefault();
    setPollFormOptions((prevOptions: any) => {
      return prevOptions.map((option: any) => {
        if (option.id === id) {
          return { ...option, optionText: e.target.value };
        } else {
          return option;
        }
      });
    });
  }

  function updatePollQuestion(e: any) {
    e.preventDefault();
    setPollQuestion(e.target.value);
  }

  function emptyPollPost() {
    setPollPost('');
  }

  function submitPollForm(event: any) {
    event.preventDefault();
    let newArr = pollFormOptions.map((options: any) => {
      return {
        optionSequence: options.optionSequence,
        optionText: options.optionText,
        responsePercentage: options.responsePercentage,
        responseCount: options.responseCount,
      };
    });
    let pollVar = {
      poll: {
        pollQuestion: pollQuestion,
        pollOptions: newArr,
      },
    };
    setPollPost({
      poll: pollVar.poll,
    });
    clearPollForm();
    setShowPollForm(false);
  }

  let [eventImage, setEventImage] = useState(
    'https://chinchincelebration.com/wp-content/uploads/2019/08/product-launch-events-min.png'
  );

  useEffect(() => {
    props?.fields?.data?.datasource?.eventType?.targetItems.map((item: any) => {
      if (item?.title?.jsonValue?.value === 'Seminar')
        item.image =
          'https://higherlogicdownload.s3.amazonaws.com/APSNET/UploadedImages/tAiEB79vTYq1gz2UEGu1_IMG_2866-L.jpg';
      if (item?.title?.jsonValue?.value === 'Conference')
        item.image = 'https://th.bing.com/th/id/OIP.IXdC6XgETCp5RaM3iQCb6QHaE8?pid=ImgDet&rs=1';
      if (item?.title?.jsonValue?.value === 'Announcement')
        item.image = 'https://th.bing.com/th/id/OIP.zPaWJzUBQwbXDjhCtCtI1gHaE8?pid=ImgDet&rs=1';
      if (item?.title?.jsonValue?.value === 'Launch Event')
        item.image = 'https://live.staticflickr.com/808/39724254630_e9cdcb8e77_b.jpg';
      if (item?.title?.jsonValue?.value === 'Celebration')
        item.image = 'https://th.bing.com/th/id/OIP.E1RiHHXMHUcq0L0KvprXfQHaEn?pid=ImgDet&rs=1';
      return item;
    });
  }, [props]);

  if (typeof window !== 'undefined')
    window?.addEventListener('scroll', () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight) {
        HandleScrollEvent();
      }
    });

  return (
    <>
      <div className={styles.mainContainer}>
        {!(pageRoute === '/viewProfile') ? (
          <>
            <div className={styles.addPostWidgetContainer}>
              {/* <div style={{ marginBottom: '40px' }}> */}
              <div className={styles.addPostFieldContainer}>
                <div className={styles.addPostField}>
                  <div className={styles.addPostImage}>
                    <NextImage
                      field={user}
                      editable={true}
                      alt="Profile-Pic"
                      width={27}
                      height={27}
                    />
                  </div>
                  {showForm1 ? (
                    <Collapse in={showForm1}>
                      <div
                        className="AddPostEditorContainer"
                        style={{ maxWidth: '100%' }}
                        id="showAddPostEditorContainer"
                      >
                        <div className={styles.addTextEditor}>
                          <Form style={{ border: '1px', borderColor: 'black' }}>
                            <Form.Group controlId="exampleForm.ControlInput1">
                              <Editor
                                editorState={editorState}
                                onEditorStateChange={(e) => onEditorStateChangeHandler(e)}
                                wrapperClassName="wrapper-class"
                                editorClassName="editor-class"
                                toolbarClassName="toolbar-class"
                                editorStyle={{
                                  height: '200px',
                                  padding: '0px 10px',
                                  fontSize: '13px',
                                }}
                                placeholder="Share Your Thoughts..."
                                toolbar={toolbar}
                                // toolbarOnFocus={true}
                                mention={{
                                  separator: ' ',
                                  trigger: '@',
                                  suggestions: mentionUserData,
                                }}
                                hashtag={{}}
                              />
                              {/* <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <div>
                            {currentCount}/{5000} characters
                          </div>
                        </div> */}
                              {/* <Form.Control
                          onChange={(e) => setPostTextValue(e.target.value)}
                          value={postText}
                          as="textarea"
                          rows={7}
                          placeholder="Share Your Thoughts..."
                          required
                          style={{ border: 'none', resize: 'none' }}
                        /> */}
                            </Form.Group>
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                              {file.map((img: any, num: any) => {
                                return (
                                  <div
                                    key={num}
                                    style={{
                                      borderRadius: '30px',
                                      margin: '0px 15px 15px 0px',
                                    }}
                                  >
                                    <button
                                      type="button"
                                      style={{
                                        position: 'absolute',
                                        border: 'none',
                                        borderRadius: '15px',
                                      }}
                                      onClick={() => clickCrossImageButton(img.id)}
                                    >
                                      <img
                                        width="30px"
                                        src="https://cdn-icons-png.flaticon.com/512/3416/3416079.png"
                                        alt="cross_button"
                                        style={{ borderRadius: '30px' }}
                                      ></img>
                                    </button>
                                    <img width="300px" src={img?.url} alt={img?.id}></img>
                                  </div>
                                );
                              })}
                            </div>
                            <div
                              style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}
                            >
                              {docs.map((doc: any, num: any) => {
                                return (
                                  <div className="docPreviewContainer" key={num}>
                                    <span className="openPrevButton">
                                      <button
                                        onClick={() => openDoc(doc?.url)}
                                        style={{
                                          padding: '5px',
                                          borderRadius: '20px',
                                          borderColor: 'white',
                                        }}
                                      >
                                        <img
                                          width="50px"
                                          src="https://cdn-icons-png.flaticon.com/512/2991/2991112.png"
                                          alt={num}
                                          style={{ margin: '10px' }}
                                        ></img>
                                        {doc.name}
                                      </button>
                                    </span>

                                    <span>
                                      <button
                                        style={{ border: 'none', backgroundColor: 'white' }}
                                        type="button"
                                        onClick={() => clickCrossDocButton(doc.id)}
                                      >
                                        <img
                                          width="30px"
                                          src="https://cdn-icons-png.flaticon.com/512/3416/3416079.png"
                                          alt="cross_button"
                                          style={{ marginLeft: '10px' }}
                                        ></img>
                                      </button>
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap' }} id="setVideoPreview">
                              {videoLink.map((video: any, num: any) => {
                                return (
                                  <div key={num}>
                                    <video width="100%" src={video?.url} controls></video>
                                    <div>
                                      <img
                                        width="50px"
                                        src="https://cdn-icons-png.flaticon.com/512/711/711245.png"
                                        alt={num}
                                        style={{ margin: '10px' }}
                                      ></img>
                                      <span>
                                        {video.name}
                                        <button
                                          style={{ border: 'none', backgroundColor: 'white' }}
                                          type="button"
                                          onClick={clickCrossVideoButton}
                                        >
                                          <img
                                            width="30px"
                                            src="https://cdn-icons-png.flaticon.com/512/3416/3416079.png"
                                            alt="cross_button"
                                            style={{ marginLeft: '10px' }}
                                          ></img>
                                        </button>
                                      </span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                            <div>
                              {eventPost?.event?.title ? (
                                <div style={{ display: 'grid' }}>
                                  <button
                                    style={{
                                      position: 'absolute',
                                      justifySelf: 'flex-end',
                                      marginTop: '20px',
                                      border: 'none',
                                      borderRadius: '20px',
                                    }}
                                    type="button"
                                    onClick={() => emptyEvent()}
                                  >
                                    <img
                                      width="30px"
                                      src="   https://cdn-icons-png.flaticon.com/512/1617/1617543.png "
                                      alt="crossButton"
                                    />
                                  </button>
                                  <EventCard
                                    heading={eventPost?.event?.title}
                                    description={eventPost?.event?.description}
                                    date={eventPost?.event?.eventDate}
                                    eventType={eventPost?.event?.eventType}
                                    url={EventImage[eventPost?.event?.eventType]}
                                  />
                                </div>
                              ) : (
                                ''
                              )}
                            </div>
                            <div>
                              {pollPost?.poll?.pollQuestion ? (
                                <div
                                  style={{
                                    padding: '12px',
                                    border: '1px solid darkgrey',
                                    borderRadius: '20px',
                                    margin: '16px',
                                  }}
                                >
                                  <button
                                    type="button"
                                    onClick={() => emptyPollPost()}
                                    style={{
                                      border: 'none',
                                      backgroundColor: 'white',
                                      position: 'relative',
                                      float: 'right',
                                      padding: '0px',
                                      borderRadius: '30px',
                                    }}
                                  >
                                    <img
                                      width="30px"
                                      src="https://cdn-icons-png.flaticon.com/512/1617/1617543.png"
                                      alt="crossButton"
                                    />
                                  </button>
                                  <PollCard pollPost={pollPost} />
                                </div>
                              ) : (
                                ''
                              )}
                            </div>
                          </Form>
                        </div>
                      </div>
                    </Collapse>
                  ) : (
                    <button
                      className={styles.addPostButton}
                      onClick={() => setShowForm1(!showForm1)}
                      aria-controls="showAddPostEditorContainer"
                      aria-expanded={showForm1}
                    >
                      <div className={styles.addPostHeading}>
                        {props?.fields?.data?.datasource?.placeholderText?.jsonValue?.value
                          ? props?.fields?.data?.datasource?.placeholderText?.jsonValue?.value
                          : "What's on your mind"}
                        {``}
                        {/* <span>
                    {userObject?.firstName ? userObject?.firstName : ''}{' '}
                    {userObject?.lastName ? userObject?.lastName : ''}
                  </span> */}
                      </div>
                    </button>
                  )}
                </div>
              </div>
              <div className={styles.AddPostItems}>
                <div>
                  <button
                    className={styles.addPostFileButtons}
                    onClick={() => {
                      setShowForm1(true);
                      clickmebuttonHandler();
                    }}
                    disabled={disableAddImage}
                    type="button"
                  >
                    {/* <span>Image</span> */}
                    <NextImage
                      field={image}
                      editable={true}
                      style={{ opacity: disableAddImage ? '0.2' : '1' }}
                      alt="Profile-Pic"
                      width={18}
                      height={18}
                    />

                    <Form.Group
                    // className="mb-3"
                    >
                      <Form.Control
                        style={{ display: 'none' }}
                        onChange={(e) => setPostImageValue(e)}
                        // value={postImage}
                        type="file"
                        placeholder="Post Text"
                        // multiple
                        accept="image/*"
                        id="clickmebutton"
                      />
                    </Form.Group>
                  </button>
                  <button
                    className={styles.addPostFileButtons}
                    onClick={() => {
                      setShowForm1(true);
                      clickmebuttonHandler3();
                    }}
                    disabled={disableAddVideo}
                    type="button"
                  >
                    {/* <span>Video</span> */}
                    <NextImage
                      field={videoIcon}
                      editable={true}
                      alt="PostItems"
                      width={18}
                      height={18}
                      style={{ opacity: disableAddVideo ? '0.2' : '1' }}
                    />
                    <Form.Group
                    // className="mb-3"
                    >
                      <Form.Control
                        style={{ display: 'none' }}
                        onChange={(e) => setPostVideoValue(e)}
                        type="file"
                        placeholder="Post Video"
                        // multiple
                        accept=".mp4"
                        id="clickmebutton3"
                      />
                    </Form.Group>
                  </button>
                  <button
                    disabled={disableAddVideo}
                    className={styles.addPostFileButtons}
                    onClick={() => {
                      setShowForm1(true);
                      clickmebuttonHandler2();
                    }}
                    type="button"
                  >
                    {/* <span>Doc</span> */}
                    <NextImage
                      field={pin}
                      editable={true}
                      alt="PostItems"
                      width={18}
                      height={18}
                      style={{ opacity: disableAddDoc ? '0.2' : '1' }}
                    />
                    <Form.Group
                    // className="mb-3"
                    >
                      <Form.Control
                        style={{ display: 'none' }}
                        onChange={(e) => setPostDocValue(e)}
                        // value={postImage}
                        type="file"
                        placeholder="Post Text"
                        // multiple
                        accept=".pdf,.doc,.docx,.txt"
                        id="clickmebutton2"
                      />
                    </Form.Group>
                  </button>
                  <button
                    className={styles.addPostFileButtons}
                    onClick={() => {
                      setShowForm1(true);
                      setShowEvent(true);
                    }}
                    type="button"
                    disabled={disableAddEvent}
                  >
                    {/* <span>Event</span> */}
                    <NextImage
                      field={createEventIcon}
                      style={{ opacity: disableAddEvent ? '0.2' : '1' }}
                      editable={true}
                      alt="PostItems"
                      width={18}
                      height={18}
                    />
                  </button>
                  <Modal
                    className={styles.AddEventModalContent}
                    show={showEvent}
                    onHide={() => setShowEvent(false)}
                    backdrop="static"
                    keyboard={false}
                    centered
                    scrollable={true}
                    onExit={() => {
                      setEventType('Select Event Type');
                    }}
                  >
                    <div className={styles.eventPostContainer}>
                      <Form onSubmit={(e: any) => submitEventForm(e)} style={{ fontSize: '14px' }}>
                        <Modal.Header closeButton>
                          <Modal.Title className={styles.AddEventModalHeader}>
                            Create Event Post
                          </Modal.Title>
                        </Modal.Header>
                        <div className={styles.AddEventModalBody}>
                          <img width="100%" src={eventImage} />
                        </div>
                        <Modal.Body>
                          <div className={styles.AddEventModalProfile}>
                            <div className={styles.AddEventModalProfilePic}>
                              <img src={Profile.src} />
                            </div>
                            <div style={{ alignSelf: 'center' }}>
                              <div style={{ fontSize: '1rem', fontWeight: '600' }}>
                                {userObject?.firstName
                                  ? `${userObject?.firstName} ${userObject?.lastName}`
                                  : 'John Doe'}
                              </div>
                              {/* <div style={{ fontSize: '14px', color: 'grey' }}>Profile</div> */}
                            </div>
                          </div>
                          <Form.Group className="mb-3">
                            <Form.Control
                              className={styles.AddEventModalEventName}
                              style={{ fontSize: '18px', color: 'black', fontWeight: '800px' }}
                              required
                              type="text"
                              placeholder="Event Name"
                            />
                          </Form.Group>
                          <div
                            style={{ display: 'flex', gap: '12px' }}
                            className={`${styles.AddEventModalEventDates} mb-3`}
                          >
                            <Form.Group>
                              <Form.Control
                                required
                                type="date"
                                placeholder="Event Date"
                                className={styles.DateInput}
                                min={minDate}
                              />
                            </Form.Group>
                            <Form.Group>
                              <Form.Control
                                className={styles.TimeInput}
                                required
                                type="time"
                                placeholder="Event Time"
                              />
                            </Form.Group>
                          </div>
                          <Form.Group className="mb-3">
                            <Dropdown className="eventTypeDropdown">
                              <Dropdown.Toggle
                                variant="secondary"
                                id="dropdown-basic"
                                style={{
                                  width: '100%',
                                }}
                                className={styles.eventTypeDropdownToggle}
                              >
                                {eventType}
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                {props?.fields?.data?.datasource?.eventType?.targetItems?.map(
                                  (item: any) => {
                                    return (
                                      <Dropdown.Item
                                        href="#"
                                        onClick={() => {
                                          setEventType(item?.title?.jsonValue?.value);
                                          setEventImage(EventImage[item?.title?.jsonValue?.value]);
                                        }}
                                        className={styles.eventModalDropdownItem}
                                      >
                                        {item?.title?.jsonValue?.value}
                                      </Dropdown.Item>
                                    );
                                  }
                                )}
                              </Dropdown.Menu>
                            </Dropdown>
                            {/* <div style={{ height: '40px' }}>
                          {eventTypeSelectError ? (
                            <div style={{ color: 'red', fontSize: '12px', fontWeight: '1000' }}>
                              * Please Select Valid Event Type
                            </div>
                          ) : (
                            ''
                          )}
                        </div> */}
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Control
                              className={`${styles.AddEventModalEventName} ${styles.AddEventModalEventDescription}`}
                              required
                              as="textarea"
                              rows={2}
                              placeholder="Description"
                              style={{ resize: 'none' }}
                            />
                          </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            className={styles.eventModalCancel}
                            variant="secondary"
                            onClick={() => {
                              setShowEvent(false);
                              setEventType('Select Event Type');
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            className={styles.eventModalAddToPost}
                            variant="secondary"
                            type="submit"
                            // onClick={onPostReported}
                          >
                            Add Event to Post
                          </Button>
                        </Modal.Footer>
                      </Form>
                    </div>
                  </Modal>
                  <button
                    className={styles.addPostFileButtons}
                    onClick={() => {
                      setShowForm1(true);
                      setShowPollForm(true);
                    }}
                    type="button"
                    disabled={disableAddPoll}
                  >
                    {/* <span>Poll</span> */}
                    <NextImage
                      field={pollIcon}
                      editable={true}
                      alt="PostItems"
                      style={{ opacity: disableAddPoll ? '0.2' : '1' }}
                      width={18}
                      height={18}
                    />
                  </button>
                  <Modal
                    className={styles.reportPostModalContent}
                    show={showPollForm}
                    onHide={() => setShowPollForm(false)}
                    backdrop="static"
                    keyboard={false}
                    centered
                    scrollable={true}
                    onExit={() => {
                      clearPollForm();
                    }}
                  >
                    <div>
                      <Form
                        onSubmit={(e: any) => submitPollForm(e)}
                        style={{ fontSize: '15px', margin: '5px' }}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title className={styles.reportPostModalHeader}>
                            Create a Poll
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <div className={styles.reportPostModalBody}>Poll Parameters</div>
                          <Form.Group className="mb-3">
                            <Form.Label style={{ fontSize: '24px', fontWeight: '600' }}>
                              Question
                            </Form.Label>
                            <Form.Control
                              value={pollQuestion}
                              onChange={(e) => updatePollQuestion(e)}
                              required
                              type="text"
                              placeholder="Write Poll Question"
                            />
                            <Form.Control.Feedback type="invalid">
                              Please select an event date.
                            </Form.Control.Feedback>
                          </Form.Group>
                          <div
                            style={{
                              padding: '32px',
                              border: '1px solid',
                              borderRadius: '10px',
                              display: 'flex',
                              flexDirection: 'column',
                              height: '282px',
                              overflowY: 'scroll',
                              // justifyContent: 'space-between',
                            }}
                            className="CreatePollOptions mb-3"
                          >
                            {pollFormOptions.map((option: any) => {
                              return (
                                <Form.Group className="mb-3" id={option?.id}>
                                  <Form.Label style={{ fontSize: '24px', fontWeight: '600' }}>
                                    Option - <span>{option?.name}</span>
                                  </Form.Label>
                                  <Form.Control
                                    required
                                    type="textarea"
                                    value={option?.optionText}
                                    onChange={(e) => pollOptionUpdate(option?.id, e)}
                                    placeholder={`Enter Option - ${option?.placeholder}`}
                                  />
                                </Form.Group>
                              );
                            })}
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button
                              style={{
                                padding: '12px',
                                border: 'none',
                                fontSize: '18px',
                                borderRadius: '12px',
                              }}
                              type="button"
                              onClick={() => addPollOption()}
                              disabled={isOptionsThreshold}
                            >
                              + Add More option
                            </button>
                            <button
                              style={{
                                padding: '12px',
                                border: 'none',
                                fontSize: '18px',
                                borderRadius: '12px',
                              }}
                              type="button"
                              onClick={() => deleteLastPollOption()}
                              disabled={isDeleteOptionThreshold}
                            >
                              - Delete option
                            </button>
                          </div>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            className={styles.footerBtn}
                            variant="secondary"
                            onClick={() => {
                              clearPollForm();
                            }}
                          >
                            Clear
                          </Button>
                          <Button
                            className={styles.footerBtn}
                            variant="secondary"
                            type="submit"
                            style={{ height: '44px', width: '121px' }}
                          >
                            <span>Add Poll to Post</span>
                          </Button>
                        </Modal.Footer>
                      </Form>
                    </div>
                  </Modal>
                  <button
                    className={styles.addPostFileButtons}
                    onClick={() => {
                      setShowForm1(true);
                    }}
                    type="button"
                  >
                    <Link href="/addblogpost">
                      <NextImage
                        field={addBlogIcon}
                        editable={true}
                        alt="PostItems"
                        width={18}
                        height={18}
                        style={{ opacity: disableAddDoc ? '0.2' : '1' }}
                      />
                    </Link>
                  </button>
                </div>
                <div className={styles.errorContainer}>
                  <Button
                    className={styles.publishButton}
                    disabled={editorState.getCurrentContent().getPlainText() ? false : true}
                    variant="secondary"
                    style={{
                      backgroundColor: editorState.getCurrentContent().getPlainText()
                        ? '#47D7AC'
                        : '#FFFFFF',
                      color: editorState.getCurrentContent().getPlainText() ? '#FFFFFF' : '#A5A9AE',
                      borderColor: editorState.getCurrentContent().getPlainText()
                        ? '#47D7AC'
                        : '#6c757d',
                      // boxShadow: !createNewPostError ? 'none' : '0 4px 8px 0 rgba(255, 0, 0, 0.6)',
                    }}
                    type="button"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Post
                  </Button>
                  <Collapse in={showForm1}>
                    <Button
                      className={styles.publishButton}
                      variant="default"
                      style={{ outline: 'none', border: 'none', color: '#F58C60' }}
                      type="button"
                      onClick={() => {
                        setShowForm1(false);
                        setEditorState(() => EditorState.createEmpty());
                      }}
                    >
                      Cancel
                    </Button>
                  </Collapse>
                  {/* {createNewPostError ? (
                <span style={{ fontWeight: 1000, color: 'red', fontSize: '8px' }}>
                  * Something Went Wrong. Post not uploaded !
                </span>
              ) : (
                ''
              )} */}
                  {/* </div>

              <div> */}
                </div>
                {/* <Collapse in={showForm1}> */}
                {/* <Button
                className={styles.closeButton}
                type="button"
                variant="secondary"
                onClick={() => setShowForm1(!showForm1)}
              >
                Close
              </Button> */}
                {/* </Collapse> */}
              </div>
            </div>
            <div className="postHead" style={{ marginBottom: '10px' }}>
              <div className="postHeaderLeft">
                <h5 className="postOwner mt-2" style={{ fontWeight: '1000' }}></h5>
                <h4 className="postDate" style={{ fontWeight: '700' }}>
                  Your Posts
                </h4>
              </div>
              <div className="postHeaderRight">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3502/3502458.png"
                  alt="pan"
                  width="20px"
                />
                <img
                  style={{ marginLeft: '20px' }}
                  src="https://cdn-icons-png.flaticon.com/512/238/238910.png"
                  alt="pan"
                  width={20}
                />
              </div>
            </div>{' '}
          </>
        ) : (
          ''
        )}
        <div className="AllPostscontainer" id="PostFeedList" style={{ maxWidth: '100%' }}>
          {posts?.length == 0 ? <PostSkeleton count={3} /> : posts}
          <div style={{ height: '250px' }}>
            {ifReachedEnd ? (
              !ifNoMoreData ? (
                <PostSkeleton count={1} />
              ) : (
                <span
                  style={{
                    display: 'flex',
                    padding: '10px',
                    justifyContent: 'center',
                    backgroundColor: 'lightBlue',
                    borderRadius: '20px',
                  }}
                >
                  No More Posts Available{' '}
                  <img
                    style={{ marginLeft: '10px' }}
                    width="25px"
                    src="https://cdn-icons-png.flaticon.com/512/927/927567.png"
                    alt="smile"
                  ></img>
                </span>
              )
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      {showDeletePostPopup ? (
        <CreateModalPopup
          popUpVisiable={showDeletePostPopup}
          setPopUpVisiable={setShowDeletePostPopup}
          body={'Do you really want to delete this post ?'}
          buttonName={'Delete'}
          title={'Delete Confirmation'}
          buttonClickHandler={confirmationForDelete}
          disabled={false}
          id={deletePostId}
        />
      ) : (
        ''
      )}
      {showDeleteCommentPopup ? (
        <CreateModalPopup
          popUpVisiable={showDeleteCommentPopup}
          setPopUpVisiable={setShowDeleteCommentPopup}
          body={`Do you really want to delete this ${
            deleteCommentId?.replyId ? 'reply' : 'comment'
          } ?`}
          buttonName={'Delete'}
          title={'Delete Confirmation'}
          buttonClickHandler={confirmationForDeleteComment}
          disabled={false}
          id={deleteCommentId}
        />
      ) : (
        ''
      )}
      {<ReportPostPopup />}
      {<BlockUserPopup />}
      {<ModalForReactions />}
      {<ReportUserPopup />}
      {showNotification && (
        <ToastNotification
          showNotification={showNotification}
          success={toastSuccess}
          error={toastError}
          message={toastMessage}
          handleCallback={resetToastState}
        />
      )}
    </>
  );
};

export default withSitecoreContext()(AddPost);
