import Axios, { AxiosResponse } from "axios";

const blockUserCall = async (userToken : string | undefined, blockUserObjectId : string | undefined
) => {
    let URL = `https://accelerator-api-management.azure-api.net/graph-service/api/v1/graph/block-user?targetObjectId=${blockUserObjectId}`;
    var config = {
        url: URL,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${userToken}`,
        },
    };
    const response = await Axios.post<any, AxiosResponse<any>>(URL, null, config)
        .then((response: any) => {
            return response?.data;
        })
        .catch((error: any) => {
            return error?.response?.data;;
        });
        
    return response;
};

export const unBlockUserCall = async (userToken : string | undefined, unBlockUserObjectId : string | undefined
    ) => {
        let URL = `https://accelerator-api-management.azure-api.net/graph-service/api/v1/graph/unblock-user?targetObjectId=${unBlockUserObjectId}`;
        var config = {
            url: URL,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${userToken}`,
            },
        };
        const response = await Axios.post<any, AxiosResponse<any>>(URL, null, config)
            .then((response: any) => {
                return response?.data;
            })
            .catch((error: any) => {
                console.error(error);
            });
            
        return response;
    };

export const getBlockedUserList = async (userToken : string | undefined) => {
    let URL = `https://accelerator-api-management.azure-api.net/graph-service/api/v1/graph/blocked-users`;
    var config = {
        url: URL,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
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

export default blockUserCall;
