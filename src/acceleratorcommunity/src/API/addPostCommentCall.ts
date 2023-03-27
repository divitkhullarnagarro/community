import Axios, { AxiosResponse } from "axios";

const addPostCommentCall = async (userToken: string | undefined, id: string
) => {
    let addPostURL = `https://accelerator-api-management.azure-api.net/graph-service/api/v1/graph/post/${id}/comment`;
    var config = {
        url: addPostURL,
        headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
        },
    };

    let data = {
        id: "string", text: "string"
    }
    const response = await Axios.post<any, AxiosResponse<any>>(addPostURL, data, config)
        .then((response: any) => {
            console.log("AddComment-Response", response);
            return response;
        })
        .catch((error: any) => {
            console.error(error);
        });
    return response;
};

export default addPostCommentCall;
