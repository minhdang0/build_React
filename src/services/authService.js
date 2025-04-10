import * as httpRequest from "@/utils/httpRequest";

export const currentUser = async () => {
    const response = await httpRequest.get('/auth/me',) ; 
    return response;
}

export const login = async(data) => {   
    const response = await httpRequest.post('/auth/login', data)
   
    return response;
}

export const register = async (data) => {
    const response = await httpRequest.post('/auth/register',data);
    console.log(response)
    return response;
};

export default {
    currentUser,
    login,
    register
}