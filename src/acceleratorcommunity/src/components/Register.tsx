import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import React, { useState } from 'react';
import Link from 'next/link';
import registerUserCall from '../API/registerUserCall';

type RegisterProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const Register = (props: RegisterProps): JSX.Element => {
  props;
  let [firstName, setFirstName] = useState('');
  let [lastName, setLastName] = useState('');
  let [email, setEmail] = useState('');
  let [phoneNumber, setPhoneNumber] = useState('');
  let [password, setPassword] = useState('');
  let [confirmPassword, setConfirmPassword] = useState('');
  let [error, isError] = useState(false);

  function setFirstNameValue(val: any) {
    setFirstName(val);
  }

  function setPhoneNumberValue(val: any) {
    setPhoneNumber(val);
  }

  function setLastNameValue(val: any) {
    setLastName(val);
  }

  function setEmailValue(val: any) {
    setEmail(val);
  }

  function setPasswordValue(val: any) {
    setPassword(val);
    if (confirmPassword != '') {
      if (val !== confirmPassword) {
        isError(true);
      } else if (val == confirmPassword) {
        isError(false);
      }
    } else if (confirmPassword == '') {
      isError(false);
    }
  }
  function setConfirmPasswordValue(val: any) {
    setConfirmPassword(val);
    if (password != '') {
      if (password != val) isError(true);
      else if (password === val) {
        isError(false);
      }
    } else if (password == '') {
      isError(false);
    }
  }

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    let userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
    };
    let resp = await registerUserCall(userData);
    console.log('Register Response', resp);
  };

  return (
    <>
      <div className="container">
        <div className="screen">
          <div className="screen__content">
            <form className="login" onSubmit={(e) => onSubmitHandler(e)}>
              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input
                  type="text"
                  onChange={(e) => setFirstNameValue(e.target.value)}
                  value={firstName}
                  className="login__input"
                  placeholder="First Name"
                />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input
                  type="text"
                  onChange={(e) => setLastNameValue(e.target.value)}
                  value={lastName}
                  className="login__input"
                  placeholder="Last Name"
                />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input
                  type="text"
                  onChange={(e) => setEmailValue(e.target.value)}
                  value={email}
                  className="login__input"
                  placeholder="Email"
                />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input
                  type="text"
                  onChange={(e) => setPhoneNumberValue(e.target.value)}
                  value={phoneNumber}
                  className="login__input"
                  placeholder="Phone No."
                />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input
                  type="password"
                  onChange={(e) => setPasswordValue(e.target.value)}
                  value={password}
                  className="login__input"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-lock"></i>
                <input
                  type="password"
                  onChange={(e) => setConfirmPasswordValue(e.target.value)}
                  value={confirmPassword}
                  className="login__input"
                  placeholder="Confirm Password"
                  required
                />
              </div>
              <button
                className="button login__submit"
                style={!error ? {} : { borderColor: 'red', borderWidth: '2px' }}
              >
                <span className="button__text">Register</span>
                <i className="button__icon fas fa-chevron-right"></i>
              </button>
              {!error ? (
                ''
              ) : (
                <span className="passwordMismatchWarning">
                  * Please match Password and Confirm Password
                </span>
              )}
            </form>
            <div className="social-login">
              <h6>Have Account ?</h6>
              <button className="registerButton">
                <Link href={'/'}>Goto Login</Link>
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

// export default withDatasourceCheck()<RegisterProps>(Register);
export default Register;
