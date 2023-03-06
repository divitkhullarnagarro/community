import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import React, { useContext, useState } from 'react';
import Link from 'next/link';
import loginUserCall from '../API/loginUserCall';
import WebContext from '../Context/WebContext';
import { useRouter } from 'next/router';

type LoginProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const Login = (props: LoginProps): JSX.Element => {
  props; //delete Me

  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn, setUserToken, userToken } = { ...useContext(WebContext) };

  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');

  function setEmailValue(val: any) {
    setEmail(val);
  }

  function setPasswordValue(val: any) {
    setPassword(val);
  }

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    let response = await loginUserCall(email, password);
    if (response?.status == 200 && setIsLoggedIn != undefined && setUserToken != undefined) {
      setIsLoggedIn(true);
      setUserToken(response?.data?.access_token);
      router.push('/dashboard');
    }
  };

  console.log('userToken', userToken);

  return (
    <>
      <div className="container">
        <div className="screen">
          <div className="screen__content">
            <form className="login" onSubmit={(e) => onSubmitHandler(e)}>
              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input
                  onChange={(e) => setEmailValue(e.target.value)}
                  value={email}
                  type="text"
                  className="login__input"
                  placeholder="User name / Email"
                />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-lock"></i>
                <input
                  onChange={(e) => setPasswordValue(e.target.value)}
                  value={password}
                  type="password"
                  className="login__input"
                  placeholder="Password"
                />
              </div>
              <button className="button login__submit">
                <span className="button__text">Log In</span>
                <i className="button__icon fas fa-chevron-right"></i>
              </button>
              {isLoggedIn ? (
                <span
                  style={{ fontWeight: 1000, color: 'green', fontSize: '12px', padding: '10px' }}
                >
                  * User Logged In Successfully
                </span>
              ) : (
                ''
              )}
            </form>
            <div className="social-login">
              <h6>Don't have Account ?</h6>
              <button className="registerButton">
                <Link href={'/register'}>Register Here</Link>
              </button>
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
    </>
  );
};

// export default withDatasourceCheck()<LoginProps>(Login);
export default Login;
