import { useContext, useState } from 'react';
import parser from 'html-react-parser';
import { modifyHtml } from 'assets/helpers/helperFunctions';
import WebContext from 'src/Context/WebContext';
import style from './../../assets/viewPostDescription.module.css';

function DescriptionForSearch({ description }: any) {
  const [viewMoreVisible] = useState(description?.length > 600 ? true : false);
  const { darkMode } = {
    ...useContext(WebContext),
  };
  return (
    <>
      <div
        className={`${darkMode ? 'darkModeDescription' : ''}`}
        style={viewMoreVisible ? { overflow: 'hidden', height: '3.5rem' } : {}}
      >
        {parser(modifyHtml(description))}
      </div>
      {viewMoreVisible && (
        <div className="d-flex justify-content-end me-3">
          <div
            className={darkMode ? style.viewMoreButtonDarkMode : style.viewMoreButton}
          >
            ...See More
          </div>
        </div>
      )}
    </>
  );
}

export default DescriptionForSearch;
