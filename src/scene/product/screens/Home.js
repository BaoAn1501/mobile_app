import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  SafeAreaView,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { IP } from "../../../utils/constants";
import { ProductContext } from "../ProductContext";

const Home = (props) => {
  const { navigation } = props;
  const { onGetCategoriesForHomePage, onGetProductsForHomePage } =
    useContext(ProductContext);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getCategories() {
      const res1 = await onGetCategoriesForHomePage();
      console.log("getCategories in UI: ", res1);
      setCategories(res1);
    }
    async function getProducts() {
      const res2 = await onGetProductsForHomePage();
      console.log("getProducts in UI: ", res2);
      setProducts(res2);
    }
    getCategories();
    getProducts();
    console.log(IP, "IP");
  }, []);

  function convertIP(image) {
    image = image.replace("localhost", IP);
    return image;
  }
  const renderProductItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("ProductDetail", { id: item._id })}
        style={styles.productItem}
        key={Math.random()}
      >
        <Image
          style={styles.productImage}
          resizeMode="cover"
          source={{ uri: convertIP(item.image1) }}
        />
        <View style={styles.productInfoContainer}>
          <View style={styles.productNameContainer}>
            <Text numberOfLines={1} style={styles.productName}>
              {item.name}
            </Text>
          </View>

          <View style={styles.productPriceContainer}>
            <Text style={styles.productPrice}>{item.price} đ</Text>
            <View style={styles.productRatingContainer}>
              <Text style={styles.productRating}>{item.rating}</Text>
              <Entypo
                style={{ marginTop: 2 }}
                name="star"
                size={14}
                color="yellow"
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Loại Sản Phẩm
  const renderCategoryItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.categoryItem}
        onPress={() =>
          navigation.navigate("ProductsInCategory", { id: item._id })
        }
      >
        <Text style={{ paddingBottom: 5 }} numberOfLines={1}>
          {item.name}
        </Text>
        <Image
          style={styles.imageCategoryItem}
          resizeMode="cover"
          source={{ uri: convertIP(item.image) }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.titleContainer}>
              <FontAwesome
                style={styles.avatarImage}
                name="user-circle"
                size={32}
                color="black"
              />
              <Text style={styles.usernameText}>Bình Thạnh</Text>
            </View>
            <View style={styles.searchContainer}>
              <FontAwesome5
                onPress={() => navigation.navigate("SearchProduct")}
                style={styles.searchIcon}
                name="search"
                size={18}
                color="black"
              />
              <TextInput
                placeholder="Tìm món"
                editable={false}
              />
            </View>
          </View>
          <View style={styles.categoriesContainer}>
            {
              <FlatList
                style={styles.categoriesListContainer}
                data={categories} //mảng
                renderItem={renderCategoryItem} // hiển thị từng item trong danh sách
                keyExtractor={(item) => item._id}
                numColumns={3}
              />
            }
          </View>
          <View style={styles.textContainer}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
              }}
            >
              {" "}
              Uống Gì Hôm Nay ?{" "}
            </Text>
            <Entypo
              name="chevron-right"
              size={30}
              color="#1BAC4B"
              onPress={() => navigation.navigate("AllProducts")}
            />
          </View>
          <View style={styles.productsContainer}>
            {
              <FlatList
                style={styles.productListContainer}
                data={products} //mảng
                renderItem={renderProductItem} // hiển thị từng item trong danh sách
                // keyExtractor={() => Math.random()}
                keyExtractor={(item) => item._id}
                numColumns={2}
              />
            }
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  headerContainer: {},
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
    marginLeft: 5,
  },
  avatarImage: {
    marginStart: 8,
  },
  usernameText: {
    marginLeft: 16,
  },
  searchContainer: {
    marginTop: 10,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 8,
    borderColor: "white",
    borderWidth: 1,
    padding: 5,
    backgroundColor: "white",
    marginHorizontal: 8,
  },
  searchIcon: {
    marginHorizontal: 10,
  },
  bodyContainer: {
    width: "100%",
  },
  categoriesContainer: {
    alignItems: "center",
  },
  categoriesListContainer: {
    flexGrow: 1,
    padding: 8,
  },
  categoryItem: {
    direction: "flex",
    flexDirection: "column",
    borderColor: "white",
    backgroundColor: "white",
    borderRadius: 8,
    width: 90,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginHorizontal: 8,
    marginVertical: 8,
  },
  imageCategoryItem: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  textContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    margin: 8,
  },
  productsContainer: {
    alignItems: "center",
  },
  productListContainer: {
    flexGrow: 1,
    padding: 8,
  },
  productItem: {
    direction: "flex",
    flexDirection: "column",
    borderColor: "white",
    backgroundColor: "white",
    borderRadius: 8,
    width: "45%",
    height: "auto",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    margin: 8,
  },
  productInfoContainer: {
    width: "100%",
  },
  productPriceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
    justifyContent: "space-between",
  },
  productPrice: {
    color: "#007537",
    fontSize: 16,
    fontWeight: "700",
  },

  productRatingContainer: {
    flexDirection: "row",
  },

  productRating: {
    fontSize: 14,
    fontWeight: "700",
    marginEnd: 4,
  },

  productNameContainer: {
    marginTop: 4,
  },

  productName: {
    fontSize: 16,
    marginHorizontal: 8,
    color: "#221F1F",
    fontWeight: "500",
  },

  productImage: {
    width: "80%",
    height: 120,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
