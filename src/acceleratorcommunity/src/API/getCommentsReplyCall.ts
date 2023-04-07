import Axios, { AxiosResponse } from "axios";

const getCommentsReplyCall = async (token: string | undefined, id: any, number: any
) => {
    // let getAllCommentsReplyURL = `https://accelerator-api-management.azure-api.net/graph-service/api/v1/graph/post/comment/${id}/reply?page=${number}&size=10`;
    let getAllCommentsReplyURL = `https://accelerator-api-management.azure-api.net/graph-service/api/v1/graph/post/comment/${id}/reply`;
    number;
    var config = {
        url: getAllCommentsReplyURL,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    const response = await Axios.get<any, AxiosResponse<any>>(getAllCommentsReplyURL, config)
        .then((response: any) => {
            return response;
        })
        .catch((error: any) => {
            console.error(error);
        });
    return response;
};

export default getCommentsReplyCall;
