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

type AddPostProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const AddPost = (props: AddPostProps | any): JSX.Element => {
  console.log('addpost', props); //delete me
  const { userToken, setUserToken, objectId, userObject, setUserObject } = {
    ...useContext(WebContext),
  };

  // useEffect(() => {
  //   loginUserCall('nishantemail@gmail.com', 'Nishant1@').then((response) => {
  //     if (setUserToken !== undefined && typeof localStorage !== 'undefined') {
  //       setUserToken(response?.data?.data?.access_token);
  //       localStorage.setItem('UserToken', response?.data?.data?.access_token);
  //     }
  //   });
  // }, []);

  const router = useRouter();
  const [showForm1, setShowForm1] = useState(false);
  let myPostArray: ReactElement<any, any>[] = [];
  let [posts, setPosts] = useState(myPostArray);
  // let [postItems, setPostItems] = useState<any>('');

  let [postText, setPostText] = useState('');
  // let [postHeading, setPostHeading] = useState('');

  const [file, setFile] = useState([]);
  const [docs, setDocs] = useState([]);
  const [videoLink, setVideoLink] = useState([]);

  let [myArr, setMyArr] = useState<postsType>({ posts: [] });
  let [myAnotherArr, setMyAnotherArr] = useState<any>([]);
  let [postPageNum, setPostPageNum] = useState(0);
  let [ifReachedEnd, setIfReachedEnd] = useState(false);
  let [ifNoMoreData, setIfNoMoreData] = useState(false);
  let [createNewPostError, setCreateNewPostError] = useState(false);
  // let [userName, setUserName] = useState('');

  let isExpEditorActive = props?.sitecoreContext?.pageEditing;

  // function getNameFromToken(token: any) {
  //   const [header, payload, signature] = token.split('.');
  //   header;
  //   signature;
  //   const decodedPayload = atob(payload);
  //   const parsedPayload = JSON.parse(decodedPayload);
  //   return parsedPayload;
  // }

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
  }, [myArr, myAnotherArr]);

  useEffect(() => {
    if (userToken != '' && userToken != undefined) {
      getAllPostsCall(userToken, postPageNum).then((response: any) => {
        let newArr = response?.data?.data;
        let empArr: any[] = [];
        newArr?.map((post: any) => {
          post.isOpenComment = false;
          post.comments = empArr;
          post.showShare = false;
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
  const formRef = useRef<HTMLFormElement>(null);

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
        console.log(postId);
      })
      .catch((err) => {
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
          className={styles.reportPostModalContainer}
          show={showReportPopUp}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered
          scrollable={true}
        >
          <div className={styles.reportPostModalContent}>
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
              </Button>
            </Modal.Footer>
          </div>
        </Modal>
      </>
    );
  };

  const onPostReported = async () => {
    let reportReason = '';
    if (formRef.current != null) {
      reportReason = (
        formRef.current.querySelector('input[name="radioGroup"]:checked') as HTMLInputElement
      )?.value;
    }

    let response = await reportPostCall(reportPostId, reportPostType, reportReason, userToken);
    if (response?.success) {
      setShowReportPopUp(false);
      console.log(response?.data);
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

  // function setPostHeadingValue(e: any) {
  //   setPostHeading(e);
  // }

  function generateUniqueId() {
    const timestamp = Date.now();
    const random = Math.random() * Math.pow(10, 18);
    return `${timestamp}-${random}`;
  }

  interface comments {
    id: string;
    commentToId: string;
    nameOfCommentor: string;
    dateAndTime: string;
    commentString: string;
  }

  interface posts {
    id: string;
    // heading: string;
    postText: string;
    imageArray: any[];
    docArray: any[];
    videoArray: any[];
    likes: any;
    disLikes: string[];
    comments: comments[];
    showComments: boolean;
  }

  interface postsType {
    posts: posts[];
  }

  // const initialPosts: postsType = {
  //   posts: [
  //     {
  //       id: '1231221',
  //       heading: 'Default Post heading',
  //       postText: 'Default Post Text',
  //       imageArray: [],
  //       docArray: [],
  //       videoArray: [],
  //       likes: 0,
  //       disLikes: [],
  //       showComments: false,
  //       comments: [
  //         {
  //           id: '',
  //           commentToId: '',
  //           nameOfCommentor: '',
  //           dateAndTime: '',
  //           commentString: '',
  //         },
  //       ],
  //     },
  //   ],
  // };

  //Function To Handle Likes
  function LikePost(id: any) {
    // let locArr = myArr.posts;
    // let modPost = locArr.map((post: any) => {
    //   if (post.id == id) {
    //     post.likes++;
    //     return post;
    //   } else {
    //     return post;
    //   }
    // });
    // setMyArr(() => {
    //   return { posts: modPost };
    // });
    let locArr = myAnotherArr;
    let modPost = locArr.map((post: any) => {
      if (post.id == id) {
        post.isLikedByUser = true;
        if (typeof post?.postMeasures?.likeCount === 'number') {
          post.postMeasures.likeCount = (post.postMeasures.likeCount ?? 0) + 1;
        } else {
          post.postMeasures.likeCount = 1;
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

  //Function To Handle Open Comments Tray
  function setOpenComments(id: string, show: boolean) {
    // let locArr = myArr.posts;
    // let modPost = locArr.map((post: any) => {
    //   if (post.id == id) {
    //     post.showComments = show;
    //     return post;
    //   } else {
    //     return post;
    //   }
    // });
    // setMyArr(() => {
    //   return { posts: modPost };
    // });
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
    console.log('asdsad', myAnotherArr);
    let modPost = locArr.map((post: any) => {
      if (post.id == id) {
        post.showShare = val;

        return post;
      } else {
        return post;
      }
    });
    setMyAnotherArr(() => {
      console.log('abv', modPost);
      return modPost;
    });
  }

  //Function To Handle Post Comments
  function postComments(id: string, e: any) {
    e.preventDefault();

    let locArr = myAnotherArr;
    addPostCommentCall(userToken, id, e.target[0].value);
    let modPost = locArr.map((post: any) => {
      if (post.id == id) {
        post?.comments?.push({
          id: 'Unique Id For Each Comment',
          commentToId: id,
          nameOfCommentor: 'Will Be Extracted From Token Value',
          dateAndTime: 'Current Date Time',
          commentString: e.target[0].value,
        });
        if (typeof post?.postMeasures?.commentCount === 'number') {
          post.postMeasures.commentCount = (post.postMeasures.commentCount ?? 0) + 1;
        } else {
          post.postMeasures.commentCount = (post.postMeasures.commentCount ?? 0) + 1;
        }
        return post;
      } else {
        return post;
      }
    });
    setMyAnotherArr(() => {
      return modPost;
    });

    e.currentTarget.reset();
  }

  //Function To Handle Posts Feed and Construct React.jsx using data
  function postStructCreate() {
    const currentDate: Date = new Date();
    const year: number = currentDate.getFullYear();
    const month: number = currentDate.getMonth() + 1;
    const day: number = currentDate.getDate();

    let locArr: ReactElement<any, any>[] = [];
    let locArr2: ReactElement<any, any>[] = [];
    myArr?.posts?.map((post: any, num: any) => {
      locArr.push(
        <>
          <div className="postContainer" key={num}>
            <div className="postHeading">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="User-Pic"
                width="60px"
              ></img>
              <div className="postDetailContainer">
                <h5 className="postOwner mt-2" style={{ fontWeight: '1000' }}>
                  John Doe
                </h5>
                <h6 className="postDate" style={{ fontWeight: '1000' }}>
                  Created On :{' '}
                  <span style={{ fontWeight: '100' }}>{`${day}-${month}-${year}`}</span>
                </h6>
              </div>
            </div>
            <hr />
            <h3 style={{ fontWeight: '1000' }}>{post?.heading}</h3>
            <div className="postContent">{post?.postText}</div>
            {/* <img src={postImage} alt="Post Image" /> */}
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {post.imageArray?.map((img: any, num: any) => {
                return (
                  <>
                    <div key={num}>
                      <img width="300px" src={img.value} alt={num}></img>
                    </div>
                  </>
                );
              })}
              <div className="docPreviewContainer">
                {post.docArray?.map((doc: any, num: any) => {
                  return (
                    <>
                      <span className="openPrevButton">
                        <button
                          onClick={() => openDoc(doc.value)}
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
                    </>
                  );
                })}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap' }} id="setVideoPreview">
                <hr />
                {post.videoArray?.map((video: any, num: any) => {
                  return (
                    <div key={num}>
                      <video width="100%" controls src={video.value} />
                    </div>
                  );
                })}
              </div>
            </div>
            <hr />
            <div className="postActions" style={{ marginBottom: '10px' }}>
              <button onClick={() => LikePost(post.id)}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/126/126473.png"
                  //https://cdn-icons-png.flaticon.com/512/739/739231.png
                  width="40px"
                  alt="actions"
                />
                <span>{post.likes}</span>
              </button>
              <button>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/126/126504.png"
                  //https://cdn-icons-png.flaticon.com/512/880/880613.png
                  width="40px"
                  alt="actions"
                />
              </button>
              <button
                onClick={() => setOpenComments(post.id, !post.showComments)}
                aria-controls="commentsContainer"
                aria-expanded={post.showComments}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png"
                  //https://cdn-icons-png.flaticon.com/512/786/786352.png
                  width="40px"
                  alt="actions"
                />
              </button>
              <button>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2956/2956786.png"
                  width="40px"
                  alt="actions"
                />
              </button>
            </div>
            <Collapse in={post.showComments}>
              <div id="commentsContainer">
                <Form
                  onSubmit={(e) => {
                    postComments(post?.id, e);
                  }}
                  style={{ border: '1px', borderColor: 'black' }}
                >
                  <Form.Group className="mb-3" controlId="comments" style={{ display: 'flex' }}>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                      alt="User-Pic"
                      width="60px"
                      style={{ marginRight: '10px' }}
                    ></img>
                    <Form.Control
                      // onChange={(e) => setPostComment(e.target.value)}
                      type="text"
                      placeholder="Add Comments..."
                      required
                      autoFocus
                      style={{ width: '70%' }}
                    />
                    <button
                      type="button"
                      // onClick={() => {
                      //   postComments(post?.id, postComment);
                      // }}
                      style={{
                        float: 'right',
                        marginLeft: '10px',
                        borderRadius: '10px',
                        padding: '5px',
                        border: 'none',
                        backgroundColor: '#008CBA',
                        color: 'white',
                        width: '30%',
                      }}
                    >
                      PostComment
                    </button>
                  </Form.Group>
                </Form>
                {post.comments.map((comment: any) => {
                  return (
                    <div
                      style={{
                        padding: '10px',
                        backgroundColor: '#9370db',
                        color: 'white',
                        borderRadius: '10px',
                        marginBottom: '10px',
                      }}
                    >
                      <div>
                        <span>ID : {comment.id}</span>
                      </div>
                      <div>
                        <span>Comment To ID : {comment.commentToId}</span>
                      </div>
                      <div>
                        <span>Name : {comment.nameOfCommentor}</span>
                      </div>
                      <div>
                        <span>Date : {comment.dateAndTime}</span>
                      </div>
                      <div>
                        <span>Comment : {comment.commentString}</span>
                      </div>
                    </div>
                  );
                })}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button
                    style={{
                      padding: '10px',
                      backgroundColor: '#dcdcdc',
                      border: 'none',
                      borderRadius: '20px',
                    }}
                    type="button"
                  >
                    <span>Load Comments </span>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2767/2767294.png"
                      width="20px"
                      height="20px"
                    />
                  </button>
                </div>
              </div>
            </Collapse>
          </div>
        </>
      );
    });
    myAnotherArr?.map((post: any, num: any) => {
      locArr2.push(
        <div className="postContainer" key={num}>
          <div className="postHeading">
            <div className="postHeaderLeft">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1144/1144811.png"
                alt="User-Pic"
                width="60px"
              ></img>
              <div className="postDetailContainer">
                <h5
                  className="postOwner mt-2"
                  style={{ fontWeight: '750', color: 'grey', fontSize: '24px' }}
                >
                  <span>{post?.createdBy?.firstName ? post?.createdBy?.firstName : 'Unknown'}</span>
                  &nbsp;
                  <span>{post?.createdBy?.lastName ? post?.createdBy?.lastName : 'User'}</span>
                </h5>
                <h6
                  className="postDate"
                  style={{ fontWeight: '700', color: 'grey', fontSize: '18px' }}
                >
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
                      src="https://cdn-icons-png.flaticon.com/512/463/463292.png"
                      alt="pan"
                      width="50px"
                    />
                  </button>
                </Dropdown.Toggle>

                <Dropdown.Menu className={styles.dropdownMenu}>
                  <Dropdown.Item className={styles.dropdownItem}>
                    <div className={styles.overlayItem}>
                      <NextImage
                        className={styles.dropdownImage}
                        field={bookmarkImage}
                        editable={true}
                        width={23}
                        height={20}
                      />
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
                      <div className={styles.copyLinkBtnStyle}>
                        <NextImage
                          className={styles.dropdownImage}
                          field={copylink}
                          editable={true}
                          width={22}
                          height={22}
                        />
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
                      <NextImage
                        className={styles.dropdownImage}
                        field={reportPostImage}
                        editable={true}
                        width={22}
                        height={22}
                      />
                      <div className={styles.reportContainerBtn}>Report Post</div>
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <img
                style={{ marginLeft: '30px' }}
                src="https://cdn-icons-png.flaticon.com/512/10091/10091183.png"
                alt="pan"
                width="50px"
              />
            </div>
          </div>
          <div className="postContent">{post?.description}</div>
          <hr />
          <div className="postFooter" style={{ marginBottom: '20px' }}>
            <div className="postActions" style={{ marginBottom: '10px' }}>
              <button onClick={() => LikePost(post?.id)}>
                <img
                  src={
                    post?.isLikedByUser
                      ? 'https://cdn-icons-png.flaticon.com/512/739/739231.png'
                      : 'https://cdn-icons-png.flaticon.com/512/126/126473.png'
                  }
                  //https://cdn-icons-png.flaticon.com/512/739/739231.png
                  width="40px"
                  alt="actions"
                />
              </button>
              {/* <button>
              <img
                src="https://cdn-icons-png.flaticon.com/512/126/126504.png"
                //https://cdn-icons-png.flaticon.com/512/880/880613.png
                width="40px"
                alt="actions"
              />
            </button> */}
              <button
                onClick={() => setOpenComments(post.id, !post.isOpenComment)}
                aria-controls="anotherCommentsContainer"
                aria-expanded={post?.isOpenComment}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png"
                  //https://cdn-icons-png.flaticon.com/512/786/786352.png
                  width="40px"
                  alt="actions"
                />
              </button>
              <div>
                <button onClick={() => handleShowShare(post.id, !post?.showShare)}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2956/2956786.png"
                    width="40px"
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
                        href={
                          'https://wa.me/?text=Check%20out%20this%20article%20I%20found%3A%20' +
                          post.id +
                          'utm_source=whatsapp&utm_medium=social&utm_id=' +
                          post.id
                        }
                      >
                        WhatsApp
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
                        href={
                          'https://twitter.com/intent/tweet?url=' +
                          post.id +
                          'utm_source=twitter&utm_medium=social&utm_id=' +
                          post.id
                        }
                      >
                        Twitter
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
                        href={
                          'https://www.linkedin.com/sharing/share-offsite/?url=' +
                          post.id +
                          'utm_source=linkedin&utm_medium=social&utm_id=' +
                          post.id
                        }
                      >
                        LinkedIn
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
                        href={
                          'https://www.facebook.com/sharer/sharer.php?u=' +
                          post.id +
                          'utm_source=facebook&utm_medium=social&utm_id=' +
                          post.id
                        }
                      >
                        Facebook
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <span style={{ fontWeight: '600' }}>
                {post?.postMeasures?.likeCount ? post?.postMeasures?.likeCount : '0'}
                {' Likes'}
              </span>
              <span> | </span>
              <span style={{ fontWeight: '600' }}>
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
                    src="https://cdn-icons-png.flaticon.com/512/1144/1144811.png"
                    alt="User-Pic"
                    width="60px"
                    style={{ marginRight: '10px' }}
                  ></img>
                  <Form.Control
                    // onChange={(e) => setPostCommentValue(e.target.value)}
                    type="text"
                    placeholder="Add Comments..."
                    required
                    autoFocus
                    style={{ width: '100%' }}
                  />
                  <button
                    type="submit"
                    style={{
                      float: 'right',
                      marginLeft: '10px',
                      borderRadius: '10px',
                      padding: '5px',
                      border: 'none',
                      backgroundColor: '#008CBA',
                      color: 'white',
                      width: '20%',
                    }}
                  >
                    PostComment
                  </button>
                </Form.Group>
              </Form>
              {post?.comments?.map((comment: any) => {
                return (
                  <>
                    <div
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
                          {userObject?.firstName} {userObject?.lastName}
                        </h4>
                      </div>
                      <div>{comment?.commentString}</div>
                    </div>
                  </>
                );
              })}
              {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  style={{
                    padding: '10px',
                    backgroundColor: '#dcdcdc',
                    border: 'none',
                    borderRadius: '20px',
                  }}
                  type="button"
                >
                  <span>Load Comments </span>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2767/2767294.png"
                    width="20px"
                    height="20px"
                  />
                </button>
              </div> */}
            </div>
          </Collapse>
        </div>
      );
    });
    setPosts(locArr2);
  }

  function addLatestCreatedPost(id: string) {
    getPostByIdCall(userToken, id).then((response) => {
      if (response?.data?.data != undefined) {
        let locArray: any = [];
        locArray.push(response?.data?.data);
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
      return `${timeDiffHours} ${timeDiffDays > 1 ? 'hours' : 'hour'} ago`;
    } else {
      return `${timeDiffMinutes} ${timeDiffDays > 1 ? 'minutes' : 'minute'} ago`;
    }
  }

  //Function To Handle Post Submit
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (postText == '') {
      return;
    }
    let uniqueId = generateUniqueId();

    setMyArr((prevPosts) => {
      const newPost = {
        id: uniqueId,
        // heading: postHeading,
        postText: postText,
        imageArray: file,
        docArray: docs,
        videoArray: videoLink,
        likes: 0,
        disLikes: [],
        showComments: false,
        comments: [],
      };
      return { posts: [...prevPosts.posts, newPost] };
    });

    addPostCall(userToken, { description: postText }).then((response) => {
      if (response?.data?.data) {
        addLatestCreatedPost(response?.data?.data);
        // Empty Post Values
        setShowForm1(false);
        setFile([]);
        setPostText('');
        setVideoLink([]);
        setDocs([]);
      } else {
        setCreateNewPostError(true);
        setTimeout(() => {
          setCreateNewPostError(false);
        }, 2000);
      }
    });
  };

  //Function To Handle Post Action Items
  // useEffect(() => {
  //   if (props?.fields?.data?.datasource?.postType?.targetItems?.delete?.me) {
  //     let arr: any[] = [];
  //     props?.fields?.data?.datasource?.postType?.targetItems?.map((item: any) => {
  //       arr?.push(
  //         <div>
  //           <button>
  //             <span>{item?.title?.jsonValue?.value}</span>
  //             <img
  //               src={`https://9977-182-77-26-98.in.ngrok.io/${item?.image?.jsonValue?.value?.src}`}
  //               alt={item?.image?.jsonValue?.value?.alt}
  //               width="30px"
  //             ></img>
  //           </button>
  //         </div>
  //       );
  //     });
  //     setPostItems(arr);
  //   }
  // }, [props]);

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

  //Function To Handle Load Image Files
  function uploadMultipleFiles(e: any) {
    const files = e.target.files;
    const fileArray: any = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      let uniqueId = generateUniqueId();
      let name = files[i].name;

      reader.onload = () => {
        fileArray.push({ id: uniqueId, name: name, value: reader.result });
        if (fileArray.length === files.length) {
          setFile(fileArray);
        }
      };
    }
  }

  //Function To Handle Load Doc Files
  function uploadMultipleDocs(e: any) {
    const files = e.target.files;
    const fileArray: any = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      let uniqueId = generateUniqueId();
      let name = files[i].name;
      reader.onload = () => {
        fileArray.push({ id: uniqueId, name: name, value: reader.result });
        if (fileArray.length === files.length) {
          setDocs(fileArray);
        }
      };
    }
  }

  //Function To Handle Load Video Files
  function uploadVideo(e: any) {
    const files = e.target.files;
    const fileArray: any = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      let uniqueId = generateUniqueId();
      reader.readAsDataURL(files[i]);
      let name = files[i].name;
      reader.onload = () => {
        fileArray.push({ id: uniqueId, name: name, value: reader.result });
        if (fileArray.length === files.length) {
          setVideoLink(fileArray);
        }
      };
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
              {/* <Modal show={showForm1} onHide={handleClose1}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Post Heading</Form.Label>
                  <Form.Control
                    onChange={(e) => setPostHeadingValue(e.target.value)}
                    value={postHeading}
                    type="text"
                    placeholder="Post Heading"
                    required
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Post Content</Form.Label>
                  <Form.Control
                    onChange={(e) => setPostTextValue(e.target.value)}
                    value={postText}
                    as="textarea"
                    rows={7}
                    placeholder="Post Text"
                    required
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose1}>
                Close
              </Button>
              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Save Post
              </Button>
            </Modal.Footer>
          </Modal> */}
            </div>
            {/* <div className="AddPostItems">
          {postItems.length == 0 ? (
            <>
              <div>
                <button>
                  <span>Image</span>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/4904/4904233.png"
                    alt="PostItems"
                    width="30px"
                  ></img>
                </button>
              </div>
              <div>
                <button>
                  <span>Event</span>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2693/2693507.png"
                    alt="PostItems"
                    width="30px"
                  ></img>
                </button>
              </div>
              <div>
                <button>
                  <span>Poll</span>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2668/2668889.png"
                    alt="PostItems"
                    width="30px"
                  ></img>
                </button>
              </div>
              <div>
                <button>
                  <span>Activity</span>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/4336/4336647.png"
                    alt="PostItems"
                    width="30px"
                  ></img>
                </button>
              </div>
            </>
          ) : (
            postItems
          )}
        </div> */}
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
                    <Form.Control
                      onChange={(e) => setPostTextValue(e.target.value)}
                      value={postText}
                      as="textarea"
                      rows={7}
                      placeholder="Share Your Thoughts..."
                      required
                      style={{ border: 'none', resize: 'none' }}
                    />
                  </Form.Group>
                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {file.map((img: any, num: any) => {
                      return (
                        <>
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
                            <img width="300px" src={img.value} alt={img.id}></img>
                          </div>
                        </>
                      );
                    })}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
                    {docs.map((doc: any, num: any) => {
                      return (
                        <>
                          <div className="docPreviewContainer" key={num}>
                            <span className="openPrevButton">
                              <button
                                onClick={() => openDoc(doc.value)}
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
                        </>
                      );
                    })}
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap' }} id="setVideoPreview">
                    <hr />
                    {videoLink.map((video: any, num: any) => {
                      return (
                        <>
                          <video width="100%" controls src={video.value} />
                          <div key={num}>
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
                        </>
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
                            multiple
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
                            multiple
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
    </>
  );
};

export default withSitecoreContext()(AddPost);
