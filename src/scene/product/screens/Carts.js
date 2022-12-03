import React, { useState, useEffect, useContext } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
  SafeAreaView,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
const windowWidth = Dimensions.get("window").width;
import { UserContext } from "../../user/UserContext";
import { IP } from "../../../utils/constants";
const windowHeight = Dimensions.get("window").height; 

export const Carts = (props) => {
  const { navigation } = props;
  const { onGetCart, userID, onPlusCart, onMinusCart, onDeleteCart, onDeleteAllCart } =
    useContext(UserContext);
  const [carts, setCarts] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity 
        style={{flexDirection: 'row', 
        marginRight: 8}} 
        onPress={()=>deleteAllItem(userID)}>
          <EvilIcons
          name="trash"
          size={24}
          color="black"
        />
        <Text>Xóa tất cả</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

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

  async function plus(cid) {
    await onPlusCart(userID, cid);
  }

  async function minus(cid) {
    await onMinusCart(userID, cid);
  }

  function convertIP(image) {
    image = image.replace("localhost", IP);
    return image;
  }

  async function deleteItem(id){
    const res = await onDeleteCart(userID, id);
    if(res){
      if(res.message){
        ToastAndroid.show(res.message, ToastAndroid.BOTTOM);
      }
    }
  }

  async function deleteAllItem(id){
    const res = await onDeleteAllCart(userID);
    if(res){
      if(res.message){
        ToastAndroid.show(res.message, ToastAndroid.BOTTOM);
      }
    }
  }

  const cartItem = ({ item }) => {
    
    return (
      <View key={item._id} style={styles.itemContainer}>
        <View style={styles.leftPart}>
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
              {item.productSize_id.size_id.symbol}
            </Text>
            <Text style={styles.price}>{item.productSize_id.price} đ</Text>
          </View>
        </View>
        <View style={styles.rightPart}>
          <TouchableOpacity
            onPress={() => minus(item._id)}
            style={[styles.actionContainer, styles.actionLeft]}
          >
            <Text style={styles.actionText}>-</Text>
          </TouchableOpacity>
          <View style={styles.quantityContainer}>
            <Text style={styles.quantity}>{item.quantity}</Text>
          </View>
          <TouchableOpacity
            onPress={() => plus(item._id)}
            style={[styles.actionContainer, styles.actionRight]}
          >
            <Text style={styles.actionText}>+</Text>
          </TouchableOpacity>
          <MaterialIcons onPress={()=>deleteItem(item._id)} style={{marginLeft: 20}} name="highlight-remove" size={24} color="gray" />
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        <View style={styles.leftFooter}>
            <Text>Tổng tiền:</Text>
            <Text style={styles.total}>{total} đ</Text>
        </View>
        <View style={styles.rightFooter}>
          <Pressable style={styles.button} onPress={() => {navigation.navigate('CheckOut'), console.log('to checkout')}}>
            <Text style={styles.buttonText}>Thanh toán</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {
          carts.length > 0 ?
          <FlatList
            data={carts}
            renderItem={cartItem}
            keyExtractor={(item) => item._id}
            ListFooterComponent={renderFooter}
          />
          : 
          <View style={{height: windowHeight, alignItems: 'center', justifyContent: 'center'}}>
            <Image style={{width: 80, height: 80, resizeMode: 'contain'}} source={{uri: 'https://cdn-icons-png.flaticon.com/512/1376/1376786.png'}} />
            <Text>Chưa có sản phẩm nào trong giỏ hàng !</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
              <Text style={{color: 'green'}}>Đến mua hàng</Text>
            </TouchableOpacity>
          </View>
        }
      </View>
    </SafeAreaView>
  );
};

export default Carts;
const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderWidth: 0.5,
    borderColor: "white",
    borderRadius: 3,
    marginHorizontal: 10,
    marginTop: 8,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
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
    height: 80,
    width: 100,
    justifyContent: "space-between",
    paddingVertical: 5,
    marginLeft: 10
  },
  image: {
    height: 80,
    width: 80,
  },
  name: {
    fontWeight: "bold",
  },
  actionContainer: {
    width: 32,
    height: 32,
    borderColor: "green",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  actionLeft: {
    borderTopStartRadius: 8,
    borderBottomStartRadius: 8,
  },
  actionRight: {
    borderTopEndRadius: 8,
    borderBottomEndRadius: 8,
  },
  actionText: {
    color: "green",
  },
  quantityContainer: {
    backgroundColor: "green",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "green",
    height: 32,
    width: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  quantity: {
    color: "white",
    fontWeight: "bold",
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    // width: windowWidth,
    marginTop: 30,
    height: 70,
    backgroundColor: "white",
    borderRadius: 8,
    justifyContent: 'space-between'
  },
  leftFooter: {
    width: windowWidth * 0.3,
    justifyContent: "center",
    backgroundColor: "white",
    height: 70,
    marginLeft: 20,
  },
  rightFooter: {
    justifyContent: "center",
    height: 40,
    alignItems: "center",
    width: windowWidth * 0.5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "green",
    backgroundColor: "green",
    marginRight: 30,
  },
  total: {
    color: "red",
    fontWeight: "bold",
  },
  button: {},
  buttonText: {
    color: "white",
  },
});
