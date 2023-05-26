import Axios, { AxiosResponse } from 'axios';

const upVoteCall = async (userToken: string | undefined, commentId: string) => {
  let addPostURL = `https://accelerator-api-management.azure-api.net/graph-service/api/v1/graph/post/up-vote/${commentId}`;
  var config = {
    url: addPostURL,
    headers: {
      Authorization: `Bearer ${userToken}`,
      'Content-Type': 'application/json',
    },
  };
  const response = await Axios.put<any, AxiosResponse<any>>(addPostURL, {}, config)
    .then((response: any) => {
      // console.log("upVoteCall-Response", response);
      return response;
    })
    .catch((error: any) => {
      console.error(error);
    });
  return response;
};

export default upVoteCall;
