import Axios from 'axios';

const registerUserCall = async (registerData: any) => {
  var data = {
    firstName: registerData.firstName,
    lastName: registerData.lastName,
    email: registerData.email,
    phoneNo: registerData.phoneNumber,
    speciality: 'USER',
    isEmployeeIDVerifiedByEmailOTP: 'N',
    role: 'USER',
    password: registerData.password,
  };
  let regURL = 'https://accelerator-api-management.azure-api.net/user-service/api/v1/users';
  var config = {
    url: regURL,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };
  const response = await Axios.post<any>(regURL, data, config)
    .then((response: any) => {
      return response;
    })
    .catch((error: any) => {
      console.error('gottheerror', error.response);
      return error.response;
    });
  return response;
};
export default registerUserCall;
