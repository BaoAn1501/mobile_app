import axiosInstance from "../../utils/axios";
import {constants} from "../../utils/constants";

export const login = async (email, password) => {
    const data = {
        email : email,
        password: password
    }
    const response = await axiosInstance.post(constants.API_LOGIN, data);
    return response;
}

export const register = async (full_name, email, password, confirm_password) => {
    const data = {
        full_name: full_name,
        email : email,
        password: password,
        confirm_password: confirm_password,
    }
    const response = await axiosInstance.post(constants.API_REGISTER, data);
    return response;
}

export const getUser = async (id) => {
    const response = await axiosInstance.get(`${constants.API_USERS}/${id}`);
    return response;
}

export const changeName = async (id, full_name) => {
    const data = {
        full_name: full_name
    }
    const response = await axiosInstance.post(`${constants.API_USERS}/${id}/changeName`, data);
    return response;
}

export const getAllAddress = async (id) => {
    const response = await axiosInstance.get(`${constants.API_USERS}/${id}/address`);
    return response;
}

export const getOneAddress = async (id, ida) => {
    const response = await axiosInstance.get(`${constants.API_USERS}/${id}/address/${ida}`);
    return response;
}

export const getDefaultAddress = async (id) => {
    const response = await axiosInstance.get(`${constants.API_USERS}/${id}/address/get/default`);
    return response;
}

export const addAddress = async (id, body) => {
    const data = {
        body
    }
    const response = await axiosInstance.post(`${constants.API_USERS}/${id}/address/insert`, data);
    return response;
}

export const deleteAddress = async (id, ida) => {
    const response = await axiosInstance.post(`${constants.API_USERS}/${id}/address/${ida}/delete`);
    return response;
}

export const updateAddress = async (id, ida, body) => {
    const data = {
        body
    }
    const response = await axiosInstance.post(`${constants.API_USERS}/${id}/address/${ida}/update`, data);
    return response;
}

export const getMyCart = async (id) => {
    const response = await axiosInstance.get(`${constants.API_USERS}/${id}/cart`);
    return response;
}

export const plusCart = async (id, cid) => {
    const response = await axiosInstance.post(`${constants.API_USERS}/${id}/cart/${cid}/update/plus`);
    return response;
}

export const minusCart = async (id, cid) => {
    const response = await axiosInstance.post(`${constants.API_USERS}/${id}/cart/${cid}/update/minus`);
    return response;
}

export const deleteAllCart = async (id) => {
    const response = await axiosInstance.post(`${constants.API_USERS}/${id}/cart/delete`);
    return response;
}

export const deleteCart = async (id, cid) => {
    const response = await axiosInstance.post(`${constants.API_USERS}/${id}/cart/${cid}/delete`);
    return response;
}

export const checkOut = async (id, data) => {
    const response = await axiosInstance.post(`${constants.API_USERS}/${id}/cart/checkout`, data);
    return response;
}

export const getAllOrders = async (id) => {
    const response = await axiosInstance.get(`${constants.API_USERS}/${id}/orders`);
    return response;
}

export const getCancelOrders = async (id) => {
    const response = await axiosInstance.get(`${constants.API_USERS}/${id}/orders/cancel/get`);
    return response;
}

export const getPendingOrders = async (id) => {
    const response = await axiosInstance.get(`${constants.API_USERS}/${id}/orders/pending/get`);
    return response;
}

export const getSuccessOrders = async (id) => {
    const response = await axiosInstance.get(`${constants.API_USERS}/${id}/orders/success/get`);
    return response;
}

export const cancelOrder = async (id, ido) => {
    const response = await axiosInstance.post(`${constants.API_USERS}/${id}/orders/${ido}/cancel`);
    return response;
}

export const getOneOrder = async (id, ido) => {
    const response = await axiosInstance.get(`${constants.API_USERS}/${id}/orders/${ido}`);
    return response;
}

export const rate = async (id, idr, body) => {
    const data = { body };
    const response = await axiosInstance.post(`${constants.API_USERS}/${id}/reviews/yet/${idr}/rate`, data);
    return response;
}

export const getReviewsYet = async (id) => {
    const response = await axiosInstance.get(`${constants.API_USERS}/${id}/reviews/yet`);
    return response;
}

export const getReviewsAlready = async (id) => {
    const response = await axiosInstance.get(`${constants.API_USERS}/${id}/reviews/already`);
    return response;
}

export const search = async (id, text) => {
    const response = await axiosInstance.post(`${constants.API_USERS}/${id}/search?text=${text}`);
    return response;
}

export const createSearch = async (id, text) => {
    const response = await axiosInstance.post(`${constants.API_USERS}/${id}/search/list/create?text=${text}`);
    return response;
}

export const deleteSearch = async (id, _id) => {
    const response = await axiosInstance.post(`${constants.API_USERS}/${id}/search/list/${_id}/delete`);
    return response;
}

export const showSearch = async (id) => {
    const response = await axiosInstance.get(`${constants.API_USERS}/${id}/search/list`);
    return response;
}