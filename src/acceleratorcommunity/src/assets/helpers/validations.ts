export const validateEmail = (email: string) => {
  var re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const validatePhone = (phone: string) => {
  var re = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
  return re.test(phone);
};
export const validateEmailOrPhone = (emailOrPhone: string) => {
  return validateEmail(emailOrPhone) ? true : validatePhone(emailOrPhone) ? true : false;
};

export const validatePassword = (password: string) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

export const numberOnly = (value: string) => {
  const regex = /^\d+$/;
  return regex.test(value);
};

export const alphabateAndSpaceChecker = (val: any, fieldName: string) => {
  const temp = { error: false, errorMessage: '' };
  if (val === '') {
    temp.error = true;
    temp.errorMessage = `${fieldName} is Required`;
  } else if (/^[a-zA-Z ]*$/.test(val)) {
    temp.error = false;
    temp.errorMessage = '';
  } else {
    temp.error = true;
    temp.errorMessage = `Enter Valid ${fieldName}`;
  }
  return temp;
};

export const validatePhoneNumber = (val: any, fieldName: string) => {
  const temp = { error: false, errorMessage: '' };
  if (val === '') {
    temp.error = true;
    temp.errorMessage = `${fieldName} is Required`;
  } else if (val.length < 10) {
    temp.error = true;
    temp.errorMessage = `${fieldName} should have 10 digits`;
  } else if (!validatePhone(val)) {
    temp.error = true;
    temp.errorMessage = `Enter Valid ${fieldName}`;
  } else {
    temp.error = false;
    temp.errorMessage = '';
  }
  return temp;
};
