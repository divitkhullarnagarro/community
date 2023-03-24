import { Field, NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import React, { useState } from 'react';
import Link from 'next/link';
import registerUserCall from '../API/registerUserCall';
import { useRouter } from 'next/router';
import RegisterCss from '../assets/register.module.css';
import starImage from '../assets/images/star.png';
import imageNotFound from '../assets/images/imageNot.png';


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
  let [isRegistered, setIsRegistered] = useState(false);
  const router = useRouter();


  let [firstNameError, setFirstNameError] = useState(false);
  let [lastNameError, setLastNameError] = useState(false);
  let [emailError, setEmailError] = useState(false);
  let [phoneError, setPhoneError] = useState(false);
  let [passwordError, setPasswordError] = useState(false);
  // let [confirmPasswordError, setConfirmPasswordError] = useState(false);

  function setFirstNameValue(val: any) {
    setFirstName(val);
    if(val===""){
      setFirstNameError(true);
    }
    else{
      setFirstNameError(false);
    }
  }

  function setPhoneNumberValue(val: any) {
    setPhoneNumber(val);
    if(val===""){
      setPhoneError(true);
    }
    else{
      setPhoneError(false);
    }
  }

  function setLastNameValue(val: any) {
    setLastName(val);
    if(val===""){
      setLastNameError(true);
    }
    else{
      setLastNameError(false);
    }
  }

  function setEmailValue(val: any) {
    setEmail(val);
    if(val==="")
      setEmailError(true)
      else{
        setEmailError(false);
      }
  }

  function setPasswordValue(val: any) {
    setPassword(val);
    // if()
    if(val==="")
      setPasswordError(true)
      else{
        setPasswordError(false);
      }
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

    if(firstName ==="" ){
      setFirstNameError(true);
    }

    if(lastName === ""){
      setLastNameError(true);
    }
    if(email === ""){
      setEmailError(true);
    }
    if(phoneNumber == ""){
      setPhoneError(true);
    }
    if(password === ""){
      setPasswordError(true);
    }
    if(firstName !=="" && lastName !=="" && email !=="" && phoneNumber !=="" && password !=="" && password===confirmPassword){
    let resp = await registerUserCall(userData);
    if (resp?.data?.success == true) {
      setIsRegistered(true);
      // setTimeout(() => {
        router.push('/login');
      // }, 2000);
    }
  
    console.log('Register Response', resp);
  }
  };

  return (
    <>
      <div className={RegisterCss.container}>
        <div className={RegisterCss.leftContainer}>
          <div className={RegisterCss.welcomeText}>
            <div className={RegisterCss.welcomeTextImage}>
              <NextImage field={starImage} editable={true} width={30} height={30} />
            </div>
            <h2 className={RegisterCss.welcomeTextHeading}>
              Welcome,<div> Please Register Here</div>
            </h2>
            <div className={RegisterCss.welcomeTextDescription}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi illum ad, facere placeat
              quos recusandae reprehenderit nihil minima possimus, quod adipisci, porro quibusdam
              obcaecati.
            </div>
          </div>
          {/* <div className={RegisterCss.img}>
            <NextImage field={imageNotFound} editable={true} />
          </div> */}
        </div>
        <div className={RegisterCss.rightContainer}>
          <div className={RegisterCss.formContainer}>
            <form className={RegisterCss.login} onSubmit={(e) => onSubmitHandler(e)}>
              <div className={RegisterCss.loginField}>
                <i className="login__icon fas fa-user"></i>
                <label className={RegisterCss.label}>First Name</label>
                <input
                  type="text"
                  onChange={(e) => setFirstNameValue(e.target.value)}
                  value={firstName}
                  className={RegisterCss.loginInput}
                  // required
                  // placeholder="First Name"
                />
                {!firstNameError ? (
                ''
              ) : (
                <span className={RegisterCss.passwordMismatchWarning}>
                  * This field is mandatory
                </span>
              )}
              </div>
              <div className={RegisterCss.loginField}>
                <i className="login__icon fas fa-user"></i>
                <label className={RegisterCss.label}>Last Name</label>
                <input
                  type="text"
                  onChange={(e) => setLastNameValue(e.target.value)}
                  value={lastName}
                  className={RegisterCss.loginInput}
                  // placeholder="Last Name"
                />
                {!lastNameError ? (
                ''
              ) : (
                <span className={RegisterCss.passwordMismatchWarning}>
                  * This field is mandatory
                </span>
              )}
              </div>
              <div className={RegisterCss.loginField}>
                <i className="login__icon fas fa-user"></i>
                <label className={RegisterCss.label}>Email</label>
                <input
                  type="email"
                  onChange={(e) => setEmailValue(e.target.value)}
                  value={email}
                  className={RegisterCss.loginInput}
                  title="Use xyz@abc.com formate"
                  // placeholder="Email"
                />
                {!emailError ? (
                ''
              ) : (
                <span className={RegisterCss.passwordMismatchWarning}>
                  * This field is mandatory
                </span>
              )}
              </div>
              <div className={RegisterCss.loginField}>
                <i className="login__icon fas fa-user"></i>
                <label className={RegisterCss.label}>Phone No.</label>
                <input
                  type="text"
                  onChange={(e) => setPhoneNumberValue(e.target.value)}
                  value={phoneNumber}
                  className={RegisterCss.loginInput}
                  // placeholder="Phone No."
                />
                {!phoneError ? (
                ''
              ) : (
                <span className={RegisterCss.passwordMismatchWarning}>
                  * This field is mandatory
                </span>
              )}
              </div>
              <div className={RegisterCss.loginField}>
                <i className="login__icon fas fa-user"></i>
                <label className={RegisterCss.label}>Password</label>
                <input
                  type="password"
                  onChange={(e) => setPasswordValue(e.target.value)}
                  value={password}
                  className={RegisterCss.loginInput}
                  // placeholder="Password"
                  // required
                />
                {!passwordError ? (
                ''
              ) : (
                <span className={RegisterCss.passwordMismatchWarning}>
                  * This field is mandatory
                </span>
              )}
              </div>
              <div className={RegisterCss.loginField}>
                <i className="login__icon fas fa-lock"></i>
                <label className={RegisterCss.label}>Confirm Password</label>
                <input
                  type="password"
                  onChange={(e) => setConfirmPasswordValue(e.target.value)}
                  value={confirmPassword}
                  className={RegisterCss.loginInput}
                  // placeholder="Confirm Password"
                  // required
                />
                {!error ? (
                ''
              ) : (
                <span className={RegisterCss.passwordMismatchWarning}>
                  * Please match Password and Confirm Password
                </span>
              )}
              </div>
              <button className={RegisterCss.formButton} disabled={error || firstNameError || lastNameError || phoneError || emailError || passwordError}>
                Register
                <i className="button__icon fas fa-chevron-right"></i>
              </button>
              
            </form>
            {isRegistered ? (
              <span style={{ fontWeight: 1000, color: 'white', fontSize: '18px', padding: '10px' }}>
                * User Registered Successfully
              </span>
            ) : (
              ''
            )}
            <div className={RegisterCss.formContainerBottom}>
            <div className={RegisterCss.text}>Have Account ?</div>
              <div className={RegisterCss.btn}>
                <Link href={'/login'}>Goto Login</Link>
              
              </div>
            </div>


            
          </div>
        </div>
      </div>
    </>
  );
};

// export default withDatasourceCheck()<RegisterProps>(Register);
export default Register;
