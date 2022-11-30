import { View, Text } from "react-native";
import React, { useState, createContext } from "react";
import {
  login,
  register,
  getUser,
  changeName,
  getAllAddress,
  getOneAddress,
  addAddress,
  deleteAddress,
  updateAddress,
  getMyCart,
  plusCart,
  minusCart,
  deleteCart,
  deleteAllCart,
} from "./UserService";
import { constants } from "../../utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const { children } = props;
  const [isLogged, setIsLogged] = useState(false);
  const [userID, setUserID] = useState("");

  const onLogin = async (email, password) => {
    try {
      const res = await login(email, password);
      if (res.status == true && res.token) {
        await AsyncStorage.setItem(constants.TOKEN_KEY, res.token);
        setIsLogged(true);
        console.log("user info: ", res.result._id);
        setUserID(res.result._id);
        console.log(res);
      }
      return res;
    } catch (error) {
      console.log("onLogin error: ", error);
    }
    return false;
  };

  const onRegister = async (full_name, email, password, confirm_password) => {
    try {
      const res = await register(full_name, email, password, confirm_password);
      console.log("res context: ", res);
      return res;
    } catch (error) {
      console.log("onRegister error: ", error);
    }
    return false;
  };

  const onGetUser = async (id) => {
    try {
      const res = await getUser(id);
      return res;
    } catch (error) {
      console.log("onRegister error: ", error);
    }
    return false;
  };

  const onChangeName = async (id, full_name) => {
    try {
      const res = await changeName(id, full_name);
      return res;
    } catch (error) {
      console.log("onRegister error: ", error);
    }
    return false;
  };

  const onGetAllAddress = async (id) => {
    try {
      const res = await getAllAddress(id);
      return res;
    } catch (error) {
      console.log("onGetAllAddress error: ", error);
    }
    return false;
  };

  const onGetOneAddress = async (id, ida) => {
    try {
      const res = await getOneAddress(id, ida);
      return res;
    } catch (error) {
      console.log("onGetAllAddress error: ", error);
    }
    return false;
  };

  const onAddAddress = async (id, body) => {
    try {
      const res = await addAddress(id, body);
      return res;
    } catch (error) {
      console.log("onGetAllAddress error: ", error);
    }
    return false;
  };

  const onDeleteAddress = async (id, ida) => {
    try {
      const res = await deleteAddress(id, ida);
      return res;
    } catch (error) {
      console.log("onGetAllAddress error: ", error);
    }
    return false;
  };

  const onUpdateAddress = async (id, ida, body) => {
    try {
      const res = await updateAddress(id, ida, body);
      console.log('run update address in context');
      return res;
    } catch (error) {
      console.log("onGetAllAddress error: ", error);
    }
    return false;
  };

  const onGetCart = async (id) => {
    try {
      const res = await getMyCart(id);
      return res;
    } catch (error) {
      console.log("onGetCart error: ", error);
    }
    return false;
  };

  const onPlusCart = async (id, cid) => {
    try {
        const res = await plusCart(id, cid);
        return res;
      } catch (error) {
        console.log("onGetCart error: ", error);
      }
      return false;
  }

  const onMinusCart = async (id, cid) => {
    try {
        const res = await minusCart(id, cid);
        return res;
      } catch (error) {
        console.log("onGetCart error: ", error);
      }
      return false;
  }

  const onDeleteCart = async (id, cid) => {
    try {
        const res = await deleteCart(id, cid);
        return res;
      } catch (error) {
        console.log("onGetCart error: ", error);
      }
      return false;
  }

  const onDeleteAllCart = async (id) => {
    try {
        const res = await deleteAllCart(id);
        return res;
      } catch (error) {
        console.log("onGetCart error: ", error);
      }
      return false;
  }

  return (
    <UserContext.Provider
      value={{
        isLogged: isLogged,
        onLogin,
        onRegister,
        onGetUser,
        userID,
        onChangeName,
        onGetAllAddress,
        onGetCart,
        onPlusCart,
        onMinusCart,
        onGetOneAddress,
        onAddAddress,
        onDeleteAddress,
        onUpdateAddress,
        onDeleteCart,
        onDeleteAllCart,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
