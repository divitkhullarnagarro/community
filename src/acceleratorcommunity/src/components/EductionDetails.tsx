import { Button, Form, Modal, CloseButton } from 'react-bootstrap';
import { Text } from '@sitecore-jss/sitecore-jss-nextjs';
import WebContext from '../Context/WebContext';
import React, { useContext } from 'react';
import darkModeCss from '../assets/darkTheme.module.css';

const EductionDetails = (props: any) => {
  const { darkMode } = {
    ...useContext(WebContext),
  };
  return (
    <>
      <div className="EducationContainer">
        <div className="addNewItem">
          <Button onClick={props.addEducationDetails}>
            <span>
              <Text
                field={
                  props?.labels?.addEducationBtn?.jsonValue
                    ? props?.labels?.addEducationBtn?.jsonValue
                    : {
                        value: 'Add Institute',
                      }
                }
              />
            </span>
          </Button>
        </div>
        {props.qualifications?.length > 0 ? (
          props.qualifications?.map((data: any, index: number) => {
            return (
              <div key={index} className="itemContainer">
                <div className="instituteDetails">
                  <div className="instituteFields instituteName">{data?.instituteName}</div>
                  <div className="instituteFields">
                    {data?.city}, {data?.state} - {data?.pincode}
                  </div>
                  <div className="instituteFields">{data?.country}</div>
                  <div className="instituteFields">{data?.standard}</div>
                  <div className="instituteFields instituteTenure">
                    {data?.startDate || '20XX'} - {data?.endDate || '20XX'}
                  </div>
                  <div className="instituteFields">{data?.grade}</div>
                  <div className="instituteFields">{data?.percentage}</div>
                  <div className="instituteFields">{data?.remarks}</div>
                </div>
                <button
                  className="itemEditBtn"
                  onClick={() => props?.editEducationmData(data?.qid)}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1827/1827933.png"
                    alt="edit"
                    width="20px"
                  />
                </button>
              </div>
            );
          })
        ) : (
          <div className="noDetailsParent">
            <div className="noDetails">You do not have any educational details added yet.</div>
          </div>
        )}
      </div>

      <Modal show={props.showEducationModal} onHide={props.handleCloseForEducation} className={`modalContent ${darkMode ? darkModeCss.darkModeModal : ''}`}>
        <Modal.Header className={`modalHeader ${darkMode ? darkModeCss.grey_3 : ''}`}>
          <Modal.Title className={`modalTitle ${darkMode ? darkModeCss.text_green : ''}`}>Education Information</Modal.Title>
          <CloseButton
            variant="default"
            className={`modalClose ${darkMode ? darkModeCss.invertFilter : ''}`}
            onClick={props.handleCloseForEducation}
          ></CloseButton>
        </Modal.Header>
        <Modal.Body className={`modalForProfile ${darkMode ? darkModeCss.grey_3 : ''} ${darkMode ? darkModeCss.test_grey_4 : ''}`}>
          <Form onSubmit={props.submitForm1}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Institute Name<span className="required">*</span>
              </Form.Label>
              <Form.Control
                onChange={(e) => props.setInstituteName(e.target.value)}
                value={props.specificPlaceOfWork?.instituteName}
                type="text"
                placeholder="Institute Name"
                autoFocus
                required
              />
            </Form.Group>
            {props.errorState?.instituteName ? (
              <span className="error">Field is required</span>
            ) : (
              ' '
            )}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Standard<span className="required">*</span>
              </Form.Label>
              <Form.Control
                onChange={(e) => props.setStandard(e.target.value)}
                value={props.specificPlaceOfWork?.standard}
                as="select"
                placeholder="Standard"
                autoFocus
                required
              >
                <option selected disabled hidden value="">
                  Please Select Your Standard
                </option>
                <option value="HIGH_SCHOOL" selected>
                  High School
                </option>
                <option value="HIGHER_SECONDARY">Higher Secondary</option>
                <option value="GRADUATE">Graduate</option>
                <option value="POST_GRADUATE">Post Graduate</option>
                <option value="DOCT">Doctrate</option>
                <span>
                  {props.errorState?.standard ? (
                    <span className="error">Field is required</span>
                  ) : (
                    ' '
                  )}
                </span>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Percentage</Form.Label>
              <Form.Control
                onChange={(e) => props.setPercentage(e.target.value)}
                value={props.specificPlaceOfWork?.percentage}
                type="text"
                placeholder="Percentage"
                autoFocus
              />
            </Form.Group>
            <span>
              {props.errorState?.lastName ? <span className="error">Field is required</span> : ' '}
            </span>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Grade<span className="required">*</span>
              </Form.Label>
              <Form.Control
                onChange={(e) => props.Grade(e.target.value)}
                value={props.specificPlaceOfWork?.grade}
                as="select"
                placeholder="Grade"
                autoFocus
              >
                {' '}
                <option selected disabled hidden value="">
                  Please Select Your Grade
                </option>
                <option value="A" selected>
                  A
                </option>
                <option value="A_PLUS">A+</option>
                <option value="B">B</option>
                <option value="B_PLUS">B+</option>
                <option value="C">C</option>
                <option value="C_PLUS">C+</option>
                <span>
                  {props.errorState?.grade ? <span className="error">Field is required</span> : ' '}
                </span>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Remark</Form.Label>
              <Form.Control
                onChange={(e) => props.setRemarks(e.target.value)}
                value={props.specificPlaceOfWork?.remarks}
                type="text"
                placeholder="Remark"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                onChange={(e) => props.setStartDate(e.target.value)}
                value={props.specificPlaceOfWork?.startDate}
                type="date"
                placeholder="Start Date"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                onChange={(e) => props.setEndDate(e.target.value)}
                value={props.specificPlaceOfWork?.endDate}
                type="date"
                placeholder="End Date"
                autoFocus
                min={props?.date?.startDate}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                City
                <span className="required">*</span>
              </Form.Label>
              <Form.Control
                onChange={(e) => props.setCityOfEducation(e.target.value)}
                value={props.specificPlaceOfWork?.city}
                type="text"
                placeholder="City"
                autoFocus
              />
            </Form.Group>
            <span>
              {props.errorState?.eduCity ? <span className="error">Field is required</span> : ' '}
            </span>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                State
                <span className="required">*</span>
              </Form.Label>
              <Form.Control
                onChange={(e) => props.setStateOfEducation(e.target.value)}
                value={props.specificPlaceOfWork?.state}
                type="text"
                placeholder="State"
                autoFocus
              />
            </Form.Group>
            <span>
              {props.errorState?.eduState ? <span className="error">Field is required</span> : ' '}
            </span>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Country
                <span className="required">*</span>
              </Form.Label>
              <Form.Control
                onChange={(e) => props.setCountryOfEducation(e.target.value)}
                value={props.specificPlaceOfWork?.country}
                type="text"
                placeholder="Country"
                autoFocus
              />
            </Form.Group>
            <span>
              {props.errorState?.eduCountry ? (
                <span className="error">Field is required</span>
              ) : (
                ' '
              )}
            </span>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Pincode
                <span className="required">*</span>
              </Form.Label>
              <Form.Control
                onChange={(e) => props.setPincode(e.target.value)}
                value={props.specificPlaceOfWork?.pincode}
                type="text"
                placeholder="Pincode"
                autoFocus
                min="0"
              />
            </Form.Group>
            <span>
              {props.errorState?.eduPincode ? (
                <span className="error">Field is required</span>
              ) : (
                ' '
              )}
            </span>
            <span>
              {props.errorState?.eduPincodeLength ? (
                <span className="error">Pincode must be of length 6</span>
              ) : (
                ' '
              )}
            </span>
          </Form>
        </Modal.Body>
        <Modal.Footer className={`${darkMode ? darkModeCss.grey_3 : ''} ${darkMode ? darkModeCss.test_grey_4 : ''}`}>
          <Button className='footerBtnCancel'
                variant="default" onClick={props.handleCloseForEducation}>
            Close
          </Button>
          <Button className='footerBtnDefault'
                variant="secondary" onClick={props.handleSaveEduaction}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EductionDetails;
