import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const UserWorkExperience = (props: any) => {
  // handleOpenWorkModal

  return (
    <div className="workContainer">
      <Button className="profileBtn" onClick={props.addNewWorkDetail}>
        <img
          src="https://www.svgrepo.com/show/170952/add-button.svg"
          alt="edit"
          width="30px"
          style={{ marginRight: '20px' }}
        />
      </Button>
      <div>
        {props?.placeOfPractice?.length > 0 ? (
          <div>
            {props.placeOfPractice.map((work: any) => {
              return (
                <div>
                  <Button className="profileBtn" onClick={() => props.editWorkFormData(work?.wid)}>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1827/1827933.png"
                      alt="edit"
                      width="30px"
                      style={{ marginRight: '20px' }}
                    />
                  </Button>
                  <div>{work.city}</div>
                  <div>{work.country}</div>
                  <div>{work.designation}</div>
                  <div>{work.employeeId}</div>
                  <div>{work.joiningDate}</div>
                  <div>{work.joiningYear}</div>
                  <div>{work.latitude}</div>
                  <div>{work.leavingDate}</div>
                  <div>{work.orgName}</div>
                  <div>{work.pincode}</div>
                  <div>{work.presentlyWorkingHere}</div>
                  <div>{work.socialUrl}</div>
                  <div>{work.state}</div>
                  <div>{work.wid}</div>
                  <div className="border"></div>
                </div>
              );
            })}
          </div>
        ) : (
          ''
        )}
      </div>

      <Modal show={props.openWorkModal} onHide={props.handleCloseWorkModal}>
        <Modal.Header closeButton>
          <Modal.Title>Work Information</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalForProfile">
          <Form onSubmit={props.submitForm1}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Organization Name<span className="required">*</span></Form.Label>
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
              {console.log("fromuserexperiencecomponent",props.errorState?.orgName)}
            </span>
            {console.log('props.editUserData?.orgName', props?.placeOfPractice)}
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
              <Form.Label>Employee ID<span className="required">*</span></Form.Label>
              <Form.Control
                onChange={(e) => props.setEmployeeId(e.target.value)}
                value={props.specificPlaceOfWork?.employeeId}
                type="text"
                placeholder="Employee ID"
                autoFocus
              />
              {props.errorState?.empId ? <span className="error">Field is required</span> : ' '}

            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Social Url</Form.Label>
              <Form.Control
                onChange={(e) => props.setSocialUrl(e.target.value)}
                value={props.specificPlaceOfWork?.socialUrl}
                type="text"
                placeholder="Social Url"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                onChange={(e) => props.setPincodeForWork(e.target.value)}
                value={props.specificPlaceOfWork?.pincode}
                type="number"
                placeholder="pincode"
                autoFocus
              />
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
                // value={props.specificPlaceOfWork?.orgName}
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
              <Form.Label>joining Year</Form.Label>
              <Form.Control
                onChange={(e) => props.setJoiningYear(e.target.value)}
                value={props.specificPlaceOfWork?.joiningYear}
                type="number"
                placeholder="joining year"
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
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleCloseWorkModal}>
            Close
          </Button>
          <Button variant="primary" onClick={props.submitWorkModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserWorkExperience;
