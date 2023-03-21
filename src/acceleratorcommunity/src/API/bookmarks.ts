import Axios, { AxiosResponse } from "axios";
import qs from "qs";

const bookmark = async (objectId: string, contentId:string, title:string, comment:string| undefined, userToken : string | undefined
    // , url:string
) => {


    // This is temporary token for Value Cheacking 

    
    // const userToken1 = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJjLWhGT2RlWDIyNEdHMmJvWkdTenNxQlpGcnpoWFdEazQzX0pCSzZQRzZ3In0.eyJleHAiOjE2Nzg4NzM3MzUsImlhdCI6MTY3ODg3MzQzNSwianRpIjoiZjQ0ZWFhYTYtNDU4NS00YWU5LThiMjItODBkMTQ2M2E4YWFjIiwiaXNzIjoiaHR0cDovL2FjY2VsZXJhdG9yLWF1dGgtc2VydmljZS1kZXYuZWFzdHVzLmNsb3VkYXBwLmF6dXJlLmNvbTo4MDgwL3JlYWxtcy9hY2NlbGVyYXRvci1yZWFsbSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI3M2EzMjJlNC1hMDUyLTQ3MWUtYjI2My00ZjY5MmE5Zjc4ZWMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhcGktY2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6IjFlNzg2MDE0LWRhM2UtNDM0OS04ZjVhLWM3YjkyODVmZGVmOSIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1hY2NlbGVyYXRvci1yZWFsbSIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJzaWQiOiIxZTc4NjAxNC1kYTNlLTQzNDktOGY1YS1jN2I5Mjg1ZmRlZjkiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJ0ZXN0MSB0ZXN0MSIsInByZWZlcnJlZF91c2VybmFtZSI6InRlc3QxQHRlc3QxLmNvbSIsImdpdmVuX25hbWUiOiJ0ZXN0MSIsImZhbWlseV9uYW1lIjoidGVzdDEiLCJlbWFpbCI6InRlc3QxQHRlc3QxLmNvbSJ9.IJMKJt55vM2Ig2YJxINnUQ25_91Jgt1iE6K39zz6cCD0uJhGjNYQdt-jqQlHTHl7eMwVj0yyY0XrU9a_XfzCPYdDW3sepCq58bogwdtiRQCGClIvC-IitDJsFserhnwhsJiwyG0FEeMsoX5nN5l_0NqgnFB9t43uyNlSID4oYoL8qUI3VDOEsqoNc1PAJEdVhik0q4BL8H8NO9OBb4V_YcjOdH2VGkEa5rZ_RjBMzr-3H5JXSkVP6BF7JOLgasQ6lwnqiLb-ScfNQnh03xki6DvhSxjOf1xyZHVEwaYNofThv_M36QOkHdfhiQXc7-vHTvLqXqsh_fgj6COsSLSeaw";

    var data = qs.stringify({
        objectId: objectId,
        contentId: contentId,
        // url:url,
        title:title,
        comment:comment
        
    })

    let URL = `https://accelerator-api-management.azure-api.net/user-service/api/v1/bookmarks/save/`;
    var config = {
        // url: URL,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
             Authorization: `Bearer ${userToken}`,
        },
        data: data,
    };
    const response = await Axios.post<any, AxiosResponse<any>>(URL, config)
        .then((response: any) => {
            console.log("Added to you Collection", response);
            return response?.data;
        })
        .catch((error: any) => {
            console.error(error);
        });
    return response;
};
export default bookmark;