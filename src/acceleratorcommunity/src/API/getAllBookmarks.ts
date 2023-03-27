import Axios, { AxiosResponse } from 'axios';
const getAllBookmarkCall = async (token: string | undefined) => {

  // const token1 = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJjLWhGT2RlWDIyNEdHMmJvWkdTenNxQlpGcnpoWFdEazQzX0pCSzZQRzZ3In0.eyJleHAiOjE2Nzk4OTYzODcsImlhdCI6MTY3OTg5NjI2NywianRpIjoiOWJkYjdiNjktYWM2OS00MzNjLTgwOWQtNjU1NTIzYWVlZmUwIiwiaXNzIjoiaHR0cDovL2FjY2VsZXJhdG9yLWF1dGgtc2VydmljZS1kZXYuZWFzdHVzLmNsb3VkYXBwLmF6dXJlLmNvbTo4MDgwL3JlYWxtcy9hY2NlbGVyYXRvci1yZWFsbSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJjZGE2ZTUzMi1iZDMyLTRhMTQtYmRkZC04NTQzNDY0ZTM5MzgiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhcGktY2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6ImJiMmI5OThiLTQxMWUtNGE5MS05OThiLTUyNTVlZmRhNjg0NyIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1hY2NlbGVyYXRvci1yZWFsbSIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJzaWQiOiJiYjJiOTk4Yi00MTFlLTRhOTEtOTk4Yi01MjU1ZWZkYTY4NDciLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJSb2hpdCBLdW1hciIsInByZWZlcnJlZF91c2VybmFtZSI6ImtyNjI1MjFAZ21haWwuY29tIiwiZ2l2ZW5fbmFtZSI6IlJvaGl0IiwiZmFtaWx5X25hbWUiOiJLdW1hciIsImVtYWlsIjoia3I2MjUyMUBnbWFpbC5jb20ifQ.OK23rUsA1CnCW8JnD2v9f_4r-4tYJTG5A3KgzPpiPEvDLQEz-wsEmp3IkzrnmvbvZ7RSZA6eupV3CRtb7b43LeaKMn5VSau7hvOVZ3Vssbau0ugMV6_n-XGq4AvQv0Ww5KXCdgKc-97gt-p6IvhxF45wOmFjrHH88GzM_6M_BUVzsCRRYICo6Z-EZH3dUmPQFBH7xMbHQy7ezJu4MQH4eM6DTSLaWqnHBd2h2Vt3VKTbIj3TGJ5SK8p72KuWpVkYPoZivyZ-c9nbGCkuiPjjlspqnRwKBsRaDe4b0c2saM15kflFlbiRAN6Yyl5WS3zwo8x7kiTydO9gnt1dojAOEQ";


  let getAllBookmarkURL = `https://accelerator-api-management.azure-api.net/user-service/api/v1/bookmarks`;
  var config = {
    url: getAllBookmarkURL,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  
  const response = await Axios.get<any, AxiosResponse<any>>(getAllBookmarkURL, config)
    .then((response: any) => {
      return response;
    })
    .catch((error: any) => {
      console.error(error);
    });
  return response;
};
export default getAllBookmarkCall;
