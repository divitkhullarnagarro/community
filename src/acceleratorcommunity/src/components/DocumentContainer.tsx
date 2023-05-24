import styles from '../assets/events.module.css';
// import { modifyHtml } from 'assets/helpers/helperFunctions';
// import parser from 'html-react-parser';
import darkModeCss from '../assets/darkTheme.module.css';
import { useContext } from 'react';
import WebContext from 'src/Context/WebContext';
import DescriptionForSearch from './helperComponents/DescriptionForSearch';

const DocumentContainer = (props: any) => {
  const id = props?.events?.id;
  const { darkMode } = { ...useContext(WebContext) };

  const data = props?.events?.mediaInfoList[0]?.url;
  function openDoc(base64: string) {
    var base64pdf = base64;
    if (window !== undefined) {
      var pdfWindow = window.open('', '_blank');
      pdfWindow?.document.write(`<iframe width='100%' height='100%' src=${base64pdf}></iframe>`);
    }
  }
  return (
    <a href={`/post?postId=${id}`} className={styles.link} target="_blank">
      {props?.fromALL ? (
        <div className={`${styles.typeHeading} ${darkMode && darkModeCss.text_green}`}>
          <div>Doc Post</div>
          <div onClick={() => openDoc(data)}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18.433 20H5.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h12.933a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM5.44 11.768a1.5 1.5 0 0 1-.001-2.122l.353-.354 5.302 5.296V2h2v12.585l5.292-5.292.354.354a1.5 1.5 0 0 1 0 2.121l-6.646 6.646-6.654-6.647z"
                fill="#283895"
              ></path>
            </svg>
          </div>
        </div>
      ) : (
        ''
      )}
      <div className={`${styles.parentContainer} ${darkMode && darkModeCss.grey_1}`}>
        <div className={styles.imgAndContentContainer}>
          {/* <div className={styles.document}>
            <div className="docPreviewContainer">
              <span className="openPrevButton">
                <button
                  onClick={() => openDoc(data)}
                  style={{
                    padding: '0px 30px',
                    borderRadius: '23px',
                    borderColor: 'white',
                  }}
                >
                  <img
                    width="50px"
                    src="https://cdn-icons-png.flaticon.com/512/2991/2991112.png"
                    // alt={num}
                    style={{ margin: '10px' }}
                  ></img>
                  {'DocFile'}
                </button>
              </span>
            </div>
          </div> */}
          <div className={`${styles.content} ${darkMode && darkModeCss.text_light}`}>
            <DescriptionForSearch fromSitecore={false} description={props?.events?.description} />
            {/* 
            {parser(
              modifyHtml(
                props?.events?.description.length > 1000
                  ? props?.events?.description.slice(0, 1000)
                  : props?.events?.description
              )
            )} */}
          </div>
        </div>
      </div>
    </a>
  );
};

export default DocumentContainer;
