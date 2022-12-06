import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Image, FlatList, SafeAreaView, Pressable, TouchableOpacity, } from "react-native";
import { Entypo } from "@expo/vector-icons";

import { IP } from "../../../utils/constants";
import { ProductContext } from "../ProductContext";

const ProductsInCategory = (props) => {
  const { navigation, route: { params: { id } } } = props;
  console.log("id: ", id);
  const { onGetProductsInCategory } = useContext(ProductContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProductsInCategory() {
      const res1 = await onGetProductsInCategory(id);
      console.log("getCategories in UI: ", res1);
      setProducts(res1);
    }
    getProductsInCategory();
    console.log(IP, "IP");
  }, []);

  function convertIP(image) {
    image = image.replace("localhost", IP);
    return image;
  }
  const renderProductItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("ProductDetail", { id: item._id, slug: item.size })}
        style={styles.productsInCategoryItem}
        key={Math.random()}
      >
        <Image
          resizeMode="contain" 
          style={[styles.imgOutOfStock, {display: item.status.code!=2 ? 'none' : 'flex'}]} 
          source={{uri : 'https://vn-test-11.slatic.net/p/7d0e46288cad767c319ea4aa8e6f8b75.png'}} />
        <Image
          style={styles.productsInCategoryImage}
          resizeMode="cover"
          source={{ uri: convertIP(item.image1) }}
        />
        <View style={styles.productsInCategoryInfoContainer}>
          <View style={styles.productsInCategoryNameContainer}>
            <Text numberOfLines={1} style={styles.productsInCategoryName}>
              {item.name}
            </Text>
          </View>

          <View style={styles.productsInCategoryPriceContainer}>
            <Text style={styles.productsInCategoryPrice}>{item.price} đ</Text>
            <View style={styles.productsInCategoryRatingContainer}>
              <Text style={styles.productsInCategoryRating}>{item.rating}</Text>
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

  // const renderHeader = () => {
  //   return (
  //     <View style={styles.TextContainer}>
  //       <Text style={{ fontSize: 22, marginLeft: 125 }}> Cà phê </Text>
  //     </View>
  //   );
  // };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {
          products.length > 0 ?  
          <FlatList
            style={styles.productsInCategoryListContainer}
            data={products}
            renderItem={renderProductItem}
            keyExtractor={(item) => item._id}
            numColumns={2}
            // ListHeaderComponent={renderHeader}
          />
          :
          <Image style={{justifyContent: 'center', alignItems: 'center'}} source={{uri: 'http://www.wholesalegang.com/assets/imgs/noproduct.png'}} />
        }
      </View>
    </SafeAreaView>
  );
};

export default ProductsInCategory;

const styles = StyleSheet.create({
  productsInCategoryName: {
    fontSize: 16,
    marginHorizontal: 8,
    color: "#221F1F",
    fontWeight: "500",
  }
  ,
  productsInCategoryNameContainer: {
    marginTop: 4,
  },

  productsInCategoryListContainer: {
    flexGrow: 1,
    padding: 8,
  },
  categoriesListContainer: {
    flexGrow: 1,
    padding: 8,
  },
  productsInCategoryRating: {
    fontSize: 14,
    fontWeight: "700",
    marginEnd: 4,
  },
  productsInCategoryInfoContainer: {
    width: "100%",
  },
  productsInCategoryPriceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
    justifyContent: "space-between",
  },
  productsInCategoryPrice: {
    color: "#007537",
    fontSize: 16,
    fontWeight: "700",
  },

  productsInCategoryRatingContainer: {
    flexDirection: "row",
  },
  productsInCategoryItem: {
    position: 'relative',
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

  productsInCategoryRatingContainer: {
    flexDirection: "row",
  },
  productsInCategoryImage: {
    width: "80%",
    height: 120,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  categoryPriceContainer: {
    flexDirection: "row",
  },

  categoryPrice: {
    color: "#007537",
    fontSize: 19,

  },
  categoryGach: {
    marginTop: -2,
    fontSize: 19,
    color: "#C0C0C0"
  },

  categoryRating: {
    marginTop: 4,
    fontSize: 17,
    color: "#C0C0C0"

  },

  categoryNameContainer: {
    marginTop: 4,
  },

  categoryName: {

    fontSize: 18,
    color: "#221F1F",
    marginLeft: -50

  },

  categorycontainer: {
    paddingHorizontal: 25,
  },

  categoryImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },

  categoryImageContainer: {
    alignItems: "center",
    height: 200,
    backgroundColor: "white",
    justifyContent: "center",
    borderRadius: 10,
    borderColor: "#000000",
    borderWidth: 1,
  },

  imgOutOfStock: {
    height: 70,
    width: 70,
    left: 0,
    top: 0,
    position: 'absolute'
  },

  category: {
    width: "46%",
    marginTop: 30,
  },

  categorysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  TextContainer: {
    marginTop: 50,
    marginLeft: 20,
    flexDirection: "row",
  },

  container: {
    width: "100%",
    height: "100%",
    flexGrow: 1,
    backgroundColor: "#F6F6F6",
  },
});

