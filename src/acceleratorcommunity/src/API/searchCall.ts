import Axios, { AxiosResponse } from "axios";

const searchCall = async (searchText: string, contentType: string, token: string | undefined, keywords?: string,
) => {
    // var data = qs.stringify({
    //     // client_id: "api-client",
    //     // client_secret: "UJGyGkpVaplPHXYAyD4nBatcoSNT7Src",
    //     // grant_type: "password",
    //     objectId: email,
    //     password: password
    // });
    var data = {
        searchText: searchText,
        contentType: contentType,
        keywords: keywords,
    };
    let searchURL = "https://accelerator-api-management.azure-api.net/graph-service/search";
    var config = {
        // method: "post",
        url: searchURL,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        data: data,
    };
    const response = await Axios.post<any, AxiosResponse<any>>(searchURL, data, config)
        .then((response: any) => {
            console.log("Auth-Response", response);
            return response;
        })
        .catch((error: any) => {
            console.error(error);
        });
    return response;
};

export default searchCall;
