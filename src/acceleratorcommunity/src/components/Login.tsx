import {
  Field,
  ImageField,
  NextImage,
  RichTextField,
  TextField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { Text } from '@sitecore-jss/sitecore-jss-react';
import { ComponentProps } from 'lib/component-props';
import React, { useContext, useState } from 'react';
import Link from 'next/link';
import loginUserCall from '../API/loginUserCall';
// import '../assets/login.css';
import WebContext from '../Context/WebContext';
import { useRouter } from 'next/router';
import loginCss from '../assets/login.module.css';
import darkTheme from '../assets/darkTheme.module.css';
import Spinner from 'react-bootstrap/Spinner';
import getUserCall from 'src/API/getUserCall';
import { encryptString } from '../assets/helpers/EncryptDecrypt';
import ThemeSwitcher from './ThemeSwitcher';
import { validateEmail } from 'assets/helpers/validations';
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
  const targetItems = props?.fields?.data?.datasource;
  const router = useRouter();
  const { setIsLoggedIn, setUserToken, setObjectId, setUserObject, darkMode } = {
    ...useContext(WebContext),
  };

  let [email, setEmail] = useState('');
  let [emailValidationMessage, setEmailValidationMessage] = useState('');
  let [password, setPassword] = useState('');
  let [passwordValidationMessage, setPasswordValidationMessage] = useState('');
  let [emailError, setEmailError] = useState(false);
  let [passwodError, setPasswordError] = useState(false);
  let [ifUnAuthorised, setIfUnauthorised] = useState(false);
  let [isLoggingIn, setIsLoggingIn] = useState(false);

  function setEmailValue(val: any) {
    if (val === '') {
      setEmailError(true);
      setEmailValidationMessage(`${targetItems?.userNameLabel?.jsonValue?.value} is mandatory`);
    } else {
      if (!validateEmail(val)) {
        setEmailError(true);
        setEmailValidationMessage(`${targetItems?.userNameLabel?.jsonValue?.value} is not valid`);
      } else {
        setEmailError(false);
      }
    }
    setEmail(val);
  }

  function setPasswordValue(val: any) {
    if (val === '') {
      setPasswordError(true);
      setPasswordValidationMessage(`${targetItems?.passwordLabel?.jsonValue?.value} is mandatory`);
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

  const HeadingArr = targetItems?.title?.jsonValue?.value?.split('<br>');
  const headingPart1: TextField = {
    value: HeadingArr[0],
  };
  const headingPart2: TextField = {
    value: HeadingArr[1],
  };
  return (
    <>
      <div className={loginCss.ThemeSwitcher}>
        <ThemeSwitcher />
      </div>
      <div className={`${loginCss.container} ${darkMode && darkTheme.grey_1}`}>
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
              <h5 className={`${darkMode && darkTheme.text_green}`}>
                <Text field={HeadingArr ? headingPart1 : { value: 'Welcome,' }} editable={true} />
                <br />
                <Text
                  field={HeadingArr ? headingPart2 : { value: 'Please Login Here' }}
                  editable={true}
                />
              </h5>
              <div
                className={`${loginCss.welcomeTextDescription} ${darkMode && darkTheme.text_light}`}
              >
                <Text
                  field={
                    targetItems?.description?.jsonValue?.value
                      ? { value: targetItems?.description?.jsonValue?.value }
                      : {
                          value:
                            "Please LoginWelcome to community solution! Please enter your username/ email and password to access your account. If you don't have an account yet, you can Register for free by clicking the 'Register Here' button",
                        }
                  }
                  editable={true}
                />
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
                  editable={true}
                />
              </div>
              <div className={loginCss.img2}>
                <NextImage
                  field={
                    targetItems?.loginFrameImageList?.targetItems[1]?.imageLogin?.jsonValue?.value
                  }
                  height={150}
                  width={150}
                  editable={true}
                />
              </div>
              <div className={loginCss.img3}>
                <NextImage
                  field={
                    targetItems?.loginFrameImageList?.targetItems[2]?.imageLogin?.jsonValue?.value
                  }
                  editable={true}
                  height={150}
                  width={150}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={`${loginCss.rightContainer} ${darkMode && darkTheme.grey_1}`}>
          <div
            className={`${loginCss.formContainer} ${darkMode && darkTheme.grey_3} ${
              darkMode && loginCss.formDarkBorder
            }`}
          >
            <form className={loginCss.login} onSubmit={(e) => onSubmitHandler(e)}>
              <div className={loginCss.loginField}>
                <i className="login__icon fas fa-user"></i>
                <label className={`${loginCss.label} ${darkMode && darkTheme.text_light}`}>
                  <Text
                    field={
                      targetItems?.userNameLabel?.jsonValue?.value
                        ? { value: targetItems?.userNameLabel?.jsonValue?.value }
                        : { value: 'User Name / Email' }
                    }
                    editable={true}
                  />
                </label>
                <input
                  onChange={(e) => setEmailValue(e.target.value)}
                  value={email}
                  type="text"
                  className={loginCss.loginInput}
                />
                {emailError ? (
                  <span className={loginCss.error}>
                    *
                    <Text
                      field={
                        emailValidationMessage
                          ? { value: emailValidationMessage }
                          : { value: 'User Name / Email is mandatory' }
                      }
                      editable={true}
                    />
                  </span>
                ) : (
                  ''
                )}
              </div>
              <div className={loginCss.loginField}>
                <i className="login__icon fas fa-lock"></i>
                <label className={`${loginCss.label} ${darkMode && darkTheme.text_light}`}>
                  <Text
                    field={
                      targetItems?.passwordLabel?.jsonValue?.value
                        ? { value: targetItems?.passwordLabel?.jsonValue?.value }
                        : { value: 'Password' }
                    }
                    editable={true}
                  />
                </label>
                <input
                  onChange={(e) => setPasswordValue(e.target.value)}
                  value={password}
                  type="password"
                  className={loginCss.loginInput}
                />
                {passwodError ? (
                  <span className={loginCss.error}>
                    *
                    <Text
                      field={
                        passwordValidationMessage
                          ? { value: passwordValidationMessage }
                          : { value: 'Password is mandatory' }
                      }
                      editable={true}
                    />
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
                ) : (
                  <Text
                    field={
                      targetItems?.signInBtn?.jsonValue?.value
                        ? { value: targetItems?.signInBtn?.jsonValue?.value }
                        : { value: 'Sign In' }
                    }
                    editable={true}
                  />
                )}
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
            <div className={`${loginCss.loginOptionContainer} ${darkMode && darkTheme.text_green}`}>
              or sign in with other accounts?
              <div className={loginCss.otherLoginContainer}>
                <div className={loginCss.otherLogin}>Google</div>
                <div className={loginCss.otherLogin}>FB</div>
                <div className={loginCss.otherLogin}>Twitter</div>
                <div className={loginCss.otherLogin}>Insta</div>
              </div>
            </div>
            <div className={loginCss.formContainerBottom}>
              <div className={`${loginCss.formContainerButton} ${darkMode && darkTheme.greenBg}`}>
                <div className={loginCss.text}>
                  <Text
                    field={
                      targetItems?.dontHaveAccountLabel?.jsonValue?.value
                        ? { value: targetItems?.dontHaveAccountLabel?.jsonValue?.value }
                        : { value: "Don't have Account ?" }
                    }
                    editable={true}
                  />
                </div>
                <div className={loginCss.btn}>
                  <Link href={'/register'}>
                    {/* {targetItems?.registerHereLabel?.jsonValue?.value
                      ? targetItems.registerHereLabel.jsonValue.value
                      : 'Register'} */}
                    <button className={loginCss.RegisterBtn}>
                      <Text
                        field={
                          targetItems?.registerHereLabel?.jsonValue?.value
                            ? { value: targetItems?.registerHereLabel?.jsonValue?.value }
                            : { value: 'Register' }
                        }
                        editable={true}
                        onClick={() => {
                          router.push('/register');
                        }}
                      />
                    </button>
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
