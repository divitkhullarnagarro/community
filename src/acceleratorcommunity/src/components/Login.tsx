import { Field, ImageField, NextImage, RichTextField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import loginUserCall from '../API/loginUserCall';
// import '../assets/login.css';
import WebContext from '../Context/WebContext';
import { useRouter } from 'next/router';
import loginCss from '../assets/login.module.css';
import Spinner from 'react-bootstrap/Spinner';
import getUserCall from 'src/API/getUserCall';
import { encryptString } from '../assets/helpers/EncryptDecrypt';
import FirebaseContext from 'src/Context/FirebaseContext';
// import star from '../assets/images/star.png';

type LoginProps = ComponentProps & {
  fields: {
    data: {
      datasource: DataSource;
    };
  };
};
type DataSource = {
  title: {
    jsonValue: Field<string>;
  };
  description: {
    jsonValue: RichTextField;
  };
  image: {
    jsonValue: ImageField;
  };
  userNameLabel: {
    jsonValue: Field<string>;
  };
  passwordLabel: {
    jsonValue: Field<string>;
  };
  forgotPasswordLabel: {
    jsonValue: Field<string>;
  };
  signInBtn: {
    jsonValue: Field<string>;
  };
  dontHaveAccountLabel: {
    jsonValue: Field<string>;
  };
  registerHereLabel: {
    jsonValue: Field<string>;
  };
  loginFrameImageList: {
    targetItems: Array<{
      imageLogin: {
        jsonValue: ImageField;
      };
    }>;
  };
};

const Login = (props: LoginProps): JSX.Element => {
  const { requestForNotificationPermission } = { ...useContext(FirebaseContext) };
  const [tempValue, setTempValue] = useState();

  useEffect(() => {
    requestForNotificationPermission().then((data: any) => {
      setTempValue(data);
      console.log('tokenFromFirebaseProvider', data);
    });
  }, []);

  const targetItems = props?.fields?.data?.datasource;
  const router = useRouter();
  const { setIsLoggedIn, setUserToken, setObjectId, userToken, setUserObject } = {
    ...useContext(WebContext),
  };

  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [emailError, setEmailError] = useState(false);
  let [passwodError, setPasswordError] = useState(false);
  let [ifUnAuthorised, setIfUnauthorised] = useState(false);
  let [isLoggingIn, setIsLoggingIn] = useState(false);

  function setEmailValue(val: any) {
    if (val === '') {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    setEmail(val);
  }

  function setPasswordValue(val: any) {
    if (val === '') {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    setPassword(val);
  }

  function getRouteToUrlFromCookie(): string | null {
    if (typeof document !== 'undefined') {
      const cookieString = document.cookie;
      const cookies = cookieString.split(';').reduce((acc: any, cookie: string) => {
        const [name, value] = cookie.split('=').map((c) => c.trim());
        acc[name] = value;
        return acc;
      }, {});

      return cookies.routeToUrl || null;
    }
    return null;
  }

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    if (password === '' || email === '') {
      if (password === '') setPasswordError(true);
      if (email === '') {
        setEmailError(true);
      }
      return;
    }
    setIsLoggingIn(true);
    if (email !== '' && password !== '') {
      let response = await loginUserCall(email, password);
      if (response?.status == 200 && setIsLoggedIn != undefined && setUserToken != undefined) {
        setIsLoggedIn(true);
        let encTok = await encryptString(response?.data?.data?.access_token);
        let encObjId = await encryptString(email);
        setUserToken(response?.data?.data?.access_token);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('UserToken', encTok);
          localStorage.setItem('ObjectId', encObjId);
        }
        if (setObjectId) setObjectId(email);
        let getUserResp = await getUserCall(response?.data?.data?.access_token, email);
        if (setUserObject) setUserObject(getUserResp?.data?.data);
        if (getUserResp?.data?.success == true) {
          let encUserObj = encryptString(JSON.stringify(getUserResp?.data?.data));
          localStorage.setItem('UserObject', encUserObj);
        }
        if (typeof localStorage !== 'undefined' && typeof document !== 'undefined') {
          document.cookie = `UserToken=${encTok};path=/;`;
          let routeToUrl = getRouteToUrlFromCookie();
          if (routeToUrl !== '' && routeToUrl != null) {
            router.push(decodeURIComponent(routeToUrl));
          } else router.push('/');
        }
      } else {
        setIsLoggingIn(false);
        setIfUnauthorised(true);
        setTimeout(() => {
          setIfUnauthorised(false);
        }, 2000);
      }
    }
  };

  console.log('userToken', userToken);
  const heading = targetItems?.title?.jsonValue?.value?.split('<br>');
  return (
    <>
      <div className={loginCss.container}>
        <div className={loginCss.leftContainer}>
          <div className={loginCss.leftGrid}>
            <div className={loginCss.welcomeText}>
              <div className={loginCss.welcomeTextImage}>
                <NextImage
                  field={targetItems?.image?.jsonValue?.value}
                  editable={true}
                  width={50}
                  height={50}
                />
              </div>
              <h5>
                {heading ? heading[0] : 'Welcome,'}
                <br />
                {heading ? heading[1] : 'Please Login Here'}
              </h5>
              <div className={loginCss.welcomeTextDescription}>
                {targetItems?.description?.jsonValue?.value}
                <>
                  <br /> <br /> {tempValue ?? ''}
                </>
              </div>
            </div>
          </div>{' '}
          <div className={loginCss.rightGrid}>
            <div className={loginCss.rightGridBox}>
              <div className={loginCss.img1}>
                <NextImage
                  field={
                    targetItems?.loginFrameImageList?.targetItems[0]?.imageLogin?.jsonValue?.value
                  }
                  height={150}
                  width={150}
                />
              </div>
              <div className={loginCss.img2}>
                <NextImage
                  field={
                    targetItems?.loginFrameImageList?.targetItems[1]?.imageLogin?.jsonValue?.value
                  }
                  height={150}
                  width={150}
                />
              </div>
              <div className={loginCss.img3}>
                <NextImage
                  field={
                    targetItems?.loginFrameImageList?.targetItems[2]?.imageLogin?.jsonValue?.value
                  }
                  height={150}
                  width={150}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={loginCss.rightContainer}>
          <div className={loginCss.formContainer}>
            <form className={loginCss.login} onSubmit={(e) => onSubmitHandler(e)}>
              <div className={loginCss.loginField}>
                <i className="login__icon fas fa-user"></i>
                <label className={loginCss.label}>
                  {targetItems?.userNameLabel?.jsonValue?.value}
                </label>
                <input
                  onChange={(e) => setEmailValue(e.target.value)}
                  value={email}
                  type="text"
                  className={loginCss.loginInput}
                />
                {emailError ? (
                  <span className={loginCss.error}>
                    * {targetItems?.userNameLabel?.jsonValue?.value} Field is empty
                  </span>
                ) : (
                  ''
                )}
              </div>
              <div className={loginCss.loginField}>
                <i className="login__icon fas fa-lock"></i>
                <label className={loginCss.label}>
                  {targetItems?.passwordLabel?.jsonValue?.value}
                </label>
                <input
                  onChange={(e) => setPasswordValue(e.target.value)}
                  value={password}
                  type="password"
                  className={loginCss.loginInput}
                />
                {passwodError ? (
                  <span className={loginCss.error}>
                    * {targetItems?.passwordLabel?.jsonValue?.value} Field is empty
                  </span>
                ) : (
                  ''
                )}
                <div style={{ height: '10px' }}>
                  {' '}
                  {ifUnAuthorised ? (
                    <span style={{ fontWeight: 1000, color: 'red', fontSize: '12px' }}>
                      {' '}
                      * Wrong Email or Password. Try Again !{' '}
                    </span>
                  ) : (
                    ''
                  )}{' '}
                </div>
                <div className={loginCss.forgotPassword}>
                  <Link href={'/forgotPassword'}>
                    {targetItems?.forgotPasswordLabel?.jsonValue?.value
                      ? targetItems.forgotPasswordLabel.jsonValue.value
                      : 'Forgot Password?'}
                  </Link>
                </div>
              </div>
              <button
                type="submit"
                className={loginCss.formButton}
                disabled={emailError || passwodError}
              >
                {isLoggingIn ? (
                  <span style={{ display: 'flex', padding: '10px', justifyContent: 'center' }}>
                    {' '}
                    <Spinner style={{ width: '15px', height: '15px' }} animation="border" />{' '}
                  </span>
                ) : targetItems?.signInBtn?.jsonValue?.value ? (
                  targetItems?.signInBtn?.jsonValue?.value
                ) : (
                  'Sign In'
                )}{' '}
                <i className="button__icon fas fa-chevron-right"></i>
              </button>
              {/* {isLoggedIn ? (
                <span
                  style={{ fontWeight: 1000, color: 'green', fontSize: '12px', padding: '10px' }}
                >
                  * User Logged In Successfully
                </span>
              ) : (
                ''
              )} */}
            </form>
            <div className={loginCss.loginOptionContainer}>
              or sign in with other accounts?
              <div className={loginCss.otherLoginContainer}>
                <div className={loginCss.otherLogin}>Google</div>
                <div className={loginCss.otherLogin}>FB</div>
                <div className={loginCss.otherLogin}>Twitter</div>
                <div className={loginCss.otherLogin}>Insta</div>
              </div>
            </div>
            <div className={loginCss.formContainerBottom}>
              <div className={loginCss.formContainerButton}>
                <div className={loginCss.text}>
                  {targetItems?.dontHaveAccountLabel?.jsonValue?.value}
                </div>
                <div className={loginCss.btn}>
                  <Link href={'/register'}>
                    {targetItems?.registerHereLabel?.jsonValue?.value
                      ? targetItems.registerHereLabel.jsonValue.value
                      : 'Register'}
                  </Link>
                </div>
              </div>
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
