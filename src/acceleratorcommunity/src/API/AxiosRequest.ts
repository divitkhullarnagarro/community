import axios, { AxiosRequestConfig } from 'axios';
import { decryptString } from '../assets/helpers/EncryptDecrypt';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Headers = { [key: string]: string };

interface RequestConfig extends AxiosRequestConfig {
  method: Method;
  url: string;
  headers?: Headers;
  data?: any;
  params?: any;
  contentType?: string;
}

async function AxiosRequest<T>(config: RequestConfig): Promise<T> {
  const { method, url, headers, data, params, contentType } = config;

  // Get the authorization token from the localStorage and Decrypt
  let token = '' as any;
  if (typeof localStorage !== 'undefined') {
    token = localStorage.getItem('UserToken');
    token ? (token = decryptString(token)) : '';
  }

  try {
    const response = await axios({
      method,
      url,
      headers: {
        // Always include the authorization header with the bearer token
        ...(headers || {}),
        'Content-Type': contentType || 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data,
      params,
    });
    // console.log('errorincall', response);
    return response.data;
  } catch (error: any) {
    // console.log('errorincall', error);
    return error.response;
  }

  //   return Promise.reject('API Call Failed !');
}

export default AxiosRequest;
