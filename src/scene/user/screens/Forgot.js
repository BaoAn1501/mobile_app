import { StatusBar } from 'expo-status-bar';
import  React,{ useContext, useEffect, useState } from 'react';
import {
    StyleSheet, Text, View, Image, TextInput, Pressable,
    KeyboardAvoidingView, ScrollView, ToastAndroid
} from 'react-native'
import { UserContext } from '../UserContext';
const ForgotPass = (props) => {

    const {navigation} = props;
    const {onResetPass} = useContext(UserContext);
    const [email, setEmail] = useState('');
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    async function ResetPassword() {
        if(!email || email.trim().length==0){
            ToastAndroid.show('Bạn chưa nhập vào địa chỉ email', ToastAndroid.BOTTOM);
            return;
        } else if(!email.trim().match(emailRegex)){
            ToastAndroid.show('Email không đúng định dạng', ToastAndroid.BOTTOM);
            return;
        } else {
            const res = await onResetPass(email);
            if(res){
                if(res.message){
                    ToastAndroid.show(res.message, ToastAndroid.BOTTOM);
                }
            }
        }
    }
    return (
        // <KeyboardAvoidingView>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>

                <View style={styles.cafeContainer}>
                    <Text style={styles.cafeText}>Quên mật khẩu</Text>
                </View>
                <View style={styles.TextInputContainer}>
                    <Text style={{textAlign: 'center', fontSize: 16, marginVertical: 10}}>Liên kết đặt lại mật khẩu sẽ được gửi đến email của bạn</Text>
                    <TextInput
                        style={styles.textInput} onChangeText={setEmail} placeholder='Nhập vào email' />       
                    <Pressable
                        onPress={()=>ResetPassword()} 
                        style={styles.buttonContainer}
                    >
                        <Text style={styles.login}>Lấy lại mật khẩu</Text>
                    </Pressable>
                    <View style={styles.textSignUp}>
                    
                    <Text onPress={() => navigation.goBack()}
                          style={styles.textNew}>Quay lại</Text>
                </View>
                </View>
            </View>
        </ScrollView>
        //</KeyboardAvoidingView>
    )
}

export default ForgotPass;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        padding: 10,
        flex: 1,
    },
    imageContainer: {
        width: '100%',
        height: 391
    },
    image: {
        width: '100%',
        height: '100%'
    },
    cafeContainer: {
        paddingLeft: 10,
    },
    cafeText: {
        color: '#000000',
        fontWeight: '700',
        fontSize: 36,
        textAlign: 'center'
    },
    TextInputContainer: {
        paddingHorizontal: 10,
        marginVertical: 1
    },
    textInput: {
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
        marginTop: 32,
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
})



