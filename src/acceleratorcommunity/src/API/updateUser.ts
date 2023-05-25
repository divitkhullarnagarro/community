import Axios, { AxiosResponse } from "axios";

const updateUuserCall = async (token: string | undefined
    , objectId: string | undefined, data: any) => {
    let getUserURL = `https://accelerator-api-management.azure-api.net/user-service/api/v1/users/${objectId}`;
    var config = {
        url: getUserURL,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        data: data
    };
    const response = await Axios.put<any, AxiosResponse<any>>(getUserURL, data, config)
        .then((response: any) => {
            console.log("response", response)
            return response;
        })
        .catch((error: any) => {
            console.error(error);
        });
    return response;
};

export default updateUuserCall;
