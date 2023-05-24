import { useContext, useState } from 'react';
import parser from 'html-react-parser';
import { modifyHtml } from 'assets/helpers/helperFunctions';
import WebContext from 'src/Context/WebContext';
import style from './../../assets/viewPostDescription.module.css';

function DescriptionForSearch({ description, fromSitecore }: any) {
  const [viewMoreVisible] = useState(description?.length > 600 ? true : false);
  const [toggleState, setToggleState] = useState(description?.length > 600 ? true : false);

  const { darkMode } = {
    ...useContext(WebContext),
  };

  const toggle = () => {
    setToggleState((toggleState) => !toggleState);
  };

  return (
    <>
      <div
        className={`${darkMode ? 'darkModeDescription' : ''}`}
        style={toggleState ? { overflow: 'hidden', height: '3.5rem' } : {}}
      >
        {parser(modifyHtml(description))}
      </div>
      {viewMoreVisible && (
        <div className="d-flex justify-content-end me-3">
          {fromSitecore === true ? (
            <div
              onClick={toggle}
              className={darkMode ? style.viewMoreButtonDarkMode : style.viewMoreButton}
            >
              {`...See ${toggleState ? 'More' : 'Less'}`}
            </div>
          ) : (
            <div className={darkMode ? style.viewMoreButtonDarkMode : style.viewMoreButton}>
              ...See More
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default DescriptionForSearch;
