import React, { Dispatch, SetStateAction, useContext } from 'react';
import WebContext from 'src/Context/WebContext';
import { CloseButton, Modal, Button } from 'react-bootstrap';
import darkModeCss from '../../assets/darkTheme.module.css';

type ComponentProps = {
  popUpVisiable: boolean;
  setPopUpVisiable: Dispatch<SetStateAction<boolean>>;
  // body: string;
  body: string | Function;
  buttonName: string;
  title: string;
  buttonClickHandler: Function;
  disabled?: boolean;
  id?: any;
};
function CreateModalPopup({
  popUpVisiable,
  setPopUpVisiable,
  body,
  buttonName,
  title,
  buttonClickHandler,
  disabled,
  id,
}: ComponentProps) {
  const { darkMode } = {
    ...useContext(WebContext),
  };
  return (
    <>
      <Modal show={popUpVisiable} onHide={() => setPopUpVisiable(false)} className={`modalContent ${darkMode ? darkModeCss.darkModeModal : ''}`}>
        <Modal.Header className={`modalHeader ${darkMode ? darkModeCss.grey_3 : ''}`}>
          <Modal.Title className={`modalTitle ${darkMode ? darkModeCss.text_green : ''}`}>{title}</Modal.Title>
          <CloseButton
            variant="default"
            className={`modalClose ${darkMode ? darkModeCss.invertFilter : ''}`}
            onClick={() => setPopUpVisiable(false)}
          ></CloseButton>
        </Modal.Header>
        <Modal.Body className={`${darkMode ? darkModeCss.grey_3 : ''} ${darkMode ? darkModeCss.test_grey_4 : ''}`}>{typeof body == 'string' ? body : body()}</Modal.Body>
        <Modal.Footer className={`${darkMode ? darkModeCss.grey_3 : ''} ${darkMode ? darkModeCss.test_grey_4 : ''}`}>
          <Button className='footerBtnCancel'
                variant="default" onClick={() => setPopUpVisiable(false)}>
            Close
          </Button>
          <Button className='footerBtnDefault'
                variant="secondary" onClick={() => buttonClickHandler(id)} disabled={disabled}>
            {buttonName}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateModalPopup;
