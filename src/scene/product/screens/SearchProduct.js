import { StyleSheet, Text, View, Image, TextInput, SafeAreaView, ScrollView, FlatList, TouchableOpacity, ToastAndroid } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../user/UserContext";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { IP } from "../../../utils/constants";

export const SearchProduct = (props) => {
  const { navigation } = props;
  const { userID, 
    onSearch, 
    onCreateSearch,
    onDeleteSearch,
    onShowSearch 
  } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [keyWord, setKeyWord] = useState('');
  const [searchWord, setSearchWord] = useState([]);
  
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerContainer}>
          <View style={styles.searchContainer}>
            <TouchableOpacity onPress={()=>CreateSearchItem(keyWord)}>
              <FontAwesome5
                style={styles.searchIcon}
                name="search"
                size={18}
                color="black"
              />
            </TouchableOpacity>
            <TextInput
              // value={keyWord}
              placeholder="Tìm món"
              onChangeText={(text) => {
                search(text), setKeyWord(text);
              }}
            />
          </View>
        </View>
      ),
    });
  }, [navigation]);

  useEffect(()=>{
    (async function GetSearchList(){
      const res = await onShowSearch(userID);
      if(res){
        setSearchWord(res);
      }
    })();
  }, [searchWord]);

  async function DeleteSearchItem(id){
    const res = await onDeleteSearch(userID, id);
  }

  async function CreateSearchItem(text){
    if(keyWord.length>0){
      console.log('create new keyword');
      const res = await onCreateSearch(userID, text);
      if(res){
        if(res.message){
          ToastAndroid.show(res.message, ToastAndroid.BOTTOM);
        }
      }
    } else {
      console.log('null keyword');
    }
  }


  function convertIP(image) {
    image = image.replace("localhost", IP);
    return image;
  }

  async function search(text) {
    if(text.length>0){
      const res = await onSearch(userID, text);
      setProducts(res);
    } else {
      setProducts([]);
    }
  }

  const keyItem = ({item}) => {
    return (
      <TouchableOpacity style={{marginHorizontal: 8 ,flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomColor: 'grey', borderBottomWidth: 1,}} onPress={()=>{setKeyWord(item.value)}}>
        <Text style={{padding: 8}}>{item.value}</Text>
        <TouchableOpacity onPress={()=>DeleteSearchItem(item._id)}>
          <AntDesign name="close" size={18} color="black" />
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ProductDetail", { id: item._id, slug: item.size  });
        }} 
        key={item._id} 
        style={{flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 8, marginBottom: 8, backgroundColor: 'white', marginHorizontal: 8, alignItems: 'center'}}>
        <Image
          style={{width: 50, height: 50}}
          resizeMode="contain"
          source={{ uri: convertIP(item.image1) }}
        />
        <View style={{marginLeft: 16, justifyContent: 'center'}}>
          <Text numberOfLines={1} style={{}}>
            Tên món: {item.name}
          </Text>
          <Text style={styles.price}>Giá: {item.price} đ</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
    <View style={styles.container}>
      <View>
        {
          searchWord.length > 0 
          ? <FlatList
            style={{marginTop: 10}}
            data={searchWord}
            renderItem={keyItem}
            keyExtractor={(item) => item._id}
          /> : <></>
        }
      </View>
      <ScrollView>
        {
          products.length > 0 ?
          <FlatList
            style={{marginTop: 10}}
            data={products}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
          />
          : 
          <Text style={{textAlign: 'center', marginTop: 10}}>Nhập tên món mà bạn muốn tìm kiếm nào</Text>
        }
      </ScrollView>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  headerContainer: {
    marginRight: 24,
    width: "100%",
    marginVertical: 8,
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 8,
    borderColor: "white",
    borderWidth: 1,
    padding: 5,
    backgroundColor: "#f2f2f2",
    marginHorizontal: 8,
  },
  searchIcon: {
    marginHorizontal: 10,
  },
});
