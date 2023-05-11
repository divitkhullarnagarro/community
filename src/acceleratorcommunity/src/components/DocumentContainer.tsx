import { useContext } from 'react';
import WebContext from 'src/Context/WebContext';
import styles from '../assets/events.module.css';
import darkModeCss from '../assets/darkTheme.module.css';
import { modifyHtml } from 'assets/helpers/helperFunctions';
import parser from 'html-react-parser';

const DocumentContainer = (props: any) => {
  console.log('videooooooooooooooooooooooooooooooo', props?.events);
  const { darkMode } = { ...useContext(WebContext) };
  const id = props?.events?.id;

  const data = props?.events?.mediaInfoList[0]?.url;
  function openDoc(base64: string) {
    var base64pdf = base64;
    if (window !== undefined) {
      var pdfWindow = window.open('', '_blank');
      pdfWindow?.document.write(`<iframe width='100%' height='100%' src=${base64pdf}></iframe>`);
    }
  }
  return (
    <a  href={`/post/${id}`} className={styles.link} target="_blank">
      {props?.fromALL ? <div className={styles.typeHeading}>Post</div> : ''}
      <div className={`${styles.parentContainer} ${darkMode && darkModeCss.grey_1}`}>
        <div className={styles.imgAndContentContainer}>
          <div className={styles.document}>
            <div className="docPreviewContainer">
              <span className="openPrevButton">
                <button
                  onClick={() => openDoc(data)}
                  style={{
                    padding: '5px',
                    borderRadius: '20px',
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
          </div>
          <div className={styles.content}>
            {parser(modifyHtml(props?.events?.description))}
            <div className={`${styles.eventDescription} ${darkMode && darkModeCss.text_light}`}></div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default DocumentContainer;
