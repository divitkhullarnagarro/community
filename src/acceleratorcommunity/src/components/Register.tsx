import { Field, ImageField, RichTextField, Image, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import React, { useContext, useState } from 'react';
import Link from 'next/link';
import registerUserCall from '../API/registerUserCall';
import { useRouter } from 'next/router';
import RegisterCss from '../assets/register.module.css';
import {
  validateEmail,
  validatePassword,
  alphabateAndSpaceChecker,
  validatePhoneNumber,
} from 'assets/helpers/validations';
// import starImage from '../assets/images/star.png';
// import imageNotFound from '../assets/images/imageNot.png';
import ThemeSwitcher from './ThemeSwitcher';
import darkTheme from '../assets/darkTheme.module.css';
import WebContext from '../Context/WebContext';
import Spinner from 'react-bootstrap/Spinner';
import GenericNotificationContext from 'src/Context/GenericNotificationContext';
import { spaceRemover } from 'assets/helpers/helperFunctions';
type RegisterProps = ComponentProps & {
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
  alert: {
    jsonValue: Field<string>;
  };
  description: {
    jsonValue: RichTextField;
  };
  image: {
    jsonValue: ImageField;
  };
  firstNameLabel: {
    jsonValue: Field<string>;
  };
  firstNamePlaceholder: {
    jsonValue: Field<string>;
  };
  lastNameLabel: {
    jsonValue: Field<string>;
  };
  lastNamePlaceholder: {
    jsonValue: Field<string>;
  };
  emailLabel: {
    jsonValue: Field<string>;
  };
  emailPlaceholder: {
    jsonValue: Field<string>;
  };
  phoneNoLabel: {
    jsonValue: Field<string>;
  };
  phoneNoPlaceholder: {
    jsonValue: Field<string>;
  };
  passwordLabel: {
    jsonValue: Field<string>;
  };
  passwordPlaceholder: {
    jsonValue: Field<string>;
  };
  confirmPasswordLabel: {
    jsonValue: Field<string>;
  };
  confirmPasswordPlaceholder: {
    jsonValue: Field<string>;
  };
  registerBtn: {
    jsonValue: Field<string>;
  };
  haveAccountLabel: {
    jsonValue: Field<string>;
  };
  loginBtn: {
    jsonValue: Field<string>;
  };
  frameImageList: {
    targetItems: Array<{
      imageLogin: {
        jsonValue: ImageField;
      };
    }>;
  };
};

const Register = (props: RegisterProps): JSX.Element => {
  const { darkMode } = {
    ...useContext(WebContext),
  };
  const { setError, setMessage, setShowNotification, setSuccess } = {
    ...useContext(GenericNotificationContext),
  };
  props;
  let [firstName, setFirstName] = useState('');
  let [lastName, setLastName] = useState('');
  let [email, setEmail] = useState('');
  let [emailValidationMessage, setEmailValidationMessage] = useState('');
  let [phoneNumber, setPhoneNumber] = useState('');
  let [phoneValidationMessage, setPhoneValidationMessage] = useState('');
  let [password, setPassword] = useState('');
  let [passwordValidationMessage, setPasswordValidationMessage] = useState('');
  let [confirmPassword, setConfirmPassword] = useState('');
  let [error, isError] = useState(false);
  // let [isRegistered, setIsRegistered] = useState(false);
  const router = useRouter();

  let [firstNameError, setFirstNameError] = useState(false);
  let [firstNameErrorMessage, setFirstNameErrorMessage] = useState('');
  let [lastNameError, setLastNameError] = useState(false);
  let [lastNameErrorMessage, setLastNameErrorMessage] = useState('');

  let [emailError, setEmailError] = useState(false);
  let [phoneError, setPhoneError] = useState(false);
  let [passwordError, setPasswordError] = useState(false);
  // let [confirmPasswordError, setConfirmPasswordError] = useState(false);

  let [isSigningUp, setIsSigningUp] = useState(false);

  const targetItems = props?.fields?.data?.datasource;
  console.log('targetItems', targetItems);
  function setFirstNameValue(val: any) {
    const updatedValue = spaceRemover(val);
    setFirstName(updatedValue);
    const isError = alphabateAndSpaceChecker(
      updatedValue,
      targetItems?.firstNameLabel?.jsonValue?.value
    );
    if (isError.error) {
      setFirstNameError(true);
      setFirstNameErrorMessage(isError.errorMessage);
    } else {
      setFirstNameError(false);
    }
  }

  function setPhoneNumberValue(val: any) {
    if (val.length <= 10) {
      setPhoneNumber(val);

      const isError = validatePhoneNumber(val, targetItems?.phoneNoLabel?.jsonValue?.value);
      if (isError.error) {
        setPhoneError(true);
        setPhoneValidationMessage(isError.errorMessage);
      } else {
        setPhoneError(false);
      }
    }
  }

  function setLastNameValue(val: any) {
    const updatedValue = spaceRemover(val);
    setLastName(updatedValue);
    const isError = alphabateAndSpaceChecker(
      updatedValue,
      targetItems?.lastNameLabel?.jsonValue?.value
    );
    if (isError.error) {
      setLastNameError(true);
      setLastNameErrorMessage(isError.errorMessage);
    } else {
      setLastNameError(false);
    }
  }

  function setEmailValue(val: any) {
    if (val === '') {
      setEmailError(true);
      setEmailValidationMessage(`${targetItems?.emailLabel?.jsonValue?.value} is mandatory`);
    } else {
      if (!validateEmail(val)) {
        setEmailError(true);
        setEmailValidationMessage(`${targetItems?.emailLabel?.jsonValue?.value} is not valid`);
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
      if (!validatePassword(val)) {
        setPasswordError(true);
        setPasswordValidationMessage(
          `${targetItems?.passwordLabel?.jsonValue?.value} should be minimum of 8 letters with 1 upper, 1 lowercase, 1 digit, 1 special character`
        );
      } else {
        setPasswordError(false);
      }
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
    setPassword(val);
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
    setIsSigningUp(true);
    let userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
    };

    if (firstName === '') {
      setFirstNameError(true);
      setFirstNameErrorMessage('Name is Required');
    }

    if (lastName === '') {
      setLastNameError(true);
      setLastNameErrorMessage('Last Name is Required');
    }
    if (email === '') {
      setEmailError(true);
      setEmailValidationMessage(`${targetItems?.emailLabel?.jsonValue?.value} is mandatory`);
    }
    if (phoneNumber == '') {
      setPhoneError(true);
      setPhoneValidationMessage(`${targetItems?.phoneNoLabel?.jsonValue?.value} is mandatory`);
    }
    if (password === '') {
      setPasswordValidationMessage(`${targetItems?.passwordLabel?.jsonValue?.value} is mandatory`);
      setPasswordError(true);
    }
    if (
      firstName !== '' &&
      lastName !== '' &&
      email !== '' &&
      phoneNumber !== '' &&
      password !== '' &&
      password === confirmPassword
    ) {
      try {
        let resp: any = await registerUserCall(userData);
        if (resp?.data?.success == true) {
          setSuccess(true);
          setMessage('User Registered Successfully');
          setShowNotification(true);

          router.push('/login');
          setIsSigningUp(false);
        } else {
          setError(true);
          setMessage(
            resp?.data?.errorMessages?.[0]
              ? resp?.data?.errorMessages?.[0]
              : 'Something Went Wrong. Please Try Again'
          );
          setShowNotification(true);

          setIsSigningUp(false);
        }
      } catch (err: any) {
        setError(true);
        setMessage(err?.message ?? 'Something went wrong');
        setShowNotification(true);
        setIsSigningUp(false);
      }
    }
  };

  return (
    <>
      <div className={RegisterCss.ThemeSwitcher}>
        <ThemeSwitcher />
      </div>
      <div className={`${RegisterCss.container} ${darkMode && darkTheme.grey_1}`}>
        <div className={RegisterCss.leftContainer}>
          <div className={RegisterCss.leftGrid}>
            <div className={RegisterCss.welcomeText}>
              <div className={RegisterCss.welcomeTextImage}>
                <Image
                  field={props?.fields?.data?.datasource?.image?.jsonValue}
                  editable={true}
                  width={50}
                  height={50}
                />
                {/* <NextImage field={starImage}  editable={true} /> */}
              </div>
              <h5
                className={`${RegisterCss.welcomeTextHeading} ${darkMode && darkTheme.text_green}`}
              >
                <Text
                  field={
                    targetItems?.title?.jsonValue
                      ? targetItems?.title?.jsonValue
                      : { value: 'Welcome to Community Solution' }
                  }
                />
                <br />
                <Text
                  field={
                    targetItems?.title?.jsonValue
                      ? targetItems?.alert?.jsonValue
                      : { value: 'Please Register Here' }
                  }
                />
              </h5>
              <div
                className={`${RegisterCss?.welcomeTextDescription} ${
                  darkMode && darkTheme.text_light
                }`}
              >
                <Text
                  field={
                    targetItems?.description?.jsonValue
                      ? targetItems?.description?.jsonValue
                      : {
                          value:
                            "Welcome to Community Solution! We're glad you're here. To get started, please fill out the form with your information. Once you've submitted the form, you'll redirected to login page. Thank you for choosing Community Solution!",
                        }
                  }
                />
              </div>
            </div>
          </div>{' '}
          {/* <div className={RegisterCss.img}>
            <NextImage field={imageNotFound} editable={true} />
          </div> */}
          <div className={RegisterCss.rightGrid}>
            <div className={RegisterCss.rightGridBox}>
              <div className={RegisterCss.img1}>
                <Image
                  field={
                    props?.fields?.data?.datasource?.frameImageList?.targetItems[0]?.imageLogin
                      ?.jsonValue
                  }
                  height={150}
                  width={150}
                />
              </div>
              <div className={RegisterCss.img2}>
                <Image
                  field={
                    props?.fields?.data?.datasource?.frameImageList?.targetItems[1]?.imageLogin
                      ?.jsonValue
                  }
                  height={150}
                  width={150}
                />
              </div>
              <div className={RegisterCss.img3}>
                <Image
                  field={
                    props?.fields?.data?.datasource?.frameImageList?.targetItems[2]?.imageLogin
                      ?.jsonValue
                  }
                  height={150}
                  width={150}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={`${RegisterCss.rightContainer} ${darkMode && darkTheme.grey_1}`}>
          <div
            className={`${RegisterCss.formContainer} ${darkMode && darkTheme.grey_3} ${
              darkMode && RegisterCss.formDarkBorder
            }`}
          >
            <form className={RegisterCss.login} onSubmit={(e) => onSubmitHandler(e)}>
              <div className={RegisterCss.loginField}>
                <i className="login__icon fas fa-user"></i>
                <label className={`${RegisterCss.label} ${darkMode && darkTheme.text_light}`}>
                  <Text
                    field={
                      props?.fields?.data?.datasource?.firstNameLabel?.jsonValue
                        ? props?.fields?.data?.datasource?.firstNameLabel?.jsonValue
                        : { value: 'First Name' }
                    }
                  />
                </label>
                <input
                  type="text"
                  onChange={(e) => setFirstNameValue(e?.target?.value)}
                  value={firstName}
                  className={RegisterCss.loginInput}
                  // required
                  // placeholder={targetItems.firstNamePlaceholder.jsonValue.value}
                />
                {!firstNameError ? (
                  ''
                ) : (
                  <span className={RegisterCss.passwordMismatchWarning}>
                    * {firstNameErrorMessage}
                  </span>
                )}
              </div>
              <div className={RegisterCss.loginField}>
                <i className="login__icon fas fa-user"></i>
                <label className={`${RegisterCss.label} ${darkMode && darkTheme.text_light}`}>
                  <Text
                    field={
                      props?.fields?.data?.datasource?.lastNameLabel?.jsonValue
                        ? props?.fields?.data?.datasource?.lastNameLabel?.jsonValue
                        : { value: 'Last Name' }
                    }
                  />
                </label>
                <input
                  type="text"
                  onChange={(e) => setLastNameValue(e?.target?.value)}
                  value={lastName}
                  className={RegisterCss.loginInput}
                  // placeholder={targetItems.lastNamePlaceholder.jsonValue.value}
                />
                {!lastNameError ? (
                  ''
                ) : (
                  <span className={RegisterCss.passwordMismatchWarning}>
                    * {lastNameErrorMessage}
                  </span>
                )}
              </div>
              <div className={RegisterCss.loginField}>
                <i className="login__icon fas fa-user"></i>
                <label className={`${RegisterCss.label} ${darkMode && darkTheme.text_light}`}>
                  <Text
                    field={
                      props?.fields?.data?.datasource?.emailLabel?.jsonValue
                        ? props?.fields?.data?.datasource?.emailLabel?.jsonValue
                        : { value: 'Email' }
                    }
                  />
                </label>
                <input
                  type="email"
                  onChange={(e) => setEmailValue(e.target.value)}
                  value={email}
                  className={RegisterCss.loginInput}
                  title="Use xyz@abc.com formate"
                  // placeholder={targetItems.emailPlaceholder.jsonValue.value}
                />
                {!emailError ? (
                  ''
                ) : (
                  <span className={RegisterCss.passwordMismatchWarning}>
                    *{emailValidationMessage}
                  </span>
                )}
              </div>
              <div className={RegisterCss.loginField}>
                <i className="login__icon fas fa-user"></i>
                <label className={`${RegisterCss.label} ${darkMode && darkTheme.text_light}`}>
                  <Text
                    field={
                      props?.fields?.data?.datasource?.phoneNoLabel?.jsonValue
                        ? props?.fields?.data?.datasource?.phoneNoLabel?.jsonValue
                        : { value: 'Phone No.' }
                    }
                  />
                </label>
                <input
                  type="number"
                  onChange={(e) => setPhoneNumberValue(e?.target?.value)}
                  value={phoneNumber}
                  className={RegisterCss.loginInput}
                  // placeholder={targetItems.phoneNoPlaceholder.jsonValue.value}
                />
                {!phoneError ? (
                  ''
                ) : (
                  <span className={RegisterCss.passwordMismatchWarning}>
                    *{phoneValidationMessage}
                  </span>
                )}
              </div>
              <div className={RegisterCss.loginField}>
                <i className="login__icon fas fa-user"></i>
                <label className={`${RegisterCss.label} ${darkMode && darkTheme.text_light}`}>
                  <Text
                    field={
                      props?.fields?.data?.datasource?.passwordLabel?.jsonValue
                        ? props?.fields?.data?.datasource?.passwordLabel?.jsonValue
                        : { value: 'Password' }
                    }
                  />
                </label>
                <input
                  type="password"
                  onChange={(e) => setPasswordValue(e?.target?.value)}
                  value={password}
                  className={RegisterCss.loginInput}
                  // placeholder={targetItems.passwordPlaceholder.jsonValue.value}
                  // required
                />
                {!passwordError ? (
                  ''
                ) : (
                  <span className={RegisterCss.passwordMismatchWarning}>
                    *{passwordValidationMessage}
                  </span>
                )}
              </div>
              <div className={RegisterCss.loginField}>
                <i className="login__icon fas fa-lock"></i>
                <label className={`${RegisterCss.label} ${darkMode && darkTheme.text_light}`}>
                  <Text
                    field={
                      props?.fields?.data?.datasource?.confirmPasswordLabel?.jsonValue
                        ? props?.fields?.data?.datasource?.confirmPasswordLabel?.jsonValue
                        : { value: 'Confirm Password' }
                    }
                  />
                </label>
                <input
                  type="password"
                  onChange={(e) => setConfirmPasswordValue(e.target.value)}
                  value={confirmPassword}
                  className={RegisterCss.loginInput}
                  // placeholder={targetItems.confirmPasswordLabel.jsonValue.value}
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
              <button
                className={RegisterCss.formButton}
                disabled={
                  firstName === '' ||
                  lastName === '' ||
                  email === '' ||
                  phoneNumber === '' ||
                  password === '' ||
                  confirmPassword === '' ||
                  error ||
                  firstNameError ||
                  lastNameError ||
                  phoneError ||
                  emailError ||
                  passwordError
                }
              >
                {isSigningUp ? (
                  <span style={{ display: 'flex', padding: '10px', justifyContent: 'center' }}>
                    {' '}
                    <Spinner style={{ width: '15px', height: '15px' }} animation="border" />{' '}
                  </span>
                ) : (
                  <Text
                    field={
                      props?.fields?.data?.datasource?.registerBtn?.jsonValue
                        ? props?.fields?.data?.datasource?.registerBtn?.jsonValue
                        : { value: 'Register' }
                    }
                  />
                )}
                <i className="button__icon fas fa-chevron-right"></i>
              </button>
            </form>
            {/* {isRegistered ? (
              <span style={{ fontWeight: 1000, color: 'white', fontSize: '18px', padding: '10px' }}>
                * User Registered Successfully
              </span>
            ) : (
              ''
            )} */}
            <div className={`${RegisterCss.formContainerBottom}`}>
              <div
                className={`${RegisterCss.formContainerButton} ${darkMode && darkTheme.greenBg}`}
              >
                <div className={RegisterCss.text}>
                  <Text
                    field={
                      props?.fields?.data?.datasource?.haveAccountLabel?.jsonValue
                        ? props?.fields?.data?.datasource?.haveAccountLabel?.jsonValue
                        : { value: 'Have Account ?' }
                    }
                  />
                </div>
                <div className={RegisterCss.btn}>
                  <Link href={'/login'}>
                    <button className={RegisterCss.GotoLoginBtn}>
                      <Text
                        field={
                          props?.fields?.data?.datasource?.loginBtn?.jsonValue
                            ? props?.fields?.data?.datasource?.loginBtn?.jsonValue
                            : { value: 'Goto Login' }
                        }
                        editable={true}
                        onClick={() => {
                          router.push('/login');
                        }}
                      />
                    </button>
                  </Link>
                </div>
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
