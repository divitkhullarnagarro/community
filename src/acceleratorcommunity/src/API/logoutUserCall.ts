import Axios, { AxiosResponse } from 'axios';
import { LogoutUrl } from 'assets/helpers/constants';

const logoutUserCall = async () => {
  var config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  var data = {
    accessToken: '',
    refreshToken: '',
  };

  const response = await Axios.post<any, AxiosResponse<any>>(LogoutUrl, data, config)
    .then((response: any) => {
      // console.log("Auth-Response", response);
      return response;
    })
    .catch((error: any) => {
      console.error(error);
    });

  return response;
};

export default logoutUserCall;
