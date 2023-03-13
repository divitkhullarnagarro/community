import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import React, { useContext, useEffect } from 'react';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import WebContext from '../Context/WebContext';

type DashboardProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const Dashboard = (props: DashboardProps | any): JSX.Element => {
  const { isLoggedIn, userToken, setIsLoggedIn, setUserToken } = { ...useContext(WebContext) };
  const router = useRouter();

  props; //delete me
  isLoggedIn;
  userToken;
  setIsLoggedIn;
  setUserToken;

  let isExpEditorActive = props?.sitecoreContext?.pageEditing;

  useEffect(() => {
    if (userToken == '' && !isExpEditorActive) {
      router.push('/login');
    }
  }, []);

  return (
    <>
      {/* <nav className="navBar">
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
      </nav> */}
    </>
  );
};

export default withSitecoreContext()(Dashboard);
