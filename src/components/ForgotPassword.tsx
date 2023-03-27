import { Field, NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import React, { useContext, useState } from 'react';
import WebContext from '../Context/WebContext';
import { useRouter } from 'next/router';
import loginCss from '../assets/login.module.css';
import star from '../assets/images/star.png';
import imageNotFound from '../assets/images/imageNot.png';
import { validateEmailOrPhone } from 'assets/helpers/validations';
// import Axios, { AxiosResponse } from 'axios';
// import { LogoutUrl } from 'assets/helpers/constants';
import sendOtpCall, { updatePasswordCall, validateOtpCall } from 'src/API/forgotPasswordCalls';

type ForgotPasswordProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const ForgotPassword = (props: ForgotPasswordProps): JSX.Element => {
  props; //delete Me

  const router = useRouter();
  const { setIsLoggedIn, setUserToken, userToken } = { ...useContext(WebContext) };

  let [email, setEmail] = useState('');
  let [accountError, setAccountError] = useState(false);
  let [passwordMatchError, setPasswordMatchError] = useState(false);
  let [passwordPage, setPasswordPage] = useState(false);
  let [password, setPassword] = useState('');
  let [confirmPassword, setConformPassword] = useState('');
  let [otpFieldVisible, setOtpFieldVisible] = useState(false);
  let [otp, setOtp] = useState('');
  let [otpError, setOtpError] = useState(false);
  let [emailValidateError, setEmailValidateError] = useState(false);
  let [somethingWentWrongError, setSomethingWentWrongError] = useState(false);

  function setEmailValue(val: any) {
    setEmail(val);
  }

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();

    if (!otpFieldVisible) {
      const res = await sendOtpCall(email);
      if (res.data.errorCode != 404) {
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
      if (!res.data.errorCode) {
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
          <div className={loginCss.welcomeText}>
            <div className={loginCss.welcomeTextImage}>
              <NextImage field={star} editable={true} width={30} height={30} />
            </div>
            <h2>
              Welcome,<div> Please Update Password</div>
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
            {passwordPage ? (
              <form className={loginCss.login} onSubmit={(e) => onSubmitPasswordHandler(e)}>
                <div className={loginCss.loginField}>
                  <i className={loginCss['login__icon fas fa-user']}></i>
                  <label className={loginCss.label}>User Email</label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    className={loginCss.loginInput}
                    placeholder="Enter New Password"
                    minLength={6}
                    required
                  />
                </div>
                <div className={loginCss.loginField}>
                  <i className={loginCss['login__icon fas fa-lock']}></i>
                  <label className={loginCss.label}>Password</label>
                  <input
                    onChange={(e) => setConformPassword(e.target.value)}
                    value={confirmPassword}
                    type="password"
                    className={loginCss.loginInput}
                    placeholder="Confirm New Password"
                    minLength={6}
                    required
                  />
                </div>
                <button className={loginCss.formButton}>
                  Update Password
                  <i className={loginCss['button__icon fas fa-chevron-right']}></i>
                </button>

                {passwordMatchError ? (
                  <span
                    style={{ fontWeight: 1000, color: 'red', fontSize: '12px', padding: '10px' }}
                  >
                    * Password and Confirm Password not matching
                  </span>
                ) : (
                  ''
                )}
                {somethingWentWrongError ? (
                  <span
                    style={{ fontWeight: 1000, color: 'red', fontSize: '12px', padding: '10px' }}
                  >
                    * Something Went Wrong Please Try Again
                  </span>
                ) : (
                  ''
                )}
              </form>
            ) : (
              <form className={loginCss.login} onSubmit={(e) => onSubmitHandler(e)}>
                <div className={loginCss.loginField}>
                  <i className={loginCss['login__icon fas fa-user']}></i>
                  <label className={loginCss.label}>User Email</label>
                  <input
                    onChange={(e) => {
                      setEmailValue(e.target.value);
                      handleOnChange(e.target.value);
                    }}
                    value={email}
                    type="text"
                    className={loginCss.loginInput}
                    placeholder="Enter Your Email ID"
                    disabled={otpFieldVisible}
                    //pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
                    required
                  />
                  {emailValidateError && (
                    <div
                      style={{ fontWeight: 1000, color: 'red', fontSize: '12px', padding: '10px' }}
                    >
                      Please Enter Valid Email or Mobile
                    </div>
                  )}
                </div>
                {otpFieldVisible && (
                  <div className={loginCss.loginField}>
                    <i className={loginCss['login__icon fas fa-lock']}></i>
                    <label className={loginCss.label}>Password</label>
                    <input
                      onChange={(e) => setOtp(e.target.value)}
                      value={otp}
                      type="number"
                      className={loginCss.loginInput}
                      placeholder="Enter OTP"
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
                        OTP Send to Your Registered Mail ID
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                )}
                <button className={loginCss.formButton}>
                  {!otpFieldVisible ? 'Send OTP' : 'Verify and Submit'}
                  <i className={loginCss['button__icon fas fa-chevron-right']}></i>
                </button>
                {accountError && !otpFieldVisible ? (
                  <span
                    style={{ fontWeight: 1000, color: 'red', fontSize: '12px', padding: '10px' }}
                  >
                    * Email/Mobile not Registered
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
                    * Please enter correct OTP
                  </div>
                ) : (
                  ''
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
