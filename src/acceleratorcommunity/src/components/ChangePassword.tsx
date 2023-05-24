import { validatePassword } from 'assets/helpers/validations';
import { useContext, useState } from 'react';
import changepasswordcss from '../assets/changepassword.module.css';
import WebContext from 'src/Context/WebContext';
import darkTheme from '../assets/darkTheme.module.css';
import { Spinner } from 'react-bootstrap';
import ToastNotification from './ToastNotification';
import AxiosRequest from 'src/API/AxiosRequest';
import { useRouter } from 'next/router';
import { getValueFromCookie } from 'assets/helpers/helperFunctions';
import { Text } from '@sitecore-jss/sitecore-jss-nextjs';

const ChangePassword = ({
  formHeading,
  currentPasswordLabel,
  newPasswordLabel,
  confirmPasswordLabel,
  changePasswordBtn,
}: any): JSX.Element => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [currentPasswordError, setCurrentPasswordError] = useState(false);
  const [currentPasswordValidationMessage, setCurrentPasswordValidationMessage] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordValidationMessage, setPasswordValidationMessage] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [confirmPassword, setConformPassword] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const { darkMode } = { ...useContext(WebContext) };

  const [toastSuccess, setToastSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>();
  const [showNotification, setShowNofitication] = useState(false);
  const [toastError, setToastError] = useState(false);

  const router = useRouter();

  const resetToastState = () => {
    setShowNofitication(!showNotification);
    setToastSuccess(false);
    setToastError(false);
  };

  function setCurrentPasswordValue(val: any) {
    if (val === '') {
      setCurrentPasswordError(true);
      setCurrentPasswordValidationMessage(`Password is mandatory`);
    } else {
      setCurrentPasswordValidationMessage('');
      setCurrentPasswordError(false);
    }

    setCurrentPassword(val);
  }

  function setNewPasswordValue(val: any) {
    if (val === '') {
      setPasswordError(true);
      setPasswordValidationMessage(`Password is mandatory`);
    } else {
      if (!validatePassword(val)) {
        setPasswordError(true);
        setPasswordValidationMessage(
          `Password should be minimum of 8 letters with 1 upper, 1 lowercase, 1 digit, 1 special character`
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

    setNewPassword(val);
  }

  function setConfirmPasswordValue(val: any) {
    setConformPassword(val);
    if (newPassword != '') {
      if (newPassword != val) setPasswordMatchError(true);
      else if (newPassword === val) {
        setPasswordMatchError(false);
      }
    } else if (newPassword == '') {
      setPasswordMatchError(false);
    }
  }

  const onSubmitPasswordHandler = async (e: any) => {
    e.preventDefault();
    if (currentPassword === '' || newPassword === '') {
      if (currentPassword === '') {
        setCurrentPasswordError(true);
        setCurrentPasswordValidationMessage('Password is mandatory');
      }

      if (newPassword === '') {
        setPasswordError(true);
        setPasswordValidationMessage('New Password is mandatory');
      }
    } else {
      if (newPassword !== confirmPassword) {
        setPasswordMatchError(true);
      } else {
        try {
          setIsUpdatingPassword(true);
          const data = { currentPassword: currentPassword, newPassword: newPassword };
          AxiosRequest({
            method: 'PUT',
            url: `https://accelerator-api-management.azure-api.net/user-service/api/v1/users/update-password`,
            data: data,
          })
            .then((response: any) => {
              if (response?.success) {
                setToastSuccess(true);
                setToastMessage('Password updated Successfully');
                setShowNofitication(true);
                setIsUpdatingPassword(false);
                let token = getValueFromCookie('UserToken');
                if (token != null) {
                  document.cookie = `UserToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                }
                if (typeof localStorage !== 'undefined' && localStorage.getItem('UserToken')) {
                  localStorage.clear();
                  router.push('/login');
                }
              } else {
                setCurrentPasswordError(true);
                setCurrentPasswordValidationMessage(response?.errorMessages[0]);
                setIsUpdatingPassword(false);
              }
            })
            .catch((err: any) => {
              console.log('PasswordErr', err);
            });
        } catch (err: any) {
          setToastError(true);
          setToastMessage(err?.message ?? 'Something went wrong');
          setShowNofitication(true);
          setIsUpdatingPassword(false);
        }
      }
    }
  };

  return (
    <div className={changepasswordcss.changePasswordContainer}>
      <form
        className={changepasswordcss.changepassword}
        onSubmit={(e) => onSubmitPasswordHandler(e)}
      >
        <div className={changepasswordcss.changepasswordHeader}>
          <Text
            field={
              formHeading?.jsonValue
                ? formHeading?.jsonValue
                : {
                    value: 'Change your current password',
                  }
            }
          />
        </div>
        <div className={changepasswordcss.changepasswordField}>
          <i className={changepasswordcss['login__icon fas fa-user']}></i>
          <label className={`${changepasswordcss.label} ${darkMode && darkTheme.text_light}`}>
            <Text
              field={
                currentPasswordLabel?.jsonValue
                  ? currentPasswordLabel?.jsonValue
                  : {
                      value: 'Current Password',
                    }
              }
            />
          </label>
          <input
            onChange={(e) => setCurrentPasswordValue(e.target.value)}
            value={currentPassword}
            type="password"
            className={changepasswordcss.changepasswordInput}
            placeholder={'Enter current Password'}
          />
          {currentPasswordError ? (
            <span className={changepasswordcss.validationmessage}>
              {currentPasswordValidationMessage}
            </span>
          ) : (
            ''
          )}
        </div>
        <div className={changepasswordcss.changepasswordField}>
          <i className={changepasswordcss['login__icon fas fa-user']}></i>
          <label className={`${changepasswordcss.label} ${darkMode && darkTheme.text_light}`}>
            <Text
              field={
                newPasswordLabel?.jsonValue
                  ? newPasswordLabel?.jsonValue
                  : {
                      value: 'New Password',
                    }
              }
            />
          </label>
          <input
            onChange={(e) => setNewPasswordValue(e.target.value)}
            value={newPassword}
            type="password"
            className={changepasswordcss.changepasswordInput}
            placeholder={'Enter new Password'}
          />
          {passwordError ? (
            <span className={changepasswordcss.validationmessage}>{passwordValidationMessage}</span>
          ) : (
            ''
          )}
        </div>
        <div className={changepasswordcss.changepasswordField}>
          <i className={changepasswordcss['login__icon fas fa-lock']}></i>
          <label className={`${changepasswordcss.label} ${darkMode && darkTheme.text_light}`}>
            <Text
              field={
                confirmPasswordLabel?.jsonValue
                  ? confirmPasswordLabel?.jsonValue
                  : {
                      value: 'Confirm Password',
                    }
              }
            />
          </label>
          <input
            onChange={(e) => setConfirmPasswordValue(e.target.value)}
            value={confirmPassword}
            type="password"
            className={changepasswordcss.changepasswordInput}
            placeholder={'Confirm Password'}
          />
          {passwordMatchError ? (
            <span className={changepasswordcss.validationmessage}>{'Password does not match'}</span>
          ) : (
            ''
          )}
        </div>
        <button
          className={changepasswordcss.formButton}
          disabled={currentPasswordError || passwordError || passwordMatchError}
        >
          {isUpdatingPassword ? (
            <span className={changepasswordcss.spinnerContainer}>
              <Spinner className={changepasswordcss.spinner} animation="border" />
            </span>
          ) : (
            <Text
              field={
                changePasswordBtn?.jsonValue
                  ? changePasswordBtn?.jsonValue
                  : {
                      value: 'Change Password',
                    }
              }
            />
          )}
          <i className={changepasswordcss['button__icon fas fa-chevron-right']}></i>
        </button>
      </form>
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
  );
};

export default ChangePassword;
