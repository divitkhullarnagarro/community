import { Field, ImageField, NextImage, RichTextField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import React, { useState } from 'react';
import Link from 'next/link';
import registerUserCall from '../API/registerUserCall';
import { useRouter } from 'next/router';
import RegisterCss from '../assets/register.module.css';
// import starImage from '../assets/images/star.png';
// import imageNotFound from '../assets/images/imageNot.png';

type RegisterProps = ComponentProps & {
  fields: {
    // heading: Field<string>;
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
      image: {
        jsonValue: ImageField;
      };
    }>;
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

  const targetItems = props?.fields?.data?.datasource;
  function setFirstNameValue(val: any) {
    setFirstName(val);
    if (val === '') {
      setFirstNameError(true);
    } else {
      setFirstNameError(false);
    }
  }

  function setPhoneNumberValue(val: any) {
    setPhoneNumber(val);
    if (val === '') {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }
  }

  function setLastNameValue(val: any) {
    setLastName(val);
    if (val === '') {
      setLastNameError(true);
    } else {
      setLastNameError(false);
    }
  }

  function setEmailValue(val: any) {
    setEmail(val);
    if (val === '') setEmailError(true);
    else {
      setEmailError(false);
    }
  }

  function setPasswordValue(val: any) {
    setPassword(val);
    // if()
    if (val === '') setPasswordError(true);
    else {
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

    if (firstName === '') {
      setFirstNameError(true);
    }

    if (lastName === '') {
      setLastNameError(true);
    }
    if (email === '') {
      setEmailError(true);
    }
    if (phoneNumber == '') {
      setPhoneError(true);
    }
    if (password === '') {
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

  const heading = targetItems.title.jsonValue.value.split('<br>');
  // console.log("ggggggggggggggggg",heading)
  console.log(targetItems);
  return (
    <>
      <div className={RegisterCss.container}>
        <div className={RegisterCss.leftContainer}>
          <div className={RegisterCss.leftGrid}>
            <div className={RegisterCss.welcomeText}>
              <div className={RegisterCss.welcomeTextImage}>
                <NextImage
                  field={targetItems?.image?.jsonValue?.value}
                  editable={true}
                  width={50}
                  height={50}
                />
                {/* <NextImage field={starImage}  editable={true} /> */}
              </div>
              <h2 className={RegisterCss.welcomeTextHeading}>
                {heading[0]}
                <br />
                {heading[1]}
              </h2>
              <div className={RegisterCss?.welcomeTextDescription}>
                {targetItems?.description?.jsonValue?.value}
              </div>
            </div>
          </div>{' '}
          {/* <div className={RegisterCss.img}>
            <NextImage field={imageNotFound} editable={true} />
          </div> */}
          <div className={RegisterCss.rightGrid}>
            <div className={RegisterCss.rightGridBox}>
              <div className={RegisterCss.img1}>
                <NextImage
                  field={targetItems?.frameImageList?.targetItems[0]?.image?.jsonValue?.value}
                  height={150}
                  width={150}
                />
              </div>
              <div className={RegisterCss.img2}>
                <NextImage
                  field={targetItems?.frameImageList?.targetItems[1]?.image?.jsonValue?.value}
                  height={150}
                  width={150}
                />
              </div>
              <div className={RegisterCss.img3}>
                <NextImage
                  field={targetItems?.frameImageList?.targetItems[2]?.image?.jsonValue?.value}
                  height={150}
                  width={150}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={RegisterCss.rightContainer}>
          <div className={RegisterCss.formContainer}>
            <form className={RegisterCss.login} onSubmit={(e) => onSubmitHandler(e)}>
              <div className={RegisterCss.loginField}>
                <i className="login__icon fas fa-user"></i>
                <label className={RegisterCss.label}>
                  {targetItems?.firstNameLabel?.jsonValue?.value}
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
                    * This field is mandatory
                  </span>
                )}
              </div>
              <div className={RegisterCss.loginField}>
                <i className="login__icon fas fa-user"></i>
                <label className={RegisterCss.label}>
                  {targetItems?.lastNameLabel?.jsonValue?.value}
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
                    * This field is mandatory
                  </span>
                )}
              </div>
              <div className={RegisterCss.loginField}>
                <i className="login__icon fas fa-user"></i>
                <label className={RegisterCss.label}>
                  {targetItems?.emailLabel?.jsonValue?.value}
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
                    * This field is mandatory
                  </span>
                )}
              </div>
              <div className={RegisterCss.loginField}>
                <i className="login__icon fas fa-user"></i>
                <label className={RegisterCss.label}>
                  {targetItems?.phoneNoLabel?.jsonValue?.value}
                </label>
                <input
                  type="text"
                  onChange={(e) => setPhoneNumberValue(e?.target?.value)}
                  value={phoneNumber}
                  className={RegisterCss.loginInput}
                  // placeholder={targetItems.phoneNoPlaceholder.jsonValue.value}
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
                <label className={RegisterCss.label}>
                  {targetItems?.passwordLabel?.jsonValue?.value}
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
                    * This field is mandatory
                  </span>
                )}
              </div>
              <div className={RegisterCss.loginField}>
                <i className="login__icon fas fa-lock"></i>
                <label className={RegisterCss.label}>
                  {targetItems?.confirmPasswordLabel?.jsonValue?.value}
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
                  error ||
                  firstNameError ||
                  lastNameError ||
                  phoneError ||
                  emailError ||
                  passwordError
                }
              >
                {targetItems.registerBtn.jsonValue.value}
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
              <div className={RegisterCss.text}>
                {targetItems?.haveAccountLabel?.jsonValue?.value}
              </div>
              <div className={RegisterCss.btn}>
                <Link href={'/login'}>{targetItems?.loginBtn?.jsonValue?.value}</Link>
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
