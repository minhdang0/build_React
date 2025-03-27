import * as httpRequest from "@/utils/httpRequest";

export const getAll = async () => {
    const response = await httpRequest.get('/products') ; 
    return response;
}

export const getOne = async (id) => {
    const response = await httpRequest.get(`/products/${id}`) ; 
    return response;
}


export default {
    getAll,
    getOne
}