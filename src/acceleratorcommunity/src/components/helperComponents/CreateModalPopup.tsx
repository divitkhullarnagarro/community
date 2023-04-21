import React, { Dispatch, SetStateAction } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

type ComponentProps = {
  popUpVisiable: boolean;
  setPopUpVisiable: Dispatch<SetStateAction<boolean>>;
  // body: string;
  body: string | Function;
  buttonName: string;
  title: string;
  buttonClickHandler: Function;
  disabled?: boolean;
};
function CreateModalPopup({
  popUpVisiable,
  setPopUpVisiable,
  body,
  buttonName,
  title,
  buttonClickHandler,
  disabled,
}: ComponentProps) {
  return (
    <>
      <Modal show={popUpVisiable} onHide={() => setPopUpVisiable(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{typeof body == 'string' ? body : body()}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setPopUpVisiable(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={(e) => buttonClickHandler(e)} disabled={disabled}>
            {buttonName}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateModalPopup;
