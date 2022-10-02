import React, {useEffect, useState, useContext} from 'react'
import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet, Text, View, Image, TextInput, Pressable,
    KeyboardAvoidingView, ScrollView, ToastAndroid
} from 'react-native';
import { UserContext } from '../UserContext';
import Icon from 'react-native-vector-icons/FontAwesome5';

const SignIn = (props) => {
    const {navigation} = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [myIcon, setMyIcon] = useState('');
    const [hidePass, setHidePass] = useState(true);
    const {onLogin} = useContext(UserContext);
    const { message } = useContext(UserContext);
    const checkIcon = () => {
        if(myIcon!=''){
            if(myIcon=='eye'){
                setHidePass(false);
                setMyIcon('eye-slash');
            } else {
                setHidePass(true);
                setMyIcon('eye');
            }
        }
      }
      useEffect(() => {
        if(!password){
          setMyIcon('');
        } else {
          hidePass==true ? setMyIcon('eye') : setMyIcon('eye-slash');
        }
      });
      const onPressLogin = async () => {
        if(!email || !password || email.trim().length==0 || password.trim().length==0){
            ToastAndroid.show('Bạn chưa nhập đầy đủ thông tin', ToastAndroid.CENTER);
            return;
        }
        const res = await onLogin(email, password);
        if(message!=''){
            ToastAndroid.show(message, ToastAndroid.BOTTOM);
        }
    }
    return (
        // <KeyboardAvoidingView>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} resizeMode='contain'
                        source={require('../../../assets/images/coffee_banner.jpg')} />
                </View>
                <View style={styles.cafeContainer}>
                    <Text style={styles.cafeText}>Đăng nhập</Text>
                </View>
                <View style={styles.TextInputContainer}>
                    <TextInput
                        style={styles.textInput}
                        keyboardType='email-address'
                        placeholder='Email' 
                        onChangeText={setEmail}/>
                    <View style={[styles.inputBox, styles.passwordBox]}>
                        <TextInput
                            style={styles.textInput} 
                            secureTextEntry={hidePass}
                            placeholder='Mật khẩu' 
                            onChangeText={setPassword}/>
                        <Icon
                            style={styles.myIcon}
                            name={myIcon}
                            onPress={()=>checkIcon()}
                            color='grey'
                            size={14} />    
                    </View>
                    <View>
                        <Text style={styles.textForgotPass} onPress={()=>{navigation.navigate("Forgot")}}>Quên mật khẩu ?</Text>
                    </View>
                    <Pressable style={styles.buttonContainer} onPress={()=>onPressLogin()}>
                        <Text style={styles.login}>Đăng nhập</Text>
                    </Pressable>

                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1, height: 1, backgroundColor: '#E0E0E0', margin: 20 }} />
                    <View>
                        <Text style={{ width: 15, textAlign: 'center' }}>or</Text>
                    </View>
                    <View style={{ flex: 1, height: 1, backgroundColor: '#E0E0E0', margin: 20 }} />
                </View>

                <View style={styles.other}>
                    <Image style={[styles.icon, styles.iconGG]} source={require('../../../assets/images/google_icon.png')}/>
                    <Image style={[styles.icon, styles.iconFB]} source={require('../../../assets/images/facebook_icon.png')}/>
                </View>
                <View style={styles.textSignUp}>
                    <Text>
                        Chưa có tài khoản ? 
                    </Text>
                    <Text onPress={()=>{navigation.navigate("Register")}}
                          style={styles.textNew}> Tạo mới</Text>
                </View>

            </View>
        </ScrollView>
        //</KeyboardAvoidingView>
    )
}

export default SignIn;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        padding: 10,
        flex: 1,
    },
    imageContainer: {
        width: '80%',
        height: 300
    },
    image: {
        width: '100%',
        height: '100%'
    },
    cafeContainer: {
        paddingLeft: 10,
        paddingVertical: 1
    },
    cafeText: {
        color: '#000000',
        fontWeight: '700',
        fontSize: 36
    },
    TextInputContainer: {

        paddingHorizontal: 10,
        marginVertical: 10
    },
    textInput: {
        width: '90%',
        height: 33,
        borderBottomColor: '#ABABAB',
        borderBottomWidth: 1.5,
        marginVertical: 10
    },
    textForgotPass:{
        fontSize: 14,
        marginVertical: 10,
        color: '#52CC6D',
        textAlign: 'right',
    },
    buttonContainer: {
        height: 50,
        borderRadius: 8,
        marginTop: 5,
        backgroundColor: '#52CC6D',
        justifyContent: 'center',
        alignItems: 'center',
    },
    login: {
        color: 'white',
        fontSize:18
    },
    other:{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    icon: {
        width: 40,
        height: 40,
        marginHorizontal: 15,
    },
    textSignUp:{
        flexDirection: 'row',
        justifyContent:'center',
        marginTop: 24
    },
    textNew:{
        color:'#1BAC4B'
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



