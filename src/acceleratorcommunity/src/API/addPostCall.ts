import Axios, { AxiosResponse } from "axios";
import loginUserCall from './loginUserCall';

const addPostCall = async (
) => {

    let resp = await loginUserCall('demouser', '1234');
    var data = {
        // id: "post_Id12",
        // description: "First Post",
        // postType: "TEXT_POST",
        // createdBy: "objectId",
        // updatedBy: "objectId",
        // createdOn: 0,
        // updatedOn: 0
    };
    let addPostURL = "https://accelerator-api-management.azure-api.net/graph-service/api/v1/graph/post";
    var config = {
        url: addPostURL,
        headers: {
            Authorization: `Bearer ${resp?.data?.data?.access_token}`,
            'Content-Type': 'application/json',
        },
        data: data,
    };
    const response = await Axios.post<any, AxiosResponse<any>>(addPostURL, data, config)
        .then((response: any) => {
            console.log("AddPost-Response", response);
            return response;
        })
        .catch((error: any) => {
            console.error(error);
        });
    return response;
};

export default addPostCall;
