import Axios, { AxiosResponse } from "axios";

const getAllPostCall = async (token: string | undefined
    , id: string) => {
    let getAllPostURL = `https://accelerator-api-management.azure-api.net/graph-service/api/v1/graph/post/${id}`;
    var config = {
        url: getAllPostURL,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    const response = await Axios.get<any, AxiosResponse<any>>(getAllPostURL, config)
        .then((response: any) => {
            return response;
        })
        .catch((error: any) => {
            console.error(error);
        });
    return response;
};

export default getAllPostCall;
