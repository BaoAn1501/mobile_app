import { View, Text } from 'react-native'
import React, { useContext, useState } from 'react'
import { UserContext } from '../../user/UserContext'

const ChangeName = (props) => {
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
    } else {
        ToastAndroid.show('Đổi tên người dùng thất bại', ToastAndroid.BOTTOM);
    }
}
  return (
    <View>
      <Text>ChangeName</Text>
      <TextInput
        style={styles.textInput} 
        placeholder='Họ và tên' 
        onChangeText={setFullName}/>
    </View>
  )
}

export default ChangeName