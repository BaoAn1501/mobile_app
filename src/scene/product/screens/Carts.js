import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Pressable,
  StatusBar,
  ScrollView,
  TextInput,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { CheckBox } from "@rneui/base";
import { EvilIcons } from '@expo/vector-icons';
const windowWidth = Dimensions.get('window').width;

export const Carts = (props) => {
  const { navigation } = props;
  
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => (
        <EvilIcons name="trash" size={24} color="black" onPress={()=>{
          console.log('bam vao thung rac');
        }}/>
      ),
    });
  }, [navigation]);
  const cartItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.leftPart}>
          <CheckBox
            style={styles.checkBox}
            checked={checked}
            onPress={() => {
              setChecked(!checked);
            }}
          />
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{ uri: item.productSize_id.image1 }}
          />
          <View style={styles.info}>
            <Text style={styles.name}>{item.productSize_id.name}</Text>
            <Text style={styles.size}>S</Text>
            <Text style={styles.price}>$ {item.productSize_id.price}</Text>
          </View>
        </View>
        <View style={styles.rightPart}>
          <View style={[styles.actionContainer, styles.actionLeft]}>
            <Text onPress={() => {}} style={styles.actionText}>
              -
            </Text>
          </View>
          <View style={styles.quantityContainer}>
            <Text style={styles.quantity}>{item.quantity}</Text>
          </View>
          <View style={[styles.actionContainer, styles.actionRight]}>
            <Text onPress={() => {}} style={styles.actionText}>
              +
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        <View style={styles.leftFooter}>
          <Text style={styles.total}>$24</Text>
        </View>
        <View style={styles.rightFooter}>
          <Pressable style={styles.button} onPress={() => {}}>
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
          <FlatList
            data={carts}
            renderItem={cartItem}
            keyExtractor={(item) => item._id}
            ListFooterComponent={renderFooter}
          />
        }
      </View>
    </SafeAreaView>
  );
};

export default Carts;
const styles = StyleSheet.create({
  container: {
    
  },
  itemContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 0.5,
    borderColor: 'white',
    borderRadius: 3,
    marginHorizontal: 10,
    marginTop: 16,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
  },
  leftPart: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightPart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    height: 80,
    width: 100,
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  image: {
    height: 80,
    width: 80
  },
  name: {
    fontWeight: 'bold'
  },
  actionContainer: {
    width: 32,
    height: 32,
    borderColor: 'green',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
    color: 'green'
  },
  quantityContainer: {
    backgroundColor: 'green',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'green',
    height: 32,
    width: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    color: 'white',
    fontWeight: 'bold'
  },
  footer: {
    flexDirection: 'row',
    marginVertical: 20,
    alignItems: 'center',
    paddingVertical: 8,
    // width: windowWidth,
    marginHorizontal: 30,
    height: 40,
    backgroundColor: 'green',
    borderRadius: 8,
  },
  leftFooter: {
    width: windowWidth*0.2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'green',
  },
  rightFooter: {
    justifyContent: 'center',
    height: 40,
    alignItems: 'center',
    width: windowWidth*0.64,
    borderTopEndRadius: 8,
    borderBottomEndRadius: 8,
    borderWidth: 1,
    borderColor: 'green',
    backgroundColor: 'green',
  },
  total: {
    color: 'white',
    fontWeight: 'bold'
  },
  button: {

  },
  buttonText: {
    color: 'white'
  }
});
var carts = [
  {
    // cart
    _id: "63760ecbb48c46de53df8510",
    productSize_id: {
      name: "Coffee ",
      image1:
        "https://xuconcept.com/wp-content/uploads/2020/12/anh-ly-ca-phe-dep-2.jpg",

      _id: "635bb92416c74c1068deccd9",
      size_id: "6356bff812392326d6c82c8f",
      product_id: "635bb92416c74c1068deccd6",
      price: 11,
      deleted: false,
      createdAt: "2022-10-28T11:12:36.610Z",
      updatedAt: "2022-10-29T00:12:22.898Z",
      __v: 0,
    },
    user_id: {
      _id: "635b993222cdefc4bdb25e7b",
      full_name: "bao an",
      email: "an@gmail.com",
      password: "$2a$10$Eu/RwCSy1uVQnysq/ZhUv.B9Bl1weZ9JJajtahrKFKj/FBvp2KIdW",
      phone_number: "0934041111",
      createdAt: "2022-10-28T08:56:18.190Z",
      updatedAt: "2022-10-28T08:56:18.190Z",
      __v: 0,
    },
    quantity: 3,
  },
  {
    _id: "637627fd9b77f77efa5a509b",
    productSize_id: {
      name: "Coffee ",
      _id: "635bcf378cf462b73ca1c1d5",

      image1:
        "https://xuconcept.com/wp-content/uploads/2020/12/anh-ly-ca-phe-dep-2.jpg",
      size_id: "6356bffd12392326d6c82c93",
      product_id: "635bcf378cf462b73ca1c1d1",
      price: 15,
      deleted: false,
      createdAt: "2022-10-28T12:46:47.546Z",
      updatedAt: "2022-11-10T05:19:27.233Z",
      __v: 0,
    },
    user_id: {
      _id: "635b993222cdefc4bdb25e7b",
      full_name: "bao an",
      email: "an@gmail.com",
      password: "$2a$10$Eu/RwCSy1uVQnysq/ZhUv.B9Bl1weZ9JJajtahrKFKj/FBvp2KIdW",
      phone_number: "0934041111",
      createdAt: "2022-10-28T08:56:18.190Z",
      updatedAt: "2022-10-28T08:56:18.190Z",
      __v: 0,
    },
    quantity: 2,
  },
];
