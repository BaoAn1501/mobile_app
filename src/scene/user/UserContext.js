import { View, Text } from 'react-native'
import React, { useState, createContext } from 'react';
import {login, register} from './UserService';
import {constants} from '../../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const UserContext = createContext();

export const UserContextProvider = (props) => {
    const {children} = props;
    const [isLogged, setIsLogged] = useState(false);

    const onLogin = async (email, password) => {
        try {
            const res = await login(email, password);
            if(res.status==true && res.token){
                await AsyncStorage.setItem(constants.TOKEN_KEY, res.token);
                setIsLogged(true);
                console.log(res);
            }
            return res;
        } catch(error) {
            console.log('onLogin error: ', error);
        }
        return false;
    }

    const onRegister = async (full_name, email, password, confirm_password) => {
        try {
            const res = await register(full_name, email, password, confirm_password);
            console.log('res context: ', res);
            return res;
        } catch (error) {
            console.log('onRegister error: ', error);
        }
        return false;
    }

    return (
        <UserContext.Provider
            value={{
                isLogged: isLogged,
                onLogin, onRegister
            }}
        >
            {children}
        </UserContext.Provider>
    )
}