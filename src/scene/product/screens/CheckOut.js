import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  ToastAndroid
} from "react-native";
import React, { useContext, useState, useEffect, useRef, forwardRef } from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import RBSheet from "react-native-raw-bottom-sheet";
import { IP } from "../../../utils/constants";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import { UserContext } from "../../user/UserContext";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('screen').height;
import { SelectList } from 'react-native-dropdown-select-list'

const BodyRBSheet = forwardRef((props, ref) => {
  const {chooseAddress} = props;
  const { userID, onGetAllAddress } = useContext(UserContext);
  const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    async function GetAddresses() {
      const res = await onGetAllAddress(userID);
      setAddresses(res);
    }
    GetAddresses();
  }, []);
  const ItemAddress = ({item}) => {
    return (
      <TouchableOpacity onPress={()=>{chooseAddress(item._id), ref.current.close()}}>
        <View style={styles.address}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>Tên: {item.user_id.full_name}</Text>
            <Text style={{color: 'green'}}>{item.default==true ? 'Mặc định' : '' }</Text>
          </View>
          <Text style={styles.sđt}>SĐT: {item.phone_number}</Text>
          <Text numberOfLines={1} style={styles.diaChi}>Địa chỉ: {item.address}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <SafeAreaView>
      <ScrollView>
      {
            // dk ? (dung) : (sai)
            addresses.length > 0 ? (
              <FlatList
                data={addresses}
                renderItem={({item}) => {
                  return <ItemAddress item={item} />
                }}
                //   ListHeaderComponent={renderHeader}
              />
            ) : (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image
                  style={{ width: 150, height: 150, resizeMode: "contain" }}
                  source={{
                    uri: "https://yaviet.com/wp-content/uploads/2018/08/loi-404-not-found.jpg",
                  }}
                />
                <Text>Bạn chưa có sổ địa chỉ nhận hàng</Text>
              </View>
            )
          }
      </ScrollView>
    </SafeAreaView>
  );
});

const CheckOut = (props) => {
  const { navigation } = props;
  const { userID, onGetDefaultAddress, onGetOneAddress, onGetCart, onCheckOut } = useContext(UserContext);
    useContext(UserContext);
  const [carts, setCarts] = useState([]);
  const [total, setTotal] = useState(0);
  const refRBSheet = useRef();
  const [address, setAddress] = useState({});
  const [selected, setSelected] = React.useState("");
  
  const data = [
    {
      key: "1",
      value: 'Tiền mặt',
      icon: () => <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/639/639365.png'}} style={{width: 18, height: 18}} />
    },
    {
      key: 2,
      value: "Ví điện tử Momo",
      icon: () => <Image source={{uri: 'https://developers.momo.vn/v3/assets/images/square-8c08a00f550e40a2efafea4a005b1232.png'}} style={{width: 18, height: 18}} />
    }
  ];
  
  useEffect(() => {
    async function GetAddress() {
      const res = await onGetDefaultAddress(userID);
      console.log("get default user: ", res);
      setAddress(res);
    }
    GetAddress();
  }, []);

  useEffect(() => {
    (async function getMyCart() {
      await onGetCart(userID).then((result) => {
        setCarts(result);
        const total = result.reduce(function (accumulator, currentValue) {
          return (
            accumulator +
            currentValue.productSize_id.price * currentValue.quantity
          );
        }, 0);
        setTotal(total);
      });
    })();
  }, []);

  async function checkOut(){
    console.log('run checkout');
    const data = {
      address, carts, total, payment_id: Number(selected)
    }
    const res = await onCheckOut(userID, data);
    if(res){
      if(res.message){
        ToastAndroid.show(res.message, ToastAndroid.BOTTOM);
        navigation.navigate('Home');
      }
    }
  }

  const CartItem = ({ item }) => {
  
    return (
      <View key={item._id} style={styles.itemContainer}>
        <View style={styles.leftPart}>
          <Text style={{marginLeft: 20}}>{item.quantity}</Text>
          <Text style={{marginHorizontal: 10}}>x</Text>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{ uri: convertIP(item.productSize_id.product_id.image1) }}
          />
          <View style={styles.info}>
            <Text numberOfLines={1} style={styles.name}>
              {item.productSize_id.product_id.name}
            </Text>
            <Text style={styles.size}>
              size: {item.productSize_id.size_id.symbol}
            </Text>
            
          </View>
        </View>
        <View style={styles.rightPart}>
          <Text style={{marginHorizontal: 20}}>{item.productSize_id.price} đ</Text>
        </View>
      </View>
    );
  };

  function convertIP(image) {
    image = image.replace("localhost", IP);
    return image;
  }
  
  async function chooseAddress (address) {
    const res = await onGetOneAddress(userID, address);
    console.log('address chosen: ', res);
    const _address = {
        _id: res._id,
        address: 'số ' + res.number
        + ', đường ' + res.street
        + ', phường ' + res.ward
        + ', quận ' + res.district
        + ', ' + res.city,
        phone_number: res.phone_number,
        default: res.default,
        user_id: res.user_id
    }
    setAddress(_address);
  }

  const handleCheckOut = () => {
    if(selected==0){
      ToastAndroid.show('Bạn chưa chọn phương thức thanh toán', ToastAndroid.BOTTOM);
    } else {
      if(selected==1){
        checkOut();
      }
    }
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={{ fontSize: 16, margin: 8 }}>Địa chỉ nhận hàng</Text>
            <View style={styles.addressContainer}>
            <View style={styles.address}>
                  <Text>Tên: {address.user_id ? address.user_id.full_name : ''}</Text>
                  <Text style={styles.sđt}>SĐT: {address.phone_number}</Text>
                  <Text numberOfLines={1} style={styles.diaChi}>
                    Địa chỉ: {address.address}
                  </Text>
                </View>
              <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                <Text style={{ color: "green" }}>Thay đổi</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 16, margin: 8 }}>Đơn hàng của bạn</Text>
            <View style={styles.productsContainer}>
              
              <FlatList
                data={carts}
                renderItem={CartItem}
                keyExtractor={(item) => item._id}
              />
            </View>
          </View>
          <View style={styles.checkContainer}>
          <SelectList 
            setSelected={(val) => setSelected(val)} 
            data={data} 
            save="key"
            search={false}
            dropdownShown={false}
            defaultOption={{ key:'0', value:'Chọn phương thức thanh toán' }}
            onSelect={() => console.log(selected)}
          />
            <View style={{marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 20}}>
              <View>
                <Text>Tổng tiền:</Text>
                <Text style={{color: 'green', fontSize: 16}}>{total} đ</Text>
              </View>
              <TouchableOpacity style={styles.button} onPress={()=> handleCheckOut()}>
                <Text>Thanh toán</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          height={400}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent",
            },
            draggableIcon: {
              backgroundColor: "#000",
            },
          }}
        >
          <BodyRBSheet ref={refRBSheet} chooseAddress={chooseAddress} />
        </RBSheet>
        </ScrollView>
    </SafeAreaView>
  );
};

export default CheckOut;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  addressContainer: {
    alignItems: "center",
    backgroundColor: "white",
  },
  productsContainer: {},
  address: {
    width: "100%",
    padding: 8,
  },
  itemContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    borderWidth: 0.5,
    borderColor: "white",
    borderRadius: 3,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  leftPart: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightPart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  info: {
    height: 40,
    justifyContent: "space-between",
    marginLeft: 10
  },
  image: {
    height: 40,
    width: 40,
  },
  name: {
    fontWeight: "bold",
  },
  checkContainer: {
    padding: 16,
    marginTop: 16,
    backgroundColor: 'white',
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
    shadowColor: "red",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  button: {
    backgroundColor: 'green',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16
  }
});
