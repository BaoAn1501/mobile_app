import { StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, {useState, useContext, useEffect} from 'react'
import { UserContext } from '../../user/UserContext';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ChangePass = (props) => {
  const {navigation} = props;
  const { userID, onChangePass, onLogout } = useContext(UserContext);

  const [password, setPassword] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');

  const [hidePass1, setHidePass1] = useState(true);
  const [hidePass2, setHidePass2] = useState(true);
  const [hidePass3, setHidePass3] = useState(true);
  const [myIcon1, setMyIcon1] = useState('');
  const [myIcon2, setMyIcon2] = useState('');
  const [myIcon3, setMyIcon3] = useState('');

  useEffect(() => {
    if(!password){
      setMyIcon1('');
    } else {
      hidePass1==true ? setMyIcon1('eye') : setMyIcon1('eye-slash');
    }
    if(!newPass){
      setMyIcon2('');
    } else {
      hidePass2==true ? setMyIcon2('eye') : setMyIcon2('eye-slash');
    }

    if(!confirm){
      setMyIcon3('');
    } else {
      hidePass3==true ? setMyIcon3('eye') : setMyIcon3('eye-slash');
    }

  });

  const checkIcon1 = () => {
      if(myIcon1!=''){
          if(myIcon1=='eye'){
              setHidePass1(false);
              setMyIcon1('eye-slash');
          } else {
              setHidePass1(true);
              setMyIcon1('eye');
          }
      }
  }

  const checkIcon2 = () => {
      if(myIcon2!=''){
          if(myIcon2=='eye'){
              setHidePass2(false);
              setMyIcon2('eye-slash');
          } else {
              setHidePass2(true);
              setMyIcon2('eye');
          }
      }
  }

  const checkIcon3 = () => {
    if(myIcon3!=''){
        if(myIcon3=='eye'){
            setHidePass3(false);
            setMyIcon3('eye-slash');
        } else {
            setHidePass3(true);
            setMyIcon3('eye');
        }
    }
  }

  async function ChangePass() {
    if(!password || !newPass || !confirm || 
      password.trim().length==0 || newPass.trim().length==0 || confirm.trim().length==0){
      ToastAndroid.show('Bạn chưa nhập đầy đủ thông tin', ToastAndroid.BOTTOM);
      return;
    } else if(newPass != confirm) {
      ToastAndroid.show('Mật khẩu mới không trùng khớp', ToastAndroid.BOTTOM);
    } else if(newPass.length<8){
      ToastAndroid.show('Mật khẩu phải có ít nhất 8 ký tự', ToastAndroid.BOTTOM);
    } else {
      const res = await onChangePass(userID, password, newPass);
      if(res){
        if(res.status==false){
          ToastAndroid.show(res.message, ToastAndroid.BOTTOM);
        } else {
          ToastAndroid.show(res.message, ToastAndroid.BOTTOM);
          onLogout();
        }
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.inputBox, styles.passwordBox]}>
        <TextInput
            style={styles.textInput} 
            secureTextEntry={hidePass1}
            placeholder='Mật khẩu hiện tại' 
            onChangeText={setPassword}/>
        <Icon
            style={styles.myIcon}
            name={myIcon1}
            onPress={()=>checkIcon1()}
            color='grey'
            size={14} />    
      </View>
      <View style={[styles.inputBox, styles.passwordBox]}>
        <TextInput
            style={styles.textInput} 
            secureTextEntry={hidePass2}
            placeholder='Mật khẩu mới' 
            onChangeText={setNewPass}/>
        <Icon
            style={styles.myIcon}
            name={myIcon2}
            onPress={()=>checkIcon2()}
            color='grey'
            size={14} />    
      </View>
      <View style={[styles.inputBox, styles.passwordBox]}>
        <TextInput
            style={styles.textInput} 
            secureTextEntry={hidePass3}
            placeholder='Xác nhận mật khẩu mới' 
            onChangeText={setConfirm}/>
        <Icon
            style={styles.myIcon}
            name={myIcon3}
            onPress={()=>checkIcon3()}
            color='grey'
            size={14} />    
      </View>
      <TouchableOpacity style={styles.button} onPress={()=>ChangePass()}>
        <Text style={styles.buttonText}>Cập nhật thông tin</Text>
      </TouchableOpacity>
  </View>
  )
}

export default ChangePass

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  inputBox: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 10
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
    borderRadius: 5,
    marginTop: 10
  },
  buttonText: {
    color: 'white',
    fontWeight: '700'
  },
  passwordBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  myIcon: {
      alignSelf: 'center',
      position: 'absolute',
      right: 10,
  },
  textInput: {
    width: '90%',
    height: 40,
},
})