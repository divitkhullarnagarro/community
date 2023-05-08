import React from 'react';
import styles from '../assets/events.module.css';
import specificPostCss from '../assets/specificPost.module.css';

const DocumentContainer = (props: any) => {
  console.log('videooooooooooooooooooooooooooooooo', props?.events?.mediaInfoList[0]?.url);
  const data = props?.events?.mediaInfoList[0]?.url;
  function openDoc(base64: string) {
    var base64pdf = base64;
    if (window !== undefined) {
      var pdfWindow = window.open('', '_blank');
      pdfWindow?.document.write(`<iframe width='100%' height='100%' src=${base64pdf}></iframe>`);
    }
  }
  return (
    <>
      <div className={styles.parentContainer}>
        <div className={specificPostCss.document}>
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
      </div>
    </>
  );
};

export default DocumentContainer;
