import { StyleSheet, FlatList, Text, View, Modal, TouchableOpacity, useWindowDimensions, SafeAreaView, ScrollView, Image } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { UserContext } from "../../user/UserContext";
import { color } from '@rneui/base';
import { TabView, SceneMap } from 'react-native-tab-view';

export const SuccessRoute = (props) => {
  const {navigation} = props;
  const { userID, onGetSuccessOrders } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async function PendingOrders () {
      const res1 = await onGetSuccessOrders(userID);
        if(res1){
          setOrders(res1);
        }
    })()
  }, []);

  const SetTime = (time) => {
    return String(time).slice(0, 19).replace('T', ' ');
  }

  const renderItem = ({item}) => {
    return (
      <View style={styles.item}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: 'blue'}}>{item.status.name}</Text>
            <Text style={{marginLeft: 30}}>{SetTime(item.updatedAt)}</Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 8}}>
            <Text>{item.total} đ</Text>
            <Text style={{marginLeft: 10}}>({item.payment_id == 1 ? 'Tiền mặt' : 'Ví điện tử'})</Text>
          </View>
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate("OrderDetail", { id: item._id})}>
          <Text style={{color: 'green'}}>Chi tiết</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  return(
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          {
            orders.length > 0 ?
            <FlatList
              data={orders}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            /> :
            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 200}}>
              <Image style={{width: 150, height: 150, resizeMode:'contain'}} source={{uri: 'https://cdn-icons-png.flaticon.com/512/1548/1548682.png'}}/>
              <Text>Bạn chưa có đơn hàng nào</Text>
              <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
                <Text style={{color: 'green'}}>Đặt món ngay</Text>
              </TouchableOpacity>
            </View>
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
};

export const CancelRoute = (props) => {
  const {navigation} = props;
  const { userID, onGetCancelOrders } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async function PendingOrders () {
      const res1 = await onGetCancelOrders(userID);
        if(res1){
          setOrders(res1);
        }
    })()
  }, []);

  const SetTime = (time) => {
    return String(time).slice(0, 19).replace('T', ' ');
  }

  const renderItem = ({item}) => {
    return (
      <View style={styles.item}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: 'green'}}>{item.status.name}</Text>
            <Text style={{marginLeft: 30}}>{SetTime(item.updatedAt)}</Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 8}}>
            <Text>{item.total} đ</Text>
            <Text style={{marginLeft: 10}}>({item.payment_id == 1 ? 'Tiền mặt' : 'Ví điện tử'})</Text>
          </View>
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate("OrderDetail", { id: item._id})}>
          <Text style={{color: 'green'}}>Chi tiết</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  return(
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          {
            orders.length > 0 ?
            <FlatList
              data={orders}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            /> :
            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 200}}>
              <Image style={{width: 150, height: 150, resizeMode:'contain'}} source={{uri: 'https://cdn-icons-png.flaticon.com/512/1548/1548682.png'}}/>
              <Text>Bạn chưa có đơn hàng nào</Text>
              <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
                <Text style={{color: 'green'}}>Đặt món ngay</Text>
              </TouchableOpacity>
            </View>
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
};


const HistoryShopping = (props) => {
  const {navigation} = props;
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'success', title: 'Đã giao hàng' },
    { key: 'canceled', title: 'Đã hủy' },
  ]);
  
  const renderScene = SceneMap({
    success: () => SuccessRoute({navigation}),
    canceled: () => CancelRoute({navigation}),
  });

  return (
    <TabView
      navigationState={{ index, routes, navigation }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  )
}

export default HistoryShopping

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    borderBottomColor: "#E0E0E0",
    borderBottomWidth: 1,
    height: 38,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  item: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  touch: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
})