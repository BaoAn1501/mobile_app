import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  FlatList,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

const MyAddresses = (props) => {

  const CommentItem = ({ item }) => {
    return (
      <View style={styles.address}>
        <Text style={styles.sđt}>SĐT: {item.phone_number}</Text>
        <Text  style={styles.diaChi}>
          Địa chỉ: số {item.number}, đường {item.street},
          phường {item.ward}, quận {item.district}, {item.city}
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
            <FlatList
              data={addresses}
              renderItem={CommentItem}
              keyExtractor={item => Math.random()}
              //   ListHeaderComponent={renderHeader}
            />
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
  {
    number: "12",
    street: "Quang Trung",
    ward: "10",
    district: "Gò Vấp",
    city: "HCM",
    phone_number: "01231231231",
  },
  {
    number: "11",
    street: "Trung",
    ward: "10",
    district: "Go Vap",
    city: "HCM",
    phone_number: "01231231231",
  },
  {
    number: "14",
    street: "Quốc lộ 13",
    ward: "26",
    district: "Bình Thạnh",
    city: "HCM",
    phone_number: "01231231231",
  },
  {
    number: "14",
    street: "Quốc lộ 13",
    ward: "26",
    district: "Bình Thạnh",
    city: "HCM",
    phone_number: "01231231231",
  },
  {
    number: "14",
    street: "Quốc lộ 13",
    ward: "26",
    district: "Bình Thạnh",
    city: "HCM",
    phone_number: "01231231231",
  },
  {
    number: "14",
    street: "Quốc lộ 13",
    ward: "26",
    district: "Bình Thạnh",
    city: "HCM",
    phone_number: "01231231231",
  },
  {
    number: "14",
    street: "Quốc lộ 13",
    ward: "26",
    district: "Bình Thạnh",
    city: "HCM",
    phone_number: "01231231231",
  },
  {
    number: "14",
    street: "Quốc lộ 13",
    ward: "26",
    district: "Bình Thạnh",
    city: "HCM",
    phone_number: "01231231231",
  },
];
