import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import Link from 'next/link';
import { useState, useContext, useEffect } from 'react';
import WebContext from '../Context/WebContext';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

type ProfileProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const Profile = (props: ProfileProps | any): JSX.Element => {
  const { isLoggedIn, userToken, setIsLoggedIn, setUserToken } = { ...useContext(WebContext) };
  const router = useRouter();

  let isExpEditorActive = props?.sitecoreContext?.pageEditing;

  useEffect(() => {
    if (userToken == '' && !isExpEditorActive) {
      router.push('/login');
    }
  }, []);

  isLoggedIn;
  setIsLoggedIn;
  setUserToken;
  props;
  userToken;
  console.log('User Token At Profile Page', userToken);

  const [isDisabled, setIsDisabled] = useState(true);
  let [firstName, setFirstName] = useState('');
  let [lastName, setLastName] = useState('');
  let [email, setEmail] = useState('tempUser@gmail.com');
  let [phoneNumber, setPhoneNumber] = useState('');
  let [password, setPassword] = useState('');
  let [confirmPassword, setConfirmPassword] = useState('');
  let [error, isError] = useState(false);
  const [username, setUsername] = useState('John Doe');
  const [profession, setprofession] = useState('Software Engineer');
  const [experience, setExperience] = useState(3);
  const [designation, setDesignation] = useState('Senior Developer');
  const [domain, setDomain] = useState('Development');
  const [location, setLocation] = useState('Gurugram');
  const [summary, setSummary] = useState(
    'You can write about your speciality, areas of practice, expertise. You may even mention about your achievements, publication and interests.'
  );

  const [phoneNo, setPhoneNo] = useState('8964875242');
  const [altEmail, setAltEmail] = useState('tempUser2@gmail.com');
  const [dob, setDob] = useState('2022-03-25');

  //Modal Variables
  const [showForm1, setShowForm1] = useState(false);
  const [showForm2, setShowForm2] = useState(false);
  const [showForm3, setShowForm3] = useState(false);

  const handleClose1 = () => setShowForm1(false);
  const handleShow1 = () => setShowForm1(true);

  const handleCloseForm2 = () => setShowForm2(false);
  const handleShowForm2 = () => setShowForm2(true);

  const handleCloseForm3 = () => setShowForm3(false);
  const handleShowForm3 = () => setShowForm3(true);
  //Modal Variable End

  function setPhoneNoValue(val: any) {
    setPhoneNo(val);
  }
  function setAltEmailValue(val: any) {
    setAltEmail(val);
  }

  function setDobValue(val: any) {
    setDob(val);
  }

  function setUsernameValue(val: any) {
    setUsername(val);
  }
  function setProfessionValue(val: any) {
    setprofession(val);
  }
  function setExperienceValue(val: any) {
    setExperience(val);
  }
  function setDesignationValue(val: any) {
    setDesignation(val);
  }
  function setDomainValue(val: any) {
    setDomain(val);
  }
  function setLocationValue(val: any) {
    setLocation(val);
  }

  function setSummaryValue(val: any) {
    setSummary(val);
  }

  function setFirstNameValue(val: any) {
    setFirstName(val);
  }

  function setPhoneNumberValue(val: any) {
    setPhoneNumber(val);
  }

  function setLastNameValue(val: any) {
    setLastName(val);
  }

  function setEmailValue(val: any) {
    setEmail(val);
  }

  function setPasswordValue(val: any) {
    setPassword(val);
    if (confirmPassword != '') {
      if (val !== confirmPassword) {
        isError(true);
      } else if (val == confirmPassword) {
        isError(false);
      }
    } else if (confirmPassword == '') {
      isError(false);
    }
  }
  function setConfirmPasswordValue(val: any) {
    setConfirmPassword(val);
    if (password != '') {
      if (password != val) isError(true);
      else if (password === val) {
        isError(false);
      }
    } else if (password == '') {
      isError(false);
    }
  }

  function onSubmitHandler(e: any) {
    e.preventDefault();

    if (isDisabled == true) {
      setIsDisabled(false);
    } else if (isDisabled == false) {
      console.log('EditValues', email, firstName, lastName, password, confirmPassword, phoneNumber);
    }
  }

  return (
    <>
      <nav className="navBar">
        <div>
          <a href="/">
            <img
              className="dashboardIcon"
              src="https://cdn-icons-png.flaticon.com/512/1384/1384053.png"
              alt="FacebookImg"
            ></img>
          </a>
        </div>
        <div>
          <h3>Welcome To Community Dashboard</h3>
        </div>
        <div className="navBaroptions">
          <Link className="navBaroptions" href="/dashboard">
            Dashboard
          </Link>
        </div>
      </nav>
      <div className="container" style={{ display: 'none' }}>
        <div className="screen">
          <div className="screen__content">
            <form className="login" onSubmit={(e) => onSubmitHandler(e)}>
              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input
                  type="text"
                  onChange={(e) => setFirstNameValue(e.target.value)}
                  value={firstName}
                  className="login__input"
                  placeholder="First Name"
                  disabled={isDisabled}
                />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input
                  type="text"
                  onChange={(e) => setLastNameValue(e.target.value)}
                  value={lastName}
                  className="login__input"
                  placeholder="Last Name"
                  disabled={isDisabled}
                />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input
                  type="text"
                  onChange={(e) => setEmailValue(e.target.value)}
                  value={email}
                  className="login__input"
                  placeholder="Email"
                  disabled={isDisabled}
                />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input
                  type="text"
                  onChange={(e) => setPhoneNumberValue(e.target.value)}
                  value={phoneNumber}
                  className="login__input"
                  placeholder="Phone No."
                  disabled={isDisabled}
                />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input
                  type="password"
                  onChange={(e) => setPasswordValue(e.target.value)}
                  value={password}
                  className="login__input"
                  placeholder="Password"
                  required
                  disabled={isDisabled}
                />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-lock"></i>
                <input
                  type="password"
                  onChange={(e) => setConfirmPasswordValue(e.target.value)}
                  value={confirmPassword}
                  className="login__input"
                  placeholder="Confirm Password"
                  required
                  disabled={isDisabled}
                />
              </div>
              <button
                className="button login__submit"
                style={!error ? {} : { borderColor: 'red', borderWidth: '2px' }}
              >
                <span className="button__text">{isDisabled ? 'Edit' : 'Save Changes'}</span>
                <i className="button__icon fas fa-chevron-right"></i>
              </button>
              {!error ? (
                ''
              ) : (
                <span className="passwordMismatchWarning">
                  * Please match Password and Confirm Password
                </span>
              )}
            </form>
            <div className="social-login">
              {/* <h6>Have Account ?</h6>
            <button className="registerButton">
              <Link href={'/login'}>Goto Login</Link>
            </button> */}
              <div className="social-icons">
                <a href="#" className="social-login__icon fab fa-instagram"></a>
                <a href="#" className="social-login__icon fab fa-facebook"></a>
                <a href="#" className="social-login__icon fab fa-twitter"></a>
              </div>
            </div>
          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </div>
      <div className="ProfileSection">
        <div className="ProfileLeft">
          <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" width="70%"></img>
        </div>
        <div className="ProfileRight">
          <div className="PRSection mt-3">
            <Button
              style={{ float: 'right', border: 'none', backgroundColor: 'white' }}
              onClick={handleShow1}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/1827/1827933.png"
                alt="edit"
                width="30px"
                style={{ marginRight: '20px' }}
              />
            </Button>

            <Modal show={showForm1} onHide={handleClose1}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      onChange={(e) => setUsernameValue(e.target.value)}
                      value={username}
                      type="text"
                      placeholder="Username"
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Profession</Form.Label>
                    <Form.Control
                      onChange={(e) => setProfessionValue(e.target.value)}
                      value={profession}
                      type="text"
                      placeholder="Profession"
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Experience</Form.Label>
                    <Form.Control
                      onChange={(e) => setExperienceValue(e.target.value)}
                      value={experience}
                      type="number"
                      placeholder="Experience"
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Designation</Form.Label>
                    <Form.Control
                      onChange={(e) => setDesignationValue(e.target.value)}
                      value={designation}
                      type="text"
                      placeholder="Designation"
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Domain</Form.Label>
                    <Form.Control
                      onChange={(e) => setDomainValue(e.target.value)}
                      value={domain}
                      type="text"
                      placeholder="Domain"
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      onChange={(e) => setLocationValue(e.target.value)}
                      value={location}
                      type="text"
                      placeholder="Location"
                      autoFocus
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose1}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose1}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
            <h2 className="Profileusername">{username}</h2>
            <div className="PRSegment">
              <h4>{profession}</h4>
              <h5>{experience} Years</h5>
            </div>
            <div className="PRSegment">
              <h5 className="segmentHeading">Designation :</h5>
              <h5>{designation}</h5>
            </div>
            <div className="PRSegment">
              <h5 className="segmentHeading">Domain :</h5>
              <h5>{domain}</h5>
            </div>
            <div className="PRSegment">
              <h5 className="segmentHeading">{location}</h5>
            </div>
          </div>
          <hr />
          <div className="PRSection">
            <Button
              style={{ float: 'right', border: 'none', backgroundColor: 'white' }}
              onClick={handleShowForm2}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/1827/1827933.png"
                alt="edit"
                width="30px"
                style={{ marginRight: '20px' }}
              />
            </Button>

            <Modal show={showForm2} onHide={handleCloseForm2}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Summary</Form.Label>
                    <Form.Control
                      onChange={(e) => setSummaryValue(e.target.value)}
                      value={summary}
                      as="textarea"
                      rows={5}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseForm2}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleCloseForm2}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
            <h3 className="Profileusername">Summary</h3>
            <p>{summary}</p>
          </div>
          <hr />
          <div className="PRSection">
            <Button
              style={{ float: 'right', border: 'none', backgroundColor: 'white' }}
              onClick={handleShowForm3}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/1827/1827933.png"
                alt="edit"
                width="30px"
                style={{ marginRight: '20px' }}
              />
            </Button>

            <Modal show={showForm3} onHide={handleCloseForm3}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Phone No.</Form.Label>
                    <Form.Control
                      onChange={(e) => setPhoneNoValue(e.target.value)}
                      value={phoneNo}
                      type="number"
                      placeholder="Phone No."
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      onChange={(e) => setEmailValue(e.target.value)}
                      value={email}
                      type="email"
                      placeholder="Email"
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Alternate Email address</Form.Label>
                    <Form.Control
                      onChange={(e) => setAltEmailValue(e.target.value)}
                      value={altEmail}
                      type="email"
                      placeholder="Alternate Email"
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Date Of Birth</Form.Label>
                    <Form.Control
                      onChange={(e) => setDobValue(e.target.value)}
                      value={dob}
                      type="date"
                      placeholder="Date Of Birth"
                      autoFocus
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseForm3}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleCloseForm3}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
            <h3 className="Profileusername">Personal details</h3>
            <div className="ProfilePersonalDetails">
              <div className="PRSegment">
                <h5 className="segmentHeading">Phone No. :</h5>
                <h5>{phoneNo}</h5>
              </div>
              <div className="PRSegment">
                <h5 className="segmentHeading">Email :</h5>
                <h5>{email}</h5>
              </div>
              <div className="PRSegment">
                <h5 className="segmentHeading">Alternate Email :</h5>
                <h5>{altEmail}</h5>
              </div>
              <div className="PRSegment">
                <h5 className="segmentHeading">Date Of Birth :</h5>
                <h5>{dob}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withSitecoreContext()(Profile);
