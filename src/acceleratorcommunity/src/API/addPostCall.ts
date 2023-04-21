import Axios, { AxiosResponse } from 'axios';

const addPostCall = async (userToken: string | undefined, postObject: any) => {
  var data = {
    // id: "post_Id12",
    description: postObject?.description,
    mediaList: postObject?.mediaList,
    postType: postObject?.type,
    taggedPeers: postObject?.taggedPeers,
    event: postObject?.event,
    poll: postObject?.poll,
    createdBy: 'objectId',
    updatedBy: 'objectId',
    createdOn: 23032023,
    updatedOn: 23032023,
  };
  let addPostURL =
    'https://accelerator-api-management.azure-api.net/graph-service/api/v1/graph/post';
  var config = {
    url: addPostURL,
    headers: {
      Authorization: `Bearer ${userToken}`,
      'Content-Type': 'application/json',
    },
    data: data,
  };
  const response = await Axios.post<any, AxiosResponse<any>>(addPostURL, data, config)
    .then((response: any) => {
      return response;
    })
    .catch((error: any) => {
      console.error(error);
    });
  return response;
};

export default addPostCall;
