import Axios, { AxiosResponse } from "axios";

const getCommentsCall = async (token: string | undefined, id: any, number: any
) => {
    // let getAllCommentsURL = `https://accelerator-api-management.azure-api.net/graph-service/api/v1/graph/post/${id}/comment?page=${number}&size=10`;
    let getAllCommentsURL = `https://accelerator-api-management.azure-api.net/graph-service/api/v1/graph/post/${id}/comment`;
    number;
    var config = {
        url: getAllCommentsURL,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    const response = await Axios.get<any, AxiosResponse<any>>(getAllCommentsURL, config)
        .then((response: any) => {
            return response;
        })
        .catch((error: any) => {
            console.error(error);
        });
    return response;
};

export default getCommentsCall;
