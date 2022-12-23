import { StyleSheet, Text, View, Image } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "../../user/UserContext";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

const Profile = (props) => {
  const { navigation } = props;
  const { onGetUser, userID, onLogout } = useContext(UserContext);
  const [user, setUser] = useState({});

  useEffect(() => {
    async function getUser() {
      const res1 = await onGetUser(userID);
      setUser(res1);
    };
    getUser();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Thông tin cá nhân</Text>
        <View style={{ alignItems: "center" }}>
          <Image
            style={styles.avatar}
            source={{
              uri: user.avatar
                ? user.avatar
                : "https://cdn-icons-png.flaticon.com/512/1946/1946429.png",
            }}
          ></Image>
        </View>
        <View style={styles.info}>
          <Text>Name: {user.full_name}</Text>
          <Text style={{ marginTop: 10 }}>Email: {user.email}</Text>
        </View>
        <View style={styles.partContainer}>
          <Text style={styles.part_title}>Tài khoản</Text>

          <View style={styles.row}>
            <View style={styles.left_part}>
              <FontAwesome
                style={styles.icon}
                resizeMode="cover"
                name="user"
                size={18}
                color="#828282"
              />
              <Text style={styles.text}>Sửa thông tin</Text>
            </View>
            <MaterialIcons
              style={styles.right_icon}
              resizeMode="cover"
              name="navigate-next"
              size={18}
              color="#828282"
              onPress={() => {
                navigation.navigate("ChangeName");
              }}
            />
          </View>

          <View style={styles.row}>
            <View style={styles.left_part}>
              <Fontisto
                style={styles.icon}
                resizeMode="cover"
                name="key"
                size={13}
                color="#828282"
              />
              <Text style={styles.text}>Đổi mật khẩu</Text>
            </View>
            <MaterialIcons
              style={styles.right_icon}
              resizeMode="cover"
              name="navigate-next"
              size={18}
              color="#828282"
              onPress={() => {
                navigation.navigate("ChangePass");
              }}
            />
          </View>
        </View>

        <View style={styles.partContainer}>
          <Text style={styles.part_title}>General</Text>
          <View style={styles.row}>
            <View style={styles.left_part}>
              <AntDesign name="shoppingcart" size={15} color="black" />
              <Text style={styles.text}>Giỏ hàng</Text>
            </View>
            <MaterialIcons
              style={styles.right_icon}
              resizeMode="cover"
              name="navigate-next"
              size={18}
              color="#828282"
              onPress={() => {
                navigation.navigate("Carts");
              }}
            />
          </View>
          <View style={styles.row}>
            <View style={styles.left_part}>
              <Feather
                style={styles.icon}
                resizeMode="cover"
                name="box"
                size={15}
                color="#828282"
              />
              <Text style={styles.text}>Lịch sử đặt hàng</Text>
            </View>

            <MaterialIcons
              style={styles.right_icon}
              resizeMode="cover"
              name="navigate-next"
              size={18}
              color="#828282"
              onPress={() => {
                navigation.navigate("History");
              }}
            />
          </View>
          <View style={styles.row}>
            <View style={styles.left_part}>
              <FontAwesome
                style={{marginStart: 3}}
                resizeMode="cover"
                name="map-marker"
                size={18}
                color="#828282"
              />
              <Text style={styles.text}>Địa chỉ giao hàng</Text>
            </View>
            <MaterialIcons
              style={styles.right_icon}
              resizeMode="cover"
              name="navigate-next"
              size={18}
              color="#828282"
              onPress={() => {
                navigation.navigate("Address");
              }}
            />
          </View>

          <View style={styles.row}>
            <View style={styles.left_part}>
            <AntDesign name="star" size={15} color="gray"  />
              <Text style={styles.text}>Đánh Giá</Text>
            </View>
            <MaterialIcons
              style={styles.right_icon}
              resizeMode="cover"
              name="navigate-next"
              size={18}
              color="#828282"
              onPress={() => {
                navigation.navigate("ReviewPage");
              }}
            />
          </View>
        </View>

        <View style={styles.partContainer}>
          <Text style={styles.part_title}>App Settings</Text>
          

          <View style={[styles.row, {marginBottom: 20}]}>
            <View style={styles.left_part}>
              <Ionicons
                style={styles.icon}
                resizeMode="cover"
                name="ios-log-out-outline"
                size={15}
                color="#828282"
              />
              <Text style={styles.text}>Logout</Text>
            </View>
            <MaterialIcons
              style={styles.right_icon}
              resizeMode="cover"
              name="navigate-next"
              size={18}
              color="#828282"
              onPress={() => {
                onLogout();
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  icon: {
    
  },
  text:{
    marginStart: 20,
    fontSize: 16
  },
  avatar: {
    marginTop: 20,
    width: 120,
    height: 120,
  },
  info: {
    marginHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    alignItems: 'center',
    marginTop: 5
  },
  left_part: {
    flexDirection: "row",
    alignItems: 'center'
  },
  part_title: {
    fontSize: 14,
    textAlign: "left",
    color: "#52CC6D",
    left: 18,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    borderBottomColor: "#E0E0E0",
    borderBottomWidth: 1,
    height: 38,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  partContainer: {
    marginTop: 10
  },
});
