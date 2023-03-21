import { Field, NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import React, { useContext, useState } from 'react';
import Link from 'next/link';
import loginUserCall from '../API/loginUserCall';
// import '../assets/login.css';
import WebContext from '../Context/WebContext';
import { useRouter } from 'next/router';
import loginCss from '../assets/login.module.css';
import star from '../assets/images/star.png';
import imageNotFound from '../assets/images/imageNot.png';

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
      router.push('/');
    }
  };

  console.log('userToken', userToken);

  return (
    <>
      <div className={loginCss.container}>
        <div className={loginCss.leftContainer}>
          <div className={loginCss.welcomeText}>
            <div className={loginCss.welcomeTextImage}>
              <NextImage field={star} editable={true} width={30} height={30} />
            </div>
            <h2>
              Welcome,<div> Please Login</div>
            </h2>
            <div className={loginCss.welcomeTextDescription}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi illum ad, facere placeat
              quos recusandae reprehenderit nihil minima possimus, quod adipisci, porro quibusdam
              obcaecati.
            </div>
          </div>{' '}
          <div className={loginCss.img}>
            <NextImage field={imageNotFound} editable={true} />
          </div>
        </div>

        <div className={loginCss.rightContainer}>
          <div className={loginCss.formContainer}>
            <form className={loginCss.login} onSubmit={(e) => onSubmitHandler(e)}>
              <div className={loginCss.loginField}>
                <i className="login__icon fas fa-user"></i>
                <label className={loginCss.label}>User name / Email</label>
                <input
                  onChange={(e) => setEmailValue(e.target.value)}
                  value={email}
                  type="text"
                  className={loginCss.loginInput}
                  placeholder="User name / Email"
                />
              </div>
              <div className={loginCss.loginField}>
                <i className="login__icon fas fa-lock"></i>
                <label className={loginCss.label}>Password</label>
                <input
                  onChange={(e) => setPasswordValue(e.target.value)}
                  value={password}
                  type="password"
                  className={loginCss.loginInput}
                  placeholder="Password"
                />
                <div className={loginCss.forgotPassword}>
                  <Link href={'/forgotPassword'}>Forgot Your Password?</Link>
                </div>
              </div>
              <button className={loginCss.formButton}>
                Sign In
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
            <div className={loginCss.formContainerBottom}>
              <h6 className={loginCss.text}>Don't have Account ?</h6>
              <button className={loginCss.btn}>
                <Link href={'/register'}>Register Here</Link>
              </button>
            </div>
            {/* <div className="social-icons">
                <a href="#" className="social-login__icon fab fa-instagram"></a>
                <a href="#" className="social-login__icon fab fa-facebook"></a>
                <a href="#" className="social-login__icon fab fa-twitter"></a>
              </div> */}
          </div>
        </div>
        {/* <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
          </div> */}
      </div>
    </>
  );
};

// export default withDatasourceCheck()<LoginProps>(Login);
export default Login;
