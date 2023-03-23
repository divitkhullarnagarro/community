import { sendOTPUrl, updatePasswordUrl, validateOtpUrl } from 'assets/helpers/constants';
import Axios, { AxiosResponse } from 'axios';

const sendOtpCall = async (email: string) => {
  let URL = `${sendOTPUrl}${email}`;

  var config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = await Axios.get<any, AxiosResponse<any>>(URL, config);
  console.log('response', response);
  return response;
};
export default sendOtpCall;
export const validateOtpCall = async (email: string, otp: string) => {
  let URL = `${validateOtpUrl}${email}?otp=${otp}`;

  var config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = await Axios.get<any, AxiosResponse<any>>(URL, config);
  console.log('response', response);
  return response;
};
export const updatePasswordCall = async (email: string, password: string) => {
  const data = {
    password: password,
    objectId: email,
  };

  var config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = await Axios.put<any, AxiosResponse<any>>(updatePasswordUrl, data, config);
  console.log('response', response);
  return response;
};
