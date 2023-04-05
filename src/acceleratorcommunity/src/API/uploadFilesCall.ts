import Axios, { AxiosResponse } from "axios";

const uploadFilesCall = async (userToken: string | undefined, fileObject: any, postType: string
) => {
    let uploadFileURL = `https://accelerator-api-management.azure-api.net/graph-service/api/v1/graph/post/upload-file`;
    // let data = {
    //     multipleFiles: fileObject,
    //     postType: postType
    // };

    const formData = new URLSearchParams();
    formData.append('multipleFiles', fileObject);
    formData.append('postType', postType);

    var config = {
        url: uploadFileURL,
        headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    };
    const response = await Axios.post<any, AxiosResponse<any>>(uploadFileURL, formData.toString(), config)
        .then((response: any) => {
            return response;
        })
        .catch((error: any) => {
            console.error(error);
        });
    return response;
};

export default uploadFilesCall;
