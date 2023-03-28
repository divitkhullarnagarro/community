import Axios, { AxiosResponse } from "axios";

const followCall = async (userName: string, userToken : string | undefined
) => {
    let URL = `https://accelerator-api-management.azure-api.net/graph-service/api/v1/graph/follow/${userName}`;
    var config = {
        url: URL,
        headers: {
             Authorization: `Bearer ${userToken}`,
        },
    };
    const response = await Axios.post<any, AxiosResponse<any>>(URL, null, config)
        .then((response: any) => {
            console.log("followUnfollow", response);
            return response?.data;
        })
        .catch((error: any) => {
            console.error(error);
        });

    return response;
};

export default followCall;


export const UnfollowCall = async (userName: string, userToken : string | undefined
    ) => {
        let URL = `https://accelerator-api-management.azure-api.net/graph-service/api/v1/graph/unfollow/${userName}`;
        var config = {
            url: URL,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                 Authorization: `Bearer ${userToken}`,
            },
        };
        const response = await Axios.post<any, AxiosResponse<any>>(URL, null, config)
            .then((response: any) => {
                console.log("followUnfollow", response);
                return response;
            })
            .catch((error: any) => {
                console.error(error);
            });
        return response?.data;
};
    