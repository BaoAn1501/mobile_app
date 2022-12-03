import { StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  FlatList,
  Image,
  Button,
  Pressable, } from 'react-native'
import React, {useContext, useState, useEffect,useCallback,useRef} from "react";
import { MaterialIcons } from '@expo/vector-icons';
import RBSheet from "react-native-raw-bottom-sheet";
import { ScrollView } from "react-native-gesture-handler";
import { CardField } from '@stripe/stripe-react-native';
import { AntDesign } from "@expo/vector-icons";

const Cards = (props) => {

  const refRBSheet = useRef();
  const {navigation} = props;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AntDesign
        name="pluscircleo"
        size={28}
        color="black"
        style={{ marginRight: 20 }}
        onPress={() => refRBSheet.current.open()}
      />
      ),
    });
  }, [navigation]);



  const renderCards = ({item}) => {
    return (
      <View style={styles.container}>
          <Image style={{width: 60, height: 40, resizeMode:'contain'}} 
          source={{uri: item.imageCard}}/>
          <View style={styles.tenMaThe}>
            <Text style={{fontSize: 16}}>{item.nameCard}</Text>
            <Text style={{fontSize: 12}}>{item.codeCard}</Text>
          </View>
          <MaterialIcons style={{marginTop: 2}} name="navigate-next" size={34} color="#919191" />
        </View>
    );
  };

  return(
    <SafeAreaView>
      <ScrollView>
          <View style={styles.containers}>
            {
              // dk ? (dung) : (sai)
              cardss.length > 0 ?
              <FlatList
                data={cardss}
                renderItem={renderCards}
                keyExtractor={item => item.id}
                //   ListHeaderComponent={renderHeader}
              /> :
              <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 200}}>
                <Image style={{width: 150, height: 150, resizeMode:'contain'}} source={{uri: 'https://cdn-icons-png.flaticon.com/512/1548/1548682.png'}}/>
                <Text>Bạn chưa liên kết thẻ ngân hàng</Text>
              </View>
            }
          </View>
          <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            height={350}
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
         
             
            <View style={{ marginLeft: 10 }}>
              <Text style={{ marginTop: 20 }}>Số Thẻ</Text>
              <TextInput placeholder="4239954 " style={styles.textInput} />
            </View>
  
         
            <View style={{ marginLeft: 10 }}>
              <Text style={{ marginTop: 20 }}>Ngày Hết Hạn</Text>
              <TextInput placeholder="3/12 " style={styles.textInput} />
            </View>
  
            <View style={{ marginLeft: 10 }}>
              <Text style={{ marginTop: 20 }}>CCV</Text>
              <TextInput placeholder="***" style={styles.textInput} />
            </View>
  
            <View style={styles.ButtonContainer}>
            <Pressable style={styles.button}>
                <Text style={styles.Add}> Thêm </Text>
              </Pressable>
              </View>



          </RBSheet>
        </ScrollView>
      </SafeAreaView>
  )
  
}

export default Cards

const styles = StyleSheet.create({
  tenMaThe:{
    width: 300,
    justifyContent: 'space-between',
  },
  container:{
    flexDirection: 'row',
    marginTop: 8
  },
  ButtonContainer:{
    justifyContent : 'center',
    alignItems : 'center',
    width: "100%",

  },
  address: {
    marginTop: 10,
    borderColor: "black",
    borderRadius: 3,
    borderWidth: 1,
    width: "100%",
    padding: 8,
  },
 
  
  textInput: {
    width: "96%",
    height: 40,
    borderBottomColor: "#ABABAB",
    borderBottomWidth: 1.5,
  },
  // Nút Thêm
  button: {
    height: 50,
    width: 400,
    backgroundColor: "#52CC6D",
    borderRadius: 8,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
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


})

var cardss = [
  {
      "id": 1,
      "imageCard" : "https://play-lh.googleusercontent.com/czro-ULAemRM1bMldf9gHQ7ajfa9NzKiZXFjI85mxawo60CaKMyHsjWaM38KHiZpsgY",
      "nameCard": "My MasterCard",
      "codeCard": "1918237192371982"
  },
  {
      "id": 2,
      "imageCard" : "https://play-lh.googleusercontent.com/czro-ULAemRM1bMldf9gHQ7ajfa9NzKiZXFjI85mxawo60CaKMyHsjWaM38KHiZpsgY",
      "nameCard": "My MasterCard",
      "codeCard": "1918237192371982"
  },
  {
      "id": 3,
      "imageCard" : "https://play-lh.googleusercontent.com/czro-ULAemRM1bMldf9gHQ7ajfa9NzKiZXFjI85mxawo60CaKMyHsjWaM38KHiZpsgY",
      "nameCard": "My MasterCard",
      "codeCard": "1918237192371982"
  }
]