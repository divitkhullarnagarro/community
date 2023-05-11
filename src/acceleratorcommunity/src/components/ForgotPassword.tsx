import { Field, ImageField, NextImage, RichTextField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import React, { useContext, useState } from 'react';
import WebContext from '../Context/WebContext';
import { useRouter } from 'next/router';
import loginCss from '../assets/login.module.css';
// import star from '../assets/images/star.png';
// import imageNotFound from '../assets/images/imageNot.png';
import Link from 'next/link';
import { validateEmailOrPhone, validatePassword } from 'assets/helpers/validations';
// import Axios, { AxiosResponse } from 'axios';
// import { LogoutUrl } from 'assets/helpers/constants';
import sendOtpCall, { updatePasswordCall, validateOtpCall } from 'src/API/forgotPasswordCalls';
import ThemeSwitcher from './ThemeSwitcher';
import darkTheme from '../assets/darkTheme.module.css';
import ToastNotification from './ToastNotification';
import Spinner from 'react-bootstrap/Spinner';

type ForgotPasswordProps = ComponentProps & {
  fields: {
    data: {
      datasource: {
        title: {
          jsonValue: {
            value: string;
          };
        };
        description: {
          jsonValue: {
            value: RichTextField;
          };
        };
        userEmailLabel: {
          jsonValue: {
            value: Field<string>;
          };
        };
        emailPlaceholder: {
          jsonValue: {
            value: string;
          };
        };
        image: {
          jsonValue: ImageField;
        };
        oTPLabel: {
          jsonValue: {
            value: Field<string>;
          };
        };
        oTPPlaceholder: {
          jsonValue: {
            value: string;
          };
        };
        passwordLabel: {
          jsonValue: {
            value: Field<string>;
          };
        };
        passwordPlaceholder: {
          jsonValue: {
            value: string;
          };
        };
        confirmPasswordLabel: {
          jsonValue: {
            value: Field<string>;
          };
        };
        confirmPasswordPlaceholder: {
          jsonValue: {
            value: string;
          };
        };
        oTPError: {
          jsonValue: {
            value: Field<string>;
          };
        };
        emailRegisterError: {
          jsonValue: {
            value: Field<string>;
          };
        };
        oTPSendMsg: {
          jsonValue: {
            value: Field<string>;
          };
        };
        emailError: {
          jsonValue: {
            value: Field<string>;
          };
        };
        somethingWentError: {
          jsonValue: {
            value: Field<string>;
          };
        };
        passwordMatchingError: {
          jsonValue: {
            value: Field<string>;
          };
        };
        updatePasswordBtnText: {
          jsonValue: {
            value: Field<string>;
          };
        };
        sendOTPPasswordBtnText: {
          jsonValue: {
            value: Field<string>;
          };
        };
        submitBtnText: {
          jsonValue: {
            value: Field<string>;
          };
        };
        forgotFrameImageList: {
          targetItems: Array<{
            imageLogin: {
              jsonValue: ImageField;
            };
          }>;
        };
      };
    };
  };
};

const ForgotPassword = (props: ForgotPasswordProps): JSX.Element => {
  const datasource = props?.fields?.data?.datasource;
  props; //delete Me
  console.log('props', props);
  const router = useRouter();
  const { setIsLoggedIn, setUserToken, userToken, darkMode } = { ...useContext(WebContext) };

  const [email, setEmail] = useState('');
  const [accountError, setAccountError] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [passwordPage, setPasswordPage] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordValidationMessage, setPasswordValidationMessage] = useState('');
  const [confirmPassword, setConformPassword] = useState('');
  const [otpFieldVisible, setOtpFieldVisible] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState(false);
  const [emailValidateError, setEmailValidateError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [somethingWentWrongError, setSomethingWentWrongError] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [toastSuccess, setToastSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>();
  const [showNotification, setShowNofitication] = useState(false);
  const [toastError, setToastError] = useState(false);

  function setEmailValue(val: any) {
    setEmail(val);
  }

  function setPasswordValue(val: any) {
    if (val === '') {
      setPasswordError(true);
      setPasswordValidationMessage(`${datasource?.passwordLabel?.jsonValue?.value} is mandatory`);
    } else {
      if (!validatePassword(val)) {
        setPasswordError(true);
        setPasswordValidationMessage(
          `${datasource?.passwordLabel?.jsonValue?.value} should be minimum of 8 letters with 1 upper, 1 lowercase, 1 digit, 1 special character`
        );
      } else {
        setPasswordError(false);
      }
    }

    if (confirmPassword != '') {
      if (val !== confirmPassword) {
        setPasswordMatchError(true);
      } else if (val == confirmPassword) {
        setPasswordMatchError(false);
      }
    } else if (confirmPassword == '') {
      setPasswordMatchError(false);
    }

    setPassword(val);
  }

  function setConfirmPasswordValue(val: any) {
    setConformPassword(val);
    if (password != '') {
      if (password != val) setPasswordMatchError(true);
      else if (password === val) {
        setPasswordMatchError(false);
      }
    } else if (password == '') {
      setPasswordMatchError(false);
    }
  }

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();

    if (!otpFieldVisible) {
      try {
        setIsUpdatingPassword(true);
        const res = await sendOtpCall(email);
        if (res?.data?.errorCode != 404) {
          setOtpFieldVisible(true);
          setIsUpdatingPassword(false);
        } else {
          setAccountError(true);
        }
      } catch (err: any) {
        console.log(err);
        setIsUpdatingPassword(false);
      }
    } else {
      try {
        setIsUpdatingPassword(true);
        const res = await validateOtpCall(email, otp);
        if (res.data.errorCode != 404) {
          setPasswordPage(true);
          setIsUpdatingPassword(false);
        } else {
          setOtpError(true);
        }
      } catch (err: any) {
        console.log(err);
        setIsUpdatingPassword(false);
      }
    }
  };
  const onSubmitPasswordHandler = async (e: any) => {
    setIsUpdatingPassword(true);
    e.preventDefault();
    setIsUpdatingPassword(true);
    if (password !== confirmPassword) {
      setPasswordMatchError(true);
    } else {
      try {
        const res = await updatePasswordCall(email, password);
        if (!res?.data?.errorCode) {
          setIsUpdatingPassword(false);
          // alert('password Updated Successfully');
          router.push('/login');
          setToastSuccess(true);
          setToastMessage('User Registered Successfully');
          setShowNofitication(true);
        } else {
          setIsUpdatingPassword(false);
          setSomethingWentWrongError(true);
        }
      } catch (err: any) {
        console.log(err);
        setToastError(true);
        setToastMessage(err?.message ?? 'Something went wrong');
        setShowNofitication(true);
        setIsUpdatingPassword(false);
        setIsUpdatingPassword(false);
      }
    }
  };

  const handleOnChange = (value: string) => {
    if (value) {
      if (validateEmailOrPhone(value)) {
        setEmailValidateError(false);
      } else {
        setEmailValidateError(true);
      }
    }
  };
  console.log('userToken', userToken, setUserToken, setIsLoggedIn);
  console.log('Props forgot password', props);
  //{---------------Logout Start--------------}
  // do not delete it
  // const handleLogout = async (event: any) => {
  //   console.log('handleLogout event', event);
  //   var config = {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   };
  //   const res = await Axios.post<
  //     any,
  //     AxiosResponse<{ success: boolean; data: string; code: number; errors: any }>
  //   >(LogoutUrl, { accessToken: '', refreshToken: '' }, config);
  //   if (
  //     res?.data?.code == 200 &&
  //     res?.data?.success == true &&
  //     setUserToken != undefined &&
  //     setIsLoggedIn != undefined
  //   ) {
  //     setUserToken('');
  //     setIsLoggedIn(false);
  //     alert('Logged Out Successfully');
  //     router.push('/login');
  //   }
  // };
  //{---------------Logout End----------------}
  const resetToastState = () => {
    setShowNofitication(!showNotification);
    setToastSuccess(false);
    setToastError(false);
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
                  field={datasource?.image?.jsonValue?.value}
                  editable={true}
                  width={50}
                  height={50}
                />
              </div>
              <h5 className={`${darkMode && darkTheme.text_green}`}>
                {datasource?.title?.jsonValue?.value.split('<br>')[0]}
                <br />
                {datasource?.title?.jsonValue?.value.split('<br>')[1]}
              </h5>
              <div
                className={`${loginCss.welcomeTextDescription} ${darkMode && darkTheme.text_light}`}
              >
                {datasource?.description?.jsonValue?.value}
              </div>
            </div>
          </div>{' '}
          {/* <div className={loginCss.img}>
            <NextImage field={imageNotFound} editable={true} />
          </div> */}
          <div className={loginCss.rightGrid}>
            <div className={loginCss.rightGridBox}>
              <div className={loginCss.img1}>
                <NextImage
                  field={
                    datasource?.forgotFrameImageList?.targetItems[0]?.imageLogin?.jsonValue?.value
                  }
                  height={100}
                  width={100}
                />
              </div>
              <div className={loginCss.img2}>
                <NextImage
                  field={
                    datasource?.forgotFrameImageList?.targetItems[1]?.imageLogin?.jsonValue?.value
                  }
                  height={100}
                  width={100}
                />
              </div>
              <div className={loginCss.img3}>
                <NextImage
                  field={
                    datasource?.forgotFrameImageList?.targetItems[2]?.imageLogin?.jsonValue?.value
                  }
                  height={100}
                  width={100}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={`${loginCss.rightContainer} ${darkMode && darkTheme.grey_1}`}>
          <div
            className={`${loginCss.formContainer} ${loginCss.forgotPasswordCard} ${
              darkMode && darkTheme.grey_3
            } ${darkMode && loginCss.formDarkBorder}`}
          >
            {/* <h4 className={loginCss.UpdatePasswordHeading}>Update Your Password</h4> */}
            {passwordPage ? (
              <form className={loginCss.login} onSubmit={(e) => onSubmitPasswordHandler(e)}>
                <div className={loginCss.loginField}>
                  <i className={loginCss['login__icon fas fa-user']}></i>
                  <label className={`${loginCss.label} ${darkMode && darkTheme.text_light}`}>
                    {datasource?.passwordLabel?.jsonValue?.value}
                  </label>
                  <input
                    onChange={(e) => setPasswordValue(e.target.value)}
                    value={password}
                    type="password"
                    className={loginCss.loginInput}
                    placeholder={datasource?.passwordPlaceholder?.jsonValue?.value}
                    minLength={6}
                    required
                  />
                  {passwordError ? (
                    <span
                      style={{ fontWeight: 1000, color: 'red', fontSize: '12px', padding: '10px' }}
                    >
                      {passwordValidationMessage}
                    </span>
                  ) : (
                    ''
                  )}
                </div>
                <div className={loginCss.loginField}>
                  <i className={loginCss['login__icon fas fa-lock']}></i>
                  <label className={`${loginCss.label} ${darkMode && darkTheme.text_light}`}>
                    {datasource?.confirmPasswordLabel?.jsonValue?.value}
                  </label>
                  <input
                    onChange={(e) => setConfirmPasswordValue(e.target.value)}
                    value={confirmPassword}
                    type="password"
                    className={loginCss.loginInput}
                    placeholder={datasource?.confirmPasswordPlaceholder?.jsonValue?.value}
                    required
                  />
                  {passwordMatchError ? (
                    <span
                      style={{ fontWeight: 1000, color: 'red', fontSize: '12px', padding: '10px' }}
                    >
                      {datasource?.passwordMatchingError?.jsonValue?.value}
                    </span>
                  ) : (
                    ''
                  )}
                </div>
                <button className={loginCss.formButton}>
                  {isUpdatingPassword ? (
                    <span style={{ display: 'flex', padding: '10px', justifyContent: 'center' }}>
                      {' '}
                      <Spinner style={{ width: '15px', height: '15px' }} animation="border" />{' '}
                    </span>
                  ) : (
                    datasource?.updatePasswordBtnText?.jsonValue?.value
                  )}
                  <i className={loginCss['button__icon fas fa-chevron-right']}></i>
                </button>

                {somethingWentWrongError ? (
                  <span
                    style={{ fontWeight: 1000, color: 'red', fontSize: '12px', padding: '10px' }}
                  >
                    {datasource?.somethingWentError?.jsonValue?.value}
                  </span>
                ) : (
                  ''
                )}
              </form>
            ) : (
              <form className={loginCss.login} onSubmit={(e) => onSubmitHandler(e)}>
                <div className={loginCss.loginField}>
                  <i className={loginCss['login__icon fas fa-user']}></i>
                  <label className={`${loginCss.label} ${darkMode && darkTheme.text_light}`}>
                    {datasource?.userEmailLabel?.jsonValue?.value}
                  </label>
                  <input
                    onChange={(e) => {
                      setEmailValue(e.target.value);
                      handleOnChange(e.target.value);
                    }}
                    value={email}
                    type="text"
                    className={loginCss.loginInput}
                    placeholder={datasource?.emailPlaceholder?.jsonValue?.value}
                    disabled={otpFieldVisible}
                    //pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
                    required
                  />
                  {emailValidateError && (
                    <div
                      style={{ fontWeight: 1000, color: 'red', fontSize: '12px', padding: '10px' }}
                    >
                      {datasource?.emailError?.jsonValue?.value}
                    </div>
                  )}
                </div>
                {otpFieldVisible && (
                  <div className={loginCss.loginField}>
                    <i className={loginCss['login__icon fas fa-lock']}></i>
                    <label className={`${loginCss.label} ${darkMode && darkTheme.text_light}`}>
                      {datasource?.oTPLabel?.jsonValue?.value}
                    </label>
                    <input
                      onChange={(e) => setOtp(e.target.value)}
                      value={otp}
                      type="number"
                      className={loginCss.loginInput}
                      placeholder={datasource?.oTPPlaceholder?.jsonValue?.value}
                      required
                    />
                    {otpFieldVisible ? (
                      <div
                        style={{
                          fontWeight: 1000,
                          color: 'green',
                          fontSize: '12px',
                          padding: '10px',
                        }}
                      >
                        {datasource?.oTPSendMsg?.jsonValue?.value}
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                )}
                <button className={loginCss.formButton}>
                  {isUpdatingPassword ? (
                    <span style={{ display: 'flex', padding: '10px', justifyContent: 'center' }}>
                      {' '}
                      <Spinner style={{ width: '15px', height: '15px' }} animation="border" />{' '}
                    </span>
                  ) : !otpFieldVisible ? (
                    datasource?.sendOTPPasswordBtnText?.jsonValue?.value
                  ) : (
                    datasource?.submitBtnText?.jsonValue?.value
                  )}
                  <i className={loginCss['button__icon fas fa-chevron-right']}></i>
                </button>
                {accountError && !otpFieldVisible ? (
                  <span
                    style={{ fontWeight: 1000, color: 'red', fontSize: '12px', padding: '10px' }}
                  >
                    {datasource?.emailRegisterError?.jsonValue?.value}
                  </span>
                ) : (
                  ''
                )}
                {otpError ? (
                  <div
                    style={{
                      fontWeight: 1000,
                      color: 'red',
                      fontSize: '12px',
                      padding: '10px',
                    }}
                  >
                    {datasource?.oTPError?.jsonValue?.value}
                  </div>
                ) : (
                  ''
                )}
              </form>
            )}
            <div className={loginCss.formContainerBottom}>
              <div className={`${loginCss.formContainerButton} ${darkMode && darkTheme.greenBg}`}>
                <div className={loginCss.btn}>
                  <Link href={'/login'}>Back to Login?</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showNotification && (
          <ToastNotification
            showNotification={showNotification}
            success={toastSuccess}
            error={toastError}
            message={toastMessage}
            handleCallback={resetToastState}
          />
        )}
      </div>
    </>
  );
};

export default ForgotPassword;
