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
  const { setIsLoggedIn, setUserToken, userToken } = { ...useContext(WebContext) };

  let [email, setEmail] = useState('');
  let [accountError, setAccountError] = useState(false);
  let [passwordMatchError, setPasswordMatchError] = useState(false);
  let [passwordPage, setPasswordPage] = useState(false);
  let [password, setPassword] = useState('');
  let [passwordValidationMessage, setPasswordValidationMessage] = useState('');
  let [confirmPassword, setConformPassword] = useState('');
  let [otpFieldVisible, setOtpFieldVisible] = useState(false);
  let [otp, setOtp] = useState('');
  let [otpError, setOtpError] = useState(false);
  let [emailValidateError, setEmailValidateError] = useState(false);
  let [passwordError, setPasswordError] = useState(false);
  let [somethingWentWrongError, setSomethingWentWrongError] = useState(false);

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
      const res = await sendOtpCall(email);
      if (res?.data?.errorCode != 404) {
        setOtpFieldVisible(true);
      } else {
        setAccountError(true);
      }
    } else {
      const res = await validateOtpCall(email, otp);
      if (res.data.errorCode != 404) {
        setPasswordPage(true);
      } else {
        setOtpError(true);
      }
    }
  };
  const onSubmitPasswordHandler = async (e: any) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordMatchError(true);
    } else {
      const res = await updatePasswordCall(email, password);
      if (!res?.data?.errorCode) {
        alert('password Updated Successfully');
        router.push('/login');
      } else {
        setSomethingWentWrongError(true);
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

  return (
    <>
      <div className={loginCss.container}>
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
              <h5>
                {datasource?.title?.jsonValue?.value.split('<br>')[0]}
                <br />
                {datasource?.title?.jsonValue?.value.split('<br>')[1]}
              </h5>
              <div className={loginCss.welcomeTextDescription}>
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

        <div className={loginCss.rightContainer}>
          <div className={`${loginCss.formContainer} ${loginCss.forgotPasswordCard}`}>
            {/* <h4 className={loginCss.UpdatePasswordHeading}>Update Your Password</h4> */}
            {passwordPage ? (
              <form className={loginCss.login} onSubmit={(e) => onSubmitPasswordHandler(e)}>
                <div className={loginCss.loginField}>
                  <i className={loginCss['login__icon fas fa-user']}></i>
                  <label className={loginCss.label}>
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
                  <label className={loginCss.label}>
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
                  {datasource?.updatePasswordBtnText?.jsonValue?.value}
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
                  <label className={loginCss.label}>
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
                    <label className={loginCss.label}>
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
                  {!otpFieldVisible
                    ? datasource?.sendOTPPasswordBtnText?.jsonValue?.value
                    : datasource?.submitBtnText?.jsonValue?.value}
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
              <div className={loginCss.btn}>
                <Link href={'/login'}>Back to Login?</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
