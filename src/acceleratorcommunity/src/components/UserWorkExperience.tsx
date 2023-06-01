import React, { useContext } from 'react';
import { Button, Form, Modal, CloseButton } from 'react-bootstrap';
import { Text } from '@sitecore-jss/sitecore-jss-nextjs';
import WebContext from '../Context/WebContext';
import darkModeCss from '../assets/darkTheme.module.css';

const UserWorkExperience = (props: any) => {
  // handleOpenWorkModal
  const { darkMode } = {
    ...useContext(WebContext),
  };
  return (
    <div className="workContainer">
      <div className="addNewItem">
        <Button onClick={props.addNewWorkDetail}>
          <span>
            <Text
              field={
                props?.labels?.addWorkBtn?.jsonValue
                  ? props?.labels?.addWorkBtn?.jsonValue
                  : {
                      value: 'Add Work',
                    }
              }
            />
          </span>
        </Button>
      </div>
      <div>
        {props?.placeOfPractice?.length > 0 ? (
          props?.placeOfPractice.map((work: any, index: number) => {
            return (
              <div key={index} className="itemContainer">
                <div className="instituteDetails">
                  <div className="instituteFields instituteName">{work.orgName}</div>
                  <div className="instituteFields">
                    {work.city}, {work.state} - {work.pincode}
                  </div>
                  <div className="instituteFields">{work.country}</div>
                  <div className="instituteFields">{work.employeeId}</div>
                  <div className="instituteFields">{work.designation}</div>
                  <div className="instituteFields">
                    {work.joiningDate} - {work.joiningYear}
                  </div>
                  {/* <div className="instituteFields">{work.wid}</div> */}
                  <div className="instituteFields">{work.presentlyWorkingHere}</div>
                  <div className="instituteFields">{work.leavingDate}</div>
                  <div className="instituteFields">{work.latitude}</div>
                  <div className="instituteFields">{work.socialUrl}</div>
                  <button className="itemEditBtn" onClick={() => props.editWorkFormData(work?.wid)}>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1827/1827933.png"
                      alt="edit"
                      width="20px"
                    />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="noDetailsParent">
            <div className="noDetails">You do not have any work details added yet.</div>
          </div>
        )}
      </div>

      <Modal show={props.openWorkModal} onHide={props.handleCloseWorkModal} className={`modalContent ${darkMode ? darkModeCss.darkModeModal : ''}`}>
        <Modal.Header className={`modalHeader ${darkMode ? darkModeCss.grey_3 : ''}`}>
          <Modal.Title className={`modalTitle ${darkMode ? darkModeCss.text_green : ''}`}>Work Information</Modal.Title>
            <CloseButton
              variant="default"
              className={`modalClose ${darkMode ? darkModeCss.invertFilter : ''}`}
              onClick={props.handleCloseWorkModal}
            ></CloseButton>
        </Modal.Header>
        <Modal.Body className={`${darkMode ? darkModeCss.grey_3 : ''} ${darkMode ? darkModeCss.test_grey_4 : ''}`}>
          <Form onSubmit={props.submitForm1}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Organization Name<span className="required">*</span>
              </Form.Label>
              <Form.Control
                onChange={(e) => props.setOrgName(e.target.value)}
                value={props.specificPlaceOfWork?.orgName}
                type="text"
                placeholder="Organization Name"
                autoFocus
                required
              />
            </Form.Group>
            <span>
              {props.errorState?.orgName ? <span className="error">Field is required</span> : ' '}
            </span>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Designation</Form.Label>
              <Form.Control
                onChange={(e) => props.setDesignation(e.target.value)}
                value={props.specificPlaceOfWork?.designation}
                type="text"
                placeholder="Designation"
                autoFocus
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Employee ID<span className="required">*</span>
              </Form.Label>
              <Form.Control
                onChange={(e) => props.setEmployeeId(e.target.value)}
                value={props.specificPlaceOfWork?.employeeId}
                type="text"
                placeholder="Employee ID"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Social Url</Form.Label>
              <Form.Control
                onChange={(e) => props.setSocialUrl(e.target.value)}
                value={props.specificPlaceOfWork?.socialUrl}
                placeholder="Social Url"
                autoFocus
                type="url"
                pattern="https?://.+"
              />
              {props.errorState?.urlError ? <span className="error">Url is incorrect</span> : ' '}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                onChange={(e) => props.setPincodeForWork(e.target.value)}
                value={props.specificPlaceOfWork?.pincode}
                type="text"
                placeholder="pincode"
                autoFocus
                maxLength={6}
              />
              <span>
                {props.errorState?.workPinCodeLength ? (
                  <span className="error">Pincode must be of length 6</span>
                ) : (
                  ' '
                )}
              </span>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>City</Form.Label>
              <Form.Control
                onChange={(e) => props.setCityOfWork(e.target.value)}
                value={props.specificPlaceOfWork?.city}
                type="text  "
                placeholder="City"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>State</Form.Label>
              <Form.Control
                onChange={(e) => props.setStateForWork(e.target.value)}
                value={props.specificPlaceOfWork?.state}
                type="text  "
                placeholder="State"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Country</Form.Label>
              <Form.Control
                onChange={(e) => props.setCountryOfWork(e.target.value)}
                value={props.specificPlaceOfWork?.country}
                type="text"
                placeholder="Country"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Still Working here</Form.Label>
              <Form.Check
                onChange={(e) => props.setStillWorkingHere(e.target.value)}
                checked={props.specificPlaceOfWork?.presentlyWorkingHere}
                // value={props.specificPlaceOfWork?.presentlyWorkingHere}
                ref={props.checkboxRef}
                placeholder="Still Working here"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>joining Date</Form.Label>
              <Form.Control
                onChange={(e) => props.setJoiningDate(e.target.value)}
                value={props.specificPlaceOfWork?.joiningDate}
                type="date"
                placeholder="joining Date"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Leaving Date</Form.Label>
              <Form.Control
                onChange={(e) => props.setLeavingDate(e.target.value)}
                value={props.specificPlaceOfWork?.leavingDate}
                type="date"
                placeholder="Leaving Date"
                autoFocus
                min={props?.placeOfPracticeState?.joiningDate}
                disabled={props.specificPlaceOfWork?.presentlyWorkingHere}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className={`${darkMode ? darkModeCss.grey_3 : ''} ${darkMode ? darkModeCss.test_grey_4 : ''}`}>
          <Button className='footerBtnCancel'
                variant="default" onClick={props.handleCloseWorkModal}>
            Close
          </Button>
          <Button className='footerBtnDefault'
                variant="secondary" onClick={props.submitWorkModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserWorkExperience;
