import { View, Text } from "react-native";
import React, { useState, createContext } from "react";
import {
  login,
  register,
  getUser,
  changeName,
  getAllAddress,
  getOneAddress,
  getDefaultAddress,
  addAddress,
  deleteAddress,
  updateAddress,
  getMyCart,
  plusCart,
  minusCart,
  deleteCart,
  deleteAllCart,
  checkOut,
  getAllOrders,
  getCancelOrders,
  getPendingOrders,
  getSuccessOrders,
  getShippingOrders,
  getOneOrder,
  cancelOrder,
  rate,
  getReviewsYet,
  getReviewsAlready,
  search,
  createSearch,
  deleteSearch,
  showSearch,
  receiveOrder,
  changePass,
  resetPass,
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

  const onLogout = async () => {
    setIsLogged(false);
  }

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

  const onChangePass = async (id, oldPass, newPass) => {
    try {
      const res = await changePass(id, oldPass, newPass);
      console.log("res context: ", res);
      return res;
    } catch (error) {
      console.log("onChangePass error: ", error);
    }
    return false;
  };

  const onResetPass = async (email) => {
    try {
      const res = await resetPass(email);
      console.log("res context: ", res);
      return res;
    } catch (error) {
      console.log("onResetPass error: ", error);
    }
    return false;
  };

  const onGetUser = async (id) => {
    try {
      const res = await getUser(id);
      return res;
    } catch (error) {
      console.log("onGetUser error: ", error);
    }
    return false;
  };

  const onChangeName = async (id, full_name) => {
    try {
      const res = await changeName(id, full_name);
      return res;
    } catch (error) {
      console.log("onChangeName error: ", error);
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
      console.log("onGetOneAddress error: ", error);
    }
    return false;
  };

  const onGetDefaultAddress = async (id) => {
    try {
      const res = await getDefaultAddress(id);
      return res;
    } catch (error) {
      console.log("onGetDefaultAddress error: ", error);
    }
    return false;
  };

  const onAddAddress = async (id, body) => {
    try {
      const res = await addAddress(id, body);
      return res;
    } catch (error) {
      console.log("onAddAddress error: ", error);
    }
    return false;
  };

  const onDeleteAddress = async (id, ida) => {
    try {
      const res = await deleteAddress(id, ida);
      return res;
    } catch (error) {
      console.log("onDeleteAddress error: ", error);
    }
    return false;
  };

  const onUpdateAddress = async (id, ida, body) => {
    try {
      const res = await updateAddress(id, ida, body);
      console.log('run update address in context');
      return res;
    } catch (error) {
      console.log("onUpdateAddress error: ", error);
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

  const onCheckOut = async (id, body) => {
    try {
        const res = await checkOut(id, body);
        return res;
      } catch (error) {
        console.log("onGetCart error: ", error);
      }
      return false;
  }

  const onGetAllOrders = async (id) => {
    try {
        const res = await getAllOrders(id);
        return res;
      } catch (error) {
        console.log("onGetCart error: ", error);
      }
      return false;
  }

  const onGetCancelOrders = async (id) => {
    try {
        const res = await getCancelOrders(id);
        return res;
      } catch (error) {
        console.log("onGetCart error: ", error);
      }
      return false;
  }

  const onGetPendingOrders = async (id) => {
    try {
        const res = await getPendingOrders(id);
        return res;
      } catch (error) {
        console.log("onGetCart error: ", error);
      }
      return false;
  }

  const onGetSuccessOrders = async (id) => {
    try {
        const res = await getSuccessOrders(id);
        return res;
      } catch (error) {
        console.log("onGetCart error: ", error);
      }
      return false;
  }

  const onGetShippingOrders = async (id) => {
    try {
        const res = await getShippingOrders(id);
        return res;
      } catch (error) {
        console.log("onGetCart error: ", error);
      }
      return false;
  }

  const onGetOneOrder = async (id, ido) => {
    try {
        const res = await getOneOrder(id, ido);
        return res;
      } catch (error) {
        console.log("onGetCart error: ", error);
      }
      return false;
  }

  const onCancelOrder = async (id, ido) => {
    try {
        const res = await cancelOrder(id, ido);
        return res;
      } catch (error) {
        console.log("onGetCart error: ", error);
      }
      return false;
  }

  const onReceiveOrder = async (id, ido) => {
    try {
        const res = await receiveOrder(id, ido);
        return res;
      } catch (error) {
        console.log("onGetCart error: ", error);
      }
      return false;
  }

  const onRate = async (id, ido, body) => {
    try {
        const res = await rate(id, ido, body);
        return res;
      } catch (error) {
        console.log("rate error: ", error);
      }
      return false;
  }

  const onGetReviewsYet = async (id) => {
    try {
        const res = await getReviewsYet(id);
        return res;
      } catch (error) {
        console.log("onGetCart error: ", error);
      }
      return false;
  }

  const onGetReviewsAlready = async (id) => {
    try {
        const res = await getReviewsAlready(id);
        return res;
      } catch (error) {
        console.log(error);
      }
      return false;
  }

  const onSearch = async (id, text) => {
    try {
        const res = await search(id, text);
        return res;
      } catch (error) {
        console.log(error);
      }
      return false;
  }

  const onCreateSearch = async (id, text) => {
    try {
        const res = await createSearch(id, text);
        return res;
      } catch (error) {
        console.log(error);
      }
      return false;
  }

  const onDeleteSearch = async (id, _id) => {
    try {
        const res = await deleteSearch(id, _id);
        return res;
      } catch (error) {
        console.log(error);
      }
      return false;
  }

  const onShowSearch = async (id) => {
    try {
        const res = await showSearch(id);
        return res;
      } catch (error) {
        console.log(error);
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
        onGetDefaultAddress,
        onAddAddress,
        onDeleteAddress,
        onUpdateAddress,
        onDeleteCart,
        onDeleteAllCart,
        onCheckOut,
        onGetAllOrders,
        onGetCancelOrders,
        onGetPendingOrders,
        onGetSuccessOrders,
        onGetShippingOrders,
        onGetOneOrder,
        onCancelOrder,
        onReceiveOrder,
        onRate,
        onGetReviewsYet,
        onGetReviewsAlready,
        onSearch,
        onCreateSearch,
        onDeleteSearch,
        onShowSearch,
        onLogout,
        onChangePass,
        onResetPass
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
