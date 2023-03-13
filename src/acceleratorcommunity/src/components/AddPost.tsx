import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { ReactElement, useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import WebContext from '../Context/WebContext';
import { useRouter } from 'next/router';

type AddPostProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const AddPost = (props: AddPostProps | any): JSX.Element => {
  props; //delete me
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
  myPostArray.push(postStructCreate('Default Heading', 'Default Post'));
  let [posts, setPosts] = useState(myPostArray);
  let postItems: ReactElement<any, any>[] = [];

  let [postText, setPostText] = useState('');
  let [postHeading, setPostHeading] = useState('');
  //let initVar: any = '';
  // let [postImage, setPostImage] = useState<any>('');

  // async function ConvertToB64(e: any) {
  //   let temp = e?.target?.files[0];
  //   const reader = new FileReader();

  //   reader.addEventListener('load', () => {
  //     setPostImage(reader.result);
  //   });

  //   reader?.readAsDataURL(temp);
  // }

  // function setPostImageValue(e: any) {
  //   setPostImage(e);
  // }

  function setPostTextValue(e: any) {
    setPostText(e);
  }
  function setPostHeadingValue(e: any) {
    setPostHeading(e);
  }

  function postStructCreate(str1: string, str2: string) {
    const currentDate: Date = new Date();
    const year: number = currentDate.getFullYear();
    const month: number = currentDate.getMonth() + 1;
    const day: number = currentDate.getDate();
    console.log(`${year}-${month}-${day}`);

    return (
      <>
        <div className="postContainer">
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
                Created On : <span style={{ fontWeight: '100' }}>{`${day}-${month}-${year}`}</span>
              </h6>
            </div>
          </div>
          <hr />
          <h3>{str1}</h3>
          <div className="postContent">{str2}</div>
          {/* <img src={postImage} alt="Post Image" /> */}
          <hr />
          <div className="postActions">
            <button>
              <img
                src="https://cdn-icons-png.flaticon.com/512/126/126473.png"
                //https://cdn-icons-png.flaticon.com/512/739/739231.png
                width="40px"
                alt="actions"
              />
            </button>
            <button>
              <img
                src="https://cdn-icons-png.flaticon.com/512/126/126504.png"
                //https://cdn-icons-png.flaticon.com/512/880/880613.png
                width="40px"
                alt="actions"
              />
            </button>
            <button>
              <img
                src="https://cdn-icons-png.flaticon.com/512/786/786251.png"
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
        </div>
      </>
    );
  }

  const handleSubmit = () => {
    if (postHeading == '' || postText == '') {
      setShowForm1(false);
      return;
    }
    let tempArr = posts;
    tempArr.push(postStructCreate(postHeading, postText));
    // ConvertToB64(postImage);
    setPosts(tempArr);
    setPostText('');
    setPostHeading('');
    // setPostImage('');
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

          <Modal show={showForm1} onHide={handleClose1}>
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
                {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Post Content</Form.Label>
                  <Form.Control
                    onChange={(e) => setPostImageValue(e)}
                    // value={postImage}
                    type="file"
                    placeholder="Post Text"
                  />
                </Form.Group> */}
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
          </Modal>
        </div>
        <div className="AddPostItems">
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
        </div>
      </div>
      <div className="AllPostscontainer">{posts}</div>
    </>
  );
};

export default AddPost;
