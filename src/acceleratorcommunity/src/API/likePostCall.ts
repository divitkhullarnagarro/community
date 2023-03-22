import Axios, { AxiosResponse } from "axios";
import loginUserCall from './loginUserCall';

const likePostCall = async (id: any
) => {

    let resp = await loginUserCall('nishantemail@gmail.com', 'Nishant1@');
    let addPostURL = `https://accelerator-api-management.azure-api.net/graph-service/api/v1/graph/post/${id}/likes`;
    var config = {
        url: addPostURL,
        headers: {
            Authorization: `Bearer ${resp?.data?.data?.access_token}`,
            'Content-Type': 'application/json',
        },
    };
    const response = await Axios.post<any, AxiosResponse<any>>(addPostURL, {}, config)
        .then((response: any) => {
            console.log("LikePost-Response", response);
            return response;
        })
        .catch((error: any) => {
            console.error(error);
        });
    return response;
};

export default likePostCall;
