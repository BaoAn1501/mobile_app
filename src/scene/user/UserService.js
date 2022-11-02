import axiosInstance from "../../utils/axios";
import constants from "../../utils/constants";

export const login = async (email, password) => {
    const data = {
        email : email,
        password: password
    }
    const response = await axiosInstance.post(constants.API_LOGIN, data);
    return response;
}

export const register = async (full_name, email, password, confirm_password, phone_number) => {
    const data = {
        full_name: full_name,
        email : email,
        password: password,
        confirm_password: confirm_password,
        phone_number: phone_number,
    }
    const response = await axiosInstance.post(constants.API_REGISTER, data);
    return response;
}