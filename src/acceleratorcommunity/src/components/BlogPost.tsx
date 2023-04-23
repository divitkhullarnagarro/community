import styles from '../assets/blogpost.module.css';
import Form from 'react-bootstrap/Form';
const Editor = dynamic<EditorProps>(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), {
  ssr: false,
});
import { useContext, useEffect, useState } from 'react';
import WebContext from '../Context/WebContext';
import draftToHtml from 'draftjs-to-html';
import { toolbar } from 'assets/helpers/constants';
import { EditorState, convertToRaw } from 'draft-js';
import { EditorProps } from 'react-draft-wysiwyg';
import dynamic from 'next/dynamic';
import allPeersCall from 'src/API/getPeers';
import Button from 'react-bootstrap/Button';
import addArticleCall from '../API/addArticleCall';
import { useRouter } from 'next/router';
import uploadFilesCall from 'src/API/uploadFilesCall';
import imagelogo from '../assets/images/imagelogo.svg';
const TextEditor = (): JSX.Element => {
  const router = useRouter();
  const { userToken } = {
    ...useContext(WebContext),
  };
  let [postText, setPostText] = useState('');
  let [headlineText, setHeadlineText] = useState('');
  let [createNewPostError, setCreateNewPostError] = useState(false);
  const [file, setFile] = useState<
    { id: string; url: string; mediaType: string; mediaSequence: number }[]
  >([] as { id: string; url: string; mediaType: string; mediaSequence: number }[]);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [addedPeers, setAddedPeers] = useState<string[]>([] as string[]);
  const [previewState, setPreviewState] = useState<boolean>(false);

  const [preview1, setPreview1] = useState<any>();
  const [mentionUserData, setMentionUserData] = useState<
    {
      text: string;
      value: string;
      url: string;
    }[]
  >([] as { text: string; value: string; url: string }[]);

  useEffect(() => {
    const rawEditorContent = convertToRaw(editorState.getCurrentContent());
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
    setMentionUserData(userData);
  };
  useEffect(() => {
    getAllPears();
  }, []);

  useEffect(() => {
    const rawEditorContent = convertToRaw(editorState.getCurrentContent());
    console.log('vicky rawEditorContent', rawEditorContent);
    const entityMap = rawEditorContent.entityMap;
    const addedPeerList = new Set<string>();
    Object.values(entityMap).map((entity) => {
      addedPeerList.add(entity.data.url.substring(9, entity.data.url.length));
    });
    const addedpeersList = [...addedPeerList.values()];
    setAddedPeers(addedpeersList);
  }, [editorState]);

  const onEditorStateChangeHandler = (e: any) => {
    setEditorState(e);
    setPostTextValue(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };
  const onHeadlineStateChangeHandler = (e: any) => {
    setHeadlineText(e.target.value);
  };
  function setPostTextValue(e: any) {
    setPostText(e);
  }
  function clickmebuttonHandler() {
    if (typeof document !== undefined) {
      let buttEle = document.getElementById('clickmebutton');
      buttEle?.click();
    }
  }
  async function setPostImageValue(e: any) {
    uploadMultipleFiles(e);
  }
  async function UploadFilesToServer(file: any, type: string) {
    return await uploadFilesCall(userToken, file, type).then((response) => {
      return response?.data;
    });
  }
  async function uploadMultipleFiles(e: any) {
    const files = e.target.files;
    var reader = URL?.createObjectURL(files[0]);
    // var url = reader.readAsDataURL;
    console.log(reader, 'filearrayurl');
    setPreview1(reader);
    const fileArray: any = [];
    for (let i = 0; i < files.length; i++) {
      let resp = await UploadFilesToServer(files[i], 'IMAGE');
      let uniqueId = generateUniqueId();
      // if (!resp?.data) break;
      fileArray.push({ id: uniqueId, url: resp?.data, mediaType: 'IMAGE', mediaSequence: 0 });
    }
    console.log(files, 'filearray1');
    if (fileArray.length === files.length) {
      console.log(fileArray, 'filearray');
      setFile(fileArray);
      setPreviewState(true);
    }
  }
  function generateUniqueId() {
    const timestamp = Date.now();
    const random = Math.random() * Math.pow(10, 18);
    return `${timestamp}-${random}`;
  }
  function clickCrossImageButton(id: any) {
    setFile(
      file.filter((img: any) => {
        if (img.id != id) {
          return img;
        }
      })
    );
    setPreviewState(false);

    if (typeof document !== undefined) {
      let buttEle: any = document.getElementById('clickmebutton');
      if (buttEle != null) {
        buttEle.value = '';
      }
    }
  }
  const handleSubmit = (e: any) => {
    e.preventDefault();

    let postType = 'BLOG_POST';
    console.log(headlineText, postText, file[0]?.url, addedPeers, 'abc');

    addArticleCall(userToken, {
      heading: headlineText,
      description: postText,
      imageUrl: file[0]?.url,
      taggedPeers: addedPeers,
      type: postType,
    }).then((response) => {
      if (response?.data?.data) {
        // Empty Post Values
        setFile([]);
        setPostText('');
        setEditorState(() => EditorState.createEmpty());
        router.push('/');
      } else {
        setCreateNewPostError(true);

        setTimeout(() => {
          setCreateNewPostError(false);
        }, 2000);
      }
    });
  };

  return (
    <div className={styles.container}>
      <form style={{ border: '1px', borderColor: 'black' }} onSubmit={handleSubmit}>
        <Form.Group controlId="exampleForm.ControlInput1">
          <input
            className={styles.headlineText}
            type="text"
            placeholder="Headline"
            onChange={(e) => onHeadlineStateChangeHandler(e)}
            required
          />
          {previewState === false ? (
            <button className={styles.imageButton} onClick={clickmebuttonHandler} type="button">
              {/* <span>Image</span> */}
              {/* <NextImage field={camera} editable={true} alt="Profile-Pic" width={18} height={18} /> */}

              <div className={styles.subContainer}>
                <img src={imagelogo.src} className={styles.imageCls}></img>
                <div>Add a cover image that complements your article to attract more readers.</div>
                <div>We recommend uploading an image that is 1920x1080 pixels.</div>
                <p className={styles.uploadCls}>Upload</p>
              </div>
              <Form.Control
                style={{ display: 'none' }}
                onChange={(e) => setPostImageValue(e)}
                // value={postImage}
                type="file"
                placeholder="Click to add image"
                // multiple
                accept="image/*"
                id="clickmebutton"
              />
            </button>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {file.map((img: any, num: any) => {
                return (
                  <div
                    className={styles.imageButton}
                    key={num}
                    // style={{
                    //   borderRadius: '30px',
                    //   margin: '0px 15px 15px 0px',
                    // }}
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
                    <img className={styles.previewImageCls} src={preview1} alt={img?.id}></img>
                    {console.log(img.url, 'imageuel')}
                  </div>
                );
              })}
            </div>
          )}
        </Form.Group>
        <Editor
          editorState={editorState}
          onEditorStateChange={(e) => onEditorStateChangeHandler(e)}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          editorStyle={{ height: '200px' }}
          placeholder="  Write here. You can also include @mentions or #hashtags."
          toolbar={toolbar}
          mention={{
            separator: ' ',
            trigger: '@',
            suggestions: mentionUserData,
          }}
          hashtag={{}}
        />

        <Button
          className={`btn btn-lg ${styles.publishButton}`}
          variant="secondary"
          style={{
            boxShadow: !createNewPostError ? 'none' : '0 4px 8px 0 rgba(255, 0, 0, 0.6)',
          }}
          type="submit"
        >
          Publish
        </Button>
        <div className={styles.errorContainer}>
          {createNewPostError ? (
            <span style={{ fontWeight: 1000, color: 'red', fontSize: '8px' }}>
              * Something Went Wrong. Post not uploaded !
            </span>
          ) : (
            ''
          )}
          {/* </div>

              <div> */}
        </div>
      </form>
    </div>
  );
};

export default TextEditor;
