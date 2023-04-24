import { Button, Form, Modal } from 'react-bootstrap';

const EductionDetails = (props: any): JSX.Element => (
  <>
    <div className="EducationContainer">
      {props.qualifications?.length > 0
        ? props.qualifications?.map((data: any, index: number) => {
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
                <button className="itemEditBtn" onClick={props.handleShowFormForHobby}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1827/1827933.png"
                    alt="edit"
                    width="20px"
                  />
                </button>
              </div>
            );
          })
        : ''}
      <div className="addNewItem">
        <Button onClick={props.addEducationDetails}>
          <span>Add Institute</span>
        </Button>
      </div>
    </div>

    <Modal show={props.showEducationModal} onHide={props.handleCloseForEducation}>
      <Modal.Header closeButton>
        <Modal.Title>Education Information</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalForProfile">
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
          <span>
            {props.errorState?.instituteName ? (
              <span className="error">Field is required</span>
            ) : (
              ' '
            )}
          </span>
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
              type="number"
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
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>City</Form.Label>
            <Form.Control
              onChange={(e) => props.setCityOfEducation(e.target.value)}
              value={props.specificPlaceOfWork?.city}
              type="text"
              placeholder="City"
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>State</Form.Label>
            <Form.Control
              onChange={(e) => props.setStateOfEducation(e.target.value)}
              value={props.specificPlaceOfWork?.state}
              type="text"
              placeholder="State"
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Country</Form.Label>
            <Form.Control
              onChange={(e) => props.setCountryOfEducation(e.target.value)}
              value={props.specificPlaceOfWork?.country}
              type="text"
              placeholder="Country"
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Pincode</Form.Label>
            <Form.Control
              onChange={(e) => props.setPincode(e.target.value)}
              value={props.specificPlaceOfWork?.pincode}
              type="text"
              placeholder="Pincode"
              autoFocus
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleCloseForEducation}>
          Close
        </Button>
        <Button variant="primary" onClick={props.handleSaveEduaction}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  </>
);

export default EductionDetails;
