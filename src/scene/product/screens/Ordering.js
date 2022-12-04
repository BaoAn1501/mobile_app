import { StyleSheet, FlatList, Text, View, Modal, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { UserContext } from "../../user/UserContext";
import { color } from '@rneui/base';

const Ordering = (props) => {
  const {navigation} = props;
  const { userID, 
    onGetPendingOrders,
    onCancelOrder } = useContext(UserContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [orders, setOrders] = useState([]);
    const [selected, setSelected] = useState(0);

    useEffect(() => {
      (async function FilterPendingOrders () {
        const res1 = await onGetPendingOrders(userID);
          if(res1){
            setOrders(res1);
          }
      })()
    }, [orders]);

    const SetColorText = (value) => {
      let color = 'black';
      if(value == 1){
        color = 'blue';
      } else if(value == 2){
        color = 'green';
      } else {
        color = 'red'
      }
      return color;
    } 

    const SetTime = (time) => {
      return String(time).slice(0, 19).replace('T', ' ');
    }
  
    const filterList = [
      {
        code: 0,
        name: 'Tất cả đơn hàng'
      },
      {
        code: 1,
        name: 'Đơn hàng đang xử lý'
      },
      {
        code: 2,
        name: 'Đơn hàng thành công'
      },
      {
        code: 3,
        name: 'Đơn hàng đã hủy'
      }
    ]
    const renderItem = ({item}) => {
      return (
        <View style={styles.item}>
          <View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: SetColorText(item.status.code)}}>{item.status.name}</Text>
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
            <Text style={styles.title}>Đơn hàng của tôi</Text>
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
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  {
                    filterList.map((item) => (
                      <TouchableOpacity style={styles.touch} onPress={()=> {setSelected(item.code), setModalVisible(!modalVisible)}}>
                        <Entypo name="circle" size={24} color="black" />
                        <Text style={{marginLeft: 10}}>{item.name}</Text>
                      </TouchableOpacity>
                    ))
                  }
  
                </View>
              </View>
            </Modal>
          </ScrollView>
        </SafeAreaView>
    )
}

export default Ordering

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