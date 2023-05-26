import Axios, { AxiosResponse } from 'axios';

const uploadFilesCall = async (
  userToken: string | undefined,
  fileObject: any,
  postType: string
) => {
  let uploadFileURL = `https://accelerator-api-management.azure-api.net/graph-service/api/v1/graph/post/upload-file?postType=${postType}`;
  // let data = {
  //     multipleFiles: fileObject,
  //     postType: postType
  // };

  const formData = new FormData();
  formData.append('multipleFiles', fileObject);

  var config = {
    url: uploadFileURL,
    headers: {
      Authorization: `Bearer ${userToken}`,
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent: { loaded: number; total: number }) => {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      // console.log(`Upload progress: ${percentCompleted}%`);
      percentCompleted;
    },
  };
  const response = await Axios.post<any, AxiosResponse<any>>(uploadFileURL, formData, config)
    .then((response: any) => {
      return response;
    })
    .catch((error: any) => {
      console.error(error);
    });
  return response;
};

export default uploadFilesCall;
