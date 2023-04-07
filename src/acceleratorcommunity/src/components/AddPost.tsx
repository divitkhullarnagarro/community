import { Field, NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { ReactElement, useContext, useEffect, useRef, useState } from 'react';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import Form from 'react-bootstrap/Form';
import WebContext from '../Context/WebContext';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import likePostCall from '../API/likePostCall';
import getAllPostsCall from '../API/getAllPostsCall';
import Spinner from 'react-bootstrap/Spinner';
import getPostByIdCall from '../API/getPostByIdCall';
import addPostCall from '../API/addPostCall';
import getUserCall from 'src/API/getUserCall';
import addPostCommentCall from 'src/API/addPostCommentCall';
// import loginUserCall from 'src/API/loginUserCall';
import Link from 'next/link';
import ShowShareCss from '../assets/ShowShare.module.css';
import linkedin from '../assets/images/linkedin.png';
import twitter from '../assets/images/twitter.png';
import whatsapp from '../assets/images/whatsapp.png';
import facebook from '../assets/images/facebook.svg';
import { Dropdown, Modal } from 'react-bootstrap';
import { ReportPostOptionsTypeLabel } from 'assets/helpers/enums';
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

// Rich Text Editor Files Import Start
import { EditorState, convertToRaw } from 'draft-js';
import { EditorProps } from 'react-draft-wysiwyg';
import parser from 'html-react-parser';
import dynamic from 'next/dynamic';
import draftToHtml from 'draftjs-to-html';
import { toolbar } from 'assets/helpers/constants';
import allPeersCall from 'src/API/getPeers';
const Editor = dynamic<EditorProps>(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), {
  ssr: false,
});
// Rich Text Editor Files Import End

import BlockUserImage from '../assets/images/BlockUser.jpg';
import React from 'react';

type AddPostProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const AddPost = (props: AddPostProps | any): JSX.Element => {
  const { userToken, setUserToken, objectId, userObject, setUserObject } = {
    ...useContext(WebContext),
  };

  const router = useRouter();
  const [showForm1, setShowForm1] = useState(false);
  let myPostArray: ReactElement<any, any>[] = [];
  let [posts, setPosts] = useState(myPostArray);

  let [postText, setPostText] = useState('');

  const [file, setFile] = useState([]);
  const [docs, setDocs] = useState([]);
  const [videoLink, setVideoLink] = useState([]);

  let [myAnotherArr, setMyAnotherArr] = useState<any>([]);
  let [postPageNum, setPostPageNum] = useState(0);
  let [ifReachedEnd, setIfReachedEnd] = useState(false);
  let [ifNoMoreData, setIfNoMoreData] = useState(false);
  let [createNewPostError, setCreateNewPostError] = useState(false);
  // let [disableAddImage, setDisableAddImage] = useState(false);
  // let [disableAddVideo, setDisableAddVideo] = useState(false);
  // let [disableAddDoc, setDisableAddDoc] = useState(false);
  let isExpEditorActive = props?.sitecoreContext?.pageEditing;

  // function checkDisablity() {
  //   if (videoLink.length > 0) {
  //     setDisableAddImage(true);
  //     setDisableAddDoc(true);
  //   } else if (docs.length > 0) {
  //     setDisableAddVideo(true);
  //     setDisableAddImage(true);
  //   } else if (file.length > 0) {
  //     setDisableAddVideo(true);
  //     setDisableAddDoc(true);
  //   }
  // }

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [addedPeers, setAddedPeers] = useState<string[]>([] as string[]);
  const [mentionUserData, setMentionUserData] = useState<
    {
      text: string;
      value: string;
      url: string;
    }[]
  >([] as { text: string; value: string; url: string }[]);
  const currentCount = editorState.getCurrentContent().getPlainText().length;

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
      addedPeerList.add(entity.data.url.substring(9, entity.data.url.length));
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

  useEffect(() => {
    if (userToken == '' && !isExpEditorActive) {
      if (
        typeof localStorage !== 'undefined' &&
        localStorage.getItem('UserToken') != '' &&
        localStorage.getItem('UserToken') != null
      ) {
        let token = localStorage.getItem('UserToken');
        if (token != null && setUserToken != undefined) {
          setUserToken(token);
        }
      } else router.push('/login');
    }
  }, []);

  useEffect(() => {
    getUserCall(userToken, objectId).then((response) => {
      if (setUserObject != undefined) {
        setUserObject(response?.data?.data);
      }
    });
  }, []);

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
  const [blockUserName, setBlockUserName] = useState<string>('');

  const onUserBlocked = async () => {
    //setToastSuccess(true);
    //setToastMessage('User blocked successfully');
    //setShowNofitication(true);
    setShowBlockUserPopUp(false);
  };

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
              >{`Do you want to block ${blockUserName} ?`}</div>
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

    let locArr = myAnotherArr;
    const commStr = e.target[0].value;
    e.currentTarget.reset();
    let resp = await addPostCommentCall(userToken, id, commStr);
    const timestamp = new Date().getTime();
    locArr.map((post: any) => {
      if (id === post?.id) {
        post?.comments?.push({
          id: resp?.data?.data,
          createdBy: { firstName: userObject?.firstName, lastName: userObject?.lastName },
          text: commStr,
          replies: [],
          isOpenReply: false,
          createdOn: timestamp,
        });
        if (typeof post?.postMeasures?.commentCount === 'number') {
          post.postMeasures.commentCount = (post.postMeasures.commentCount ?? 0) + 1;
        } else {
          post.postMeasures.commentCount = (post.postMeasures.commentCount ?? 0) + 1;
        }
        return post;
      }
    });
    updateArrayWithLatestdata(locArr);
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
                src="https://cdn-icons-png.flaticon.com/512/1144/1144811.png"
                alt="User-Pic"
              ></img>
              <div className="postDetailContainer">
                <h5 className="postOwner mt-2">
                  <span>{post?.createdBy?.firstName ? post?.createdBy?.firstName : 'Unknown'}</span>
                  &nbsp;
                  <span>{post?.createdBy?.lastName ? post?.createdBy?.lastName : 'User'}</span>
                </h5>
                <h6 className="postCreateDate">
                  <span style={{ fontWeight: '100' }}>
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
                  style={{ backgroundColor: 'white', border: 'none', width: '70px' }}
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
                      <div className={styles.reportContainerBtn}> Save Post</div>
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
                      <div className={styles.reportContainerBtn}> Copy link to post</div>
                    </div>
                  </Dropdown.Item>
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
                      setBlockUserName(
                        post?.createdBy?.firstName + ' ' + post?.createdBy?.lastName
                      );
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
                </Dropdown.Menu>
              </Dropdown>
              <img
                className="postCrossImage"
                src="https://cdn-icons-png.flaticon.com/512/10091/10091183.png"
                alt="pan"
              />
            </div>
          </div>
          <div className="postContent">
            <div>{parser(post?.description)}</div>
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
                    <div
                      key={num}
                      style={{
                        borderRadius: '30px',
                        margin: '0px 15px 15px 0px',
                      }}
                    >
                      <img width="300px" src={media?.url} alt={media?.id}></img>
                    </div>
                  );
                }
                return '';
              })}
            </div>
          </div>
          <hr />
          <div className="postFooter">
            <div className="postActions">
              <button onClick={() => LikePost(post?.id)}>
                <img
                  className="postLikeImage"
                  src={
                    post?.isLikedByUser
                      ? 'https://cdn-icons-png.flaticon.com/512/739/739231.png'
                      : 'https://cdn-icons-png.flaticon.com/512/126/126473.png'
                  }
                  //https://cdn-icons-png.flaticon.com/512/739/739231.png
                  alt="actions"
                />
              </button>
              <button
                onClick={() => setOpenComments(post.id, !post.isOpenComment)}
                aria-controls="anotherCommentsContainer"
                aria-expanded={post?.isOpenComment}
              >
                <img
                  className="postCommentImage"
                  src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png"
                  //https://cdn-icons-png.flaticon.com/512/786/786352.png
                  alt="actions"
                />
              </button>
              <div>
                <button onClick={() => handleShowShare(post.id, !post?.showShare)}>
                  <img
                    className="postShareImage"
                    src="https://cdn-icons-png.flaticon.com/512/2956/2956786.png"
                    alt="actions"
                  />
                </button>
                {post?.showShare && (
                  <div className={ShowShareCss.sharePopups} style={{ position: 'initial' }}>
                    <div className={ShowShareCss.sharePopup}>
                      <NextImage
                        className={ShowShareCss.whatsappImage}
                        field={whatsapp}
                        editable={true}
                        width={25}
                        height={25}
                      />
                      <Link
                        href={`${props?.fields?.data?.datasource?.whatsApp?.jsonValue?.value}${process.env.PUBLIC_URL}/post/${post.id}&utm_source=whatsapp&utm_medium=social&utm_term=${post.id}`}
                      >
                        <a className={ShowShareCss.targetIcon} target="_blank">
                          WhatsApp
                        </a>
                      </Link>
                    </div>

                    <div className={ShowShareCss.sharePopup}>
                      <NextImage
                        className={ShowShareCss.whatsappImage}
                        field={twitter}
                        editable={true}
                        width={25}
                        height={25}
                      />
                      <Link
                        href={`${props?.fields?.data?.datasource?.twitter?.jsonValue?.value}?url=${process.env.PUBLIC_URL}/post/${post.id}&utm_source=twitter&utm_medium=social&utm_term=${post.id}`}
                      >
                        <a className={ShowShareCss.targetIcon} target="_blank">
                          Twitter
                        </a>
                      </Link>
                    </div>

                    <div className={ShowShareCss.sharePopup}>
                      <NextImage
                        className={ShowShareCss.whatsappImage}
                        field={linkedin}
                        editable={true}
                        width={25}
                        height={25}
                      />
                      <Link
                        href={`${props?.fields?.data?.datasource?.linkedIn?.jsonValue?.value}?url=${process.env.PUBLIC_URL}/post/${post.id}&utm_source=linkdeIn&utm_medium=social&utm_term=${post.id}`}
                      >
                        <a className={ShowShareCss.targetIcon} target="_blank">
                          LinkedIn
                        </a>
                      </Link>
                    </div>
                    <div className={ShowShareCss.sharePopup}>
                      <NextImage
                        className={ShowShareCss.whatsappImage}
                        field={facebook}
                        editable={true}
                        width={25}
                        height={25}
                      />
                      <Link
                        href={`${props?.fields?.data?.datasource?.facebook?.jsonValue?.value}?u=${process.env.PUBLIC_URL}/post/${post.id}&utm_source=facebook&utm_medium=social&utm_term=${post.id}`}
                      >
                        <a className={ShowShareCss.targetIcon} target="_blank">
                          Facebook
                        </a>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <span className="postLikeCount">
                {post?.postMeasures?.likeCount ? post?.postMeasures?.likeCount : '0'}
                {' Likes'}
              </span>
              <span> | </span>
              <span className="postCommentCount">
                {post?.postMeasures?.commentCount ? post?.postMeasures?.commentCount : '0'}
                {' Comments'}
              </span>
            </div>
          </div>
          <Collapse in={post?.isOpenComment}>
            <div id="anotherCommentsContainer">
              <Form
                onSubmit={(e) => {
                  postComments(post?.id, e);
                }}
                style={{ border: '1px', borderColor: 'black' }}
              >
                <Form.Group className="mb-3" controlId="comments" style={{ display: 'flex' }}>
                  <img
                    className="commentUserImage"
                    src="https://cdn-icons-png.flaticon.com/512/1144/1144811.png"
                    alt="User-Pic"
                  ></img>
                  <Form.Control
                    // onChange={(e) => setPostCommentValue(e.target.value)}
                    type="text"
                    placeholder="Add Comments..."
                    required
                    autoFocus
                    style={{ width: '100%' }}
                  />
                  <button type="submit" className="postCommentButton">
                    PostComment
                  </button>
                </Form.Group>
              </Form>
              {post?.comments?.map((comment: any, num: any) => {
                return (
                  <>
                    <div
                      id={num}
                      style={{
                        padding: '20px',
                        backgroundColor: 'lightgray',
                        margin: '5px',
                        borderBottomLeftRadius: '30px',
                        borderTopRightRadius: '30px',
                        borderBottomRightRadius: '30px',
                        marginTop: '20px',
                      }}
                    >
                      <div>
                        <h4>
                          {comment?.createdBy?.firstName} {comment?.createdBy?.lastName}
                          <span style={{ fontSize: '12px', marginLeft: '5px' }}>
                            {' '}
                            {calculateTimeDifference(comment?.createdOn)}
                          </span>
                        </h4>
                      </div>
                      <div>{comment?.text}</div>
                    </div>
                    <div>
                      <div style={{ marginBottom: '10px' }}>
                        <span>
                          <img
                            style={{ margin: '5px' }}
                            width="30px"
                            src="https://cdn-icons-png.flaticon.com/512/3082/3082422.png"
                            alt="upvote"
                          />
                        </span>
                        <span>
                          <img
                            width="30px"
                            style={{ margin: '5px' }}
                            src="https://cdn-icons-png.flaticon.com/512/159/159694.png"
                            alt="downVote"
                          />
                        </span>
                        <button
                          onClick={() => openCommentReplies(comment?.id, !comment?.isOpenReply)}
                          aria-controls="repliesContainer"
                          aria-expanded={comment?.isOpenReply}
                          style={{ border: 'none', marginLeft: '16px' }}
                        >
                          Reply
                        </button>
                      </div>
                      <Collapse in={comment?.isOpenReply}>
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
                                src="https://cdn-icons-png.flaticon.com/512/1144/1144811.png"
                                alt="User-Pic"
                              ></img>
                              <Form.Control
                                // onChange={(e) => setPostCommentValue(e.target.value)}
                                type="text"
                                placeholder="Reply..."
                                required
                                autoFocus
                                style={{ width: '100%' }}
                              />
                              <button type="submit" className="postCommentButton">
                                Post reply
                              </button>
                            </Form.Group>
                          </Form>
                          {comment?.replies?.map((reply: any) => {
                            return (
                              <>
                                <div
                                  id={reply?.id}
                                  style={{
                                    padding: '20px',
                                    backgroundColor: 'lightgray',
                                    margin: '5px',
                                    borderBottomLeftRadius: '30px',
                                    borderTopRightRadius: '30px',
                                    borderBottomRightRadius: '30px',
                                    marginTop: '20px',
                                    marginLeft: '10%',
                                  }}
                                >
                                  <div>
                                    <span style={{ fontSize: '15px', fontWeight: '600' }}>
                                      {reply?.createdBy?.firstName} {reply?.createdBy?.lastName}{' '}
                                    </span>
                                    <span style={{ fontSize: '12px' }}>
                                      {' '}
                                      {calculateTimeDifference(reply?.createdOn)}
                                    </span>
                                  </div>
                                  <div>{reply?.text}</div>
                                </div>
                                <div
                                  style={{
                                    marginBottom: '10px',
                                    position: 'relative',
                                    left: '10%',
                                    width: '88%',
                                  }}
                                >
                                  <span>
                                    <img
                                      style={{ margin: '5px' }}
                                      width="30px"
                                      src="https://cdn-icons-png.flaticon.com/512/3082/3082422.png"
                                      alt="upvote"
                                    />
                                  </span>
                                  <span>
                                    <img
                                      width="30px"
                                      style={{ margin: '5px' }}
                                      src="https://cdn-icons-png.flaticon.com/512/159/159694.png"
                                      alt="downVote"
                                    />
                                  </span>
                                  <button
                                    aria-controls="replyOfReplyContainer"
                                    aria-expanded={reply?.isOpenReplyOfReply}
                                    style={{ border: 'none' }}
                                    onClick={() =>
                                      openReplyOfReply(
                                        post?.id,
                                        comment?.id,
                                        reply?.id,
                                        !reply?.isOpenReplyOfReply
                                      )
                                    }
                                  >
                                    Reply
                                  </button>
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
                                          src="https://cdn-icons-png.flaticon.com/512/1144/1144811.png"
                                          alt="User-Pic"
                                        ></img>
                                        <Form.Control
                                          // onChange={(e) => setPostCommentValue(e.target.value)}
                                          type="text"
                                          placeholder="Reply..."
                                          required
                                          autoFocus
                                          style={{ width: '100%' }}
                                        />
                                        <button type="submit" className="postCommentButton">
                                          Post reply
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
                              }}
                            >
                              <button
                                onClick={() => loadCommentReplies(comment?.id)}
                                style={{ padding: '5px', border: 'none', margin: '16px' }}
                              >
                                Load Replies
                              </button>
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
                  <button
                    onClick={() => loadComments(post.id)}
                    style={{
                      padding: '12px',
                      border: 'none',
                      borderRadius: '10px',
                    }}
                  >
                    Load Comments{' '}
                    <img
                      width="30px"
                      src="https://cdn-icons-png.flaticon.com/512/3305/3305803.png"
                      alt="LoadImage"
                    />
                  </button>
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

  function openCommentReplies(commentid: any, open: boolean) {
    let locArr = myAnotherArr;
    locArr.map((post: any) => {
      if (post.comments?.length > 0) {
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
  }

  async function postCommentReply(postId: string, commentId: string, e: any) {
    e.preventDefault();
    const commentString = e.target[0].value;
    e.currentTarget.reset();
    let resp = await postCommentReplyCall(userToken, postId, commentId, commentString);
    let locArr = myAnotherArr;
    const timestamp = new Date().getTime();
    locArr.map((post: any) => {
      if (post.comments?.length > 0) {
        post.comments.map((comment: any) => {
          if (comment?.id == commentId) {
            comment.replies.push({
              id: resp?.data?.data,
              createdBy: { firstName: userObject?.firstName, lastName: userObject?.lastName },
              text: commentString,
              hasReply: true,
              isOpenReplyOfReply: false,
              createdOn: timestamp,
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

  async function loadCommentReplies(id: any) {
    let resp = await getCommentsReplyCall(userToken, id, 0);
    let locArr = myAnotherArr;
    resp?.data?.data.map((reply: any) => {
      reply.isOpenReplyOfReply = false;
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

  async function loadComments(id: any) {
    let resp = await getCommentsCall(userToken, id, 0);
    let respArr = resp?.data?.data;
    respArr?.map((comment: any) => {
      comment.isOpenReply = false;
      comment.replies = [];
    });
    let locArr = myAnotherArr;
    locArr.map((post: any) => {
      if (id === post?.id && respArr) {
        let comm = [...post?.comments, ...respArr];
        post.comments = comm;
        return post;
      }
    });
    updateArrayWithLatestdata(locArr);
  }

  function addLatestCreatedPost(id: string) {
    getPostByIdCall(userToken, id).then((response) => {
      if (response?.data?.data != undefined) {
        let resp = response?.data?.data;
        resp.comments = [];
        let locArray: any = [];
        locArray.push(resp);
        setMyAnotherArr((prevState: any[]) => {
          return [...locArray, ...prevState];
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
    let postType = 'VIDEO';
    if (file.length == 0 && docs.length == 0 && videoLink.length == 0) {
      postType = 'TEXT_POST';
    } else if (videoLink.length > 0) {
      postType = 'VIDEO';
    } else if (docs.length > 0) {
      postType = 'DOC';
    } else if (file.length > 0) {
      postType = 'IMAGE';
    }
    // console.log('mention inside api call component', addedPeers);

    addPostCall(userToken, {
      description: postText,
      mediaList: [...file, ...docs, ...videoLink],
      taggedPeers: addedPeers,
      type: postType,
    }).then((response) => {
      if (response?.data?.data) {
        addLatestCreatedPost(response?.data?.data);
        // Empty Post Values
        setShowForm1(false);
        setFile([]);
        setPostText('');
        setVideoLink([]);
        setDocs([]);
        setEditorState(() => EditorState.createEmpty());
      } else {
        setCreateNewPostError(true);
        setTimeout(() => {
          setCreateNewPostError(false);
        }, 2000);
      }
    });
  };

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
      let resp = await UploadFilesToServer(files[i], 'IMAGE');
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

    for (let i = 0; i < files.length; i++) {
      let resp = await UploadFilesToServer(files[i], 'VIDEO');
      resp;
      let uniqueId = generateUniqueId();
      fileArray.push({
        id: uniqueId,
        url: 'https://static.videezy.com/system/resources/previews/000/019/696/original/pointing-blue.mp4',
        // name: files[i]?.name,
        mediaType: 'VIDEO',
        mediaSequence: 0,
      });
    }
    if (fileArray.length === files.length) {
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

  return (
    <>
      <div style={{ padding: '10px', backgroundColor: 'lightgrey', margin: '15px' }}>
        <div style={{ marginBottom: '40px' }}>
          <div className="AddPostContainer">
            <div className="AddPostField" style={{ display: 'flex', alignItems: 'center' }}>
              <img
                style={{ float: 'left' }}
                src="https://cdn-icons-png.flaticon.com/512/1144/1144811.png"
                alt="Profile-Pic"
                width="60px"
              ></img>
              <button
                onClick={() => setShowForm1(!showForm1)}
                aria-controls="showAddPostEditorContainer"
                aria-expanded={showForm1}
                className="addPostButton"
              >
                <h4>
                  {props?.fields?.data?.datasource?.placeholderText?.jsonValue?.value
                    ? props?.fields?.data?.datasource?.placeholderText?.jsonValue?.value
                    : "What's on your mind"}
                  {`, `}
                  <span>
                    {userObject?.firstName ? userObject?.firstName : 'Mr. John Doe'}{' '}
                    {userObject?.lastName ? userObject?.lastName : ''}
                  </span>
                </h4>
              </button>
            </div>
          </div>
          <Collapse in={showForm1}>
            <div
              className="AddPostEditorContainer"
              style={{ maxWidth: '100%' }}
              id="showAddPostEditorContainer"
            >
              <div className="AddPostField">
                <Form style={{ border: '1px', borderColor: 'black' }}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Editor
                      editorState={editorState}
                      onEditorStateChange={(e) => onEditorStateChangeHandler(e)}
                      wrapperClassName="wrapper-class"
                      editorClassName="editor-class"
                      toolbarClassName="toolbar-class"
                      editorStyle={{ height: '150px' }}
                      placeholder="Start Typing..."
                      toolbar={toolbar}
                      // toolbarOnFocus={true}
                      mention={{
                        separator: ' ',
                        trigger: '@',
                        suggestions: mentionUserData,
                      }}
                      hashtag={{}}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <div>
                        {currentCount}/{5000} characters
                      </div>
                    </div>
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
                            style={{ position: 'absolute', border: 'none', borderRadius: '15px' }}
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
                  <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
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
                    <hr />
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
                  <hr />
                  <div className="AddPostItems">
                    <div>
                      <button onClick={clickmebuttonHandler} type="button">
                        <span>Image</span>
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/16/16410.png"
                          alt="PostItems"
                          width="30px"
                        ></img>{' '}
                        <Form.Group className="mb-3">
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
                    </div>
                    <div>
                      <button onClick={clickmebuttonHandler2} type="button">
                        <span>Doc</span>
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/2991/2991106.png"
                          alt="PostItems"
                          width="30px"
                        ></img>{' '}
                        <Form.Group className="mb-3">
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
                    </div>
                    <div>
                      <button onClick={clickmebuttonHandler3} type="button">
                        <span>Video</span>
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/711/711245.png"
                          alt="PostItems"
                          width="30px"
                        ></img>
                        <Form.Group className="mb-3">
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
                    </div>
                    <div>
                      <button type="button">
                        <span>Event</span>
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/2693/2693507.png"
                          alt="PostItems"
                          width="30px"
                        ></img>
                      </button>
                    </div>
                    <div>
                      <button type="button">
                        <span>Poll</span>
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/2668/2668889.png"
                          alt="PostItems"
                          width="30px"
                        ></img>
                      </button>
                    </div>
                  </div>
                </Form>
                <hr />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button
                    variant="secondary"
                    style={{
                      boxShadow: !createNewPostError ? 'none' : '0 4px 8px 0 rgba(255, 0, 0, 0.6)',
                    }}
                    type="button"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Publish Post
                  </Button>
                  <div>
                    {createNewPostError ? (
                      <span style={{ fontWeight: 1000, color: 'red', fontSize: '12px' }}>
                        * Something Went Wrong. Post not uploaded !
                      </span>
                    ) : (
                      ''
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setShowForm1(!showForm1)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </Collapse>
        </div>
        <div className="postHeading" style={{ marginBottom: '10px' }}>
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
              width="50px"
            />
            <img
              style={{ marginLeft: '20px' }}
              src="https://cdn-icons-png.flaticon.com/512/238/238910.png"
              alt="pan"
              width="40px"
            />
          </div>
        </div>
        <div
          className="AllPostscontainer"
          id="PostFeedList"
          style={{
            maxWidth: '100%',
            height: '800px',
            overflowX: 'hidden',
            scrollbarWidth: 'none',
          }}
        >
          {posts?.length == 0 ? (
            <span style={{ display: 'flex', padding: '10px', justifyContent: 'center' }}>
              <span style={{ marginRight: '15px', fontWeight: '600' }}>Loading.. </span>{' '}
              <Spinner animation="border" />
            </span>
          ) : (
            posts
          )}
          {ifReachedEnd ? (
            !ifNoMoreData ? (
              <span style={{ display: 'flex', padding: '10px', justifyContent: 'center' }}>
                <span style={{ marginRight: '15px', fontWeight: '600' }}>Loading.. </span>{' '}
                <Spinner animation="border" />
              </span>
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
      {<ReportPostPopup />}
      {<BlockUserPopup />}
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
