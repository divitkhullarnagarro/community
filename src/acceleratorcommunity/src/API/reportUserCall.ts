const reportUserCall = async (reportUserId : string | undefined, reportReason : string,  userToken : string | undefined    ) => {
        
        console.log(reportUserId, reportReason, userToken);
        return true;
    };

export default reportUserCall;