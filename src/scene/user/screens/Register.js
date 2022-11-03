import React, { useState, useContext, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet, Text, View, Image, TextInput, Pressable,
    KeyboardAvoidingView, ScrollView, ToastAndroid
} from 'react-native';
import { UserContext } from '../UserContext';
import Icon from 'react-native-vector-icons/FontAwesome5';
const SignUp = (props) => {
    const {navigation} = props;
    const { onRegister } = useContext(UserContext);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [hidePass1, setHidePass1] = useState(true);
    const [hidePass2, setHidePass2] = useState(true);
    const [myIcon1, setMyIcon1] = useState('');
    const [myIcon2, setMyIcon2] = useState('');
    
    useEffect(() => {
        if(!password){
          setMyIcon1('');
        } else {
          hidePass1==true ? setMyIcon1('eye') : setMyIcon1('eye-slash');
        }
        if(!confirmPassword){
            setMyIcon2('');
          } else {
            hidePass2==true ? setMyIcon2('eye') : setMyIcon2('eye-slash');
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
    const register = async () => {
        if(!fullName || !email || !password || !confirmPassword
            || fullName.trim().length==0 || email.trim().length==0 || password.trim().length==0
            || confirmPassword.trim().length==0){
            ToastAndroid.show('Bạn chưa nhập đầy đủ thông tin', ToastAndroid.BOTTOM);
            return;
        } else if(password.length<8){
            ToastAndroid.show('Mật khẩu phải có ít nhất 8 ký tự', ToastAndroid.BOTTOM);
            return;
        } else if(password!=confirmPassword) {
            ToastAndroid.show('Mật khẩu không trùng khớp', ToastAndroid.BOTTOM);
            return;
        }
        const res = await onRegister(fullName, email, password, confirmPassword);
        console.log('register result: ', res);
        if(res.status==false){
            ToastAndroid.show(res.message, ToastAndroid.BOTTOM); 
        } else {
            ToastAndroid.show(res.message, ToastAndroid.BOTTOM);
            navigation.goBack();
        }
    }
    return (
        // <KeyboardAvoidingView>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <View style={styles.cafeContainer}>
                    <Text style={styles.cafeText}>Đăng ký</Text>
                </View>
                <View style={styles.TextInputContainer}>
                    <TextInput
                        style={styles.textInput} 
                        placeholder='Họ và tên' 
                        onChangeText={setFullName}/>
                    <TextInput
                        style={styles.textInput} 
                        keyboardType='email-address'
                        placeholder='Email' 
                        onChangeText={setEmail}/>
                    <View style={[styles.inputBox, styles.passwordBox]}>
                        <TextInput
                            style={styles.textInput} 
                            secureTextEntry={hidePass1}
                            placeholder='Mật khẩu' 
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
                            placeholder='Xác nhận mật khẩu' 
                            onChangeText={setConfirmPassword} /> 
                        <Icon
                            style={styles.myIcon}
                            name={myIcon2}
                            onPress={()=>checkIcon2()}
                            color='grey'
                            size={14} />
                    </View>   
                    <Pressable style={styles.buttonContainer}
                        onPress = {()=>register()}
                    >
                        <Text style={styles.login}>Đăng ký</Text>
                    </Pressable>
                    <View style={styles.textSignUp}>
                        <Text>
                            Đã có tài khoản ?
                        </Text>
                        <Text onPress={() => navigation.goBack()}
                            style={styles.textNew}> Đăng nhập</Text>
                    </View>
                </View>
            </View>
            
        </ScrollView>
        //</KeyboardAvoidingView>
    )
}

export default SignUp;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        padding: 10,
        flex: 1,
    },
    image: {
        width: '100%',
        height: '100%'
    },
    cafeContainer: {
        paddingLeft: 10,
        paddingVertical: 20
    },
    cafeText: {
        color: '#000000',
        fontWeight: '700',
        fontSize: 36
    },
    TextInputContainer: {
        paddingHorizontal: 10,
        marginVertical: 1
    },
    textInput: {
        width: '90%',
        height: 33,
        borderBottomColor: '#ABABAB',
        borderBottomWidth: 1.5,
        marginVertical: 14
    },
    textForgotPass: {
        fontSize: 14,
        marginVertical: 8,
        color: '#52CC6D',
        textAlign: 'right',
    },
    buttonContainer: {
        height: 50,
        borderRadius: 8,
        marginTop: 38,
        backgroundColor: '#52CC6D',
        justifyContent: 'center',
        alignItems: 'center',
    },
    login: {
        color: 'white',
        fontSize:18,
    },
    icon: {
        flexDirection: 'row'

    },
    iconGG: {
        marginLeft: 115
    },
    iconFB: {
        marginLeft: 55
    },
    textSignUp: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 24
    },
    textNew: {
        color: '#1BAC4B'
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
})



