import Axios, { AxiosResponse } from "axios";

const peopleYouMayKnowCall = async (loggedInUserName: string, userToken : string | undefined
) => {
    let URL = `https://accelerator-api-management.azure-api.net/user-service/api/v1/people-you-may-know/${loggedInUserName}`;
    var config = {
        url: URL,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${userToken}`,
        },
    };
    const response = await Axios.get<any, AxiosResponse<any>>(URL, config)
        .then((response: any) => {
            console.log("Response", response);
            return response;
        })
        .catch((error: any) => {
            console.error(error);
        });
    return response;
};

export default peopleYouMayKnowCall;
