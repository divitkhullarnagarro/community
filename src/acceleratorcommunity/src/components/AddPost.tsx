import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { ReactElement, useContext, useEffect, useState } from 'react';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import Form from 'react-bootstrap/Form';
import WebContext from '../Context/WebContext';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import addPostCall from '../API/addPostCall';

type AddPostProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const AddPost = (props: AddPostProps | any): JSX.Element => {
  props; //delete me
  console.log(addPostCall());
  const { userToken } = { ...useContext(WebContext) };
  const router = useRouter();
  const [showForm1, setShowForm1] = useState(false);
  const handleClose1 = () => setShowForm1(false);
  const handleShow1 = () => setShowForm1(true);

  let isExpEditorActive = props?.sitecoreContext?.pageEditing;

  useEffect(() => {
    if (userToken == '' && !isExpEditorActive) {
      router.push('/login');
    }
  }, []);

  let myPostArray: ReactElement<any, any>[] = [];
  let [posts, setPosts] = useState(myPostArray);
  let postItems: ReactElement<any, any>[] = [];

  let [postText, setPostText] = useState('');
  let [postHeading, setPostHeading] = useState('');

  const [file, setFile] = useState([]);
  const [docs, setDocs] = useState([]);
  const [videoLink, setVideoLink] = useState([]);

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

  function setPostHeadingValue(e: any) {
    setPostHeading(e);
  }

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
    heading: string;
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

  const initialPosts: postsType = {
    posts: [
      {
        id: '1231221',
        heading: 'Default Post heading',
        postText: 'Default Post Text',
        imageArray: [],
        docArray: [],
        videoArray: [],
        likes: 0,
        disLikes: [],
        showComments: false,
        comments: [
          {
            id: '',
            commentToId: '',
            nameOfCommentor: '',
            dateAndTime: '',
            commentString: '',
          },
        ],
      },
    ],
  };

  let [myArr, setMyArr] = useState<postsType>(initialPosts);

  useEffect(() => {
    postStructCreate();
  }, [myArr]);

  function LikePost(id: any) {
    let locArr = myArr.posts;
    let modPost = locArr.map((post: any) => {
      if (post.id == id) {
        post.likes++;
        return post;
      } else {
        return post;
      }
    });
    setMyArr(() => {
      return { posts: modPost };
    });
  }

  function setOpenComments(id: string, show: boolean) {
    let locArr = myArr.posts;
    let modPost = locArr.map((post: any) => {
      if (post.id == id) {
        post.showComments = show;
        return post;
      } else {
        return post;
      }
    });
    setMyArr(() => {
      return { posts: modPost };
    });
  }

  function postComments(id: string, comment: string) {
    console.log(id, comment);
  }

  let [postComment, setPostComment] = useState('');

  function setPostCommentValue(id: any, e: any) {
    console.log('comment value', e, id);
    setPostComment(e);
  }

  function postStructCreate() {
    const currentDate: Date = new Date();
    const year: number = currentDate.getFullYear();
    const month: number = currentDate.getMonth() + 1;
    const day: number = currentDate.getDate();

    let locArr: ReactElement<any, any>[] = [];
    myArr.posts.map((post: any, num: any) => {
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
                  onSubmit={() => {
                    postComments(post.id, post.heading);
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
                      onChange={(e) => setPostCommentValue(post.id, e.target.value)}
                      value={postComment}
                      type="text"
                      placeholder="Add Comments..."
                      required
                      autoFocus
                      // style={{ border: 'none' }}
                    />
                  </Form.Group>
                </Form>
                {post.comments.map((comment: any) => {
                  return <div>{comment.commentString}</div>;
                })}
              </div>
            </Collapse>
          </div>
        </>
      );
    });
    setPosts(locArr);
  }

  const handleSubmit = () => {
    if (postHeading == '' || postText == '') {
      setShowForm1(false);
      return;
    }
    let uniqueId = generateUniqueId();

    setMyArr((prevPosts) => {
      const newPost = {
        id: uniqueId,
        heading: postHeading,
        postText: postText,
        imageArray: file,
        docArray: docs,
        videoArray: videoLink,
        likes: 0,
        disLikes: [],
        showComments: false,
        comments: [
          {
            id: '',
            commentToId: '',
            nameOfCommentor: '',
            dateAndTime: '',
            commentString: '',
          },
        ],
      };
      return { posts: [...prevPosts.posts, newPost] };
    });

    // Empty Post Values
    setFile([]);
    setPostText('');
    setVideoLink([]);
    setPostHeading('');
    setDocs([]);
    setShowForm1(false);
  };

  useEffect(() => {
    if (props?.data?.postType?.targetItems?.length != 0) {
      props?.data?.postType?.targetItems.map((item: any) => {
        postItems.push(
          <div>
            <button>
              <span>{item?.title?.jsonValue?.value}</span>
              <img
                src={item?.image?.jsonValue?.value?.src}
                alt={item?.image?.jsonValue?.value?.alt}
                width="30px"
              ></img>
            </button>
          </div>
        );
      });
    }
  }, []);

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

  function uploadMultipleDocs(e: any) {
    const files = e.target.files;
    console.log(e);
    const fileArray: any = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      let uniqueId = generateUniqueId();
      let name = files[i].name;
      reader.onload = (event: any) => {
        console.log('asdas', event);
        fileArray.push({ id: uniqueId, name: name, value: reader.result });
        if (fileArray.length === files.length) {
          setDocs(fileArray);
        }
      };
    }
  }

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

  function clickCrossVideoButton() {
    setVideoLink([]);
    if (typeof document !== undefined) {
      let buttEle: any = document.getElementById('clickmebutton3');
      if (buttEle != null) {
        buttEle.value = '';
      }
    }
  }

  function openDoc(base64: string) {
    var base64pdf = base64;

    if (window !== undefined) {
      var pdfWindow = window.open('', '_blank');
      pdfWindow?.document.write(`<iframe width='100%' height='100%' src=${base64pdf}></iframe>`);
    }
  }

  return (
    <>
      <div className="AddPostContainer">
        <h4>Start a post, Mr. John Doe</h4>
        {/* <img src={postImage} alt="Image"></img> */}
        <div className="AddPostField">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Profile-Pic"
            width="60px"
          ></img>
          <Button
            onClick={handleShow1}
            style={{
              width: '85%',
              marginLeft: '20px',
              borderColor: 'black',
              backgroundColor: 'white',
              color: 'black',
              cursor: 'pointer',
            }}
          >
            <h3>Add Post</h3>
          </Button>

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
      <div className="AddPostContainer" style={{ display: showForm1 ? '' : 'none' }}>
        <div className="AddPostField">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Profile-Pic"
              width="60px"
              style={{ marginBottom: '20px' }}
            />
            <h4 style={{ marginLeft: '20px' }}>Start a post, Mr. John Doe</h4>
          </div>
          <Form onSubmit={handleSubmit} style={{ border: '1px', borderColor: 'black' }}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                onChange={(e) => setPostHeadingValue(e.target.value)}
                value={postHeading}
                type="text"
                placeholder="Post Heading"
                required
                autoFocus
                style={{ border: 'none' }}
              />
            </Form.Group>
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
              {postItems.length == 0 ? (
                <>
                  <div>
                    <button onClick={clickmebuttonHandler} type="button">
                      <span>Image</span>
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/4904/4904233.png"
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
                </>
              ) : (
                postItems
              )}
            </div>
          </Form>
          <hr />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Publish Post
            </Button>
            <Button variant="secondary" onClick={handleClose1}>
              Close
            </Button>
          </div>
        </div>
      </div>
      <div className="AllPostscontainer">{posts}</div>
    </>
  );
};

export default withSitecoreContext()(AddPost);
