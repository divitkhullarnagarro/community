import Axios from "axios";
import qs from "qs";

export interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNo: string;
    speciality: string;
    isEmployeeIDVerifiedByEmailOTP: string;
    objectId: string;
    role: string;
    password: string;
}


const registerUserCall = async (
) => {
    var data = qs.stringify({
        firstName: "Neetesh",
        lastName: "Bhardwaj",
        email: "neetesh.bhardwaj@nagarro.com",
        phoneNo: "+91-8802773141",
        specialit: "Ortho",
        isEmployeeIDVerifiedByEmailOTP: "Y",
        objectId: "postman-331122",
        role: "DOCTOR"
    });
    var config = {
        method: "post",
        url: "http://accelerator-user-service-dev.eastus.cloudapp.azure.com:8080/api/v1/users",
        headers: {
            Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJjLWhGT2RlWDIyNEdHMmJvWkdTenNxQlpGcnpoWFdEazQzX0pCSzZQRzZ3In0.eyJleHAiOjE2Nzc3NTIxMDksImlhdCI6MTY3Nzc1MTgwOSwianRpIjoiNTU1MTFhNTItZjc2Yi00NzQ3LWE3NzEtZTA5NjlmMzBiNjhhIiwiaXNzIjoiaHR0cDovL2FjY2VsZXJhdG9yLWF1dGgtc2VydmljZS1kZXYuZWFzdHVzLmNsb3VkYXBwLmF6dXJlLmNvbTo4MDgwL3JlYWxtcy9hY2NlbGVyYXRvci1yZWFsbSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI2MGFhY2M2Yi02OTIzLTQ5ZmItYjI4Yi1jODI4YWEwNjQwNmUiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhcGktY2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6ImI0NjJlYjhmLTJmYWItNGM3ZC1hZWRhLTQyNGQxNWE0MTI3OCIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1hY2NlbGVyYXRvci1yZWFsbSIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJzaWQiOiJiNDYyZWI4Zi0yZmFiLTRjN2QtYWVkYS00MjRkMTVhNDEyNzgiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6Im5lZXRlc2hiaGFyZHdhaiIsImdpdmVuX25hbWUiOiIiLCJmYW1pbHlfbmFtZSI6IiJ9.vrWkYB_TAE0Xca5IOrXp6iZNLn-fAf_gR8hkkaX9Oj3SBc8176Iyz7yt3U0eSMG6GnPZMeMAog9KwVGUII2GwxaFqkNfEndrGQjF3qYia85Pp3HKKCblUe0N_cC39XUVrzv6WxqhnpCLqzj-8feiCPfAcwi4fSCHK_xQtcBGNYukplQ5nNaSxudAUP-jygomoImqGfLU3GL19nmGYLlEkEQ8nEOOwmFCNGWKwhQJH4fKjtESDquvwJtslC6CUuOowgvWh89UxU3Z9FonGSK8ji6nF232ZtfSl4LwBZMKygbMavIEIRf5wzcRT03z8bBrWpWOAIxLR6Xy5IeMy2N20Q"}`,
        },
    };
    const response = await Axios.post<any>(data, config)
        .then((response: any) => {
            // const users: User[] = response.data;
            console.log("Auth-Response", response);
        })
        .catch((error: any) => {
            console.error(error);
        });
    return response;
};

export default registerUserCall;
