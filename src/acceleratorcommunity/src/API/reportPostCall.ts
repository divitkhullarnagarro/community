import Axios, { AxiosResponse } from "axios";

const reportPostCall = async (reportPostId : string, reportType : string, reportReason : string,  userToken : string | undefined
) => {
    console.log(reportPostId);
    let URL = `https://accelerator-api-management.azure-api.net/graph-service/api/v1/graph/report/`;
    var data = {
        sourceId:reportPostId,
        sourceType:reportType,
        reason:reportReason,
    };
    var config = {
        url: URL,
        headers: {
             Authorization: `Bearer ${userToken}`,
        },
        data: data,
    };
    const response = await Axios.post<any, AxiosResponse<any>>(URL, null, config)
        .then((response: any) => {
            console.log("reportPostAPIResponse", response);
            return response?.data;
        })
        .catch((error: any) => {
            console.error(error);
        });

    return response;
};

export default reportPostCall;