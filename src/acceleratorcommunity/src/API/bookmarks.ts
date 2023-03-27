import Axios, { AxiosResponse } from 'axios';
import qs from 'qs';

const bookmark = async (
  objectId:string,
  contentId: string,
  // url:string,
  title: string,
  comment: string | undefined,
  userToken: string | undefined
  // , url:string
) => {
  var data = {
    objectId: objectId,
    contentId: contentId,
    // url:url,
    title: title,
    comment: comment,
  };
  // const token1 ="eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJjLWhGT2RlWDIyNEdHMmJvWkdTenNxQlpGcnpoWFdEazQzX0pCSzZQRzZ3In0.eyJleHAiOjE2Nzk5MTAyMTYsImlhdCI6MTY3OTkxMDA5NiwianRpIjoiMjFhZTQxMjEtNTk4Mi00M2FjLWE3ODktMWY4MGRkMzFkYWQyIiwiaXNzIjoiaHR0cDovL2FjY2VsZXJhdG9yLWF1dGgtc2VydmljZS1kZXYuZWFzdHVzLmNsb3VkYXBwLmF6dXJlLmNvbTo4MDgwL3JlYWxtcy9hY2NlbGVyYXRvci1yZWFsbSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJkMzJkMWRiYS0yZTVkLTQxYjMtYmU2Yi0xZTIxMDhkZGIwZTAiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhcGktY2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6Ijg0ZTEzNGZhLTZhMDAtNDMxMC05MDdkLTI0MTI5NGZjOGFmYSIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1hY2NlbGVyYXRvci1yZWFsbSIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4NGUxMzRmYS02YTAwLTQzMTAtOTA3ZC0yNDEyOTRmYzhhZmEiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJhbmkgc2luZ2giLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhQGdtYWlsLmNvbSIsImdpdmVuX25hbWUiOiJhbmkiLCJmYW1pbHlfbmFtZSI6InNpbmdoIiwiZW1haWwiOiJhQGdtYWlsLmNvbSJ9.v1SY788Wz9NeyuWHEdR5jQJ_IxXH4fb9gpVwejkdNo0rrsKSg5cRxmUOpsiuJ3gvapJRjsHg10RiTYGx3b2MxYrr6CUbe18ugrrdA_8YWx-Q6AkLSicbzAO_mERyFsB1EMROaLKx-VvLH9eoZgliF_w2oMHyBE3tPaOnE6YKbbWCdZKjfdROE_YaQrCJt9_7Wacwm6BIlDseDe_LcvNRbfs4neJye5r9pbdsfQ0EEjd5ZDfYRluDntY-EzYEny68QqEXi6nvIJbwvsMGsBzzwKYGfLyF_1g77-1qUi63_SooC0nIAGuXyPjU1K0_jP2cHoT_1GJ_FcU9848R2wlyCw"

  let URL = `https://accelerator-api-management.azure-api.net/user-service/api/v1/bookmarks/save`;
  var config = {
    url: URL,
    headers: {
      Authorization: `Bearer ${userToken}`,
      'Content-Type': 'application/json',
    },
    data: data,
  };
  const response = await Axios.post<any, AxiosResponse<any>>(URL,data, config)
    .then((response: any) => {
      console.log('Added to you Collection', response);
      return response?.data;
    })
    .catch((error: any) => {
      console.error(error);
    });
  return response;
};
export default bookmark;
