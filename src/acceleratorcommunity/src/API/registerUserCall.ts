import Axios from "axios";
import loginUserCall from "./loginUserCall";
import qs from "qs";


const getToken = async () => {
    let resp = await loginUserCall("neeteshbhardwaj", "pass");
    console.log("responseTok", resp);
    return resp?.data?.access_token;
};

const registerUserCall = async (registerData: any) => {

    let userToken = await getToken();

    var data = qs.stringify({
        // firstName: "Neetesh",
        // lastName: "Bhardwaj",
        // email: "neetesh.bhardwaj@nagarro.com",
        // phoneNo: "+91-8802773141",
        // specialit: "Ortho",
        // isEmployeeIDVerifiedByEmailOTP: "Y",
        // objectId: "postman-5735",
        // role: "DOCTOR"
        firstName: registerData.firstName,
        lastName: registerData.firstName,
        email: registerData.firstName,
        phoneNo: registerData.firstName,
        specialit: "Ortho",
        isEmployeeIDVerifiedByEmailOTP: "Y",
        objectId: "postman-5736",
        role: "DOCTOR"
    });
    let regURL = "http://accelerator-user-service-dev.eastus.cloudapp.azure.com:8080/api/v1/users";
    var config = {
        // method: "post",
        url: regURL,
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
        data: data
    };
    const response = await Axios.post<any>(regURL, data, config)
        .then((response: any) => {
            // const users: User[] = response.data;
            console.log("register-Response", response);
        })
        .catch((error: any) => {
            console.error(error);
        });
    return response;
};

export default registerUserCall;
