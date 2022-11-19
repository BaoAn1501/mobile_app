import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  FlatList,
  Image
} from "react-native";
import React, {useContext, useState, useEffect} from "react";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { UserContext } from "../../user/UserContext";

const MyAddresses = (props) => {
  const {navigation} = props;
  const { onGetAllAddress, userID } = useContext(UserContext);
  const [address, setAddress] = useState([]);
  useEffect(() => {
    (async function getAllAddress() {
      const res1 = await onGetAllAddress(userID);
      setAddress(res1);
    })()
  }, []);

  const CommentItem = ({ item }) => {
    return (
      <View style={styles.address}>
        <Text>Tên: {item.user_id.full_name}</Text>
        <Text style={styles.sđt}>SĐT: {item.phone_number}</Text>
        <Text  style={styles.diaChi}>
          Địa chỉ: {item.address}
        </Text>
        {/* <Text></Text> */}
      </View>
    );
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          {
            // dk ? (dung) : (sai)
            addresses.length > 0 ?
            <FlatList
              data={address}
              renderItem={CommentItem}
              keyExtractor={item => item._id}
              //   ListHeaderComponent={renderHeader}
            /> :
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image style={{width: 150, height: 150, resizeMode:'contain'}} source={{uri: 'https://yaviet.com/wp-content/uploads/2018/08/loi-404-not-found.jpg'}}/>
              <Text>Bạn chưa có sổ địa chỉ nhận hàng</Text>
            </View>
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

//  const ... giao diện bottom

export default MyAddresses;

const styles = StyleSheet.create({
  address: {
    marginTop: 10,
    borderColor: "black",
    borderRadius: 3,
    borderWidth: 1,
    width: "100%",
    padding: 8,
  },
  diaChi: {
    flexWrap: 'wrap'
  },
  container: {
    padding: 10
  },
});

var addresses = [
  { // item
    "_id": "6361de0da41a7bf6b4cf6a09",
    "address": "số 45A, đườngTran Hung Dao, phường11, quậnQuan 1, Ho Chi Minh",
    "phone_number": "0987654321",
    "default": false,
    "user_id": {
      "_id": "635b993222cdefc4bdb25e7b",
      "full_name": "doraemon",
      "email": "an@gmail.com",
      "password": "$2a$10$Eu/RwCSy1uVQnysq/ZhUv.B9Bl1weZ9JJajtahrKFKj/FBvp2KIdW",
      "phone_number": "0934041111",
      "createdAt": "2022-10-28T08:56:18.190Z",
      "updatedAt": "2022-11-18T11:57:35.336Z",
      "__v": 0
    }
  },
  {
    "_id": "63621833a76e8a69574c23d9",
    "address": "số 124, đườngQuang Trung, phường11, quậnGo Vap, Ho Chi Minh",
    "phone_number": "0987654657",
    "default": true,
    "user_id": {
      "_id": "635b993222cdefc4bdb25e7b",
      "full_name": "doraemon",
      "email": "an@gmail.com",
      "password": "$2a$10$Eu/RwCSy1uVQnysq/ZhUv.B9Bl1weZ9JJajtahrKFKj/FBvp2KIdW",
      "phone_number": "0934041111",
      "createdAt": "2022-10-28T08:56:18.190Z",
      "updatedAt": "2022-11-18T11:57:35.336Z",
      "__v": 0
    }
  }
]
