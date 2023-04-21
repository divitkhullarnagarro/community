import { Button, Form, Modal } from 'react-bootstrap';

const PersaonalDetailsOfUser = (props: any): JSX.Element => (
  <div>
    <Modal show={props.showForm1} onHide={props.handleClose1}>
      <Modal.Header closeButton>
        <Modal.Title>Personal Information</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalForProfile">
        <Form onSubmit={props.submitForm1}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>
              First Name<span className="required">*</span>
            </Form.Label>
            <Form.Control
              onChange={(e) => props.setFirstName(e.target.value)}
              value={props.personalInfo?.firstName}
              type="text"
              placeholder="First Name"
              autoFocus
              required
            />
          </Form.Group>
          <span>
            {props.errorState?.firstName ? <span className="error">Field is required</span> : ' '}
          </span>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Middle Name</Form.Label>
            <Form.Control
              onChange={(e) => props.setMiddleName(e.target.value)}
              value={props.personalInfo?.middleName}
              type="text"
              placeholder="Middle Name"
              autoFocus
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>
              Last Name<span className="required">*</span>
            </Form.Label>
            <Form.Control
              onChange={(e) => props.setLastName(e.target.value)}
              value={props.personalInfo?.lastName}
              type="text"
              placeholder="Last Name"
              autoFocus
            />
          </Form.Group>
          <span>
            {props.errorState?.lastName ? <span className="error">Field is required</span> : ' '}
          </span>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Profession</Form.Label>
            <Form.Control
              onChange={(e) => props.setProfessionValue(e.target.value)}
              value={props.personalInfo?.areaOfExpertise}
              type="text"
              placeholder="Profession"
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Experience</Form.Label>
            <Form.Control
              onChange={(e) => props.setExperienceValue(e.target.value)}
              value={props.personalInfo?.yearsOfExperience}
              type="number"
              placeholder="Experience"
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Designation</Form.Label>
            <Form.Control
              onChange={(e) => props.setDesignationValue(e.target.value)}
              value={props.personalInfo?.designation}
              type="text  "
              placeholder="Designation"
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>
              Speciality<span className="required">*</span>
            </Form.Label>
            <Form.Control
              onChange={(e) => props.setSpecialityValue(e.target.value)}
              value={props.personalInfo?.speciality}
              type="text  "
              placeholder="Speciality"
              autoFocus
            />
            {props.errorState?.speciality ? <span className="error">Field is required</span> : ' '}
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>
              Role<span className="required">*</span>
            </Form.Label>
            <Form.Control
              onChange={(e) => props.setRoleValue(e.target.value)}
              value={props.personalInfo?.role}
              type="text"
              placeholder="Role"
              autoFocus
            />
            {props.errorState?.role ? <span className="error">Field is required</span> : ' '}
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>
              Dob
            </Form.Label>
            <Form.Control
              onChange={(e) => props.setDobValue(e.target.value)}
              value={props.personalInfo?.dob}
              type="date"
              placeholder="Dob"
              autoFocus
            />
            {props.errorState?.dob ? <span className="error">Field is required</span> : ' '}
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Domain</Form.Label>
            <Form.Control
              onChange={(e) => props.setDomainValue(e.target.value)}
              value={props.personalInfo?.domain}
              type="text"
              placeholder="Domain"
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Age</Form.Label>
            <Form.Control
              onChange={(e) => props.setAgeValue(e.target.value)}
              value={props.personalInfo?.age}
              type="number"
              placeholder="age"
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>website Url</Form.Label>
            <Form.Control
              onChange={(e) => props.setWebSiteUrl(e.target.value)}
              value={props.personalInfo?.websiteUrl}
              type="text"
              placeholder="websteUrl"
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>
              Gender<span className="required">*</span>
            </Form.Label>
            <Form.Control
              onChange={(e) => props.setGender(e.target.value)}
              value={props.personalInfo?.gender}
              as="select"
              // multiple
              placeholder="gender"
              autoFocus
            >
              <option value="MALE" selected>
                MALE
              </option>
              <option value="FEMALE">FEMALE</option>
              <option value="OTHERS">OTHERS</option>
            </Form.Control>
            {props.errorState?.gender ? <span className="error">Field is required</span> : ' '}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose1}>
          Close
        </Button>
        <Button variant="primary" onClick={props.submitPersonalDetails}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>

    <Modal show={props.languageForm} onHide={props.handleCloseLanguageForm}>
      <Modal.Header closeButton>
        <Modal.Title>Language</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Language</Form.Label>
            <Form.Control
              onChange={(e) => props.handleAddLanguage(e.target.value)}
              value={props.editUserData?.language}
              type="text"
              placeholder="Add a language"
            />
            <button className="addLanguageBtn" onClick={props.addLanguage}>
              Add Language
            </button>
            <div className="languageConatiner">
              {props?.language?.length > 0
                ? props?.language?.map((lang: any, index: number) => {
                    return (
                      <div className="specificLanguage" key={index}>
                        {lang}
                        <div onClick={() => props.filterLanguage(lang)}>
                          <img
                            className="cross"
                            src="https://cdn-icons-png.flaticon.com/512/10396/10396993.png"
                          />
                        </div>
                      </div>
                    );
                  })
                : ''}
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClohandleCloseLanguageFormseForm2}>
          Close
        </Button>
        <Button variant="primary" onClick={props.languageFormData}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
    <Modal show={props.hobbyForm} onHide={props.handleCloseFormForHobby}>
      <Modal.Header closeButton>
        <Modal.Title>Hobby</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Hobby</Form.Label>
            <Form.Control
              onChange={(e) => props.handleAddHobby(e.target.value)}
              type="text"
              placeholder="Add a hobby"
            />
            <button className="addLanguageBtn" onClick={props.addHobby}>
              Add a Hobby
            </button>
            <div className="languageConatiner">
              {console.log('hobbby', props?.hobby)}
              {props?.hobby?.length > 0
                ? props?.hobby?.map((hobby: any, index: number) => {
                    return (
                      <div className="specificLanguage" key={index}>
                        {hobby}
                        <div onClick={() => props.filterHobby(hobby)}>
                          <img
                            className="cross"
                            src="https://cdn-icons-png.flaticon.com/512/10396/10396993.png"
                          />
                        </div>
                      </div>
                    );
                  })
                : ''}
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleCloseFormForHobby}>
          Close
        </Button>
        <Button variant="primary" onClick={props.hobbyFormData}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>

    <Modal show={props.intrestForm} onHide={props.handleCloseFormForIntrest}>
      <Modal.Header closeButton>
        <Modal.Title>Intrest</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Intrest</Form.Label>
            <Form.Control
              onChange={(e) => props.handleIntrest(e.target.value)}
              value={props.editUserData?.intrest}
              type="text"
              placeholder="All intrest should be comma seperated"
            />
          </Form.Group>
        </Form>
        <button className="addLanguageBtn" onClick={props.addInterest}>
          Add Interrest
        </button>
        <div className="languageConatiner">
          {console.log('userInterests', props?.userInterests)}
          {props?.userInterests?.length > 0
            ? props?.userInterests?.map((interest: any, index: number) => {
                return (
                  <div className="specificLanguage" key={index}>
                    {interest}
                    <div onClick={() => props.filterInterest(interest)}>
                      <img
                        className="cross"
                        src="https://cdn-icons-png.flaticon.com/512/10396/10396993.png"
                      />
                    </div>
                  </div>
                );
              })
            : ''}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleCloseFormForIntrest}>
          Close
        </Button>
        <Button variant="primary" onClick={props.IntrestFormData}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>

    <Modal show={props.showForm2} onHide={props.handleCloseForm2}>
      <Modal.Header closeButton>
        <Modal.Title>Summary</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Summary</Form.Label>
            <Form.Control
              onChange={(e) => props.setSummaryValue(e.target.value)}
              value={props.editUserData?.summary}
              as="textarea"
              rows={5}
            />
            {props.errorState?.summary ? (
              <span className="error">Max limit is 200 characters</span>
            ) : (
              ' '
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleCloseForm2}>
          Close
        </Button>
        <Button variant="primary" onClick={props.submitForm2}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>

    <div className="personalInformationParentContainer">
      <div className="personaleInformationContainer">
        <div className="editBtn">
          <Button className="profileBtn" onClick={props.handleShow1}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1827/1827933.png"
              alt="edit"
              width="30px"
              style={{ marginRight: '20px' }}
            />
          </Button>
        </div>
        <div className="personalInfomation">
          {/* <div className="packOfThree"> */}
          <div className="infomationContainer">
            <div className="personalInfoTag">Age</div>
            <div className="personalInfoTagValue">{props?.tempUserData?.age}</div>
          </div>
          <div className="infomationContainer">
            <div className="personalInfoTag">Gender</div>
            {console.log('props?.tempUserData?.gender', props?.tempUserData?.gender)}
            <div className="personalInfoTagValue">{props?.tempUserData?.gender}</div>
          </div>
          <div className="infomationContainer">
            <div className="personalInfoTag">Date of Birth</div>
            <div className="personalInfoTagValue">{props?.tempUserData?.dob}</div>
          </div>
          {/* </div> */}
          {/* <div className="packOfThree"> */}
          <div className="infomationContainer">
            <div className="personalInfoTag">Experience</div>
            <div className="personalInfoTagValue">{props?.tempUserData?.yearsOfExperience}</div>
          </div>
          <div className="infomationContainer">
            <div className="personalInfoTag">Designation</div>
            <div className="personalInfoTagValue">{props?.tempUserData?.designation}</div>
          </div>
          {/* </div> */}
          {/* <div className="packOfThree"> */}
          <div className="infomationContainer">
            <div className="personalInfoTag">Profession</div>
            <div className="personalInfoTagValue">{props?.tempUserData?.areaOfExpertise}</div>
          </div>
          <div className="infomationContainer">
            <div className="personalInfoTag">Domain</div>
            <div className="personalInfoTagValue">{props?.tempUserData?.domain}</div>
          </div>
          <div className="infomationContainer">
            <div className="personalInfoTag">speciality</div>
            <div className="personalInfoTagValue">{props?.tempUserData?.speciality}</div>
          </div>
          <div className="infomationContainer">
            <div className="personalInfoTag">website</div>
            <div className="personalInfoTagValue">
              <a className="websiteUrl" href={props?.tempUserData?.websiteUrl} target="_blank">
                {props?.tempUserData?.websiteUrl}
              </a>
            </div>
          </div>
          {/* </div> */}
        </div>
        <div className="border"></div>
        <div className="summayContainer">
          <Button className="profileBtn" onClick={props.handleShowForm2}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1827/1827933.png"
              alt="edit"
              width="30px"
              style={{ marginRight: '20px' }}
            />
          </Button>
          Summary
          <div className="summaryValue">{props?.tempUserData?.summary}</div>
        </div>
        <div className="border"></div>
        <div className="summayContainer">
          <Button className="profileBtn" onClick={props.handleShowFormForHobby}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1827/1827933.png"
              alt="edit"
              width="30px"
              style={{ marginRight: '20px' }}
            />
          </Button>
          Hobby
          <div className="hobbyContainer">
            {props?.tempUserData?.hobby?.map((hob: any) => {
              return <div className="hobbyValue">{hob}</div>;
            })}
          </div>
        </div>
        <div className="border"></div>
        <div className="summayContainer">
          <Button className="profileBtn" onClick={props.handleShowFormForLanguage}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1827/1827933.png"
              alt="edit"
              width="30px"
              style={{ marginRight: '20px' }}
            />
          </Button>
          Language
          <div className="languageContainer">
            {props?.tempUserData?.language?.map((lang: any) => {
              return <div className="languageValue">{lang}</div>;
            })}
          </div>
        </div>
        <div className="border"></div>
        <div className="summayContainer">
          <Button className="profileBtn" onClick={props.handleShowFormForIntrest}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1827/1827933.png"
              alt="edit"
              width="30px"
              style={{ marginRight: '20px' }}
            />
          </Button>
          Interest
          <div className="interestContainer">
            {props?.tempUserData?.interests?.map((interest: any) => {
              return <div className="interestValue">{interest}</div>;
            })}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PersaonalDetailsOfUser;
