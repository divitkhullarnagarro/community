import Axios, { AxiosResponse } from "axios";

const reportUserCall = async (reportUserId : string | undefined, reportReason : string,  userToken : string | undefined    ) => {
        
    console.log(reportUserId, reportReason, userToken);
    let URL = `https://accelerator-api-management.azure-api.net/graph-service/api/v1/graph/report-user`
    var data = {
        reportedObjectId:reportUserId,
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
            console.log("reportUserAPIResponse", response);
            return response?.data;
        })
        .catch((error: any) => {
            return error?.response?.data;
        });

    return response;
};


export const getAllReportUserCall = async (userToken : string | undefined) => {
    let URL = `https://accelerator-api-management.azure-api.net/graph-service/api/v1/graph/reported-users`;
    var config = {
        url: URL,
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
    };
    const response = await Axios.get<any, AxiosResponse<any>>(URL, config)
        .then((response: any) => {
            return response?.data;
        })
        .catch((error: any) => {
            console.error(error);
        });
    
    return response;
};

export const getReportedUserReportersDetailsCall = async (userToken : string | undefined, reportedUserId : string) => {
    let URL = `https://accelerator-api-management.azure-api.net/graph-service/api/v1/graph/reported-user-reason/${reportedUserId}`;
    var config = {
        url: URL,
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
    };
    const response = await Axios.get<any, AxiosResponse<any>>(URL, config)
        .then((response: any) => {
            console.log("reportUserReportersDetailsResponse", response);
            return response?.data;
        })
        .catch((error: any) => {
            console.error(error);
        });
    
    return response;
};

export default reportUserCall;