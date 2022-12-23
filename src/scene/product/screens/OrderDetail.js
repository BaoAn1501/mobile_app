import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, FlatList, TouchableOpacity, ToastAndroid } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import { UserContext } from "../../user/UserContext";
import { IP } from "../../../utils/constants";

const OrderDetail = (props) => {
  const {
    navigation,
    route: {
      params: { id },
    },
  } = props;
  const { userID, onGetOneOrder, onCancelOrder, onReceiveOrder } = useContext(UserContext);
  const [order, setOrder] = useState([]);
  const [list, setList] = useState([]);
  const [user, setUser] = useState([]);
  const [address, setAddress] = useState([]);
  const [code, setCode] = useState('');


  useEffect(()=>{
    (async function getOrderDetail(){
      const res = await onGetOneOrder(userID, id);
      if(res){
        setOrder(res.order);
        if(order.status){
          setCode(order.status.code);
        }
        setList(res.list);
        setUser(res.user)
        setAddress(res.address);
      }
    })();
  }, [list]);

  const OrderItem = ({ item }) => {
    return (
      <View key={item._id} style={styles.itemContainer}>
        <View style={styles.leftPart}>
          <Text style={{marginLeft: 20}}>{item.quantity}</Text>
          <Text style={{marginHorizontal: 10}}>x</Text>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{ uri: convertIP(item.image) }}
          />
          <View style={styles.info}>
            <Text numberOfLines={1} style={styles.name}>
              {item.name}
            </Text>
            <Text style={styles.size}>
              size: {item.size}
            </Text>
            
          </View>
        </View>
        <View style={styles.rightPart}>
          <Text style={{marginHorizontal: 20}}>{item.price} đ</Text>
        </View>
      </View>
    );
  };

  function convertIP(image) {
    image = image.replace("localhost", IP);
    return image;
  }

  function GetCheckOut(number){
    let result = '';
    if(number==1){
      result = 'Tiền mặt'
    } else {
      result = 'Ví điện tử'
    }
    return result;
  }
  
  async function CancelOrder() {
    const res = await onCancelOrder(userID, order._id);
    if(res){
      navigation.goBack();
    } else {
      ToastAndroid.show('Lỗi khi hủy đơn hàng', ToastAndroid.BOTTOM);
    }
  }

  async function ReceiveOrder() {
    const res = await onReceiveOrder(userID, order._id);
    if(res){
      navigation.goBack();
    } else {
      ToastAndroid.show('Không nhận được hàng', ToastAndroid.BOTTOM);
    }
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={{ fontSize: 16, margin: 8 }}>Thông tin hóa đơn</Text>
            <View style={{backgroundColor: 'white', padding: 8}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>Tổng tiền:</Text>
                <Text>{order.total} đ</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>Hình thức thanh toán:</Text>
                <Text>{GetCheckOut(order.payment_id)}</Text>
              </View>
            </View>
            <Text style={{ fontSize: 16, margin: 8 }}>Thông tin khách hàng</Text>
            <View style={styles.addressContainer}>
            <View style={styles.address}>
                  <Text>Tên: {user.full_name}</Text>
                  <Text style={styles.sđt}>SĐT: {address.phone_number}</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text>Số: {address.number}</Text>
                    <Text style={{marginLeft: 20}}>Đường: {address.street}</Text>
                  </View>
                  <Text>Phường: {address.ward}</Text>
                  <Text>Quận: {address.district}</Text>
                  <Text>Thành phố: {address.city}</Text>
                </View>
            </View>
            <Text style={{ fontSize: 16, margin: 8 }}>Đơn hàng của bạn</Text>
            <View style={styles.productsContainer}>
              <FlatList
                data={list}
                renderItem={OrderItem}
                keyExtractor={(item) => item._id}
              />
            </View>
            {
              code == 1 ?
              <TouchableOpacity onPress={()=>CancelOrder()} style={styles.button}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Hủy</Text>
              </TouchableOpacity>
              : (code==2) ?
              <TouchableOpacity onPress={()=>ReceiveOrder()} style={styles.button}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Nhận hàng</Text>
              </TouchableOpacity> 
              : <></> 
            }
          </View>
        </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default OrderDetail

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
    marginHorizontal: 30,
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: 'red',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16
  }
})