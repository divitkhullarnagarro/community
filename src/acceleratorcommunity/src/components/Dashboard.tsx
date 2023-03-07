import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import WebContext from '../Context/WebContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type DashboardProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

function MyVerticallyCenteredModal(props: any) {
  props;
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton={true}>
        <Modal.Title id="contained-modal-title-vcenter">Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
          in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const Dashboard = (props: DashboardProps): JSX.Element => {
  const { isLoggedIn, userToken, setIsLoggedIn, setUserToken } = { ...useContext(WebContext) };
  const router = useRouter();

  const [modalShow, setModalShow] = React.useState(false);

  props; //delete me
  isLoggedIn;
  userToken;
  setIsLoggedIn;
  setUserToken;

  useEffect(() => {
    if (userToken == '') {
      router.push('/login');
    }
  }, []);

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
          <Link className="navBaroptions" href="/profile">
            Profile
          </Link>
        </div>
      </nav>
      <>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Launch vertically centered modal
        </Button>

        <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
      </>
    </>
  );
};

export default Dashboard;
