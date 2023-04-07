import Axios, { AxiosResponse } from "axios";

const postCommentReplyCall = async (userToken: string | undefined, postId: string, commentId: string, comment: string
) => {
    let addCommentReplyURL = `https://accelerator-api-management.azure-api.net/graph-service/api/v1/graph/post/${postId}/comment`;
    var config = {
        url: addCommentReplyURL,
        headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
        },
    };
    let data = {
        text: comment,
        parentId: commentId
    }
    const response = await Axios.post<any, AxiosResponse<any>>(addCommentReplyURL, data, config)
        .then((response: any) => {
            return response;
        })
        .catch((error: any) => {
            console.error(error);
        });
    return response;
};

export default postCommentReplyCall;
