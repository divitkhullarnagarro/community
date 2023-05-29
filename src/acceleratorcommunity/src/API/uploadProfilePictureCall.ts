import Axios, { AxiosResponse } from 'axios';

const UploadProfilePictureCall = async (profileImage: any, userToken: any | undefined) => {
  // console.log("profileImage", profileImage)
  // var data = {
  //     multipleFiles: profileImage
  // };
  const formData = new FormData();
  formData.append('multipleFiles', profileImage);
  let profilePicUrl =
    'https://accelerator-api-management.azure-api.net/user-service/api/v1/users/upload-profile-picture';
  var config = {
    url: profilePicUrl,
    headers: {
      Authorization: `Bearer ${userToken}`,
      'Content-Type': 'multipart/form-data',
    },
    // data: data,
  };
  const response = await Axios.post<any, AxiosResponse<any>>(profilePicUrl, formData, config)
    .then((response: any) => {
      // console.log("imageUrl", data)
      return response;
    })
    .catch((error: any) => {
      // console.log("datatatatatat", data)
      console.error(error);
    });
  return response;
};

export default UploadProfilePictureCall;
