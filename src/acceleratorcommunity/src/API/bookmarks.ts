import Axios, { AxiosResponse } from 'axios';


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
    comment: comment
  };

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
