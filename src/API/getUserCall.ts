import Axios, { AxiosResponse } from "axios";

const getUserCall = async (token: string | undefined
    , objectId: string | undefined) => {
    let getUserURL = `https://accelerator-api-management.azure-api.net/user-service/api/v1/users/${objectId}`;
    var config = {
        url: getUserURL,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    const response = await Axios.get<any, AxiosResponse<any>>(getUserURL, config)
        .then((response: any) => {
            return response;
        })
        .catch((error: any) => {
            console.error(error);
        });
    return response;
};

export default getUserCall;
