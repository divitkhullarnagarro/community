import Axios, { AxiosResponse } from "axios";

const deletePostCall = async (userToken: string | undefined, id: string
) => {
    let deletePostURL = `https://accelerator-api-management.azure-api.net/graph-service/api/v1/graph/post/${id}`;
    var config = {
        headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
        },
    };
    const response = await Axios.delete<any, AxiosResponse<any>>(deletePostURL, config)
        .then((response: any) => {
            return response;
        })
        .catch((error: any) => {
            console.error(error);
        });
    return response;
};

export default deletePostCall;
