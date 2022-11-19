import { View, Text , StyleSheet , TextInput,Pressable , ToastAndroid} from 'react-native'
import React, { useContext, useState } from 'react'
import { UserContext } from '../../user/UserContext'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


export const ChangeName = (props) => {
  const {navigation} = props;
  const {onChangeName, userID} = useContext(UserContext);
  const [full_name, setFullName] = useState('');


  const changeFullName = async () => {
    if(!full_name || full_name.trim().length==0){
        ToastAndroid.show('Bạn chưa nhập tên người dùng', ToastAndroid.BOTTOM);
        return;
    }
    const res = await onChangeName(userID, full_name);
    if(res){
        ToastAndroid.show(res.message, ToastAndroid.BOTTOM);
        navigation.goBack();
    } else {
        ToastAndroid.show('Đổi tên người dùng thất bại', ToastAndroid.BOTTOM);
    }
}
  return (
  
    <View style={styles.container}>
      <TextInput placeholder='Họ và tên' 
        onChangeText={setFullName} style={styles.input}></TextInput>
      <Pressable style={styles.button} onPress = {()=>changeFullName()}>
        <Text style={styles.buttonText}>Cập nhật thông tin</Text>
      </Pressable>
  </View>
  )
}

const styles = StyleSheet.create({
  input: {
    width: '90%',
    height: 33,
    borderBottomWidth: 1,
    paddingStart: 10,
    margin: 20
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
    borderRadius: 5
  },
  buttonText: {
    color: 'white',
    fontWeight: '700'
  },
});