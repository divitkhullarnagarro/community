import {
  addAllPeersUrl,
  addPeersBySearchUrl,
  addPeersPaginationUrl,
} from 'assets/helpers/constants';
import Axios, { AxiosResponse } from 'axios';

const allPeersCall = async (userToken: string | undefined) => {
  var config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await Axios.get<any, AxiosResponse<any>>(addAllPeersUrl, config);
    return response;
  } catch (e) {
    // if (typeof e === 'string') {
    //   console.log('getAllPears', e.toUpperCase());
    // } else if (e instanceof Error) {
    //   console.log('getAllPears', e.message);
    // }
    return {
      data: { data: [] },
    };
  }
};

export default allPeersCall;

export const peerBySearchCall = async (userToken: string, keyword: string) => {
  let URL = `${addPeersBySearchUrl}${keyword}`;

  var config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
      'Content-Type': 'application/json',
    },
  };
  const response = await Axios.get<any, AxiosResponse<any>>(URL, config);
  return response;
};

export const updatePasswordCall = async (userToken: string, page: number, size: number) => {
  let URL = `${addPeersPaginationUrl}page=${page}&size=${size}`;
  var config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
      'Content-Type': 'application/json',
    },
  };
  const response = await Axios.get<any, AxiosResponse<any>>(URL, config);
  return response;
};
