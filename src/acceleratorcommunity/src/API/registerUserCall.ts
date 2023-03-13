import Axios from 'axios';
import loginUserCall from './loginUserCall';

const registerUserCall = async (registerData: any) => {

  let resp = await loginUserCall('demouser', '1234');

  var data = {
    // firstName: "Neetesh",
    // lastName: "Bhardwaj",
    // email: "neetesh.bhardwaj@nagarro.com",
    // phoneNo: "+91-8802773141",
    // specialit: "Ortho",
    // isEmployeeIDVerifiedByEmailOTP: "Y",
    // objectId: "postman-5735",
    // role: "DOCTOR"
    firstName: registerData.firstName,
    lastName: registerData.firstName,
    email: registerData.firstName,
    phoneNo: registerData.firstName,
    speciality: 'Ortho',
    isEmployeeIDVerifiedByEmailOTP: 'Y',
    objectId: 'postman-5736',
    role: 'DOCTOR',
  };
  let regURL = 'http://accelerator-user-service-dev.eastus.cloudapp.azure.com:8080/api/v1/users';
  var config = {
    // method: "post",
    url: regURL,
    headers: {
      Authorization: `Bearer ${resp?.data?.data?.access_token}`,
      'Content-Type': 'application/json',
    },
    data: data,
  };
  const response = await Axios.post<any>(regURL, data, config)
    .then((response: any) => {
      console.log('register-Response', response);
      return response;
    })
    .catch((error: any) => {
      console.error(error);
    });
  return response;
};
export default registerUserCall;
