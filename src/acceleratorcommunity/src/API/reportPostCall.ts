import Axios, { AxiosResponse } from "axios";

const reportPostCall = async (reportPostId : string, reportType : string, reportReason : string,  userToken : string | undefined
) => {

    let URL = `https://accelerator-api-management.azure-api.net/graph-service/api/v1/graph/post/report`
    var data = {
        sourceId:reportPostId,
        sourceType:reportType,
        reason:reportReason,
        others : ""
    };
    var config = {
        url: URL,
        headers: {
             Authorization: `Bearer ${userToken}`,
             'Content-Type': 'application/json',
        },
        data: data,
    };
    const response = await Axios.post<any, AxiosResponse<any>>(URL, data, config)
        .then((response: any) => {
            console.log("reportPostAPIResponse", response);
            return response?.data;
        })
        .catch((error: any) => {
            return error?.response?.data;
        });

    return response;
};

export const getAllReportPostCall = async (userToken : string | undefined) => {
    let URL = `https://accelerator-api-management.azure-api.net/graph-service/api/v1/graph/post/reported-posts`;
    var config = {
        url: URL,
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
    };
    const response = await Axios.get<any, AxiosResponse<any>>(URL, config)
        .then((response: any) => {
            console.log("reportPostGetAllAPIResponse", response);
            return response?.data;
        })
        .catch((error: any) => {
            console.error(error);
        });
    
    return response;
};

export const getReportedPostReportersDetailsCall = async (userToken : string | undefined, postId : string) => {
    let URL = `https://accelerator-api-management.azure-api.net/graph-service/api/v1/graph/post/reporters/${postId}`;
    var config = {
        url: URL,
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
    };
    const response = await Axios.get<any, AxiosResponse<any>>(URL, config)
        .then((response: any) => {
            console.log("reportPostReportersDetailsResponse", response);
            return response?.data;
        })
        .catch((error: any) => {
            console.error(error);
        });
    
    return response;
};

export default reportPostCall;