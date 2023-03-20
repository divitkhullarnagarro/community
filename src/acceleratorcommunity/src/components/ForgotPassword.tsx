import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import React, { useContext, useState } from 'react';
import loginUserCall from '../API/loginUserCall';
import WebContext from '../Context/WebContext';
import { useRouter } from 'next/router';
import { validateEmailOrPhone } from 'assets/helpers/validations';
import Link from 'next/link';
import Axios, { AxiosResponse } from 'axios';
import { LogoutUrl } from 'assets/helpers/constants';

type LoginProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};
function ForgotPassword(props: LoginProps) {
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn, setUserToken, userToken } = { ...useContext(WebContext) };

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

  function setEmailValue(val: any) {
    setEmail(val);
  }

  const onSubmitHandler = async (e: any) => {
    console.log('clicked on next button');
    e.preventDefault();
    // if (email !== confirmEmail) {
    //   setEmailMatchError(true);
    // } else {
    // setEmailMatchError(false);
    //   let response = await loginUserCall(email, confirmEmail);
    //   if (response?.status == 200 && setIsLoggedIn != undefined && setUserToken != undefined) {
    // setIsLoggedIn(true);
    // setUserToken(response?.data?.access_token);
    if (true) {
      setOtpFieldVisible(true);
      if (otp) {
        if (otp != '12345') {
          setOtpError(true);
        } else setPasswordPage(true);
      }
    } else {
      setAccountError(true);
    }
    // }
  };
  const onSubmitPasswordHandler = async (e: any) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
      //   let response = await loginUserCall(email, confirmEmail);
      //   if (response?.status == 200 && setIsLoggedIn != undefined && setUserToken != undefined) {
      // setIsLoggedIn(true);
      // setUserToken(response?.data?.access_token);
      alert('password Updated');
      router.push('/');
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
  console.log('userToken', userToken);

  //{---------------Logout Start--------------}

  const handleLogout = async (event: any) => {
    var config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await Axios.post<
      any,
      AxiosResponse<{ success: boolean; data: string; code: number; errors: any }>
    >(LogoutUrl, { accessToken: '', refreshToken: '' }, config);
    if (
      res?.data?.code == 200 &&
      res?.data?.success == true &&
      setUserToken != undefined &&
      setIsLoggedIn != undefined
    ) {
      setUserToken('');
      setIsLoggedIn(false);
      alert('Logged Out Successfully');
      router.push('/login');
    }
  };
  //{---------------Logout End----------------}

  return (
    <>
      <div className="container">
        <div className="screen">
          <div className="screen__content">
            {passwordPage ? (
              <form
                className="login"
                onSubmit={(e) => onSubmitPasswordHandler(e)}
                autoComplete="off"
              >
                <div className="login__field">
                  <i className="login__icon fas fa-user"></i>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    className="login__input"
                    placeholder="Enter New Password"
                    minLength={6}
                    required
                  />
                </div>
                <div className="login__field">
                  <i className="login__icon fas fa-lock"></i>
                  <input
                    onChange={(e) => setConformPassword(e.target.value)}
                    value={confirmPassword}
                    type="password"
                    className="login__input"
                    placeholder="Confirm New Password"
                    minLength={6}
                    required
                  />
                </div>
                <button className="button login__submit">
                  <span className="button__text">Update Password</span>
                  <i className="button__icon fas fa-chevron-right"></i>
                </button>
                {accountError ? (
                  <span
                    style={{ fontWeight: 1000, color: 'red', fontSize: '12px', padding: '10px' }}
                  >
                    * Email/Mobile not Registered
                  </span>
                ) : (
                  ''
                )}
                {passwordMatchError ? (
                  <span
                    style={{ fontWeight: 1000, color: 'red', fontSize: '12px', padding: '10px' }}
                  >
                    * Password and Confirm Password not matching
                  </span>
                ) : (
                  ''
                )}
              </form>
            ) : (
              <form className="login" onSubmit={(e) => onSubmitHandler(e)}>
                <div className="login__field">
                  <i className="login__icon fas fa-user"></i>
                  <input
                    onChange={(e) => {
                      setEmailValue(e.target.value);
                      handleOnChange(e.target.value);
                    }}
                    value={email}
                    type="text"
                    className="login__input"
                    placeholder="Enter Your Email ID"
                    //title="Enter Valid Email"
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
                {/* <div className="login__field">
                  <i className="login__icon fas fa-lock"></i>
                  <input
                    onChange={(e) => setConformEmailValue(e.target.value)}
                    value={confirmEmail}
                    type="password"
                    className="login__input"
                    placeholder="Confirm Email"
                    required
                  />
                </div> */}
                {otpFieldVisible && (
                  <div className="login__field">
                    <i className="login__icon fas fa-lock"></i>
                    <input
                      onChange={(e) => setOtp(e.target.value)}
                      value={otp}
                      type="number"
                      className="login__input"
                      placeholder="Enter OTP"
                      required
                    />
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
                  </div>
                )}
                <button className="button login__submit">
                  <span className="button__text">Next</span>
                  <i className="button__icon fas fa-chevron-right"></i>
                </button>
                {accountError ? (
                  <span
                    style={{ fontWeight: 1000, color: 'red', fontSize: '12px', padding: '10px' }}
                  >
                    * Email/Mobile not Registered
                  </span>
                ) : (
                  ''
                )}

                {/* {emailMatchError ? (
                  <span
                    style={{ fontWeight: 1000, color: 'red', fontSize: '12px', padding: '10px' }}
                  >
                    * Email and comfirm Email not matching
                  </span>
                ) : (
                  ''
                )} */}
              </form>
            )}
            <div className="social-login">
              <button className="registerButton" onClick={handleLogout}>
                Logout
              </button>
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
}

export default ForgotPassword;
