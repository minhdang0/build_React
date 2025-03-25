import * as httpRequest from "@/utils/httpRequest";

export const currentUser = async () => {
    const response = await httpRequest.get('/auth/me',{
        headers: `Bearer ${localStorage.getItem('token')}`
    }) ; 
    return response;
}

export default {
    
}