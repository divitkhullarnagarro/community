import Axios, { AxiosResponse } from "axios";

const likePostCall = async (userToken: string | undefined, id: string
) => {
    let addPostURL = `https://accelerator-api-management.azure-api.net/graph-service/api/v1/graph/post/${id}/likes`;
    var config = {
        url: addPostURL,
        headers: {
            Authorization: `Bearer ${userToken}`,
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
