import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import {Image, TextInput, Pressable, KeyboardAvoidingView, ScrollView, ToastAndroid } from 'react-native';


 export const ChangePassword = () => {
  return (

    <View style={styles.container}>
            <View style={styles.textContainer} >
                <Text style={styles.text}> Thay Đổi Mật Khẩu</Text>
            </View>
            <View style={{
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
     }}
/>

    <View style={styles.textInputContainer}>

    <TextInput
        placeholder='Mật khẩu hiện tại'
        style={styles.textInput} />
    <TextInput
     
        placeholder='Mật khẩu mới'
        style={styles.textInput} secureTextEntry />
         <TextInput
     
     placeholder='Xác nhận mật khẩu mới'
     style={styles.textInput} secureTextEntry />
        
    <Pressable style={styles.button}>

        <Text style={styles.login} > Đổi mật khẩu </Text>
    </Pressable>
</View>

    </View>
  )
  
}

export default ChangePassword

const styles = StyleSheet.create({
// Khung của trang 
    container: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',

    },

// Khung Thay Tên thay đổi mặt khẩu
    textContainer:{
        width : 375,
        height : 44,
        justifyContent : 'center',
        alignItems : 'center',
        marginTop: 30,
       
    },
    text: {
        
        fontSize :20,
        fontWeight : "500",
    },


   // Phần textinput
    textInputContainer: {
        marginTop:10,
        paddingHorizontal: 20,
        
        
    },
    textInput: {
        marginTop: 20,
        height: 33,
        borderBottomColor: '#ABABAB',
        borderBottomWidth: 1.5,
        marginVertical: 4,
       

    },

    // Chữ Button
    login: {
        color: '#FFFFFF',
        fontWeight: '600',
        justifyContent : 'center',
        alignItems : 'center',
        height:25,
        fontStyle: 'bold',
        fontSize: 18,
    },

    // Nút Đổi mật khẩu
    button: {
        height: 50,
        backgroundColor: '#52CC6D',
        borderRadius: 8,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },


    //hình 

    image: {
       
        position: 'absolute',
        right: 330,
        top: 11,
        left:16,
        bottom:12.5,
        width: 12.25,
        height: 20.5,
    
      
    },
  });