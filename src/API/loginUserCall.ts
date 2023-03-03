import Axios, { AxiosResponse } from "axios";
import qs from "qs";

const loginUserCall = async (email: string, password: string
) => {
    var data = qs.stringify({
        client_id: "api-client",
        client_secret: "UJGyGkpVaplPHXYAyD4nBatcoSNT7Src",
        grant_type: "password",
        username: email,
        password: password
    });
    let logURL = "http://accelerator-auth-service-dev.eastus.cloudapp.azure.com:8080/realms/accelerator-realm/protocol/openid-connect/token";
    var config = {
        // method: "post",
        url: logURL,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
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
