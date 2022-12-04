import axiosInstance from '../../utils/axios';
import {constants} from '../../utils/constants';

export const getCategoriesForHomePage = async () => {
    const response = axiosInstance.get(constants.API_CATEGORIES);
    return response;
}

export const getProductsForHomePage = async () => {
    const response = axiosInstance.get(constants.API_PRODUCTS);
    return response;
}

// t tân
export const getProductInCategory = async (id) => {
    const response = axiosInstance.get(`${constants.API_CATEGORIES}/${id}`);
    return response;
}

export const getOneProduct = async (id) => {
    const response = axiosInstance.get(`${constants.API_PRODUCTS}/${id}`);
    return response;
}

export const getOneSizeProduct = async (id, slug) => {
    const response = axiosInstance.get(`${constants.API_PRODUCTS}/${id}/${slug}`);
    return response;
}

export const saveCart = async (id, slug, user_id) => {
    const data = {
        user_id: user_id
    }
    const response = axiosInstance.post(`${constants.API_PRODUCTS}/${id}/${slug}/save`, data);
    return response;
}



