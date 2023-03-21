import Axios, { AxiosResponse } from "axios";

const loginUserCall = async (email: string, password: string
) => {
    // var data = qs.stringify({
    //     // client_id: "api-client",
    //     // client_secret: "UJGyGkpVaplPHXYAyD4nBatcoSNT7Src",
    //     // grant_type: "password",
    //     objectId: email,
    //     password: password
    // });
    var data = {
        objectId: email,
        password: password
    };
    let logURL = "https://accelerator-api-management.azure-api.net/user-service/api/v1/login";
    var config = {
        // method: "post",
        url: logURL,
        headers: {
            "Content-Type": "application/json",
        },
        data: data,
    };
    const response = await Axios.post<any, AxiosResponse<any>>(logURL, data, config)
        .then((response: any) => {
            console.log("Auth-Response", response);
            return response;
        })
        .catch((error: any) => {
            console.error(error);
        });
    return response;
};

export default loginUserCall;
