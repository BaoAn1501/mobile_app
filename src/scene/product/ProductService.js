import axiosInstance from '../../utils/axios';
import {constants} from '../../utils/constants';

export const getCategoriesForHomePage = async () => {
    const response = axiosInstance.get(constants.API_CATEGORIES);
    console.log('run categories service mobile: ', response);
    return response;
}

export const getProductsForHomePage = async () => {
    const response = axiosInstance.get(constants.API_PRODUCTS);
    console.log('run products service mobile: ', response);
    return response;
}

export const getProductInCategory = async (id) => {
    const response = axiosInstance.get(`${constants.API_CATEGORIES}/${id}`);
    console.log('run products of category service mobile: ', response);
    return response;
}

