import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  FlatList,
  Image,
  Pressable,
  TouchableOpacity,
  ToastAndroid,
  Animated,
  Modal
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { AntDesign } from "@expo/vector-icons";
import ToggleSwitch from "toggle-switch-react-native";
import Dialog from "react-native-dialog";
import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  forwardRef,
} from "react";
import { ScrollView } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { UserContext } from "../../user/UserContext";
import PhoneInput from "react-native-phone-number-input";

const RenderAddressItem = ({ item }) => {
  const { userID, onDeleteAddress } = useContext(UserContext);
  const refRBSheet = useRef();
  const [id, setId] = useState('');
  // const { userID, onGetOneAddress, onAddAddress} = useContext(UserContext);
  const [visible,setVisible] = useState(false);
  async function deleteFunction (id){
    const res = await onDeleteAddress(userID, id);
    if(res){
      if(res.message){
        ToastAndroid.show(res.message, ToastAndroid.BOTTOM);
      }
    }
  }

  const leftSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={()=> setVisible(true)} activeOpacity={0.6}>
        <View style={[styles.box, {backgroundColor: 'red'}]}>
          <Animated.Text style={{transform: [{scale: scale}], color: 'white', fontWeight: 'bold'}}>
            Xóa
          </Animated.Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {refRBSheet.current.open(), setId(item._id)}} activeOpacity={0.6}>
        <View style={[styles.box, {backgroundColor: 'green'}]}>
          <Animated.Text style={{transform: [{scale: scale}], color: 'white', fontWeight: 'bold'}}>
            Sửa
          </Animated.Text>
        </View>
      </TouchableOpacity>
      </View>
    );
  };

  return (
    <Swipeable renderLeftActions={leftSwipe} >
      {/* <TouchableOpacity onPress={()=> refRBSheet.current.open()}> */}
      <View style={styles.address}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>Tên: {item.user_id.full_name}</Text>
          <Text style={{color: 'green'}}>{item.default==true ? 'Mặc định' : '' }</Text>
        </View>
        <Text style={styles.sđt}>SĐT: {item.phone_number}</Text>
        <Text numberOfLines={1} style={styles.diaChi}>Địa chỉ: {item.address}</Text>
      </View>
      <Dialog.Container style={styles.dialog} visible={visible}>
        <Dialog.Title>Xóa địa chỉ</Dialog.Title>
        <Dialog.Description>
          Bạn có muốn xóa địa chỉ này không ?
        </Dialog.Description>
        <Dialog.Button label="Quay lại" onPress={() =>setVisible(false)} />
        <Dialog.Button label="Xóa" onPress={() => {deleteFunction(item._id), setVisible(!visible)}}/>
      </Dialog.Container>
      <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent",
            },
            draggableIcon: {
              backgroundColor: "#000",
            },
          }}
        >
          <BodyRBSheet id={id} ref={refRBSheet}/>
        </RBSheet>
      {/* </TouchableOpacity> */}
      
    </Swipeable>
    
  );
};

const BodyRBSheet = forwardRef((props, ref) => {
  const {id} = props;
  const { userID, onGetOneAddress, onAddAddress, onUpdateAddress } = useContext(UserContext);
  const [number, setNumber] = useState('');
  const [street, setStreet] = useState('');
  const [ward, setWard] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [_default, setDefault] = useState(false);

  useEffect(() => {
    if(id) {
      (async function getOneAddress() {
        const res = await onGetOneAddress(userID, id);
        console.log('address receive: ', res);
        setNumber(res.number);
        setStreet(res.street);
        setWard(res.ward);
        setDistrict(res.district);
        setCity(res.city);
        setPhone(res.phone_number);
        setDefault(res.default);
      })();
    } else {
      console.log('address receive null');
      setNumber('');
      setStreet('');
      setWard('');
      setDistrict('');
      setCity(number);
      setPhone('');
      setDefault(false);
    }
  }, []);

  async function inputValidation() {
    var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    if(!number & number.trim().length == 0) {
      ToastAndroid.show('Bạn chưa nhập số nhà', ToastAndroid.BOTTOM);
      return;
    } else if(!street & street.trim().length == 0) {
      ToastAndroid.show('Bạn chưa nhập tên đường', ToastAndroid.BOTTOM);
      return;
    } else if(!ward & ward.trim().length == 0) {
      ToastAndroid.show('Bạn chưa nhập tên phường', ToastAndroid.BOTTOM);
      return;
    } else if(!district & district.trim().length == 0) {
      ToastAndroid.show('Bạn chưa nhập tên quận', ToastAndroid.BOTTOM);
      return;
    } else if(!city & city.trim().length == 0) {
      ToastAndroid.show('Bạn chưa nhập tên thành phố', ToastAndroid.BOTTOM);
      return;
    } else if(!phone & phone.trim().length == 0) {
      ToastAndroid.show('Bạn chưa nhập số điện thoại', ToastAndroid.BOTTOM);
      return;
    } else if(!phone.match(vnf_regex)) {
      ToastAndroid.show('Số điện thoại chưa đúng định dạng', ToastAndroid.BOTTOM);
      return;
    } else {
      if(id){
        const data = {
          number: number,
          street: street,
          ward: ward,
          district: district,
          city: city,
          phone_number: phone,
          default: _default
        }
        console.log('data update: ', data);
        const res1 = await onUpdateAddress(userID, id, data);
        if(res1){
          if(res1.message){
            ToastAndroid.show(res1.message, ToastAndroid.BOTTOM);
          }
          ref.current.close();
        }
      } else {
        const data = {
          number: number,
          street: street,
          ward: ward,
          district: district,
          city: city,
          phone_number: phone,
          default: _default
        }
        console.log('add address: ', data);
        const res = await onAddAddress(userID, data);
        if(res) {
          if(res.message) {
            ToastAndroid.show(res.message, ToastAndroid.BOTTOM);
          }
          ref.current.close();
        }
      }
    }
  }

  return (
    <SafeAreaView>
      <ScrollView>
       <View style={{paddingHorizontal: 20, paddingBottom: 20}}>
       <View>
        <Text style={{ marginTop: 20 }}>Số Nhà</Text>
        <TextInput placeholder="Số nhà" style={styles.textInput} value={number} onChangeText={setNumber} />
      </View>
      <View>
        <Text style={{ marginTop: 20 }}>Đường</Text>
        <TextInput placeholder="Tên Đường " style={styles.textInput} value={street} onChangeText={setStreet} />
      </View>

      <View>
        <Text style={{ marginTop: 20 }}>Phường</Text>
        <TextInput placeholder="Tên Phường" style={styles.textInput} value={ward} onChangeText={setWard} />
      </View>

      <View>
        <Text style={{ marginTop: 20 }}>Quận</Text>
        <View style={{ flexDirection: "row" }}>
          <TextInput placeholder="Tên Quận" style={styles.textInput} value={district} onChangeText={setDistrict} />
        </View>
      </View>

      <View>
        <Text style={{ marginTop: 20 }}>Thành Phố</Text>
        <TextInput placeholder="Tên Thành Phố" style={styles.textInput} value={city} onChangeText={setCity} />
      </View>

      <View>
        <Text style={{ marginTop: 20 }}>Số Điện Thoại</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image style={{height: 20, width: 30, resizeMode: 'cover', marginRight: 30}} source={{uri: 'https://cdn-icons-png.flaticon.com/512/555/555515.png'}}/>
          <TextInput style={[styles.textInput, {width: '82%'}]} value={phone} onChangeText={setPhone}/>
        </View>
      </View>
      <View
        style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}
      >
        <Text>Đặt làm địa chỉ mặc định:</Text>
        <ToggleSwitch
          isOn={_default}
          onColor="green"
          offColor="grey"
          labelStyle={{ color: "black", fontWeight: "700" }}
          size="medium"
          onToggle={()=>{setDefault(!_default)}}
        />
      </View>
      <View>
        <Pressable style={styles.button} onPress={()=>inputValidation()}>
          <Text style={styles.Add}> { id ? 'Cập nhật' : 'Thêm'} </Text>
        </Pressable>
      </View>
       </View>
    </ScrollView>
    </SafeAreaView>
  );
});

const MyAddresses = (props) => {

  const refRBSheet = useRef();
  const { navigation } = props;
  const { onGetAllAddress, userID} = useContext(UserContext);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => (
        <View>
          <AntDesign
            name="pluscircleo"
            size={28}
            color="black"
            style={{ marginRight: 20 }}
            onPress={() => refRBSheet.current.open()}
          />
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    (async function getAllAddress() {
      const res = await onGetAllAddress(userID);
      setAddresses(res);
    })();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          {
            // dk ? (dung) : (sai)
            addresses.length > 0 ? (
              <FlatList
                data={addresses}
                renderItem={({item}) => {
                  return <RenderAddressItem item={item} />
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
        </View>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent",
            },
            draggableIcon: {
              backgroundColor: "#000",
            },
          }}
        >
          <BodyRBSheet ref={refRBSheet}/>
        </RBSheet>
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
    height: 80,
    backgroundColor: 'white'
  },
  diaChi: {
    flexWrap: "wrap",
  },
  container: {
    padding: 10,
  },
  textInput: {
    width: '100%',
    height: 40,
    borderBottomColor: "#ABABAB",
    borderBottomWidth: 1.5,
  },
  // Nút Thêm
  button: {
    height: 50,
    backgroundColor: "#52CC6D",
    borderRadius: 8,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
  },
  Add: {
    color: "#FFFFFF",
    fontWeight: "600",
    justifyContent: "center",
    alignItems: "center",
    height: 25,
    fontStyle: "bold",
    fontSize: 18,
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    marginTop: 10,
    borderRadius: 3,
    borderWidth: 1,
  },
  dialog: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8
  },
});

// var addresses = [
//   { // item
//     "_id": "6361de0da41a7bf6b4cf6a09",
//     "address": "số 45A, đườngTran Hung Dao, phường11, quậnQuan 1, Ho Chi Minh",
//     "phone_number": "0987654321",
//     "default": false,
//     "user_id": {
//       "_id": "635b993222cdefc4bdb25e7b",
//       "full_name": "doraemon",
//       "email": "an@gmail.com",
//       "password": "$2a$10$Eu/RwCSy1uVQnysq/ZhUv.B9Bl1weZ9JJajtahrKFKj/FBvp2KIdW",
//       "phone_number": "0934041111",
//       "createdAt": "2022-10-28T08:56:18.190Z",
//       "updatedAt": "2022-11-18T11:57:35.336Z",
//       "__v": 0
//     }
//   },
//   {
//     "_id": "63621833a76e8a69574c23d9",
//     "address": "số 124, đườngQuang Trung, phường11, quậnGo Vap, Ho Chi Minh",
//     "phone_number": "0987654657",
//     "default": true,
//     "user_id": {
//       "_id": "635b993222cdefc4bdb25e7b",
//       "full_name": "doraemon",
//       "email": "an@gmail.com",
//       "password": "$2a$10$Eu/RwCSy1uVQnysq/ZhUv.B9Bl1weZ9JJajtahrKFKj/FBvp2KIdW",
//       "phone_number": "0934041111",
//       "createdAt": "2022-10-28T08:56:18.190Z",
//       "updatedAt": "2022-11-18T11:57:35.336Z",
//       "__v": 0
//     }
//   }
// ]
