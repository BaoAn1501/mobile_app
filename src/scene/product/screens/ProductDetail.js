import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  ToastAndroid,
  Modal,
  Dimensions
} from "react-native";
import PagerView from "react-native-pager-view";
import React, { useContext, useState } from "react";
import { Rating } from "react-native-ratings";
import { ScrollView } from "react-native-gesture-handler";
import Slider from "../../../components/Slider";
import { ButtonGroup } from "@rneui/base";
import { Button } from "react-native-web";
import { ProductContext } from "../ProductContext";
import { useEffect } from "react";
import { IP } from "../../../utils/constants";
import { UserContext } from "../../user/UserContext";
const width = 180;
const height = width;
const windowWidth = Dimensions.get('window').width;


const ImageView = (props) => {

  const {id} = props;
  const { onGetProduct } = useContext(ProductContext);
  const [images, setImages] = useState([]);

  useEffect(()=> {
    ( async function getProduct() {
      const resP = await onGetProduct(id);
      setImages([resP[0].image1, resP[0].image2, resP[0].image3]);
    } )()
  }, [])

  function convertIP(image) {
    image = image.replace("localhost", IP);
    return image;
  }

  return (
    <View style={styles.imageContainer}>
      <PagerView
        style={{ width, height }}
        initialPage={0}
        orientation="horizontal"
      >
        {images.map((img) => (
          <Image
            key={Math.random()}
            source={{
              uri: img
                ? convertIP(img)
                : "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg",
            }}
            style={{ width, height, resizeMode: "cover" }}
          />
        ))}
      </PagerView>
    </View>
  );
}

const InfoView = (props) => {
  const {id, slug, handleClick} = props;
  const {userID} = useContext(UserContext);
  const { onGetProduct, onGetProductSize, onSaveCart } = useContext(ProductContext);
  const [sizes, setSizes] = useState([]);
  const [product, setProduct] = useState([]);
  const [productSize, setProductSize] = useState([]);
  const [first, setFirst] = useState(true);

  useEffect(() => {
    ( async function getProductSize() {
      const resP = await onGetProductSize(id, slug);
      setProductSize(resP);
    } )()
    async function getProduct() {
      const resP = await onGetProduct(id);
      console.log("product one detail: ", resP[0]);
      setSizes(resP);
      setProduct(resP[0]);
    }
    getProduct();
  }, []);

  async function getProductSize (id, slug) {
    const res = await onGetProductSize(id, slug);
    console.log('get product size detail ui: ', res);
    setProductSize(res);
    setFirst(false);
  }

  async function saveCart (id, slug, user_id) {
    const res = await onSaveCart(id, slug, user_id);
    if(res){
      ToastAndroid.show(res.message, ToastAndroid.BOTTOM);
      handleClick();
    }

  }

  return (
    <View style={styles.body}>
      <View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            fontWeight: "700",
            marginVertical: 10,
          }}
        >
          {product.name}
        </Text>
      </View>
      <View
        style={{
          alignItems: "flex-start",
          marginVertical: 10,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Rating
          type="star"
          ratingCount={5}
          imageSize={40}
          ratingColor="yellow"
          readonly
          startingValue={product.rating}
        />
        <Text style={{ fontSize: 18, color: "#9D9D9D", marginLeft: 6 }}>
          (510)
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            color: "black",
            marginTop: 20,
            marginLeft: 24,
          }}
        >
          Giới thiệu
        </Text>
        <Text
          style={{
            fontSize: 13,
            marginTop: 5,
            marginLeft: 32,
            color: "#7C7C7C",
          }}
        >
          {product.description}
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 12,
        }}
      >
        <Text
          style={{
            fontSize: 32,
            color: "#52CC6D",
            marginLeft: 32,
            fontWeight: "700",
            textShadowColor: 'gray',
            textShadowOffset: {width: -1, height: 1},
            textShadowRadius: 5
          }}
        >
          {
            productSize.price
          }
        </Text>
        <Text style={{ marginStart: 24 }}> đồng</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginVertical: 10,
          marginStart: 15,
        }}
      >
        {
        sizes.map((item) => (
          <TouchableOpacity
            key={item._id}
            onPress={()=>{ getProductSize(id, item.size_symbol)}}
            style={
              styles.sizeBox
            }
          >
            <Text style={{ color: "green" }}>{item.size_symbol}</Text>
          </TouchableOpacity>
        ))
        }
      </View>
      <View>
        <TouchableOpacity
          onPress={()=>{
            saveCart(id, productSize.size_symbol, userID);
          }}
          style={styles.buttonContainer}
          styles={{ opacity: 0.5 }}
        >
          <Text style={styles.add}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export const ProductDetail = (props) => {
  const {
    navigation,
    route: {
      params: { id, slug },
    },
  } = props;

  const handleClick = () => {
    navigation.navigate('Carts');
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <ImageView id={id}/>
        <InfoView id={id} slug={slug} handleClick={handleClick}/>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 5,
    display: "flex",
    flexDirection: "column",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    width: "100%",
    height: height,
  },
  text: {
    fontSize: 20,
    width: 200,
    fontWeight: "500",
    color: "black",
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: "black",
  },
  buttonContainer: {
    height: 50,
    borderRadius: 8,
    marginTop: 10,
    marginHorizontal: 20,
    backgroundColor: "#52CC6D",
    justifyContent: "center",
    alignItems: "center",
  },
  add: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
  sizeBox: {
    width: 24,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    padding: 2,
    borderColor: "green",
    borderRadius: 8,
    borderWidth: 1,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
