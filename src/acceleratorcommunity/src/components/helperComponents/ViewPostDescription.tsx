import { useContext, useState } from 'react';
import parser from 'html-react-parser';
import { modifyHtml } from 'assets/helpers/helperFunctions';
import WebContext from 'src/Context/WebContext';
import style from './../../assets/viewPostDescription.module.css';

function ViewPostDescription({ description }: any) {
  const [viewMoreVisible, setViewMoreVisible] = useState(description?.length > 600 ? true : false);
  const { darkMode } = {
    ...useContext(WebContext),
  };
  return (
    <>
      <div
        className={`postDescription ${darkMode ? 'darkModeDescription' : ''}`}
        style={viewMoreVisible ? { overflow: 'hidden', height: '5rem' } : {}}
      >
        {parser(modifyHtml(description))}
      </div>
      {viewMoreVisible && (
        <div className="d-flex justify-content-end me-3">
          <div
            onClick={() => setViewMoreVisible(false)}
            className={darkMode ? style.viewMoreButtonDarkMode : style.viewMoreButton}
          >
            ...See More
          </div>
        </div>
      )}
    </>
  );
}

export default ViewPostDescription;
