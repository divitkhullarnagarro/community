import { useContext } from 'react';
import WebContext from '../Context/WebContext';
import { Button, Form, Modal } from 'react-bootstrap';
import { Text } from '@sitecore-jss/sitecore-jss-nextjs';

const ContactDetails = (props: any): JSX.Element => {
  const { darkMode } = { ...useContext(WebContext) };
  return (
    <>
      <div className="editBtn">
        <Button className="profileBtn" onClick={props.handleShowForm3}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1827/1827933.png"
            alt="edit"
            width="20px"
            className={`${darkMode && 'darkMode_imageFilter'}`}
          />
        </Button>
      </div>
      <div>
        <Modal show={props.showForm3} onHide={props.handleCloseForm3}>
          <Modal.Header closeButton>
            <Modal.Title>Contact Details</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modalForProfile">
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Phone No.</Form.Label>
                <Form.Control
                  onChange={(e) => props.setPhoneNoValue(e.target.value)}
                  value={props.editUserData?.phoneNumber}
                  type="number"
                  placeholder="Phone No."
                  autoFocus
                />
              </Form.Group>
              <span>
                {props.errorState?.phoneNumber ? (
                  <span className="error">Field is required</span>
                ) : (
                  ' '
                )}
                {props.errorState?.phoneNoLength ? (
                  <span className="error">Length is greater than 10</span>
                ) : (
                  ' '
                )}
              </span>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  onChange={(e) => props.setEmailValue(e.target.value)}
                  value={props.editUserData?.email}
                  type="email"
                  placeholder="Email"
                  autoFocus
                />
              </Form.Group>
              <span>
                {props.errorState?.email ? <span className="error">Field is required</span> : ' '}
              </span>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Alternate Email address</Form.Label>
                <Form.Control
                  onChange={(e) => props.setAltEmailValue(e.target.value)}
                  value={props.editUserData?.alternateEmail}
                  type="email"
                  placeholder="Alternate Email"
                  autoFocus
                />
              </Form.Group>
              {props.errorState?.alternateEmail ? (
                <span className="error">email and alternate email must be different</span>
              ) : (
                ' '
              )}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleCloseForm3}>
              Close
            </Button>
            <Button variant="primary" onClick={props.submitForm3}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={props.openLocationModalState} onHide={props.closeLocationMoadl}>
          <Modal.Header closeButton>
            <Modal.Title>Address Details</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modalForProfile">
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>
                  City<span className="required">*</span>
                </Form.Label>
                <Form.Control
                  onChange={(e) => props.setCity(e.target.value)}
                  value={props.userLocationState?.city}
                  type="text"
                  placeholder="City"
                  autoFocus
                />
                {props.errorState?.city ? <span className="error">Field is required</span> : ' '}
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>
                  Address<span className="required">*</span>
                </Form.Label>
                <Form.Control
                  onChange={(e) => props.setAddress(e.target.value)}
                  value={props.userLocationState?.address}
                  type="text"
                  placeholder="Address"
                  autoFocus
                />
                {props.errorState?.address ? <span className="error">Field is required</span> : ' '}
              </Form.Group>{' '}
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>
                  State<span className="required">*</span>
                </Form.Label>
                <Form.Control
                  onChange={(e) => props.setState(e.target.value)}
                  value={props.userLocationState?.state}
                  type="text"
                  placeholder="State"
                  autoFocus
                />
                {props.errorState?.state ? <span className="error">Field is required</span> : ' '}
              </Form.Group>{' '}
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>
                  Country<span className="required">*</span>
                </Form.Label>
                <Form.Control
                  onChange={(e) => props.setCountry(e.target.value)}
                  value={props.userLocationState?.country}
                  type="text"
                  placeholder="Country"
                  autoFocus
                />
                {props.errorState?.country ? <span className="error">Field is required</span> : ' '}
              </Form.Group>{' '}
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>
                  Residing From<span className="required">*</span>
                </Form.Label>
                <Form.Control
                  onChange={(e) => props.setResidingFrom(e.target.value)}
                  value={props.userLocationState?.residingFrom}
                  type="date"
                  placeholder="ResidingFrom"
                  autoFocus
                />
                {props.errorState?.residingFrom ? (
                  <span className="error">Field is required</span>
                ) : (
                  ' '
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Left At</Form.Label>
                <Form.Control
                  onChange={(e) => props.setLeftAt(e.target.value)}
                  value={props.userLocationState?.leftAt}
                  type="date"
                  placeholder="left At"
                  autoFocus
                  min={props?.userLocationState?.residingFrom}
                />
              </Form.Group>
              <span></span>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.closeLocationMoadl}>
              Close
            </Button>
            <Button variant="primary" onClick={props.handleSubmtLocation}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="personalInformationParentContainer">
          <div className="personaleInformationContainer">
            <div className="ContactDeatils">
              <div className="infomationContainer">
                <div className={`infoTag ${darkMode && 'darkMode_textBg'}`}>
                  <Text
                    field={
                      props?.labels?.email?.jsonValue
                        ? props?.labels?.email?.jsonValue
                        : {
                            value: 'Email',
                          }
                    }
                  />
                  &nbsp;:
                </div>
                <div className="infoTagValue">
                  {props.showStateValue && props.tempUserData?.email}
                </div>
              </div>
              <div className="infomationContainer">
                <div className={`infoTag ${darkMode && 'darkMode_textBg'}`}>
                  <Text
                    field={
                      props?.labels?.altEmail?.jsonValue
                        ? props?.labels?.altEmail?.jsonValue
                        : {
                            value: 'Alt Email',
                          }
                    }
                  />
                  &nbsp;:
                </div>
                <div className="infoTagValue">
                  {props.showStateValue && props.tempUserData?.alternateEmail !== ' '
                    ? props.tempUserData?.alternateEmail
                    : props.userData?.email}
                </div>
              </div>
              <div className="infomationContainer">
                <div className={`infoTag ${darkMode && 'darkMode_textBg'}`}>
                  <Text
                    field={
                      props?.labels?.phoneNumber?.jsonValue
                        ? props?.labels?.phoneNumber?.jsonValue
                        : {
                            value: 'Phone Number',
                          }
                    }
                  />
                  &nbsp;:
                </div>
                <div className="infoTagValue">
                  {props.showStateValue && props.tempUserData?.phoneNumber !== ' '
                    ? props.tempUserData?.phoneNumber
                    : props.userData?.phoneNumber}
                </div>
              </div>
              <div className="fieldListContainer">
                <span className={`infoTag ${darkMode && 'darkMode_textBg'}`}>
                  <Text
                    field={
                      props?.labels?.address?.jsonValue
                        ? props?.labels?.address?.jsonValue
                        : {
                            value: 'Address',
                          }
                    }
                  />
                  &nbsp;:
                </span>
                <div className="fieldValue">
                  {props.userResidenceInfo?.map((data: any) => {
                    return (
                      <>
                        {data?.leftAt === null ? (
                          <>
                            <p>{data?.address || '-'}</p>
                            <p>{data?.residingFrom || '-'}</p>
                            <p>
                              {data?.city || '-'}, {data?.state || '-'}
                            </p>
                            <p>{data?.country || '-'}</p>
                          </>
                        ) : (
                          '-'
                        )}
                      </>
                    );
                  })}
                </div>
                <Button className="profileBtn" onClick={() => props.locationData()}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1827/1827933.png"
                    alt="edit"
                    width="20px"
                    className={`${darkMode && 'darkMode_imageFilter'}`}
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactDetails;
